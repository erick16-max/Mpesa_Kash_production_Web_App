"use client"
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { MdCopyright } from "react-icons/md";
import FooterGrid from "./FooterGrid";
import ColorModeContext from "@/theme/ThemeContextProvider";
import CopyRight from "./CopyRight";


export default function Footer() {
  const { isTablet, isMobile} = useContext(ColorModeContext)
  const date = new Date()

  return (
    <Stack
        width={'100%'}
        gap={2}

    >
        <Box
            py={5}
            width={'100%'}
            px={isTablet ? 2 : 10}
        >
            <FooterGrid />
        </Box>
        {/* <Box
            width={'100%'}
            height={'1px'}
            bgcolor={'#272829'}
        ></Box> */}

      <Box
        width={"100%"}
        py={1}
       
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
       
      >
        <Stack>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            color={'text.secondary'}
          >
            <MdCopyright fontSize={15} />
            <Typography variant="body2" color={'text.secondary'} fontWeight={400} fontSize={11} mt={"1px"}>
            {date.getFullYear()} ·Deriv Mpesa Kash · All rights reserved
            </Typography>
          </Box>
         
          <CopyRight />
        </Stack>
      </Box>
    </Stack>
  );
}
