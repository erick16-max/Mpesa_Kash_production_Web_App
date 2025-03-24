import React, { useState, useEffect, useContext } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";
import ColorModeContext from "@/theme/ThemeContextProvider";

const AnimatedTyping = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
    const isExtraTablet = useMediaQuery("(max-width:1220px)");
      const isExtraMobile = useMediaQuery("(max-width:348px)");
    
  const { isMobile } = useContext(ColorModeContext);

  

  useEffect(() => {
    // Stop typing after a total duration (typeSpeed * characters + delaySpeed * number of words)
    const totalAnimationTime = (100 * 8) + (2000 * 3); // Adjust based on your word lengths and speeds
    const timer = setTimeout(() => setIsTypingComplete(true), totalAnimationTime);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Typography
      variant="h4"
      sx={{
        color: "#014650",
        fontWeight: 700,
        fontSize: isExtraMobile ? 22 : isMobile ? 26 : 44,
        textAlign: isExtraTablet ? 'center' : ''
      }}
      gutterBottom
      textAlign={'center'}
    >
     
     
         <>
          <span style={{ color: "#673ab7" }}>Automated&nbsp;</span>
          <span style={{ color: "#673ab7" }}>Deposit&nbsp;</span>
          <span style={{ color: "#673ab7" }}>Withdraw.</span>
        </> 
    </Typography>
  );
};

export default AnimatedTyping;
