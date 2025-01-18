import {
  Stack,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";
import VerifyCodeModal from "./VerifyCodeModal";
import AppContext from "@/context/AppContext";
import CryptoJS from "crypto-js";

const secretKey = "sdcihwVUWuhdw9dwiid782diwwdu";

export default function VerifyPhoneNumber({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  userEmail,
  setIsNext,
}) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = React.useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const { verifyModal, setVerifyModal } = React.useContext(AppContext);

  const sendVerificationSms = async () => {
    if (phoneNumber === "") {
      setError("Phone number is required");
      return;
    }

    const formatedNumber = phoneNumber.replace(/[+\s]/g, "");

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://bservice.binarympesaservices.com/new_binary/SendSignUpSMS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: formatedNumber,
          }),
        }
      );

      if (!response.ok) {
        setError("Something went wrong -- Please try again!");
        return;
      }

      const data = await response.json();
      if (typeof window !== undefined) {
        // Encrypt the data
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(data?.code),
          secretKey
        ).toString();
        localStorage.setItem("connection", JSON.stringify(encryptedData));
      }
      setVerifyModal(true);
    } catch (error) {
      console.log(error);
      setError("Something went wrong -- Please try again!");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const verifyNumber = async (e) => {
    e.preventDefault();
    const encryptedData = JSON.parse(localStorage.getItem("connection"));
          if(!encryptedData){
            console.log("no data")
            return
          }
    try {
      setIsVerifyLoading(true);
      // Get the encrypted data from localStorage
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const verifyCode = typeof window !== undefined ? decryptedData : "";
      const singleString = verificationCode.join("");
      
      if (verifyCode !== singleString) {
        setError("Code is invalid or expired");
        return;
      } else {
        setTimeout(() => {
          setIsNext(true);
        }, 500);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsVerifyLoading(false);
      }, 500);
    }
  };

  return (
    <Stack gap={3} width={"100%"}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        placeholder="Enter email"
        type="text"
        value={userEmail || ""}
        required
        fullWidth
        disabled
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "16px",
          },
        }}
      />
      <PhoneNumberField
        phoneError={phoneError}
        setPhoneError={setPhoneError}
        setPhoneNumber={setPhoneNumber}
        label={"Mpesa Phone Number*"}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{
          height: 50,
          borderRadius: "12px",
          fontWeight: 600,
          textTransform: "none",
        }}
        onClick={sendVerificationSms}
      >
        {isLoading ? <CircularProgress size={22} thickness={4} /> : "Continue"}
      </Button>
      <VerifyCodeModal
        phoneNumber={phoneNumber}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        error={error}
        verifyNumber={verifyNumber}
        isVerifyLoading={isVerifyLoading}
      />
    </Stack>
  );
}
