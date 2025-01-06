'use client'; // For Next.js client-side components
import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'; 
import { Box, Button, Typography, Modal } from '@mui/material'; 
import { db, auth } from '@/firebase.config';
import AppContext from '@/context/AppContext';

export default function useGetBalance() {
  const [user, setUser] = useState(null);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(() => () => {});
  const {setUserProfile, refreshing, setRefreshing} = useContext(AppContext)
  


  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'users', auth?.currentUser?.uid),
      (snapshot) => {
        setUserProfile(snapshot?.data());

        const app_id = 66601;
        const ws = new WebSocket(
          `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
        );

        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              authorize: snapshot?.data()?.appAuthToken || 'sjkakkakska',
            })
          );

          setInterval(() => {
            ws.send(JSON.stringify({ ping: 1 }));
          }, 30000);
        };

        ws.onmessage = async (msg) => {
          const data = JSON.parse(msg?.data);
          if (data?.error) {
            if (
              data?.error?.message === 'The token is invalid.' ||
              data?.error?.message === 'Token is not valid for current app ID.'
            ) {
              setRefreshing(false);
              setAlertMessage(
                'Your Deriv token has expired. You will need to re-login again with your Deriv account.'
              );
              setAlertAction(() => () => {
                const url = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}`;
                window.open(url, '_blank');
              });
              setShowAlert(true);
            }else{
                setShowAlert(false)
            }
          } else if (data?.msg_type === 'authorize') {
            ws.send(JSON.stringify({ balance: 1, subscribe: 1 }));
          } else if (data?.msg_type === 'balance') {
            const docRef = doc(db, 'users', auth?.currentUser?.uid);
            console.log(data?.balance?.balance)
            await updateDoc(docRef, {
              balance: data?.balance?.balance,
            });
            setRefreshing(false);
          }
        };
      }
    );
    return unsub;
  }, [refreshing]);

 

  const onRefresh = () => {
    setRefreshing(true);
  };

 

  return (
    <>
      <Modal open={showAlert} >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Alert
          </Typography>
          <Typography sx={{ mt: 2 }}>{alertMessage}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              
              alertAction();
            }}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </>
  );
}
