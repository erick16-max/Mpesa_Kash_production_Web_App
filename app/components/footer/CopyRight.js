"use client"
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { FaSquareXTwitter, FaHeart } from "react-icons/fa6";
import Link from "next/link";
import ColorModeContext from "@/theme/ThemeContextProvider";


export default function CopyRight({bgColor}) {
  const { isTablet, isMobile} = useContext(ColorModeContext)
  const date = new Date()

  return (
    <Box
    width={"100%"}
    py={1}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    color={"#f5f5f5"}
  >
    
        <Typography variant="body2" color={bgColor ? '#555555' :'#dedede'} fontWeight={400} fontSize={11} mt={"1px"}>
            Made with <span><FaHeart fontSize={10} color="red"/></span>  by <Link target="__blank" href={'https://gegerick.com'} style={{color: bgColor ? '#555555' :'#dedede', fontWeight: 500}}>gegerick.com</Link>
        </Typography>
         
     
  </Box>
  );
}