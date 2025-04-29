import { DARK_MODE } from '@/Constants';
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { PiGenderNonbinaryFill } from "react-icons/pi";
import Image from 'next/image';
import LogoImage from "../../../public/images/logo.png"


export default function LogoBrand({display}) {
  
  const isMobile = useMediaQuery('(max-width:682px)')
  const theme = useTheme()

  return (
     <Link
      href={'/'}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
     >
        <Image 
          src={LogoImage}
          alt='logo'
          height={40}

        />
         <span className='logoFont' style={{
          fontSize: isMobile ? '14px' : '16px', 
          fontWeight: 900,
          color: theme.palette.mode === DARK_MODE ? '#4caf50' : '#4caf50',
          display:display ? "block" : isMobile ? 'none' : "",

          }}>
             Mpesa Kash
        </span>
     </Link>
  )
}