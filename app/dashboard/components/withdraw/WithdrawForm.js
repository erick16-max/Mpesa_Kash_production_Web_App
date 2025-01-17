import { Card, TextField, Typography, Box, Button, Stack, CircularProgress, Alert} from "@mui/material";
import React, { useContext, useState } from "react";
import MpesaLogo from "../../../../public/images/lipanampesa.png"
import Image from "next/image";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";



export default function WithdrawForm({withdrawRate, rates, show, makeWithdraw, amount, setAmount, isSuccess, isError}) {
  const {isMobile} = useContext(ColorModeContext)
  const {userProfile} = useContext(AppContext)

  const isMinimumBalance = userProfile?.balance > rates?.minWithdraw

  return (
    <Box width={'100%'} p={3}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
    >
        <Card
      variant={"outlined" }
      sx={{
        width: isMobile ? '100%' : 500,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        boxShadow: 0,
      }}
      component={'form'}
      onSubmit={makeWithdraw}
    >
        <Stack width={'100%'} gap={2} mb={2}>
            <Typography
                variant="body1"
                color={'primary.main'}
                fontWeight={600}
            >1 USD = KES {withdrawRate}</Typography>
            <Box
                width={'100%'}
                display={'flex'}
                alignItems={isMobile ? 'flex-start' : 'center'}
                justifyContent = 'space-between'
                gap={2}
                flexDirection={isMobile ? 'column' : 'row'}
            >
            <Typography
                variant="body2"
                color={'text.primary'}
                fontWeight={500}
            >Minimum Withdraw = USD {rates?.minWithdraw}</Typography>
             <Typography
                variant="body2"
                color={'text.primary'}
                fontWeight={500}
            >Maxmum Withdraw = USD {rates?.maxWithdraw}</Typography>
            </Box>
            
        </Stack>
       {isError &&  <Alert severity="error">Invalid code or insufficient funds!</Alert>}
       {isSuccess &&  <Alert severity="success">Withdrawal was successful!</Alert>}
      <TextField
        label="Amount in USD"
        placeholder="Enter amount to withdraw"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Image 
         src={MpesaLogo}
         alt="lipa na mpesa"
         height={50}
        />
        <Typography
            variant="body1"
            color={'text.secondary'}
            fontWeight={500}
            gutterBottom
        >
            To: {userProfile?.phoneNumber}
        </Typography>
        <Typography
         variant="h6"
         color={'primary.main'}
         fontWeight={600}
         gutterBottom
         display={!amount ? 'none' : 'block'}
        >
            Ksh {amount ? parseInt(amount) * parseInt(withdrawRate) : parseInt(withdrawRate) * parseInt(rates?.minWithdraw)}
        </Typography>
      </Stack>
      <Button
       variant="contained"
       sx={{
        textTransform: 'none',
        fontWeight: 600,
        height: 55,
        borderRadius: '16px'
       }}
       fullWidth
       disabled={parseInt(amount) < parseInt(rates?.minWithdraw) || !isMinimumBalance || parseInt(amount) > parseInt(rates?.maxWithdarw) || !amount || show}
      type="submit"
      >
        {show ? (<CircularProgress size={22} thickness={4} sx={{color: '#232425'}}/>) : "Make Withdrawal"}
      </Button>
    </Card>
    </Box>
  );
}
