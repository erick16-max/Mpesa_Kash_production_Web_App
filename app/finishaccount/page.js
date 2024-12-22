'use client'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'

export default function page() {
  

   
  return (
  
<PageLayout>
      <Alert severity='info' sx={{my:2}}>
          Finish Account page is under development
      </Alert>
          Hello
      
        <Link href={'/'}>
          Go home
        </Link>
        
</PageLayout>
  )
}