import { Box, Button, Card, CircularProgress, Stack, Typography, Skeleton, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import {  MdAccountBalanceWallet  } from "react-icons/md";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";
import ColorModeContext from '@/theme/ThemeContextProvider';
import AppContext from '@/context/AppContext';
import { usdFormatter } from '@/util/LogicFunctions';
import { MdWavingHand } from "react-icons/md";
import Image from 'next/image';
import HandWavingImage from "../../../public/images/handwaving.png"
import { DARK_MODE } from '@/Constants';


export default function WalletCard() {
    const {isTablet, isMobile} = useContext(ColorModeContext)
    const {userProfile, setIsDepositModelOpen, setIsWithdrawModelOpen, refreshing, setRefreshing} = useContext(AppContext)
    const theme = useTheme()
    const handleRefresh = () =>{
        setRefreshing(true)
    }

    console.log(userProfile)
    return (
    <Box
       component={'div'}
       sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.mode === DARK_MODE ? '#1c1e21' : '#ffffff',
        boxShadow: 0,
        flexDirection: 'column',
        gap: 4,
        py: 2,
       }}
    >
        <Box
            width={isMobile ? '100%' : isTablet ? '100%' : '80%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
        >
              <Stack>
                <Box
                    display={'flex'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={1}
                >
                    <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight={700}>
                        Hi, {userProfile?.user?.fullname}
                    </Typography>
                    {/* <MdWavingHand style={{color: '#4A3228', fontSize: 28}}/> */}
                    <Image 
                        src={HandWavingImage}
                        width={isMobile ? 30 : 40}
                        height={isMobile ? 30 : 40}
                        alt='waving hand'
                        
                    />

                </Box>
                <Typography
                    variant='body2'
                    color={'text.secondary'}
                >
                    Here is your deriv account wallet
                </Typography>
            </Stack>
        </Box>
        <Card
            sx={{
                width:isMobile ? '100%' : isTablet ? '100%' : '80%',
                // maxWidth: 600,
                height: isMobile ? 180 : 220,
                p: 3,
                backgroundColor: theme.palette.mode === DARK_MODE ? 'primary.dark' : 'primary.main',
                justifyContent: 'space-between',
                flexDirection: 'column',
                display: 'flex',
                boxShadow: 2,
                borderRadius: '12px',
            }}
        >
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    gap={2}
                >
                    <Stack>
                        <Typography
                            variant='body1'
                            color={'#eeeeee'}
                            fontWeight={600}
                            component={'div'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: '100%',
                                gap: '2px',
                            }}
                        >
                            Deriv Balance
                            <MdAccountBalanceWallet  fontSize={28}/>
                        </Typography>
                        {
                            refreshing ? (
                                <Skeleton variant="rectangular" width={100} height={26} />
                            ): (

                        <Typography
                            variant='h6'
                            color={'#ffffff'}
                            fontWeight={700}
                        >
                            {usdFormatter.format(userProfile?.balance)}
                        </Typography>
                            )
                        }
                    </Stack>

                    <Button
                        variant='contained'
                        color='primary'
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 400,
                            backgroundColor: theme.palette.mode === DARK_MODE ? 'primary.dark' : 'primary.light',
                        }}
                        endIcon={<BiRefresh style={{display: refreshing ? 'none' : 'block'}}/>}
                        onClick={handleRefresh}
                    >
                       {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>

                </Box>
                <Box
                     display={'flex'}
                     alignItems={'center'}
                     justifyContent={'space-between'}
                     width={'100%'}
                     gap={2}
                >
                    <Typography
                        variant='body2'
                        fontWeight={500}
                        color={'#eeeeee'}
                    >
                       {userProfile?.user?.loginid} - {userProfile?.user?.country}
                    </Typography>
                    <Typography
                         variant='body2'
                         fontWeight={500}
                         color={'#eeeeee'}
                    >
                        Phone: {userProfile?.phoneNumber}
                    </Typography>
                </Box>

        </Card>
        <Box
            width={isTablet ? '100%' : '80%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap = {2}
        >
            <Button
                variant='contained'
                    sx={{
                    width: isMobile ? 140 : 200,
                    height: 50,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: theme.palette.mode === DARK_MODE ? 'primary.dark' : 'primary.main'
                    
                    
                }}
                startIcon={<FaArrowTrendUp />}
                onClick={() => setIsDepositModelOpen(true)}
            >
                Deposit
            </Button>
            <Button
                variant='outlined'
                sx={{
                    width: isMobile ? 140 : 200,
                    height: 50,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    color: theme.palette.mode === DARK_MODE ? 'primary.light' : 'primary.main'
                }}
                startIcon={<FaArrowTrendDown />}
                onClick={() => setIsWithdrawModelOpen(true)}
            >
                Withdraw
            </Button>
        </Box>
    </Box>
  )
}
