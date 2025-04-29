"use client";
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

import HeroImageOne from "../../../public/images/hero2.jpg";
import HeroImageTwo from "../../../public/images/hero3.png";
import { DARK_MODE } from "@/Constants";

export default function HeroSection() {
  const { user, setUser, isUser } = useContext(AppContext);
  const isExtraTablet = useMediaQuery("(max-width:1220px)");
  const isExtraMobile = useMediaQuery("(max-width:348px)");
  const { isMobile, setOpenRegisterModal } = useContext(ColorModeContext);

  const router = useRouter();
  const theme = useTheme();

  return (
    <Box px={isExtraMobile ? 1 : isMobile ? 2 : 10}>
      <Grid container spacing={2} height={"100%"}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              boxShadow: 0,
              backgroundColor: "background.paper",
              borderRadius: "16px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack>
                <Typography
                  variant="h4"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                  gutterBottom
                >
                  Automated Deposit & Withdraw
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                  gutterBottom
                >
                  on Deriv and MPESA
                </Typography>
                <Typography
                  variant={"body1"}
                  color={"text.primary"}
                  gutterBottom
                >
                  With our innovative platform, you can easily fund your Deriv
                  account, execute trades using our bots, and withdraw your
                  earnings directly through MPESA. Experience fast, secure, and
                  hassle-free transactions with friendly exchange rates tailored
                  for traders in Kenya!
                </Typography>
              </Stack>

              <Stack
                mt={8}
                direction={isMobile ? "column" : "row"}
                gap={4}
                width={"100%"}
                p={0}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    height: "40px",
                    textTransform: "none",
                    px: 3,
                    fontWeight: 600,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderRadius: "20px",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() =>
                    isUser
                      ? router.push("/dashboard")
                      : setOpenRegisterModal(true)
                  }
                >
                  {isUser ? "Go to Wallet" : "Get Started"}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    height: "40px",
                    textTransform: "none",
                    px: 3,
                    fontWeight: 600,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderRadius: "20px",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                  LinkComponent={Link}
                  target="__blank"
                  href="https://download.dmpesakash.co.ke/"
                >
                  Download App
                  {/* <Image
                  src={PlaystoreImage}
                  alt="google playstore"
                  height={20}
                /> */}
                  <IoCloudDownloadOutline fontSize={20} />
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Card
            // variant="outlined"
            sx={{
              p: 3,
              boxShadow: 0,
              borderRadius: "20px",
              height: "100%",
              minHeight: 340,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme.palette.mode === DARK_MODE
                  ? `linear-gradient(135deg, #1c1e21 0%, #1c1e21 100%)`
                  : `linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)`,
              overflow: "hidden",
            }}
          >
            {/* Optional: Blurred light blob */}
            <Box
              sx={{
                position: "absolute",
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                filter: "blur(80px)",
                top: -30,
                right: -50,
                zIndex: 0,
              }}
            />

            {/* First image */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "2%",
                zIndex: 3,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
                transform: "scale(1.03)",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Image
                src={HeroImageOne}
                height={300}
                alt="Hero Image One"
                style={{
                  display: "block",
                  borderRadius: "12px",
                }}
              />
            </Box>

            {/* Second image */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "35%",
                zIndex: 2,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <Image
                src={HeroImageTwo}
                height={200}
                alt="Hero Image Two"
                style={{
                  display: "block",
                  borderRadius: "12px",
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
