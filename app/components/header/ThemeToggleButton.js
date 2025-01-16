import ColorModeContext from '@/theme/ThemeContextProvider';
import { Tooltip, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight, CiDark } from "react-icons/ci";
import { LIGHT_MODE } from '@/Constants';

export default function ThemeToggleButton() {
  const { isMobile, colorMode} = React.useContext(ColorModeContext)
  const theme = useTheme()
  return (
    <Tooltip title='toggle theme'>
        <IconButton
        sx={{
          borderRadius: 1,
        }}
        onClick={colorMode.toggleColorMode}
      >
        { theme.palette.mode === LIGHT_MODE ?  <CiDark /> :  <CiLight />}
       
      </IconButton>
    </Tooltip>
  )
}
