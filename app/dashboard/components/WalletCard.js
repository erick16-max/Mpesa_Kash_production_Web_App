import { Box, Button, Card, Stack, Typography } from '@mui/material'
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


export default function WalletCard() {
    const {isTablet, isMobile} = useContext(ColorModeContext)
    const {userProfile} = useContext(AppContext)
  return (
    <Card
       component={'div'}
    //    variant='outlined'
       sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f5f5f5',
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
                    <Typography variant='h6' fontWeight={700}>
                        Hi, {userProfile?.user?.fullname}
                    </Typography>
                    {/* <MdWavingHand style={{color: '#4A3228', fontSize: 28}}/> */}
                    <Image 
                        src={HandWavingImage}
                        width={40}
                        height={40}
                        alt='waving hand'
                        style={{
                            backgroundColor: '#fff'
                        }}
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
                height: 220,
                p: 3,
                backgroundColor: 'primary.main',
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
                            color={'divider'}
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
                        <Typography
                            variant='h6'
                            color={'#ffffff'}
                            fontWeight={700}
                            display={userProfile?.balance ? "block" : "none"}
                        >
                            {usdFormatter.format(userProfile?.balance)}
                        </Typography>
                    </Stack>

                    <Button
                        variant='contained'
                        color='primary'
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 400,
                            backgroundColor: '#1a5962',
                        }}
                        endIcon={<BiRefresh />}
                    >
                        Refresh
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
                        color={'divider'}
                    >
                       {userProfile?.user?.loginid} - {userProfile?.user?.country}
                    </Typography>
                    <Typography
                         variant='body2'
                         fontWeight={500}
                         color={'divider'}
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
                    fontWeight: 600
                }}
                startIcon={<FaArrowTrendUp />}
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
                    fontWeight: 600
                }}
                startIcon={<FaArrowTrendDown />}
            >
                Withdraw
            </Button>
        </Box>
    </Card>
  )
}
