'use client'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'
import WalletCard from './components/WalletCard'
import Transactions from './components/Transactions'
import DepositModal from './components/deposit/DepositModal'
import WithdrawModal from './components/withdraw/WithdrawModal'

export default function page() {
  

   
  return (
  
<PageLayout>
     <WalletCard />
     <Transactions />
     <DepositModal />
     <WithdrawModal />
</PageLayout>
  )
}