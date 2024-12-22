import { Stack, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import PhoneNumberField from "./CustomPhoneNumberField";

export default function VerifyPhoneNumber({
    phoneNumber, setPhoneNumber, email, setEmail, userEmail
}) {
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  return (
    <Stack gap={3} width={"100%"}>
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
      >
        Continue
      </Button>
    </Stack>
  );
}
