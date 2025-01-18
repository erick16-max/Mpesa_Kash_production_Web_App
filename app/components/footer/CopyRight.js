"use client";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { FaSquareXTwitter, FaHeart } from "react-icons/fa6";
import Link from "next/link";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { MdCopyright } from "react-icons/md";
import { LIGHT_MODE } from "@/Constants";

export default function CopyRight({ bgColor, isFooter }) {
  const { isTablet, isMobile } = useContext(ColorModeContext);
  const date = new Date();
  const theme = useTheme();

  return (
    <Box
      width={"100%"}
      py={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Box
        display={!isFooter ? "none" : "flex"}
        alignItems={"center"}
        color={
          bgColor && theme.palette.mode === LIGHT_MODE
            ? "#555555"
            : bgColor
            ? "#bebebe"
            : "#dedede"
        }
        justifyContent={"center"}
      >
        <MdCopyright fontSize={15} />
        <Typography variant="body2" fontWeight={400} fontSize={11} mt={"1px"}>
          {date.getFullYear()} · Binary Mpesa Services Ltd · All rights reserved
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color={
          bgColor && theme.palette.mode === LIGHT_MODE
            ? "#555555"
            : bgColor
            ? "#bebebe"
            : "#dedede"
        }
        fontWeight={400}
        fontSize={11}
        mt={"1px"}
      >
        Made with{" "}
        <span>
          <FaHeart fontSize={10} color="red" />
        </span>{" "}
        by{" "}
        <Link
          target="__blank"
          href={"https://gegerick.com"}
          style={{
             fontWeight: 500,
             color:
              bgColor && theme.palette.mode === LIGHT_MODE
                ? "#555555"
                : bgColor
                ? "#bebebe"
                : "#dedede"
            }}
        >
          gegerick.com
        </Link>
      </Typography>
    </Box>
  );
}
