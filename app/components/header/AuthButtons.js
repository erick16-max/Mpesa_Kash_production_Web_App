import ColorModeContext from '@/theme/ThemeContextProvider'
import { Button, Stack } from '@mui/material'
import React, { useContext } from 'react'
import ThemeToggleButton from './ThemeToggleButton'

export default function AuthButtons() {
  const { isTablet, isMobile, setOpenLoginModal, setOpenRegisterModal} = useContext(ColorModeContext)
  return (
    <Stack
        direction={'row'}
        gap={isMobile ? 0 : 1}
    >
      <ThemeToggleButton />
        <Button
        color='secondary'
        sx={{
            borderRadius: '16px',
            height: isMobile ? 40 : 50,
            px: isMobile ? 0 : 3,
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
            height: isMobile ? 40 : 50,
            px: isMobile ? 1: 3,
            textTransform: 'none',
            fontWeight: 600,
            minWidth: 70
        }}
        onClick={() => setOpenRegisterModal(true)}
        >
          {isMobile ? 'Sign Up' : 'Create Account' }
        </Button>
    </Stack>
  )
}
