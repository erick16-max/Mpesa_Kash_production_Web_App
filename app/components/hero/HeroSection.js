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

export default function HeroSection() {
  const [user, setUser] = useState(false);
  const isExtraTablet = useMediaQuery("(max-width:1220px)");
  const isExtraMobile = useMediaQuery("(max-width:348px)");
  const { isMobile } = useContext(ColorModeContext);

  return (
    <Box px={isExtraMobile ? 1 : isMobile ? 2 : 10}>
      <Grid container spacing={2}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Stack>
              <AnimatedTypography />
              <Typography
                variant="h4"
                textAlign={isExtraTablet ? "center" : ""}
                sx={{
                  color: "#014650",
                  fontWeight: 700,
                  fontSize: isExtraMobile ? 22 : isMobile ? 26 : 44,
                  height: 50,
                }}
                gutterBottom
              >
                On Deriv with MPESA
              </Typography>
            </Stack>
            <Typography
              textAlign={isExtraTablet ? "center" : ""}
              variant={isMobile ? "body2" : "body1"}
              color={"text.primary"}
              gutterBottom
            >
              With our innovative platform, you can easily fund your Deriv
              account, execute trades using our bots, and withdraw your earnings
              directly through MPESA. Experience fast, secure, and hassle-free
              transactions with friendly exchange rates tailored for traders in
              Kenya!
            </Typography>
            <Stack
              display={"flex"}
              width={"100%"}
              direction={"row"}
              justifyContent={isExtraTablet ? "center" : "flex-start"}
              py={1}
              gap={2}
            >
              <CustomDownloadChip />
              <CustomChipWithRating />
            </Stack>
            <Stack
              mt={8}
              direction={isMobile ? "column" : "row"}
              gap={4}
              justifyContent={isExtraTablet ? "center" : "flex-start"}
              width={"100%"}
              alignItems={"center"}
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
                {user ? "Go to Wallet" : "Get Started"}
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
              >
                Download App
                <Image
                  src={PlaystoreImage}
                  alt="google playstore"
                  height={20}
                />
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Box
            width={"100%"}
            justifyContent={"center"}
            alignItems="center"
            display={"flex"}
          >
            <Box
              height={400}
              borderRadius="16px"
              sx={{
                // boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 360,
                mt: isExtraTablet ? 8 : 0,
              }}
            >
              <Image
                src={HeroImage}
                alt="hero image"
                height={400}
                style={{
                  borderRadius: "16px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
