import ColorModeContext from "@/theme/ThemeContextProvider";
import { Box, Button, Divider, Stack } from "@mui/material";
import React, { useContext } from "react";
// import ThemeToggleButton from './ThemeToggleButton'
import ThemeToggleButton from "../general/ToggleThemeButton";
import { CiUser } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountsMenu from "./AccountsMenu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function AuthButtons() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isTablet, isMobile, setOpenLoginModal, setOpenRegisterModal } =
    useContext(ColorModeContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box display="flex" alignItems="center" gap={1} height="100%">
      <ThemeToggleButton />
      <Divider
        sx={{
          backgroundColor: "divider",
          height: "50px",
          width: "1px",
        }}
      />
      <Button
        // variant='contained'
        color="secondary"
        sx={{
          borderRadius: "20px",
          height: '40px',
          px: isMobile ? 1 : 3,
          textTransform: "none",
          fontWeight: 600,
          minWidth: 70,
        }}
        onClick={handleClick}
        startIcon={<CiUser />}
        endIcon={<MdOutlineKeyboardArrowDown />}
      >
        {"Login"}
      </Button>
      {!isMobile && (
        <>
          <Divider
        sx={{
          backgroundColor: "divider",
          height: "50px",
          width: "1px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          height: '40px',
          px: isMobile ? 1 : 3,
          textTransform: "none",
          fontWeight: 600,
          minWidth: 150,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
        
      >
        Download App
      </Button>
        </>
      )}
      <AccountsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        setOpenLogin={setOpenLoginModal}
        setopenRegister={setOpenRegisterModal}
      />
    </Box>
  );
}
