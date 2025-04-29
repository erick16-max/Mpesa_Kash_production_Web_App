import { Box, Grid, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import { LiaFireAltSolid } from "react-icons/lia";
import { MdAccessTime } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsBarChartLine } from "react-icons/bs";



export default function WhyUsCardGrid() {
    const whyUsData = [
        {
            title: "Instant & Realtime Transacting",
            icon: <LiaFireAltSolid fontSize={24}/>,
            info: "Deposit and withdraw from your Deriv account using mpesa instantly.",
        },
        {
            title: "Available Anytime, Anyday",
            icon: <MdAccessTime fontSize={24}/>,
            info: "Both our website and mobile application are available 24 hours in a week.",
        },
        {
            title: "Trustworthy and Secure",
            icon: <RiSecurePaymentLine fontSize={24}/>,
            info: "Deriv Mpesa Kash is a trusted partner that make sure clients get their funds accordingly",
        },
        {
            title: "Low rates",
            icon: <BsBarChartLine fontSize={24}/>,
            info: "Our rates are as low, friendly and you can transact minimum is 2 USD",
        },
    ]
  return (
    <Grid container spacing={4}>
        {
            whyUsData.map((item, index) => {
                return(

                    <Grid item lg={6} md={12} sm={12} xs={12} key={index}>
                        <Stack>
                        <Box
                            display="flex"
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            gap={1}
                        >
                            <Box
                            sx={{
                                backgroundColor: "divider",
                                borderRadius: "16px",
                                color: "primary.dark",
                                height: '50px',
                                width: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                            {item.icon}
                            </Box>
                            <Typography variant="h6" color={"text.primary"} fontWeight={600}>
                            {item.title}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color={'text.primary'} >
                           {item.info}
                        </Typography>
                        </Stack>
                    </Grid>
                )
            })
        }
    </Grid>
  );
}
