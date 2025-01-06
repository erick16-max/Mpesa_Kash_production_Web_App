import { Tooltip, IconButton,  } from '@mui/material'
import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggleButton() {
  return (
    <Tooltip title='toggle theme'>
        <IconButton
        sx={{
          width: 40,
          height: 40,
          borderRadius: 25,
        }}
      >
        <MdOutlineDarkMode />
      </IconButton>
    </Tooltip>
  )
}
