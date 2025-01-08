"use client"
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { MdCopyright } from "react-icons/md";
import FooterGrid from "./FooterGrid";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";


export default function Footer() {
  const { isTablet, isMobile} = useContext(ColorModeContext)
  const date = new Date()

  return (
    <Stack
        width={'100%'}
        gap={2}
        bgcolor={'secondary.dark'}

    >
        <Box
            bgcolor={'secondary.dark'}
            py={5}
            width={'100%'}
            px={isTablet ? 2 : 10}
        >
            <FooterGrid />
        </Box>
        <Box
            width={'100%'}
            height={'1px'}
            bgcolor={'#272829'}
        ></Box>

      <Box
        width={"100%"}
        py={1}
        bgcolor={"secondary.dark"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"#f5f5f5"}
      >
        <Stack>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <MdCopyright fontSize={15} />
            <Typography variant="body2" color={'divider'} fontWeight={400} fontSize={11} mt={"1px"}>
            {date.getFullYear()} · Binary Mpesa Services Ltd · All rights reserved
            </Typography>
          </Box>
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
      </Box>
    </Stack>
  );
}
