'use client'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'
import FinishAccountCard from './FinishAccountCard'

export default function page() {
  

   
  return (
  
<PageLayout>
      <FinishAccountCard />
        
</PageLayout>
  )
}