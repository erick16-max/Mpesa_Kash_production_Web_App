"use client"
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CustomAppBar from "./components/header/CustomAppBar";
import HeroSection from "./components/hero/HeroSection";
import CustomFloatingButton from "./components/general/CustomFloatingButton";


export default function Home() {
  return (
   <Box
    display={'flex'}
    width={'100vw'}
    flexDirection={'column'}
   >
    <CustomAppBar />
    <Stack
      py={2}
      mt={'140px'}
      gap={2}
    >
      <HeroSection />
    </Stack>
    <CustomFloatingButton />
   </Box>
  );
}
