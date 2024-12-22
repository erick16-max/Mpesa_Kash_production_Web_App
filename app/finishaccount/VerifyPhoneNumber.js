import { Stack, Button, TextField, Alert, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";
import VerifyCodeModal from "./VerifyCodeModal";
import AppContext from "@/context/AppContext";

export default function VerifyPhoneNumber({
    phoneNumber, setPhoneNumber, email, setEmail, userEmail, setIsNext
}) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { verifyModal, setVerifyModal } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isVerifyLoading, setIsVerifyLoading] = React.useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  const sendVerificationSms = async() => {

    if (phoneNumber === "") {
      setError('Phone number is required')
      return
    } 
     
    const formatedNumber = phoneNumber.replace(/[+\s]/g, "")

    try {
      setIsLoading(true)
      const response = await fetch("https://bservice.binarympesaservices.com/new_binary/SendSignUpSMS",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           phoneNumber: formatedNumber
        })
      })

      if(!response.ok){
      setError('Something went wrong -- Please try again!')
      return
      }

      const data = await response.json()
      console.log(data?.response?.responses);
      console.log(data?.code)
      if(typeof window !== undefined){
        localStorage.setItem("VerifyUserCode", JSON.stringify(data?.code));
        
      }
      setVerifyModal(true)

    } catch (error) {
      console.log(error)
      setError('Something went wrong -- Please try again!')
    }finally{
      setIsLoading(false)
      setTimeout(() => {
        setError("")
      }, 4000)
    }

  }

  const verifyNumber = async(e) => {
    e.preventDefault()
    try {
      const verifyCode = typeof window !== undefined ? JSON.parse(localStorage.getItem("VerifyUserCode")) : ""
      const singleString = verificationCode.join("");
      
      if(verifyCode !== singleString){
        
        setError("Code is invalid or expired");
        return
      }else{
        setIsNext(true)
      }
    } catch (error) {
      console.log(error)
      setError("Something went wrong")
    }
  }


 

  return (
    <Stack gap={3} width={"100%"} >
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
        {
          isLoading ? (
            <CircularProgress size={22} thickness={4} sx={{color: '#f5f5f5'}} />
          ): "Continue"
        }
        
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
