'use client'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'
import FinishAccountCard from './FinishAccountCard'
import ColorModeContext from '@/theme/ThemeContextProvider'
import { useContext, useEffect } from 'react'
import CustomAppBar from '../components/header/CustomAppBar'

export default function page() {
  const { isTablet } = useContext(ColorModeContext);

  useEffect(() => { window.location.reload()}, [])
  

   
  return (
  
 <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"1700px"}
      margin={"auto"}
    >
      <Box width={"100%"}>
        <CustomAppBar  />
      </Box>
      <Stack mt={"100px"} py={2} px={isTablet ? 2 : 3}>
      <FinishAccountCard />
      </Stack>
    </Box>
        
  )
}