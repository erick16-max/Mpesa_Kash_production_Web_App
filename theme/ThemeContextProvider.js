"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { deepOrange, amber, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";

const ColorModeContext = React.createContext();

export function CustomThemeProvider({ children }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const isExtraTablet = useMediaQuery("(max-width:1088px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:682px)");

  // login modal 
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false)

  const toggleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          // always to be light mode unless ui update
          prevMode === LIGHT_MODE ? LIGHT_MODE : LIGHT_MODE
        );
      },
    }),
    []
  );

  const theme = createTheme({
    palette: {
      primary: {
        light: "#014650",
        main: "#014650",
        dark: "#014650",
      },
      secondary: {
        main: "#232425",
        dark: "#0e0e0e",
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      text: {
        primary: grey[900],
        secondary: grey[700],
      },
      success: {
        main: "#26c3a6",
      },
      divider: "#eeeeee",
    },
  });

  const themeData = {
    colorMode,
    isExtraTablet,
    isTablet,
    isMobile,
    toggleOpenDrawer,
    openDrawer,
    setOpenDrawer,
    openLoginModal, 
    setOpenLoginModal,
    openRegisterModal, 
    setOpenRegisterModal,
    openForgotPasswordModal, setOpenForgotPasswordModal
  };

  return (
    <SessionProvider>
      <ColorModeContext.Provider value={themeData}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SessionProvider>
  );
}

export default ColorModeContext;
