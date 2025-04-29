import { Grid, Stack, Typography, Button, Box, IconButton } from "@mui/material";
import React, { useContext } from "react";
import PlaystoreImage from "../../../public/images/playstore.png";
import Image from "next/image";
import CustomDownloadChip from "../general/CustomDownloadChip";
import CustomChipWithRating from "../general/CustomChipRating";
import ColorModeContext from "@/theme/ThemeContextProvider";
import Link from "next/link";
import LogoBrand from "../general/LogoBrand";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export default function FooterGrid() {
  const { isTablet, isMobile } = useContext(ColorModeContext);
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack
          gap={8}
          direction={isMobile ? "column" : "row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Stack gap={2}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight={700}
              className="interFont"
              gutterBottom
              textAlign={isMobile ? "center" : ""}
            >
              Try our Mobile App
            </Typography>
            <Stack gap={2} direction={"row"}>
              <Button
                variant="contained"
                sx={{
                  height: '40px',
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  width: 220,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "20px",
                  backgroundColor: "primary.light",
                  boxShadow: 0,
                }}
                LinkComponent={Link}
                target="__blank"
                href="https://download.dmpesakash.co.ke/"
              >
                Download App
               
              </Button>
            </Stack>
          </Stack>

          <Stack

          >
            <LogoBrand display={true}/>
            <Box
             display={"flex"}
             alignItems={"center"}
             justifyContent={"center"}
          >
              <IconButton>
                  <FaSquareFacebook style={{fontSize: 20, color: '#dedede'}}/>
              </IconButton>
              <IconButton>
                  <FaInstagramSquare style={{fontSize: 20, color: '#dedede'}}/>
              </IconButton>
              <IconButton>
                  <AiFillTikTok style={{fontSize: 20, color: '#dedede'}}/>
              </IconButton>
          </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
