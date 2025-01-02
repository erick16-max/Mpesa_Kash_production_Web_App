import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";
import VerifyCodeModal from "./VerifyCodeModal";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { createUser } from "@/firebase/Firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db, auth } from "@/firebase.config";
import { handleUserProfile } from "@/firebase/FirebaseUser";
import { createUserWithEmailAndPassword } from "firebase/auth";



export default function SubmitPassword({
  setPhoneNumber,
  email,
  setEmail,
  userEmail,
  userObject
}) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [seePassword, setSeepassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false)

  const router = useRouter()


  // const handleCreateUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  
  //     if (password !== confirmPassword) {
  //       setError("Passwords Mismatch!");
  //       return;
  //     }
  
  //     const user = await createUser(email, password);
  
  //     const userProfile = doc(db, "users" , user?.uid);
  //     await setDoc(userProfile, userObject);
  
  //     router.push("/dashboard");
  
  //   } catch (error) {
  //     setError(error?.message || "Something went wrong! Please try again.");
  //     console.error("Error creating user:", error); // More specific error logging
  //   } finally {
  //     setLoading(false);
  //     setTimeout(() => {
  //       setError("");
  //     }, 4000);
  //   }
  // };
  
  const authorizationURL = "https://oauth.deriv.com/oauth2/authorize";
  const phoneNumber = localStorage.getItem('phone')

  const clientID = "66601";

  console.log(password, confirmPassword, phoneNumber);

  const signUp = async (e) => {
    e.preventDefault();
    
    if (phoneNumber === "" || password === "" || confirmPassword === "") {
      alert('All fields are required');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Password mismatch!');
      return;
    }
  
    setShow(true);  // Set show to true before starting the WebSocket logic
  
    const token = localStorage.getItem("tokenAuth");
    const code = token.split("token1=")[1];
    const newCode = code.split("&cur1=")[0];
  
    const regex = /acct(\d+)=(\w+)&token\d+=(\w+-\w+)/g;
    let match;
    const tokens = {};
  
    while ((match = regex.exec(token)) !== null) {
      const [, acctNumber, acctValue, fullToken] = match;
      tokens[acctValue] = { token: fullToken };
    }
  
    const ws = new WebSocket(
      "wss://ws.derivws.com/websockets/v3?app_id=" + clientID
    );
  
    ws.onopen = () => {
      ws.send(JSON.stringify({ authorize: newCode }));
    };
  
    ws.onmessage = async (msg) => {
      const data = JSON.parse(msg?.data);
      if (data?.error !== undefined) {
        alert(data?.error?.message);
        console.log('deriv error', data?.error?.message);
        ws.close();
      } else if (data?.msg_type === "authorize") {
        if (data?.authorize?.is_virtual === 1) {
          alert('You cannot sign up with a demo account!');
          return;
        } else {
          createUserWithEmailAndPassword(
            auth,
            data?.authorize?.email,
            password
          )
            .then(async (userCredential) => {
              const user = userCredential.user;
              await setDoc(doc(db, "users", user?.uid), {
                email: data?.authorize?.email,
                phoneNumber: `0${phoneNumber.slice(3)}`,
                appAuthToken: newCode,
                appTradeTokens: tokens,
                balance: data?.authorize?.balance,
                user: data?.authorize,
              });
              localStorage.removeItem("tokenAuth");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userObject");
              localStorage.removeItem("phone");
  
              setShow(false);  // Hide loading spinner after the process is complete
            })
            .catch((error) => {
              setShow(false);
              alert(error?.message);
              console.log('fb error', error);
            });
        }
      }
    };
  };
  



  

  return (
    <Stack gap={3} width={"100%"} component={'form'} onSubmit={signUp}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Password"
        placeholder="Enter your password"
        type={seePassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => setSeepassword(!seePassword)}>
                {seePassword ? <VscEye /> : <VscEyeClosed />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "16px",
          },
        }}
      />

      <TextField
        label="Confirm Password"
        placeholder="Confirm your password"
        type={seePassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => setSeepassword(!seePassword)}>
                {seePassword ? <VscEye /> : <VscEyeClosed />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "16px",
          },
        }}
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
        type="submit"
        disabled={show}
      >
        {show ? (
          <CircularProgress size={20} thickness={4} sx={{ color: "#f5f5f5" }} />
        ) : (
          "Submit"
        )}
      </Button>
    </Stack>
  );
}
