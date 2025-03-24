'use client'
import { useState, useEffect, useContext } from 'react'
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
import useGetBalance from '@/hooks/useGetBalance'
import SuccessSnackbarAlert from '../components/general/CustomSnackbarAlert'
import AppContext from '@/context/AppContext'
import PageLoader from '../components/general/PageLoader'

export default function page() {
  const [rates, setRates] = useState({});
  const [depositRate, setDepositRate] = useState("")
  const [withdrawRate, setWithdrawRate] = useState("")


  const balanceAlertModal = useGetBalance()
  const {openSuccessAlert, userProfile} = useContext(AppContext)

  
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "ratessnnansjjnansnasnkaksankansknaksakskaksa", "anajnsnansnakksamksamkmskmkasmasmk"),
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
  
  useEffect(() => {
    
   
      setDepositRate(rates?.depositRate)
      setWithdrawRate(rates?.withdrawRate)
    
  }, [rates]); 
  
  
  if(userProfile === null) {
    return <PageLoader />
  }

  
  return (
  
<PageLayout>
      {balanceAlertModal}
     <WalletCard />
     <Transactions />
     <DepositModal depositRate={depositRate} rates={rates}/>
     <WithdrawModal withdrawRate={withdrawRate} rates={rates} />
     <SuccessSnackbarAlert message={"Enter your mpesa pin on mobile stk popup!"} />
</PageLayout>
  )
}