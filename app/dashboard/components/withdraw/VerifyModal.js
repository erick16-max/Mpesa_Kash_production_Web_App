import React, { useContext, useState } from "react";
import { Box, IconButton, Modal, Slide, Typography, TextField, Button, Stack, CircularProgress} from "@mui/material";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import WithdrawForm from "./WithdrawForm";

export default function VerifyWithdrawModal({
  isVerifyModelOpen, 
  setIsVerifyModelOpen, 
  setCode, 
  code, 
  show,
   handleVerify
  }) {
  const {isMobile, isTablet} = useContext(ColorModeContext)


  return (
    <Modal
      open={isVerifyModelOpen}
      onClose={() => setIsVerifyModelOpen(false)}
     
    >
        <Box
          sx={{
            backgroundColor: "inherit",
            height: '100vw',
            width: "100vw",
            position: "fixed", // Ensures it stays at the bottom
            bottom: 0, // Aligns it to the bottom
            overflow: "auto",
            borderWidth: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <Box
            p={3}
            width={300}
            bgcolor={'#ffffff'}
            borderRadius={'12px'}
            display={'flex'}
            flexDirection={'column'}
            gap={3}
            component={'form'}
            onSubmit={handleVerify}
            mt={isTablet ? 0 : 70}
          >
           <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
           <Typography variant="body1" fontWeight={500}>Verify your Withdrawal</Typography>
           <IconButton onClick={() => setIsVerifyModelOpen(false)}>x</IconButton>
           </Stack>
            <TextField
                    label="Verification Code"
                    placeholder="Enter Verification Code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
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

            <Button
                variant="contained"
                color="warning"
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    height: 50,
                    borderRadius: '12px'
                }}
                disabled={show}
                type="submit"
            >
              {show ? <CircularProgress thickness={3} size={22} sx={{color: '#232425'}} /> : 'Submit'}
            </Button>

          </Box>
          
         
        </Box>
    </Modal>
  );
}
