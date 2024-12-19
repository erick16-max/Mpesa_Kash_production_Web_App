import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { MdCopyright } from "react-icons/md";
import FooterGrid from "./FooterGrid";
import ColorModeContext from "@/theme/ThemeContextProvider";

export default function Footer() {
  const { isTablet, isMobile} = useContext(ColorModeContext)

  return (
    <Stack
        width={'100%'}
        gap={2}
        bgcolor={'secondary.dark'}

    >
        <Box
            bgcolor={'secondary.dark'}
            py={3}
            width={'100%'}
            px={isTablet ? 2 : 10}
        >
            <FooterGrid />
        </Box>
        <Box
            width={'100%'}
            height={'1px'}
            bgcolor={'#333435'}
        ></Box>

      <Box
        width={"100%"}
        py={2}
        bgcolor={"secondary.dark"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"#f5f5f5"}
      >
        <MdCopyright fontSize={15} />
        <Typography variant="body2" color={'divider'} fontWeight={400} fontSize={11} mt={"1px"}>
          2024 · Binary Mpesa Services Ltd · All rights reserved
        </Typography>
      </Box>
    </Stack>
  );
}
