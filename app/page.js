"use client";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CustomAppBar from "./components/header/CustomAppBar";
import HeroSection from "./components/hero/HeroSection";
import CustomFloatingButton from "./components/general/CustomFloatingButton";
import { Suspense, useEffect, useState } from "react";
import PageLoader from "./components/general/PageLoader";
import OnboardingSteps from "./components/steps/CustomStepper";
import StepsSection from "./components/steps/StepsSection";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 10 ? setScroll(true) : setScroll(false);
  };

  useEffect(() => {

   setTimeout(() => {
    setLoading(false);
   }, 1000)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  if (loading) return <PageLoader />;
  return (
    <Suspense fallback={<PageLoader />}>
      <Box display={"flex"} width={"100vw"} flexDirection={"column"} >
        <CustomAppBar scroll={scroll} />
        <Stack py={2} mt={"140px"} gap={2} component={'div'}>
          <HeroSection />
          <StepsSection />
        </Stack>
        <CustomFloatingButton />
      </Box>
    </Suspense>
  );
}
