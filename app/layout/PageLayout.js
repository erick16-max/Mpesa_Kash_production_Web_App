"use client";
import AppContext from "@/context/AppContext";
import {
  Alert,
  Box,
  useMediaQuery,
  Stack,
  useTheme,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import PageLoader from "../components/general/PageLoader";
import CustomAppBar from "../components/header/CustomAppBar";
import ColorModeContext from "@/theme/ThemeContextProvider";

export default function PageLayout({ children }) {
  const { user, isUser } = useContext(AppContext);
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [scroll, setScroll] = useState(false);
  const { userProfile } = useContext(AppContext);
  const { isTablet } = useContext(ColorModeContext);

  if(!isUser && userProfile !==null && user !==null){
    router.push('/')
    return 
  }

  const changeNavBg = () => {
    window.scrollY >= 10 ? setScroll(true) : setScroll(false);
  };



  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);




  if (user === null || userProfile === null) {
    return <PageLoader />;
  }

  // console.log(user)

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"1700px"}
      margin={"auto"}
    >
      <Box width={"100%"}>
        <CustomAppBar scroll={scroll} />
      </Box>
      <Stack mt={"100px"} py={2} px={isTablet ? 2 : 3}>
        {children}
      </Stack>
    </Box>
  );
}
