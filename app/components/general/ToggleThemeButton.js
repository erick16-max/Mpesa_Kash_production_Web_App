"use client";

import React, { useContext } from "react";
import { Button, useTheme, MenuItem, Menu, Fade, useMediaQuery, IconButton } from "@mui/material";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ColorModeContext from "@/theme/ThemeContextProvider.js";
import { DARK_MODE, LIGHT_MODE } from "@/Constants";



export default function ToggleThemeButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery("(max-width:564px)");

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const {colorMode} = useContext(ColorModeContext);
  const theme = useTheme();

  const handleToggleMode = () => {
    const currentMode = theme.palette.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE
    
    colorMode.setDarkMode();
    handleCloseMenu(); 
  };
  
  const handleToggleLightMode = () => {
    const currentMode = theme.palette.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE
    
    colorMode.setLightMode()
    handleCloseMenu(); 
  };

  const themeText  = theme.palette.mode !== DARK_MODE ? "Light" : "Dark"

  return (
    <>
    {isMobile ? (
      <IconButton onClick={colorMode.toggleColorMode} >
          {
            theme.palette.mode === DARK_MODE ? (
              <MdOutlineDarkMode />
            ) : (
              <MdOutlineLightMode />
            )
          }
      </IconButton>
    ) : (
      <Button
      onClick={handleButtonClick}
      color="secondary"
      startIcon={
        theme.palette.mode === DARK_MODE ? (
          <MdOutlineDarkMode />
        ) : (
          <MdOutlineLightMode />
        )
      }
      endIcon={isMobile ? undefined : <MdOutlineKeyboardArrowDown />}
      sx={{
        borderRadius: "20px",
        height: '40px',
        px: isMobile ? 1 : 3,
        textTransform: "none",
        fontWeight: 600,
        minWidth: 70,
      }}
    >
      {!isMobile ? themeText : ""}
    </Button>
    )}
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}  // ✨ Here is the Fade animation!
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 140,
            mt: 1,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={handleToggleLightMode}>
          <MdOutlineLightMode style={{ marginRight: 8 }} /> Light
        </MenuItem>
        <MenuItem onClick={handleToggleMode}>
          <MdOutlineDarkMode style={{ marginRight: 8 }} /> Dark
        </MenuItem>
      </Menu>
    </>
    
  );
}