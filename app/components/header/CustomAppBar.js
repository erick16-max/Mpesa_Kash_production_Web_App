import { AppBar, Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import LogoBrand from '../general/LogoBrand'
import AuthButtons from './AuthButtons'
import CustomProfile from './CustomProfile'
import ColorModeContext from '@/theme/ThemeContextProvider'
import LoginModal from '../login/LoginModal'
import SignUpModal from '../signup/SignUpModal'
import ForgotPasswordModal from '../forgotpassword/ForgortPassword'

export default function CustomAppBar({scroll}) {
    const [user, setUser] = useState(false)
    const { isTablet } = useContext(ColorModeContext)
  return (
    <AppBar
        position='fixed'
        sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            boxShadow: scroll ? 1 : 0,
            py:2,
            px: isTablet ? 2 : 10,
            borderBottom: !scroll ? '1px solid transparent' : '1px solid #dedede'
            
        }}
    >
        <Box
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            display={'flex'}
        >
            <LogoBrand />
            {
                !user ? (

                    <AuthButtons />
                ) : (
                    <CustomProfile />
                )
            }
        </Box>
        <LoginModal />
        <SignUpModal />
        <ForgotPasswordModal />
    </AppBar>
  )
}
