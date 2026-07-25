import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import {
  Button,
  Divider,
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import React, { useContext } from "react";
import { BiBell, BiSolidDownArrow } from "react-icons/bi";
import MenuDropDown from "./MenuDropDown";
import { usdFormatter, truncateString } from "@/util/LogicFunctions";
// import ThemeToggleButton from "./ThemeToggleButton";
import { MdOutlineDarkMode } from "react-icons/md";
import NotificationButton from "./NotificationButton";
import ThemeToggleButton from "../general/ToggleThemeButton";
import { useNewDerivBalance } from "@/hooks/useGetNewBalance";

export default function CustomProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user,
    isUser,
    isUserProfile,
    userProfile,
    refreshing,
    isBalanceVisible,
  } = useContext(AppContext);

  const { balance, loading, fetchBalance } = useNewDerivBalance();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { isMobile } = useContext(ColorModeContext);

 const firstLetter =
  userProfile?.fullName?.trim()?.charAt(0) ||
  userProfile?.user?.fullname?.trim()?.charAt(0) ||
  "";

  const getDisplayBalance = () => {
    if (!isBalanceVisible) return "********";
    if (loading) return "Loading...";

    // Priority: hook live balance -> profile context balance -> fallback 0.00
    const currentVal = balance !== null ? balance : userProfile?.balance || 0.0;
    return usdFormatter.format(currentVal);
  };

  return (
    <Stack
      direction={"row"}
      gap={isMobile ? 1 : 2}
      height={"100%"}
      alignItems={"center"}
    >
      <ThemeToggleButton />
      <NotificationButton />

      <Box height={"60px"} width={"1px"} bgcolor={"divider"}></Box>

      <Box>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
          p={"4px"}
          sx={{
            cursor: "pointer",
            borderRadius: "12px",
            "&:hover": {
              border: "1px solid #b0b0b0",
            },
          }}
          onClick={handleClick}
        >
          <Avatar
            sx={{
              width: isMobile ? 30 : 50,
              height: isMobile ? 30 : 50,
              borderRadius: 25,
              backgroundColor: "#99b5b9",
              display: isMobile ? "none" : "",
            }}
          >
            {firstLetter}
          </Avatar>
          <Stack minWidth={80}>
            <Typography variant="body2" color={"text.primary"} fontWeight={500}>
              {truncateString(
                userProfile?.fullName || userProfile?.user?.fullname,
                10,
              )}
            </Typography>
            {refreshing ? (
              <Skeleton variant="rectangular" width={100} height={26} />
            ) : (
              <Typography
                variant="body2"
                color={"text.secondary"}
                fontWeight={500}
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {isUserProfile && getDisplayBalance()}
                <BiSolidDownArrow fontSize={10} />
              </Typography>
            )}
          </Stack>
        </Stack>
        <MenuDropDown
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClick={handleClick}
        />
      </Box>
    </Stack>
  );
}
