import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { MdCopyright } from "react-icons/md";

export default function Footer() {
  return (
    <Box
        width={'100%'}
        px={10}
        py={2}
        bgcolor={'secondary.main'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        color={'#f5f5f5'}
        
    >
        <MdCopyright fontSize={15}/>
        <Typography
            variant='body2'
            fontWeight={400}
            fontSize={11}
            mt={'1px'}
        >2024 Binary Mpesa Services</Typography>

    </Box>
  )
}
