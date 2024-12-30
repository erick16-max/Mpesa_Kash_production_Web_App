'use client'
import AppContext from '@/context/AppContext'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState, useEffect } from 'react'
import PageLoader from '../components/general/PageLoader'
import CustomAppBar from '../components/header/CustomAppBar'

export default function PageLayout({children }) {
    const {user} = useContext(AppContext)
    const router = useRouter()
    const [loading,setLoading]  = React.useState(true)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [scroll, setScroll] = useState(false);
    const {userProfile} = useContext(AppContext)
  
    const changeNavBg = () => {
      window.scrollY >= 10 ? setScroll(true) : setScroll(false);
    };
  
    useEffect(() => {
  
     setTimeout(() => {
      setLoading(false);
     }, 1000)
    }, [])
  
    useEffect(() => {
      window.addEventListener("scroll", changeNavBg);
      return () => {
        window.removeEventListener("scroll", changeNavBg);
      };
    }, []);
    
  
    React.useEffect(() => {
          setLoading(false)
    }, [])

    const isUser = user !== null && user && Object?.keys(user).length > 0 ? true : false


     if(loading || user === null || userProfile === null){
        return <PageLoader />
      }
      

   
  return (
  
<Box
    width={'100%'}
    display={'flex'}
    flexDirection={'column'}
    maxWidth={'1700px'}
    margin={'auto'}
   >
     <Box
      width={'100%'}
     >
        <CustomAppBar scroll={scroll}/>
     </Box>
     <Stack
      mt={'100px'}
      py={2}
      px={isSmallScreen ? 1 : 3}
     >
    
      {children }
   
     </Stack>
   </Box>
  )
}