import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
  Skeleton,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import ColorModeContext from "@/theme/ThemeContextProvider";
import AppContext from "@/context/AppContext";
import { usdFormatter } from "@/util/LogicFunctions";
import { MdWavingHand } from "react-icons/md";
import Image from "next/image";
import HandWavingImage from "../../../public/images/handwaving.png";
import { DARK_MODE } from "@/Constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNewDerivBalance } from "@/hooks/useGetNewBalance";
import UpdateNicknameModal from "./UpdateNicknameModal";
import { useDerivBalance } from "@/hooks/useGetBalance";

export default function WalletCard() {
  const { isTablet, isMobile } = useContext(ColorModeContext);
  const {
    userProfile,
    setIsDepositModelOpen,
    setIsWithdrawModelOpen,
    isBalanceVisible,
    setIsBalanceVisible,
  } = useContext(AppContext);
  const theme = useTheme();

  const [nicknameModalOpen, setNicknameModalOpen] = useState(
    userProfile?.nickname,
  );

  const {refreshBalance, refreshing, balance} = useDerivBalance()

  console.log('user profile', userProfile)



  const handleRefresh = async () => {
    await refreshBalance();
  };

  const getDisplayBalance = () => {
    if (!isBalanceVisible) return "********";
    if (refreshing) return "Loading...";
    // Use hook balance if available, otherwise fallback to profile
    return usdFormatter.format(
      balance !== null ? balance : userProfile?.balance || 0.0,
    );
  };

  useEffect(() => {
    setNicknameModalOpen(!userProfile?.nickname);
  }, [userProfile]);


  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          theme.palette.mode === DARK_MODE ? "#1c1e21" : "#ffffff",
        boxShadow: 0,
        flexDirection: "column",
        gap: 4,
        py: 2,
      }}
    >
      <Box
        width={isMobile ? "100%" : isTablet ? "100%" : "80%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Stack>
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={1}
          >
            <Typography variant={isMobile ? "body1" : "h6"} fontWeight={700}>
              Hi, {userProfile?.fullName || userProfile?.user?.fullname}
            </Typography>
            {/* <MdWavingHand style={{color: '#4A3228', fontSize: 28}}/> */}
            <Image
              src={HandWavingImage}
              width={isMobile ? 30 : 40}
              height={isMobile ? 30 : 40}
              alt="waving hand"
            />
          </Box>
          <Typography variant="body2" color={"text.secondary"}>
            Here is your deriv account wallet
          </Typography>
        </Stack>
      </Box>
      <Card
        sx={{
          width: isMobile ? "100%" : isTablet ? "100%" : "80%",
          // maxWidth: 600,
          height: isMobile ? 180 : 220,
          p: 3,
          backgroundColor:
            theme.palette.mode === DARK_MODE ? "primary.dark" : "primary.main",
          justifyContent: "space-between",
          flexDirection: "column",
          display: "flex",
          boxShadow: 2,
          borderRadius: "12px",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={2}
        >
          <Stack>
            <Typography
              variant="body1"
              color={"#eeeeee"}
              fontWeight={600}
              component={"div"}
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              Deriv Balance
              <MdAccountBalanceWallet fontSize={20} />
              {/* Toggle Visibility Button */}
              <IconButton
                size="small"
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                sx={{ color: "#fff", ml: 1 }}
              >
                {isBalanceVisible ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </Typography>

            {refreshing ? (
              <Skeleton variant="rectangular" width={100} height={26} />
            ) : (
              <Typography variant="h6" color={"#ffffff"} fontWeight={700}>
                {getDisplayBalance()}
              </Typography>
            )}
          </Stack>

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              backgroundColor:
                theme.palette.mode === DARK_MODE
                  ? "primary.dark"
                  : "primary.light",
            }}
            endIcon={<BiRefresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={2}
        >
          <Typography variant="body2" fontWeight={500} color={"#eeeeee"}>
            {`${userProfile?.nickname || 'deriv_nickname'}`}
          </Typography>
          <Typography variant="body2" fontWeight={500} color={"#eeeeee"}>
            Phone: {userProfile?.phoneNumber}
          </Typography>
        </Box>
      </Card>
      <Box
        width={isTablet ? "100%" : "80%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Button
          variant="contained"
          sx={{
            width: isMobile ? 140 : 200,
            height: 50,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor:
              theme.palette.mode === DARK_MODE
                ? "primary.dark"
                : "primary.main",
          }}
          startIcon={<FaArrowTrendUp />}
          onClick={() => setIsDepositModelOpen(true)}
        >
          Deposit
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: isMobile ? 140 : 200,
            height: 50,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            color:
              theme.palette.mode === DARK_MODE
                ? "primary.light"
                : "primary.main",
          }}
          startIcon={<FaArrowTrendDown />}
          onClick={() => setIsWithdrawModelOpen(true)}
        >
          Withdraw
        </Button>
      </Box>
      {/* <UpdateNicknameModal
        open={nicknameModalOpen}
        userProfile={userProfile}
        onClose={() => setNicknameModalOpen(false)}
        onUpdated={(nickname) => {
          userProfile.nickname = nickname; // or preferably update your context state
        }}
      /> */}
    </Box>
  );
}
