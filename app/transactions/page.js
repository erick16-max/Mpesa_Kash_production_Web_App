'use client'
import AppContext from '@/context/AppContext'
import { Alert, Box, useMediaQuery, Stack, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import PageLoader from '../components/general/PageLoader'
import CustomAppBar from '../components/header/CustomAppBar'

export default function page() {
    const {user} = useContext(AppContext)
    const router = useRouter()
    const [loading,setLoading]  = React.useState(true)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
  
    React.useEffect(() => {
          setLoading(false)
    }, [])

    const isUser = user !== null && user && Object?.keys(user).length > 0 ? true : false


     if(loading || user === null){
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
        <CustomAppBar/>
     </Box>
     <Stack
      mt={'100px'}
      py={2}
      px={isSmallScreen ? 1 : 3}
     >
         <Box
      p={5}
    >
      <Alert severity='info' sx={{my:2}}>
        Transactions page is under development
  </Alert>
        Hello, {isUser  && user?.displayName ? user?.displayName : user?.email},{" "}
    
        <Link href={'/'}>
          Go home
        </Link>
    </Box>
     </Stack>
   </Box>
  )
}