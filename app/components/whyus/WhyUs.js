"use client"
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Rating
} from "@mui/material";
import React, { useContext } from "react";
import { FcTodoList } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import WhyUsImage from "../../../public/images/whyus.svg"
import Image from "next/image";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { LIGHT_MODE } from "@/Constants";
import { useRouter } from "next/navigation";
import AppContext from "@/context/AppContext";
import WhyUsCardGrid from "./WhyUsCardGrid";




const whyUsList = [
  "Deposit and withdrawal are automated and realtime, for both your deriv account and mpesa.",
  "Enjoy a maximum deposit & withdrawal of up to 5000 USD and minimum deposit as little as 2 USD",
  "Our Exchange rates are very reliable, realtime and friendly.",
];

export default function WhyUs() {
  const { isMobile, isTablet, setOpenRegisterModal, isExtraMobile} = useContext(ColorModeContext)
  const {isUser} = useContext(AppContext)

const theme = useTheme()
const router =useRouter()

  return (
    <Box  px={isExtraMobile ? 1 : isMobile ? 2 : 10} py={3}>
            <Card
              variant={'outlined'}
              sx={{
                boxShadow: 0,
                width: '100%',
                p: 3,
                borderRadius: '16px',
              }}
            >
              <Grid container spacing={2} >
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Stack gap={2}>
                    <Typography
                       variant="h4"
                       sx={{
                         color: "text.primary",
                         fontWeight: 500,
                       }}
                       
                    >Fund Your Deriv A/C and Withdraw with ease.</Typography>
                    <Typography gutterBottom>
                      Deposit and Withdraw from Deriv account instantly and in realtime using Mpesa .
                    </Typography>
                   <Box
                    display={'flex'}
                    alignItems={'center'}
                   >
                   <Rating name="size-small" defaultValue={4} size="small" />
                   <Typography variant="body2">
                    <b>4/5</b> rating from over <b>340</b> reviews
                   </Typography>
                   </Box>
                  </Stack>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                  <WhyUsCardGrid />
                </Grid>
                
          </Grid>
            </Card>
    </Box>
  );
}
