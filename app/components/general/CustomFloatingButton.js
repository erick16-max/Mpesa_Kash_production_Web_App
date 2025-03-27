import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import { Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { FcCallback } from "react-icons/fc";

export default function CustomFloatingButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Call or Message us" arrow>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            width: 120,
            height: 48,
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="button" sx={{ textTransform: 'none' }}>
            Contact Us
          </Typography>
          {Boolean(anchorEl) ? (
            <IoMdArrowDropup style={{ marginLeft: 8}} size={16} />
          ) : (
            <IoMdArrowDropdown style={{ marginLeft: 8}} size={16} />
          )}
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={handleClose}
          component="a"
          href="tel:+254704393007" // Replace with the actual phone number
        >
          <FcCallback style={{ marginRight: 8 }} />
          Call Us
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="https://wa.me/254704393007" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp style={{ marginRight: 8, color: "green" }} />
          WhatsApp Us
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="sms:+254704393007" 
        >
          <FcSms style={{ marginRight: 8 }} />
          Message Us
        </MenuItem>
      </Menu>
    </>
  );
}
