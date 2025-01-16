import ColorModeContext from '@/theme/ThemeContextProvider';
import { Tooltip, IconButton,  } from '@mui/material'
import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggleButton() {
  const { isMobile} = React.useContext(ColorModeContext)
  return (
    <Tooltip title='toggle theme'>
        <IconButton
        sx={{
          borderRadius: 1,
        }}
      >
        <MdOutlineDarkMode />
      </IconButton>
    </Tooltip>
  )
}
