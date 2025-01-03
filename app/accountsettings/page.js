'use client'
import AppContext from '@/context/AppContext'
import { Alert, Box, useMediaQuery, Stack, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import PageLoader from '../components/general/PageLoader'
import CustomAppBar from '../components/header/CustomAppBar'
import AccountCard from './AccountCard'
import PageLayout from '../layout/PageLayout'

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
  <PageLayout>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
      >
        <AccountCard />
      </Box>
  </PageLayout>

   
  )
}