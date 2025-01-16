"use client";
import { AppBar, Box, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import LogoBrand from "../general/LogoBrand";
import AuthButtons from "./AuthButtons";
import CustomProfile from "./CustomProfile";
import ColorModeContext from "@/theme/ThemeContextProvider";
import LoginModal from "../login/LoginModal";
import SignUpModal from "../signup/SignUpModal";
import ForgotPasswordModal from "../forgotpassword/ForgortPassword";
import AppContext from "@/context/AppContext";
import { DARK_MODE, LIGHT_MODE } from "@/Constants";

export default function CustomAppBar({ scroll }) {
  const { user, setUser, isUser } = useContext(AppContext);
  const { isTablet } = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",

        boxShadow: scroll ? 0 : 0,

        borderBottom:
          scroll && theme.palette.mode === LIGHT_MODE
            ? "1px solid #dedede"
            : scroll && theme.palette.mode === DARK_MODE
            ? "1px solid #353535"
            : "",
      }}
    >
      <Box
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        display={"flex"}
        sx={{
          backgroundColor:
            theme.palette.mode === LIGHT_MODE ? "#ffffff" : "#1c1e21",
          py: 1,
          px: isTablet ? 2 : 10,
        }}
      >
        <LogoBrand />
        {!isUser ? <AuthButtons /> : <CustomProfile />}
      </Box>
      <LoginModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </AppBar>
  );
}
