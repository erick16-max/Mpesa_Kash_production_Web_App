import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack, TextField, useMediaQuery, useTheme, Alert, InputAdornment, Card} from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed  } from "react-icons/vsc";
import ColorModeContext from '@/theme/ThemeContextProvider';
import Link from 'next/link';



export default function ForgotPasswordModal() {
  const [loading, setLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [seePassword, setSeepassword] = React.useState(false)
  const {openForgotPasswordModal: open, setOpenForgotPasswordModal: setOpen, setOpenSuccessAlert, openSuccessAlert, setOpenLoginModal} = React.useContext(ColorModeContext)


  

  
  // media queries
  const isMobile = useMediaQuery("(max-width:600px)");


  const handleClose = () => {
    setOpen(false);
    setPassword('')
    setEmail("")
  }

  // sign in user
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('sign in')
    
};

const goToLoginUp = () => {
  setOpen(false)
  setOpenLoginModal(true)
}

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
         onSubmit={handleSignIn}
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
                  Reset Password
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
                  helperText={'A password reset link will be sent to the email provided above. Please do not share the link with unauthorized people'}
                  
                />
               

               
                <Button
                  variant='contained'
                  sx={{
                    boxShadow: 0,
                    height: 54,
                    borderRadius: '16px',
                  }}
                  type='submit'
                >
                  <Typography variant='body1' textTransform={'none'} fontWeight={500} color={'#f5f5f5'}>
                    Submit
                  </Typography>
                </Button>
               
                <Box display={'flex'} gap={'2px'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                  <Typography
                    variant='body2'
                    color={'text.secondary'}
                  >Don't want to reset?</Typography>
                  <Link 
                    href={'#'}
                    style={{
                        textDecoration: 'none'
                    }}
                    onClick={goToLoginUp}
                  >
                    <Typography
                        variant='body2'
                        color={'primary.main'}
                        fontWeight={500}
                    sx={{textDecoration: 'underline'}}>Go to Login</Typography>
                  </Link>
                </Box>
               
            </Stack>
          
          </Card>
        </Box>
      </Modal>
  );
}