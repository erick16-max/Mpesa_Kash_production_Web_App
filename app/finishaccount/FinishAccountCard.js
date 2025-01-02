
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React , {useContext, useState} from 'react'
import PhoneNumberField from './CustomPhoneNumberField'
import ColorModeContext from '@/theme/ThemeContextProvider'
import VerifyPhoneNumber from './VerifyPhoneNumber'
import VerifyCodeModal from './VerifyCodeModal'
import SubmitPassword from './SubmitPassword'


export default function FinishAccountCard() {
      const [phoneNumber, setPhoneNumber] = useState("");
      const [email, setEmail] = useState("");
      const [isNext, setIsNext] = useState(false)

    
    const {isMobile} = useContext(ColorModeContext)
    const userObject = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userObject")) : {}
    const userDerivEmail = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userEmail")) : ""


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
        >Finish Creating your account</Typography>
     </Stack>
      {
        isNext ? (
          <SubmitPassword
            email={userDerivEmail}
            userObject={userObject}
          />
        ) : (
          <VerifyPhoneNumber
          email={email}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          userEmail={userDerivEmail}
          setIsNext={setIsNext}
        />
        )
      }
     
    </Card>

   </Box>
  )
}
