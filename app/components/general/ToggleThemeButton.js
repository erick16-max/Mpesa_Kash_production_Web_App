"use client";

import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Switch, Box } from "@mui/material";
import ColorModeContext from "@/theme/ThemeContextProvider";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 90,
  height: 40,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transition: "0.3s",
    "&.Mui-checked": {
      transform: "translateX(50px)",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "light" ? "#999" : "#eeeeee", // Dark mode = gray, light mode = white/gray
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: theme.palette.mode === "dark" ? "#1c1e21" : "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    color: theme.palette.mode === "dark" ? "#000" : "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#1c1e21",
    opacity: 1,
    position: "relative",
    "&::before": {
      content: '"Light"', // <- Change this text
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 10,
      fontWeight: 600,
      color: theme.palette.mode === "dark" ? "#333" : "#fff", // light mode: white, dark mode: gray
      opacity: 1,
      transition: "0.3s",
    },
    "&::after": {
      content: '"Dark"', // <- Change this text
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 10,
      fontWeight: 600,
      color: theme.palette.mode === "dark" ? "#1c1e21" : "#fff", // dark mode: gray, light mode: white
      opacity: 1,
      transition: "0.3s",
    },
  },
}));

export default function ThemeToggleButton() {
 const {colorMode} = React.useContext(ColorModeContext)
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ThemeSwitch
        checked={isDark}
        onChange={colorMode.toggleColorMode}
        inputProps={{ "aria-label": "theme toggle" }}
      />
    </Box>
  );
}
