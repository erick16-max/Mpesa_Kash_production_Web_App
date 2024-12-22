import { Stack, Button, TextField, InputAdornment, CircularProgress, IconButton} from "@mui/material";
import React, { useState } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";
import VerifyCodeModal from "./VerifyCodeModal";
import { VscEye, VscEyeClosed } from "react-icons/vsc";



export default function SubmitPassword({
    phoneNumber, setPhoneNumber, email, setEmail, userEmail
}) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [seePassword, setSeepassword] = React.useState(false)

  return (
    <Stack gap={3} width={"100%"}>
     
      <TextField 
                  label='Password'
                  placeholder='Enter your password'
                  type={ seePassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment:(
                      <InputAdornment>
                          <IconButton onClick={() => setSeepassword(!seePassword)}>
                             {seePassword ? <VscEye /> : <VscEyeClosed  />}
                          </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '16px',
                    },
                  }}
                
                />

<TextField 
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  type={ seePassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment:(
                      <InputAdornment>
                          <IconButton onClick={() => setSeepassword(!seePassword)}>
                             {seePassword ? <VscEye /> : <VscEyeClosed  />}
                          </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '16px',
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
      >
        Continue
      </Button>
    </Stack>
  );
}
