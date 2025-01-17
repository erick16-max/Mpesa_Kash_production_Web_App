import React, { useContext } from "react";
import { Box, IconButton, Modal, Slide, Typography } from "@mui/material";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import DepositForm from "./DepositForm";
import CopyRight from '../../../components/footer/CopyRight'

export default function DepositModal({depositRate, rates}) {
  const { isDepositModelOpen, setIsDepositModelOpen } = useContext(AppContext);
  const {isMobile} = useContext(ColorModeContext)

  return (
    <Modal
      open={isDepositModelOpen}
      onClose={() => setIsDepositModelOpen(false)}
     
    >
      <Slide direction="up" in={isDepositModelOpen}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            height: isMobile ? '90vh' : "96vh",
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
                 Deposit to Deriv
            </Typography>
            <IconButton
                sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 1
                }}
                onClick={() => setIsDepositModelOpen(false)}
            >
               x
            </IconButton>
          </Box>
          <Box
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            py={2}
            flexDirection={'column'}
          >
            <DepositForm depositRate={depositRate} rates={rates}/>
            <CopyRight bgColor={'#ffffff'}/>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
