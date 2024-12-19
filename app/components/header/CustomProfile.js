import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { Button, Divider, Stack, Box, Avatar, Typography, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { BiBell, BiSolidDownArrow } from "react-icons/bi";
import { FiBell } from "react-icons/fi";

export default function CustomProfile() {
  const {isMobile} = useContext(ColorModeContext)
  return (
    <Stack direction={"row"} gap={2} height={"100%"} alignItems={'center'} >
      <IconButton
        sx={{
          width: 40,
          height: 40,
          borderRadius: 25,
        }}
      >
        <FiBell />
      </IconButton>
      <Box height={"60px"} width={"1px"} bgcolor={"divider"}></Box>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        p={'4px'}
        sx={{
            cursor: 'pointer',
            "&:hover": {
                border: '1px solid #b0b0b0',
            }
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 30 : 50,
            height: isMobile ? 30 : 50,
            borderRadius: 25,
            backgroundColor: "#99b5b9",
            display: isMobile ? 'none' : ''
          }}
        >
          E
        </Avatar>
        <Stack
          minWidth={80}
        >
          <Typography variant="body2" color={"text.primary"} fontWeight={500}>
            Erick Gege
          </Typography>
          <Typography
            variant="body2"
            color={"text.secondary"}
            fontWeight={500}
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            USD 0.00
            <BiSolidDownArrow fontSize={10} />
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
