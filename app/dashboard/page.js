'use client'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'
import WalletCard from './components/WalletCard'
import Transactions from './components/Transactions'

export default function page() {
  

   
  return (
  
<PageLayout>
     <WalletCard />
     <Transactions />
</PageLayout>
  )
}