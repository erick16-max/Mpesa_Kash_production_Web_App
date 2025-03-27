"use client"
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Image from "next/image";
import HeroImage from "../../../public/images/HeroImage3.png";
import PlaystoreImage from "../../../public/images/playstore.png";
import AnimatedTypography from "./AnimatedTypography";
import ColorModeContext from "@/theme/ThemeContextProvider";
import CustomChipWithRating from "../general/CustomChipRating";
import CustomDownloadChip from "../general/CustomDownloadChip";
import Link from "next/link";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@emotion/react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PiAndroidLogoBold } from "react-icons/pi";


export default function HeroSection() {
  const {user, setUser, isUser} = useContext(AppContext);
  const isExtraTablet = useMediaQuery("(max-width:1220px)");
  const isExtraMobile = useMediaQuery("(max-width:348px)");
  const { isMobile, setOpenRegisterModal} = useContext(ColorModeContext);

  const router = useRouter()
  const theme = useTheme()

  return (
    <Box px={isExtraMobile ? 1 : isMobile ? 2 : 10} >
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Stack>
              <AnimatedTypography />
              <Typography
                variant="h4"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  fontSize: isExtraMobile ? 22 : isMobile ? 26 : 44,
                }}
                gutterBottom
                textAlign={'center'}
              >
                on Deriv and MPESA
              </Typography>
            </Stack>
            <Typography
              textAlign={"center"}
              variant={isMobile ? "body2" : "body1"}
              color={"text.primary"}
              gutterBottom
              
            >
              With our innovative platform, you can easily fund your Deriv
              account, execute trades using our bots, and withdraw your earnings directly
              through MPESA. Experience fast, secure, and hassle-free
              transactions with friendly exchange rates tailored for traders in Kenya!
            </Typography>
                
            <Stack
              mt={8}
              direction={isMobile ? "column" : "row"}
              gap={4}
              justifyContent={"center"}
              width={'100%'}
              alignItems={'center'}

            >
              <Button
                variant="contained"
                sx={{
                  height: 50,
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  width: 220,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "16px",
                }}
                onClick={() => isUser ? router.push('/dashboard') : setOpenRegisterModal(true)}
              >
                {isUser ? "Go to Wallet" : "Get Started"}
              </Button>
              
              <Button
                variant="outlined"
                sx={{
                  height: 50,
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  width: 220,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "16px",
                }}
                LinkComponent={Link}
                target="__blank"
                href="https://download.dmpesakash.co.ke/"
              >
                Try Our Android App
                {/* <Image
                  src={PlaystoreImage}
                  alt="google playstore"
                  height={20}
                /> */}
                <IoCloudDownloadOutline fontSize={20}/>
              </Button>

            </Stack>
          </Stack>
        </Grid>
        
      </Grid>
    </Box>
  );
}
