import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import { Button, Divider, Stack, Box, Avatar, Typography, IconButton, Tooltip, Skeleton} from "@mui/material";
import React, { useContext } from "react";
import { BiBell, BiSolidDownArrow } from "react-icons/bi";
import MenuDropDown from "./MenuDropDown";
import { usdFormatter, truncateString } from "@/util/LogicFunctions";
// import ThemeToggleButton from "./ThemeToggleButton";
import { MdOutlineDarkMode } from "react-icons/md";
import NotificationButton from "./NotificationButton";
import ThemeToggleButton from "../general/ToggleThemeButton";





export default function CustomProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user, isUser, isUserProfile, userProfile, refreshing} = useContext(AppContext)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  const {isMobile} = useContext(ColorModeContext)


  const firstLetter = userProfile?.user?.fullname.trim().charAt(0) || "";



  return (
    <Stack direction={"row"} gap={ isMobile ? 1 : 2} height={"100%"} alignItems={'center'} >
      <ThemeToggleButton />
      <NotificationButton />
       
      <Box height={"60px"} width={"1px"} bgcolor={"divider"}></Box>

     <Box>
     <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        p={'4px'}
        sx={{
          cursor: 'pointer',
          borderRadius: '12px',
            "&:hover": {
                border: '1px solid #b0b0b0'
            }
        }}
        onClick={handleClick}
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
          {firstLetter}
        </Avatar>
        <Stack
          minWidth={80}
        >
          <Typography variant="body2" color={"text.primary"} fontWeight={500}>
            {truncateString(userProfile?.user?.fullname, 10)}
          </Typography>
          {
            refreshing ? (
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
                { isUserProfile ? usdFormatter.format(userProfile?.balance) : ""}
                <BiSolidDownArrow fontSize={10} />
              </Typography>
            )
          }
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
