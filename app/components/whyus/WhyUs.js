import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { FcTodoList } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import WhyUsImage from "../../../public/images/whyus.svg"
import Image from "next/image";
import ColorModeContext from "@/theme/ThemeContextProvider";




const whyUsList = [
  "Deposit and withdrawal are automated and realtime, for both your deriv account and mpesa.",
  "Enjoy a maximum deposit & withdrawal of up to 5000 USD and minimum deposit as little as 2 USD",
  "Our Exchange rates are very reliable, realtime and friendly.",
];

export default function WhyUs() {
  const { isMobile, isTablet} = useContext(ColorModeContext)


  return (
    <Box width={"100%"} bgcolor={"#e6edee"} px={isTablet ? 2 : 10} py={3}>
      <Grid container spacing={isMobile ? 10 : 2} py={3}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Stack>
            <Typography
              variant="h4"
              fontWeight={700}
              color={"text.primary"}
              className="interFont"
              gutterBottom
            >
              Why Choose Binary Mpesa Services?
            </Typography>
            <Stack gap={2} mt={3}>
              {whyUsList.map((item, index) => (
                <Stack
                  direction={"row"}
                  gap={2}
                  alignItems={"center"}
                  key={index}
                >
                  <IconButton
                    sx={{
                      backgroundColor: "#ffffff",
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  >
                    <TiTick />
                  </IconButton>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color={"text.primary"}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
              <Box
                pl={8}
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
                >
                    Get Started
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12} >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
          >
            <Image 
              src={WhyUsImage}
              alt="why us image"
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
