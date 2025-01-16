import {
  Tooltip,
  IconButton,
  Badge,
  Menu,
  Box,
  Typography,
  Stack,
  Card,
  Alert,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import ColorModeContext from "@/theme/ThemeContextProvider";
import AppContext from "@/context/AppContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase.config";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import moment from "moment";

export default function NotificationButton() {
  const { isMobile } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { notification, setNotification, userProfile } = useContext(AppContext);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (
      Object.keys(userProfile)?.length > 0 &&
      Object.keys(notification)?.length
    ) {
      const docRef = doc(
        db,
        "notifications",
        `254${userProfile?.phoneNumber?.slice(1)}`
      );
      await updateDoc(docRef, {
        read: true,
      });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", auth?.currentUser?.uid),
      (data) => {
        onSnapshot(
          doc(db, "notifications", `254${data?.data()?.phoneNumber?.slice(1)}`),
          async (info) => {
            if (info.exists()) {
              setNotification({
                id: info?.id,
                time: info?.data()?.time,
                message: info?.data()?.message,
                read: info?.data()?.read,
              });
            } else {
              setNotification({});
            }
          }
        );
      }
    );
    return unsub;
  }, []);

  return (
    <Box>
      <IconButton
        sx={{
          borderRadius: 1,
        }}
        onClick={handleClick}
      >
        <Tooltip title="notification">
          <Badge
            badgeContent={
              Object.keys(notification).length > 0 && !notification?.read
                ? 1
                : 0
            }
            color="error"
          >
            <FiBell />
          </Badge>
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box width={240} p={2} minHeight={100} borderRadius={"12px"}>
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"space-between"}
            gap={1}
            alignItems="center"
          >
            <Typography
              variant="body2"
              color={"primary"}
              fontWeight={500}
              gutterBottom
            >
              Notification
            </Typography>
            <Typography
              variant="body2"
              color={"text.secondary"}
              fontSize={12}
              fontWeight={400}
              gutterBottom
            >
              {notification?.time &&
                moment(
                  new Date(notification?.time?.toDate()).toUTCString()
                ).fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            mt={"2px"}
            color={"text.primary"}
            fontWeight={400}
          >
            {notification?.message}
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
}
