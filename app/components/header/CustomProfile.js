import { Button, Divider, Stack, Box, Avatar, Typography } from "@mui/material";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function CustomProfile() {
  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          borderRadius: "16px",
          height: 50,
          px: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Deposit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: "16px",
          height: 50,
          px: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Withdraw
      </Button>
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
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#99b5b9",
          }}
        >
          EG
        </Avatar>
        <Stack>
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
