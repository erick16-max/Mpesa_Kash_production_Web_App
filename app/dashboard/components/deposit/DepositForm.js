import { Card, TextField, Typography, Box, Button, Stack, CircularProgress, Alert} from "@mui/material";
import React, { useContext, useState } from "react";
import MpesaLogo from "../../../../public/images/lipanampesa.png"
import Image from "next/image";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { auth } from "@/firebase.config";



export default function DepositForm({depositRate, rates}) {
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const {isMobile} = useContext(ColorModeContext)
  const [error, setError] = useState('')
  const {userProfile, setIsDepositModelOpen, openSuccessAlert, setOpenSuccessAlert} = useContext(AppContext)

  // make deposit
 const makeDeposit = async () => {
  setShow(true);
  setError("");

  try {
    if (!userProfile?.nickname) {
      throw new Error("Please update your account to provide a nickname.");
    }

    if (!userProfile || Object.keys(userProfile).length === 0) {
      throw new Error("User profile not found.");
    }

    let cleanPhone = userProfile.phoneNumber || "";

    if (cleanPhone.startsWith("0")) {
      cleanPhone = "254" + cleanPhone.slice(1);
    }

    if (cleanPhone.startsWith("+")) {
      cleanPhone = cleanPhone.replace("+", "");
    }

    console.log('user profile', userProfile)
    const paymentData = {
      phone_number: cleanPhone,
      cash: Number(amount),
      CR:
        userProfile?.derivId ||
        userProfile?.user?.loginid ||
        userProfile?.crNumber,
      type: "deposit",
      deposit: depositRate,
      uid: auth?.currentUser?.uid,
      email: userProfile?.email,
      platform: "web",
      nickname: userProfile?.nickname,
      accessToken: userProfile?.token,
    };

    console.log("Deposit Payload:", paymentData);

    const response = await fetch(
      "https://kash.instantpesa.co.ke/new_deriv/stk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Version": "3.0.0",
        },
        body: JSON.stringify(paymentData),
      }
    );

    const result = await response.json();

    console.log("Backend Response:", result);

    if (!response.ok) {
      throw new Error(result?.message || "Request failed.");
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    if (
      result?.message &&
      result.message !== "Completed"
    ) {
      throw new Error(result.message);
    }

    // Success
    setAmount("");
    setOpenSuccessAlert(true);
    setIsDepositModelOpen(false);

    setTimeout(() => {
      setOpenSuccessAlert(false);
    }, 6000);
  } catch (err) {
    console.error("Deposit Error:", err);

    setError(
      err?.message ||
        "Unable to initiate deposit. Please try again."
    );

    setTimeout(() => {
      setError("");
    }, 6000);
  } finally {
    setShow(false);
  }
};

  return (
    <Box width={'100%'} p={3}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
    >
      {error && <Alert severity="error">{error}</Alert>}
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
            From: {userProfile?.phoneNumber}
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
        borderRadius: '16px',
       }}
       fullWidth
       disabled={parseInt(amount) < parseInt(rates?.minDeposit) || parseInt(amount) > parseInt(rates?.maxDeposit) || !amount || show}
       onClick={makeDeposit}
      >
        {show ? (<CircularProgress size={22} thickness={4} sx={{color: '#232425'}}/>) : "Make Deposit"}
      </Button>
    </Card>
    </Box>
  );
}
