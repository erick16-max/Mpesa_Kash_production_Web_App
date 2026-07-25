import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  Skeleton,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import ColorModeContext from "@/theme/ThemeContextProvider";
import AppContext from "@/context/AppContext";
import { usdFormatter } from "@/util/LogicFunctions";
import Image from "next/image";
import HandWavingImage from "../../../public/images/handwaving.png";
import { DARK_MODE } from "@/Constants";
import { useNewDerivBalance } from "../../../hooks/useGetNewBalance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UpdateNicknameModal from "./UpdateNicknameModal";

export default function WalletCard() {
  const { isTablet, isMobile } = useContext(ColorModeContext);
  const {
    userProfile,
    setIsDepositModelOpen,
    setIsWithdrawModelOpen,
    isBalanceVisible,
    setIsBalanceVisible,
    setUserProfile,
  } = useContext(AppContext);

  const theme = useTheme();
  
  // Custom Hook for balance fetching & Firebase token updating
  const { balance, loading, fetchBalance } = useNewDerivBalance();

  // Boolean state for modal open status
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);

  const handleRefresh = async () => {
    await fetchBalance();
  };

  const getDisplayBalance = () => {
    if (!isBalanceVisible) return "********";
    if (loading) return "Loading...";
    
    // Priority: hook live balance -> profile context balance -> fallback 0.00
    const currentVal = balance !== null ? balance : userProfile?.balance || 0.00;
    return usdFormatter.format(currentVal);
  };

  console.log(userProfile)

  useEffect(() => {
    // Open modal if user hasn't set a nickname yet
    if (userProfile && !userProfile?.nickname) {
      setNicknameModalOpen(true);
    }
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
      {/* Greeting Section */}
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
              Hi, {userProfile?.fullName || userProfile?.user?.fullname || "Client"}
            </Typography>
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

      {/* Main Wallet Balance Card */}
      <Card
        sx={{
          width: isMobile ? "100%" : isTablet ? "100%" : "80%",
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

            {loading ? (
              <Skeleton
                variant="rectangular"
                width={120}
                height={32}
                sx={{ borderRadius: "8px", mt: 1 }}
              />
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
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
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
            {userProfile?.derivId || userProfile?.loginid || userProfile?.user?.loginid}
            {` | ${userProfile?.nickname || "deriv_nickname"}`}
          </Typography>
          <Typography variant="body2" fontWeight={500} color={"#eeeeee"}>
            Phone: {userProfile?.phoneNumber || userProfile?.phone || "N/A"}
          </Typography>
        </Box>
      </Card>

      {/* Action Buttons */}
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

      {/* Nickname Modal */}
      <UpdateNicknameModal
        open={nicknameModalOpen}
        userProfile={userProfile}
        onClose={() => setNicknameModalOpen(false)}
        onUpdated={(nickname) => {
          if (setUserProfile) {
            setUserProfile((prev) => ({ ...prev, nickname }));
          }
          setNicknameModalOpen(false);
        }}
      />
    </Box>
  );
}