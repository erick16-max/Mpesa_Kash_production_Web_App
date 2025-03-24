import ColorModeContext from '@/theme/ThemeContextProvider'
import { Button, Stack } from '@mui/material'
import React, { useContext } from 'react'
// import ThemeToggleButton from './ThemeToggleButton'
import ThemeToggleButton from '../general/ToggleThemeButton'
import { CiUser } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountsMenu from './AccountsMenu';



export default function AuthButtons() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const { isTablet, isMobile, setOpenLoginModal, setOpenRegisterModal} = useContext(ColorModeContext)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Stack
        direction={'row'}
        gap={1}
    >
        {/* <Button
        color='secondary'
        sx={{
            borderRadius: '16px',
            height: isMobile ? 40 : 50,
            px: isMobile ? 0 : 3,
            textTransform: 'none',
            fontWeight: 600,
            width: 100,
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
          {"Register"}
        </Button> */}
        <Button
        // variant='contained'
        color='secondary'
        sx={{
            borderRadius: '16px',
            height: isMobile ? 40 : 50,
            px: isMobile ? 1: 3,
            textTransform: 'none',
            fontWeight: 600,
            minWidth: 70
        }}
        onClick={handleClick}
        startIcon={<CiUser />}
        endIcon={<IoMdArrowDropdown />}
        >
          {"Login"}
        </Button>
      <ThemeToggleButton />
      <AccountsMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClick={handleClick}
              setOpenLogin={setOpenLoginModal}
              setopenRegister={setOpenRegisterModal}
            />

    </Stack>
  )
}
