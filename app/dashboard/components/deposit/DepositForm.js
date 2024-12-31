import { Card, TextField, Typography, Box, Button, Stack} from "@mui/material";
import React, { useContext, useState } from "react";
import MpesaLogo from "../../../../public/images/lipanampesa.png"
import Image from "next/image";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";



export default function DepositForm({depositRate, rates}) {
  const [amount, setAmount] = useState();
  const {isMobile} = useContext(ColorModeContext)

  return (
    <Box width={'100%'} p={3}>
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
      }}
    >
        <Stack width={'100%'} gap={2} mb={2}>
            <Typography
                variant="body1"
                color={'primary.main'}
                fontWeight={600}
            >1 USD = KES {depositRate}</Typography>
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
            >Minimum Deposit = USD {rates?.minDeposit}</Typography>
             <Typography
                variant="body2"
                color={'text.primary'}
                fontWeight={500}
            >Maxmum Deposit = USD {rates?.maxDeposit}</Typography>
            </Box>
            
        </Stack>
      <TextField
        label="Amount in USD"
        placeholder="Enter amount to deposit"
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
            From: 0720067228
        </Typography>
        <Typography
         variant="h6"
         color={'primary.main'}
         fontWeight={600}
         gutterBottom
         display={!amount ? 'none' : 'block'}
        >
            Ksh {amount ? parseInt(amount) * parseInt(depositRate) : parseInt(depositRate) * parseInt(rates?.minDeposit)}
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
       disabled={parseInt(amount) < parseInt(rates?.minDeposit) || parseInt(amount) > parseInt(rates?.maxDeposit) || !amount}
      >
        Make Deposit
      </Button>
    </Card>
    </Box>
  );
}
