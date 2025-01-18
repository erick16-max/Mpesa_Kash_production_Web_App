import AppContext from '@/context/AppContext'
import ColorModeContext from '@/theme/ThemeContextProvider';
import { Box, Card, Stack, Typography, TextField , InputAdornment, IconButton, Button, Alert, CircularProgress} from '@mui/material'
import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import PhoneNumberField from '@/app/finishaccount/CustomPhoneNumberField';
import VerifyCodeModal from '@/app/finishaccount/VerifyCodeModal';
import CryptoJS from "crypto-js";
import { auth, db } from '@/firebase.config';
import Link from 'next/link';

const secretKey = "sdcihwVUWuhdw9dwiid782diwwdu"




export default function ChangePhoneNumber() {
      const {isMobile, isTablet} = React.useContext(ColorModeContext)
       const [isLoading, setIsLoading] = React.useState(false)
        const [error, setError] = React.useState("")
        const [message, setMessage] = React.useState("")
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [seePassword, setSeepassword] = React.useState(false)
        const [phoneError, setPhoneError] = useState("");
        const [phoneNumber, setPhoneNumber] = useState("");
        const [isVerifyLoading, setIsVerifyLoading] = React.useState(false)
        const [verificationCode, setVerificationCode] = React.useState(["", "", "", "", "", ""]);
        const { verifyModal, setVerifyModal, userProfile } = React.useContext(AppContext);

       


      
        const sendVerificationSms = async(e) => {
          e.preventDefault()

          
          try {
            setIsLoading(true)
            if (phoneNumber === "") {
              setError('Phone number is required')
              
              return
            } 
             
            const formatedNumber = phoneNumber.replace(/[+\s]/g, "")
            localStorage.setItem('phone', formatedNumber)
            const response = await fetch("https://bservice.binarympesaservices.com/new_binary/SendSMS",{
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                 phoneNumber: formatedNumber
              })
            })
      
            if(!response.ok){
            setError('Something went wrong -- Please try again!')
            return
            }
      
            const data = await response.json()
            // console.log(data?.response?.responses);
            // console.log(data?.code)
            if(typeof window !== undefined){

              // Encrypt the data
              const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data?.code), secretKey).toString();
              localStorage.setItem("connection", JSON.stringify(encryptedData));
              
            }
            setVerifyModal(true)
      
          } catch (error) {
            console.log(error)
            setError('Something went wrong -- Please try again!')
          }finally{
            setIsLoading(false)
            setTimeout(() => {
              setError("")
            }, 4000)
          }
      
        }
      
        const verifyNumber = async(e) => {
          e.preventDefault()
          const encryptedData = JSON.parse(localStorage.getItem("connection"));
          if(!encryptedData){
            console.log("no data")
            return
          }
          try {
            setIsVerifyLoading(true)
            // Get the encrypted data from localStorage
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData)
            const verifyCode = typeof window !== undefined ? decryptedData : ""
            const singleString = verificationCode.join("");
            const formatedNumber = phoneNumber.replace(/[+\s]/g, "")

            
            if(verifyCode !== singleString){
              
              setError("Code is invalid or expired");
              return false
            }else{
             const response = await  fetch(
              "https://bservice.binarympesaservices.com/user/present/actions/modify/update/new/or/existing/phone/number",
              {
                method: "POST",
                body: JSON.stringify({
                  uid: auth?.currentUser?.uid,
                  user: userProfile,
                  newPhoneNumber:  `0${formatedNumber.slice(3)}`,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            // response
             const data = await response.json()
             if(data?.message){
              setVerifyModal(false)
              setPhoneNumber("");
              setMessage(data?.message)
             }
             if(data?.error)
              setError(data?.error)
            }
          } catch (error) {
            console.log(error)
            setError("Something went wrong")
            return false
          }finally{
            setTimeout(() => {
              setError("")
              setMessage("")
            }, 4000)
            setTimeout(() => {
              setIsVerifyLoading(false)

            }, 500)
          }
        }
        
  
  return (
   <Box
    width={ !isMobile ? 500 : '100%'}
    margin={'auto'}
   >
     <Card 
        variant='outlined'
        sx={{
            boxShadow: 0,
            p: 3,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}
        component={'form'}
        onSubmit={sendVerificationSms}
    >

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        py={2}
      >
      <Typography variant='body1' color={'text.primary'} fontWeight={600}>Change Phone number</Typography>
      <IconButton
        LinkComponent={Link}
        href='/accountsettings'
        sx={{
          width: 30,
          height: 30,
          borderRadius: 1
        }}
      >
        x
      </IconButton>
      </Box>
      {error && <Alert severity='error'>{error}</Alert>}
      {message && <Alert severity={message == "You can't update to the same phone number" ? 'info' :'success'}>{message}</Alert>}
      <Stack gap={3}>
      <PhoneNumberField
        phoneError={phoneError}
        setPhoneError={setPhoneError}
        setPhoneNumber={setPhoneNumber}
        label={"New Phone Number*"}
      />
                {/* <TextField 
                  label='Password'
                  placeholder='Enter your password'
                  type={ seePassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment:(
                      <InputAdornment>
                          <IconButton onClick={() => setSeepassword(!seePassword)}>
                             {seePassword ? <VscEye /> : <VscEyeClosed  />}
                          </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '16px',
                    },
                  }}
                
                /> */}
                  <Button
                  variant='contained'
                  sx={{
                    boxShadow: 0,
                    height: 54,
                    borderRadius: '16px',
                    mt: 2,
                  }}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={20} thickness={4} />
                  ):(
                  <Typography variant='body1' textTransform={'none'} fontWeight={500} >Verify Phone Number</Typography>
                  )}
                </Button>
      </Stack>
       <VerifyCodeModal 
            phoneNumber={phoneNumber} 
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            error={error}
            verifyNumber={verifyNumber}
            isVerifyLoading={isVerifyLoading}
            />
    </Card>
   </Box>
  )
}
