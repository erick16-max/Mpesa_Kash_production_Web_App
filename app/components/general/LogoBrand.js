import { DARK_MODE } from '@/Constants';
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { PiGenderNonbinaryFill } from "react-icons/pi";

export default function LogoBrand() {
  
  const isMobile = useMediaQuery('(max-width:682px)')
  const theme = useTheme()

  return (
     <Link
      href={'/'}
      style={{
        textDecoration: 'none',
      }}
     >
         <span className='logoFont' style={{
          fontSize: isMobile ? '16px' : '24px', 
          fontWeight: 900,
          color: theme.palette.mode === DARK_MODE ? '#f5f5f5' : '#014650'

          }}>
             Binary Mpesa <br></br> <span>Services</span>
        </span>
     </Link>
  )
}