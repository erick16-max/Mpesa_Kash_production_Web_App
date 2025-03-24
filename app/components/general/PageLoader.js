import React from "react";
import { Paper } from "@mui/material";

export default function PageLoader() {
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        
      </div>
    </Paper>
  );
}
