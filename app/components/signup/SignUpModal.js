import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  Stack,
  Card,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { VscClose } from "react-icons/vsc";
import {
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoLogInOutline,
} from "react-icons/io5"; // Using react-icons/io5 for iOS style
import Image from "next/image";
import DerivImage from "../../../public/images/deriv2.png";
import CopyRight from "../footer/CopyRight";
import ColorModeContext from "@/theme/ThemeContextProvider";

const LOADING_STAGES = [
  { icon: <IoLogInOutline size={20} />, label: "Opening Deriv portal…" },
  {
    icon: <IoShieldCheckmarkOutline size={20} />,
    label: "Exchanging secure session…",
  },
  {
    icon: <IoCheckmarkCircleOutline size={20} />,
    label: "Finalizing sync layers…",
  },
];

export default function SignUpModal() {
  const [loading, setLoading] = useState(false);
  const [stageIdx, setStageIdx] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const {
    openRegisterModal: open,
    setOpenRegisterModal: setOpen,
    setOpenSuccessAlert,
    openSuccessAlert,
    setOpenLoginModal,
  } = React.useContext(ColorModeContext);

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setStageIdx(0);
  };

  const connectWithDeriv = async () => {
    setLoading(true);

    // Simulate progression while the browser is redirecting
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < LOADING_STAGES.length - 1) {
        currentStage++;
        setStageIdx(currentStage);
      }
    }, 1000);

    try {
      // 1. Call your backend to get the auth URL
      const response = await fetch(
        "https://kash.instantpesa.co.ke/new_deriv/web/auth-url",
      );
      const data = await response.json();

      // 2. Redirect the user
      window.location.href = data.authUrl;
    } catch (error) {
      console.error("Auth init failed", error);
      setLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <Modal open={open} onClose={!loading ? handleClose : undefined}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "100vw" : 500,
          p: isMobile ? 2 : 0,
          borderRadius: isMobile ? 0 : "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            px: 4,
            py: 3,
            boxShadow: 0,
            borderRadius: "16px",
          }}
        >
          {/* Header */}
          <Box
            display={"flex"}
            mb={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5" fontWeight={700}>
              Sign Up
            </Typography>
            {!loading && (
              <IconButton onClick={handleClose}>
                <VscClose />
              </IconButton>
            )}
          </Box>

          {loading ? (
            <Stack spacing={3} py={4} alignItems="center">
              <CircularProgress color="primary" />
              <Typography variant="body1" fontWeight={600}>
                {LOADING_STAGES[stageIdx].label}
              </Typography>
              <Box width="100%" mt={2}>
                {LOADING_STAGES.map((s, i) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    opacity={i <= stageIdx ? 1 : 0.4}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        color: i <= stageIdx ? "primary.main" : "text.disabled",
                      }}
                    >
                      {s.icon}
                    </Box>
                    <Typography variant="body2">{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          ) : (
            <Stack spacing={3} py={2}>
              <Box textAlign="center">
                <Image
                  src={DerivImage}
                  alt="deriv logo"
                  height={80}
                  width={80}
                  style={{ objectFit: "contain" }}
                />
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                  Connect with Deriv
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Securely link your account to proceed.
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={connectWithDeriv}
                sx={{ height: 54, borderRadius: "16px" }}
              >
                Connect with Deriv
              </Button>

              <Box display="flex" justifyContent="center" gap={1}>
                <Typography variant="body2">
                  Already have an account?
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    setOpen(false);
                    setOpenLoginModal(true);
                  }}
                >
                  Log in here
                </Typography>
              </Box>
            </Stack>
          )}

          {!loading && <CopyRight bgColor={"#ffffff"} />}
        </Card>
      </Box>
    </Modal>
  );
}
