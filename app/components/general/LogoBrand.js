import { Stack, useMediaQuery } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { PiGenderNonbinaryFill } from "react-icons/pi";

export default function LogoBrand() {
  
  const isMobile = useMediaQuery('(max-width:682px)')

  return (
     <Link
      href={'/'}
      style={{
        textDecoration: 'none',
      }}
     >
         <span className='logoFont' style={{fontSize: isMobile ? '20px' : '28px', fontWeight: 900}}>
             Binary Mpesa <br></br> <span>Services</span>
        </span>
     </Link>
  )
}