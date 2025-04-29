"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { deepOrange, amber, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { AppContextProvider } from "@/context/AppContext";
import { LIGHT_MODE, DARK_MODE } from "@/Constants";

const ColorModeContext = React.createContext();

export function CustomThemeProvider({ children }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const isExtraTablet = useMediaQuery("(max-width:1088px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:682px)");

  // theme modes
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  const [mode, setMode] = React.useState(prefersLightMode ? LIGHT_MODE : DARK_MODE);

  // login modal
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  const toggleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => prevMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE);
      },
      setLightMode: () => setMode(LIGHT_MODE),
      setDarkMode: () => setMode(DARK_MODE),
    }),
    []
  );


  const theme = createTheme({
    palette: {
      primary: {
        light: "#70bf73",
        main: "#4caf50",
        dark: "#3d8c40",
      },
      secondary: {
        main: "#232425",
        dark: "#1c1d1e",
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

  // choose btween dark and light theme
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === LIGHT_MODE
        ?{
          primary: {
            light: "#70bf73",
            main: "#4caf50",
            dark: "#3d8c40",
          },
          secondary: {
            main: "#232425",
            dark: "#1c1d1e",
          },
          background: {
            default: "#f3f5f8",
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
        }
        :{
          primary: {
            light: "#70bf73",
            main: "#4caf50",
            dark: "#3d8c40",
          },
          secondary: {
            main: '#eeeeee'
          },
          background: {
            default: '#1c1e21',
            paper: '#1c1e21',
          },
          text: {
            primary: grey[200],
            secondary: grey[400],
          },
          success: {
            main: '#26c3a6',
          },
          divider: '#242526',
        }),
    },
  });

   // Update the theme only if the mode changes
   const customTheme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
    openForgotPasswordModal,
    setOpenForgotPasswordModal,
  };

  return (
    <AppContextProvider>
      <ColorModeContext.Provider value={themeData}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        `
      </ColorModeContext.Provider>
    </AppContextProvider>
  );
}

export default ColorModeContext;
