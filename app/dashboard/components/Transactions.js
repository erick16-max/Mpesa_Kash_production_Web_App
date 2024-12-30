import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ColorModeContext from '@/theme/ThemeContextProvider';
import NoTranscations from './transactions/NoTranscations';
import TransactionGrid from './transactions/TransactionGrid';
import AppContext from '@/context/AppContext';
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  onSnapshot,
  doc, 
  getFirestore,
} from "firebase/firestore";
import { db, auth } from '@/firebase.config';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Transactions() {
  const [value, setValue] = React.useState(0);
  const {isTablet} = React.useContext(ColorModeContext)
  const {userProfile} = React.useContext(AppContext)
  const [transactions, setTransactions] = React.useState([])
  const [withdrawTransactions, setWithdrawTransactions] = React.useState([])
  const [depositTransactions, setDepositTransactions] = React.useState([])
  const [allTransactions, setAllTransactions] = useState([]); 

  // get withdraw transactions
  useEffect(() => {
    if (Object.keys(userProfile)?.length > 0) {
      let num = userProfile?.phoneNumber.slice(1);
      let phoneNum = `254${num}`;
      const q = query(
        collection(db, "withdraws"),
        where("data.phoneNumber", "==", phoneNum),
        orderBy("data.time", "desc"),
        limit(12)
      );
      onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          setWithdrawTransactions([]);
        } else {
          let b = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data().data,
          }));
          setWithdrawTransactions(b);
        }
      });
    }
  }, [userProfile]);

 
// get deposit transactions
  useEffect(() => {
    if (Object.keys(userProfile)?.length > 0) {
      let num = userProfile?.phoneNumber.slice(1);
      let phoneNum = `254${num}`;
      const q = query(
        collection(db, "deposits"),
        where("data.phoneNumber", "==", phoneNum),
        orderBy("data.time", "desc"),
        limit(12)
      );
      onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          setDepositTransactions([]);
        } else {
          let b = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data().data,
          }));
          setDepositTransactions(b);
        }
      });
    }
  }, [userProfile]);


//get all transactions
useEffect(() => {
  if (Object.keys(userProfile)?.length > 0) {
    let num = userProfile?.phoneNumber.slice(1);
    let phoneNum = `254${num}`;

    // Fetch both withdraw and deposit transactions
    const withdrawQuery = query(
      collection(db, "withdraws"),
      where("data.phoneNumber", "==", phoneNum),
      orderBy("data.time", "desc"),
      limit(12)
    );

    const depositQuery = query(
      collection(db, "deposits"),
      where("data.phoneNumber", "==", phoneNum),
      orderBy("data.time", "desc"),
      limit(12)
    );

    const unsubscribeWithdraw = onSnapshot(withdrawQuery, (snapshot) => {
      const withdraws = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: "withdraw",
        data: doc.data().data,
      }));
      updateTransactions(withdraws);
    });

    const unsubscribeDeposit = onSnapshot(depositQuery, (snapshot) => {
      const deposits = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: "deposit",
        data: doc.data().data,
      }));
      updateTransactions(deposits);
    });

    const updateTransactions = (newData) => {
      setTransactions((prev) => {
        const merged = [...prev, ...newData];
        return merged.sort((a, b) => b.data.time - a.data.time);
      });
    };

    // Cleanup subscriptions
    return () => {
      unsubscribeWithdraw();
      unsubscribeDeposit();
    };
  }
}, [userProfile]);




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
    sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 0,
        flexDirection: 'column',
     }}
    >
        <Box sx={{ width: isTablet ? '100%' : '80%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Transactions" {...a11yProps(0)} sx={{textTransform: 'none'}} />
            <Tab label="Deposit" {...a11yProps(1)} sx={{textTransform: 'none'}}/>
            <Tab label="Withdrawals" {...a11yProps(2)} sx={{textTransform: 'none'}} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {
            transactions.length === 0 ? (
              <NoTranscations type={'all'}/>
            ):(
              <TransactionGrid transactionList={transactions}/>
            )
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        {
            depositTransactions?.length === 0 ? (
              <NoTranscations type={'deposit'} />
            ):(
              <TransactionGrid transactionList={depositTransactions} />
            )
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {
            withdrawTransactions?.length === 0 ? (
              <NoTranscations type={'withdraw'} />
            ):(
              <TransactionGrid transactionList={withdrawTransactions} />
            )
          }
        </CustomTabPanel>
        </Box>
    </Box>
  );
}
