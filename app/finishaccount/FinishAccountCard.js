
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React , {useContext, useState} from 'react'
import PhoneNumberField from './CustomPhoneNumberField'
import ColorModeContext from '@/theme/ThemeContextProvider'
import VerifyPhoneNumber from './VerifyPhoneNumber'


export default function FinishAccountCard() {
      const [phoneNumber, setPhoneNumber] = useState("");
      const [email, setEmail] = useState("");
    
    const {isMobile} = useContext(ColorModeContext)
    const userObject = JSON.parse(localStorage.getItem("userObject"))
    const userDerivEmail = JSON.parse(localStorage.getItem("userEmail"))

    console.log(userDerivEmail, userObject)

  return (
   <Box
    width={'100%'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
   >

<Card
        variant='outlined'
        sx={{
            p: 3,
            backgroundColor: '#ffffff',
            width: isMobile ? '96vw' : 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 5,
        }}
    >
     <Stack>
        <Typography
          variant='h6'
          fontWeight={700}
          color={'text.primary'}
        >Hello, {userObject?.fullname}</Typography>
        <Typography
          variant='body1'
          fontWeight={700}
          color={'text.secondary'}
        >Finish Creating an account</Typography>
     </Stack>
      <VerifyPhoneNumber
        email={email}
        setEmail={setEmail}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        userEmail={userDerivEmail}
      />
     
    </Card>

   </Box>
  )
}
