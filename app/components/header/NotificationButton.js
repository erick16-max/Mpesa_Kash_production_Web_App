import { Tooltip, IconButton, Badge } from '@mui/material'
import React, { useContext } from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import ColorModeContext from '@/theme/ThemeContextProvider';


export default function NotificationButton() {
    const { isMobile} = useContext(ColorModeContext)
  return (
    <Tooltip title='toggle theme'>
        <IconButton
        sx={{
          borderRadius: 1,
        }}
      >
        <Badge badgeContent={1} color="error">

            <FiBell  />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}
