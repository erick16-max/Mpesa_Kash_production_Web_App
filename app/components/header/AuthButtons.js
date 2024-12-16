import ColorModeContext from '@/theme/ThemeContextProvider'
import { Button, Stack } from '@mui/material'
import React, { useContext } from 'react'

export default function AuthButtons() {
  const { isTablet, isMobile, setOpenLoginModal, setOpenRegisterModal} = useContext(ColorModeContext)
  return (
    <Stack
        direction={'row'}
        gap={1}
    >
        <Button
        color='secondary'
        sx={{
            borderRadius: '16px',
            height: isMobile ? 46 : 50,
            px: isMobile ? 1 : 3,
            textTransform: 'none',
            fontWeight: 600
        }}
        onClick={() => setOpenLoginModal(true)}
        >Log In</Button>
        <Button
        variant='contained'
        color='secondary'
        sx={{
            borderRadius: '16px',
            height: isMobile ? 46 : 50,
            px: isMobile ? 1 : 3,
            textTransform: 'none',
            fontWeight: 600
        }}
        onClick={() => setOpenRegisterModal(true)}
        >
          {isMobile ? 'Sign Up' : 'Create Account' }
        </Button>
    </Stack>
  )
}
