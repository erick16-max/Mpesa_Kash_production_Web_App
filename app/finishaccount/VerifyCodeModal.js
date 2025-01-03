import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Stack, TextField, CircularProgress, Alert, Card } from "@mui/material";
import ColorModeContext from "@/theme/ThemeContextProvider";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function VerifyCodeModal({phoneNumber, verificationCode, setVerificationCode, error, verifyNumber, isVerifyLoading}) {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { verifyModal: open, setVerifyModal: setOpen } = React.useContext(AppContext);
  const { isMobile } = React.useContext(ColorModeContext);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setVerificationCode(["", "", "", "", "", ""]);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...verificationCode];
    newCode[index] = value.slice(0, 1); // Allow only one character per input
    setVerificationCode(newCode);

    // Move focus to the next field when a character is entered
    if (value.length === 1 && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formatedNumber = phoneNumber.replace(/[+\s]/g, "")
    localStorage.setItem('phone', formatedNumber)

    // Join the code and validate
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // Example: Handle your verification logic here
    try {
      // Simulate your verification API call here
      console.log("Verifying code: ", code);
      setLoading(false);
      // Redirect or update your UI accordingly
      router.push("/nextPage");
    } catch (error) {
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "100vw" : 500,
          height: isMobile ? "100vh" : "auto",
          p: isMobile ? 2 : 0,
          borderRadius: isMobile ? 0 : "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="form"
        onSubmit={verifyNumber}
      >
        <Card
          variant={isMobile ? "outlined" : ""}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            px: 4,
            py: 3,
            boxShadow: 0,
            borderRadius: "16px",
          }}
        >
          <Box width={"100%"} display={"flex"} mb={2} alignItems={"center"} justifyContent={"space-between"}>
            <Typography id="modal-modal-title" variant="h5" component="h2" color={"text.primary"}>
              Verify Phone Number
            </Typography>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                borderRadius: 2,
                alignItems: "center",
                backgroundColor: "#f1f1f1",
                "&:hover": {
                  backgroundColor: "divider",
                },
              }}
              onClick={handleClose}
            >
              <Typography fontWeight={400} variant="h6" color={"text.primary"}>
                x
              </Typography>
            </IconButton>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 1, width: "100%"}}>
              {error}
            </Alert>
          )}
          <Stack py={2} mt={1} gap={3} width={"100%"}>
            <Typography>
                Verification code was sent to:<br></br> <span style={{fontWeight:'bold'}}>{phoneNumber}</span>
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" width="100%">
              {verificationCode.map((code, index) => (
                <TextField
                  key={index}
                  id={`code-${index}`}
                  label={""}
                  value={code}
                  onChange={(e) => handleChange(e, index)}
                  inputProps={{ maxLength: 1 }}
                  required
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "16px",
                    },
                  }}
                />
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{
                boxShadow: 0,
                height: 54,
                borderRadius: "16px",
              }}
              type="submit"
            >
              {isVerifyLoading ? (
                <CircularProgress size={20} thickness={4} sx={{ color: "#f5f5f5" }} />
              ) : (
                <Typography variant="body1" textTransform={"none"} fontWeight={500} color={"#f5f5f5"}>
                  Verify Number
                </Typography>
              )}
            </Button>
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
}
