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
    <Box width={"100%"} px={isExtraMobile ? 1 : isMobile ? 2 : 10} py={3}>
        <Grid container spacing={isMobile ? 10 : 2} py={3}>
            <Card
              variant={'outlined'}
              sx={{
                boxShadow: 0,
                width: '100%',
                p: 3,
              }}
            >
                
            </Card>
          </Grid>
    </Box>
  );
}
