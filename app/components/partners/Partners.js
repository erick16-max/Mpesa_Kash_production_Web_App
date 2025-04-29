"use client"
import { Box, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Image from 'next/image'
import DerivLogoImage from '../../../public/images/deriv2.png'
import MpesaLogoImage from '../../../public/images/mpesa.png'
import ColorModeContext from '@/theme/ThemeContextProvider'
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function Partners() {
    const { isMobile, isTablet} = useContext(ColorModeContext)
  return (
    <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        py={5}
        px={ isTablet ? 2 : 10}
        flexDirection={'column'}
        gap={3}

    >
            <Typography
                 variant="h4"
                 fontWeight={700}
                 color={"text.primary"}
                 className="interFont"
                 gutterBottom
            >
                Our Partners
            </Typography>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'100%'}
                gap={5}
            >
                    <Image 

                        src={DerivLogoImage}
                        width={isMobile ? 100 : 180}
                        height={isMobile ? 40 : 60}
                        alt='deriv logo'
                        
                    />
                    <FaArrowRightArrowLeft fontSize={40} />
                    <Image 

                        src={MpesaLogoImage}
                        width={isMobile ? 120 : 200}
                        height={isMobile ? 50 : 70}
                        style={{marginTop: 25}}
                        alt='mpesa logo'
                        
                    />
            </Box>

            <Typography
                variant='body1'
                color={'text.primary'}
                fontWeight={500}
                textAlign={'center'}
                px={ isMobile ? 6 : 16}
            >
                Deposit to your Deriv trading account, trade and withdraw your winnings to your MPESA Wallet
            </Typography>
    </Box>
  )
}
