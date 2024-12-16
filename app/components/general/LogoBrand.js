import { Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import { PiGenderNonbinaryFill } from "react-icons/pi";

export default function LogoBrand() {
  
  const isMobile = useMediaQuery('(max-width:682px)')

  return (
      <span className='logoFont' style={{fontSize: isMobile ? '20px' : '28px', fontWeight: 900}}>
        Binary Mpesa Services
    </span>
  )
}