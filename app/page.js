"use client";
import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import CustomAppBar from "./components/header/CustomAppBar";
import HeroSection from "./components/hero/HeroSection";
import CustomFloatingButton from "./components/general/CustomFloatingButton";
import { Suspense, useContext, useEffect, useState } from "react";
import PageLoader from "./components/general/PageLoader";
import OnboardingSteps from "./components/steps/CustomStepper";
import StepsSection from "./components/steps/StepsSection";
import WhyUs from "./components/whyus/WhyUs";
import Partners from "./components/partners/Partners";
import Footer from "./components/footer/Footer";
import AppContext from "@/context/AppContext";
import Disclaimer from "./components/disclaimer/Disclaimer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);
  const {userProfile} = useContext(AppContext)
  const theme = useTheme()

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

  if (loading || userProfile === null) return <PageLoader />;
  return (
    <Suspense fallback={<PageLoader />}>
      <Box display={"flex"} width={"100%"} flexDirection={"column"} height={'100%'} sx={{
        overflowX: 'hidden'
      }}>
        <CustomAppBar scroll={scroll} />
        <Stack pt={0} mt={"100px"} gap={2} component={'div'} width={'100%'}>
          <HeroSection />
          <WhyUs />
          <Disclaimer />
          <Partners /> 
          
          <Footer />
        </Stack>
        <CustomFloatingButton />
      </Box>
    </Suspense>
  );
}
