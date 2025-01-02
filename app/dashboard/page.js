'use client'
import { useState, useEffect } from 'react'
import { Alert, Box, useMediaQuery, Stack, useTheme, Typography } from '@mui/material'
import PageLayout from '../layout/PageLayout'
import Link from 'next/link'
import WalletCard from './components/WalletCard'
import Transactions from './components/Transactions'
import DepositModal from './components/deposit/DepositModal'
import WithdrawModal from './components/withdraw/WithdrawModal'
import { useGetRates } from '@/hooks/useGetRates'

import { onSnapshot, doc,  } from 'firebase/firestore'
import { db } from '@/firebase.config'

export default function page() {
  const [rates, setRates] = useState({});
  const [depositRate, setDepositRate] = useState("")
  const [withdrawRate, setWithdrawRate] = useState("")


  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "new_binary_rates", "O3kIVoXFLIYlafD0yFrm"),
      (snapshot) => {
        if (snapshot.exists()) {
          setRates(snapshot?.data());
        } else {
          setRates({});
        }
      }
    );
    return unsub;
  }, []);

  let deposit_rate;
  let withdraw_rate;
  useEffect(() => {
    
    const fetchRates = async () => {
      const apiRates = await useGetRates(); // Assuming useGetRates is an async function
      
      if (apiRates) {
        deposit_rate = apiRates + parseFloat(rates?.depositMargin);
        withdraw_rate = parseFloat(apiRates) - parseFloat(rates?.withdrawMargin)
        withdraw_rate = parseFloat(withdraw_rate.toFixed(2))
      } else {
        deposit_rate = rates?.deposit;
        withdraw_rate = rates?.withdraw
        withdraw_rate = parseFloat(withdraw_rate.toFixed(2))
      }
      setDepositRate(deposit_rate)
      setWithdrawRate(withdraw_rate.toFixed(2))

    };
  
    fetchRates();
  }, [rates]); 
  


  
  return (
  
<PageLayout>
     <WalletCard />
     <Transactions />
     <DepositModal depositRate={depositRate} rates={rates}/>
     <WithdrawModal withdrawRate={withdrawRate} rates={rates} />
</PageLayout>
  )
}