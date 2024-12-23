import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";
import VerifyCodeModal from "./VerifyCodeModal";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { createUser } from "@/firebase/Firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db, auth } from "@/firebase.config";
import { handleUserProfile } from "@/firebase/FirebaseUser";



export default function SubmitPassword({
  phoneNumber,
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

  const router = useRouter()


  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      if (password !== confirmPassword) {
        setError("Passwords Mismatch!");
        return;
      }
  
      const user = await createUser(email, password);
  
      // Create the user profile in Firestore. No need to check for existence first.
      const userProfileRef = doc(db, "users", user?.uid);
      console.log(user?.uid)
  
      // Ensure userObject has at least a UID. This is crucial.
      const userObjectWithUid = { ...userObject, uid: user.uid, email: user.email };
  
      await setDoc(userProfileRef, userObjectWithUid);
  
      router.push("/dashboard");
  
    } catch (error) {
      setError(error?.message || "Something went wrong! Please try again.");
      console.error("Error creating user:", error); // More specific error logging
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };
  
  

 
  

  return (
    <Stack gap={3} width={"100%"} component={'form'} onSubmit={handleCreateUser}>
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
      >
        {loading ? (
          <CircularProgress size={20} thickness={4} sx={{ color: "#f5f5f5" }} />
        ) : (
          "Submit"
        )}
      </Button>
    </Stack>
  );
}
