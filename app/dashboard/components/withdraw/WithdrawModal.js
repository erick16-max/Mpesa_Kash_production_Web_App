import React, { useContext } from "react";
import { Box, IconButton, Modal, Slide, Typography } from "@mui/material";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";

export default function WithdrawModal() {
  const { isWithdrawModelOpen, setIsWithdrawModelOpen } = useContext(AppContext);
  const {isMobile} = useContext(ColorModeContext)

  return (
    <Modal
      open={isWithdrawModelOpen}
      onClose={() => setIsWithdrawModelOpen(false)}
     
    >
      <Slide direction="up" in={isWithdrawModelOpen}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "96vh",
            width: "100vw",
            position: "fixed", // Ensures it stays at the bottom
            bottom: 0, // Aligns it to the bottom
            overflow: "auto",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderWidth: 0,
            
          }}
        >
          <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={3}
          >
            <Typography
                variant={isMobile ? "body1" : "h6"}
                color={'text.primary'}
                fontWeight={600}
            >
                 Withdraw from Deriv
            </Typography>
            <IconButton
                sx={{
                    background: '#f5f5f5',
                    width: 34,
                    height: 34,
                    borderRadius: 1
                }}
                onClick={() => setIsWithdrawModelOpen(false)}
            >
               x
            </IconButton>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
