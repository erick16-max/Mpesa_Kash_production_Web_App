import React, { useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack, TextField, useMediaQuery, useTheme, Alert, InputAdornment, Card, CircularProgress} from '@mui/material';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import ColorModeContext from '@/theme/ThemeContextProvider';
import Link from 'next/link';

import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import { signIn } from '@/firebase/Firebase';



export default function LoginModal() {
  const [loading, setLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [seePassword, setSeepassword] = React.useState(false)
  const {openLoginModal: open, setOpenLoginModal: setOpen, setOpenRegisterModal,setOpenForgotPasswordModal } = React.useContext(ColorModeContext)

  const { isMobile } = React.useContext(ColorModeContext);
  const { user, setUser } = React.useContext(AppContext);
  const router = useRouter();
  

  const handleClose = () => {
    setOpen(false);
    setPassword('')
    setEmail("")
  }



const goToSignUp = () => {
  setOpen(false)
  setOpenRegisterModal(true)
}

const goToForgotPassword = () => {
  setOpen(false)
  setOpenForgotPasswordModal(true)
}


useEffect(() => {
  // Liten to authentication state changes
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // Storse user in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      const activeUser = JSON.parse(localStorage.getItem("user"));
      setUser(activeUser);
      // router.push("/");
    } else {
      // Clear localStorage if no user is signed in
      localStorage.removeItem("user");
      setUser(null);
    }
  });

  return unsubscribe; // Clean up on unmount
}, []);

  // login with email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await signIn(email, password);
      if(user){
        // router.push("/");
        setOpen(false)
      }

      // Redirect to the protected route or home page
    } catch (error) {
      const cleanError = error.message.replace("Firebase:", "").trim();
    console.log(error)

      setIsError(cleanError);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsError("");
      }, 4000);
    }
  };


  return (
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '100vw' : 500,
            height: isMobile ? '100vh' : 'auto',
            p:isMobile ? 2 : 0,
            borderRadius: isMobile ? 0 : '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
         component={'form'} 
         onSubmit={handleSubmit}
         >
          <Card
            variant={isMobile ? 'outlined' : ""}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              px: 4,
              py: 3,
              boxShadow: 0,
              borderRadius: '16px',
            }}
          >
            <Box width={'100%'} display={'flex'} mb={2} alignItems={'center'} justifyContent={'space-between'}>
              <Typography id="modal-modal-title" variant="h5" component="h2" color={'text.primary'}>
                  Login
                </Typography>
              <IconButton 
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: 2,
                  alignItems: 'center',
                  backgroundColor: '#f1f1f1',
                  '&:hover': {
                    backgroundColor: 'divider',
                  }
                  
                }}
                onClick={handleClose}
              >
                <Typography fontWeight={400} variant='h6' color={'text.primary'} >
                    x
                </Typography>
              </IconButton>
            </Box>
            {isError &&  <Alert severity="error" sx={{mt: 1, width: '100%', borderRadius: '16px'}}>Invalid credetials -- Please try again!</Alert>}
            <Stack py={2} mt={1} gap={3} width={'100%'}>
                <TextField 
                  label='Email'
                  placeholder='Enter email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '16px',
                    },
                  }}
                  
                />
                <TextField 
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
                
                />

                <Box display={'flex'} px={1} gap={'2px'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}>
                  <Link 
                    href={'#'}
                    style={{
                        textDecoration: 'none'
                    }}
                    onClick={goToForgotPassword}
                  >
                    <Typography
                        variant='body2'
                        color={'primary.main'}
                        fontWeight={500}
                    sx={{textDecoration: 'underline'}}>Forgot Password?</Typography>
                  </Link>
                </Box>
               
                <Button
                  variant='contained'
                  sx={{
                    boxShadow: 0,
                    height: 54,
                    borderRadius: '16px',
                  }}
                  type='submit'
                >
                  {loading ? (
                    <CircularProgress size={20} thickness={4} sx={{color: '#f5f5f5'}}/>
                  ):(
                  <Typography variant='body1' textTransform={'none'} fontWeight={500} color={'#f5f5f5'}>Log In</Typography>
                  )}
                </Button>
               
                <Box display={'flex'} gap={'2px'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                  <Typography
                    variant='body2'
                    color={'text.secondary'}
                  >Don't have an account?</Typography>
                  <Link 
                    href={'#'}
                    style={{
                        textDecoration: 'none'
                    }}
                    onClick={goToSignUp}
                  >
                    <Typography
                        variant='body2'
                        color={'primary.main'}
                        fontWeight={500}
                    sx={{textDecoration: 'underline'}}>Sign up here</Typography>
                  </Link>
                </Box>
               
            </Stack>
          
          </Card>
        </Box>
      </Modal>
  );
}