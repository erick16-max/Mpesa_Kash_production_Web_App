import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import { Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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
            Support
          </Typography>
          {Boolean(anchorEl) ? (
            <IoMdArrowDropup style={{ marginLeft: 8, color: '#f5f5f5' }} size={16} />
          ) : (
            <IoMdArrowDropdown style={{ marginLeft: 8, color: '#f5f5f5' }} size={16} />
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
        <MenuItem onClick={handleClose}>
          <TbPhoneCall style={{ marginRight: 8 }} />
          Call Us
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IoChatboxEllipsesOutline style={{ marginRight: 8 }} />
          Message Us
        </MenuItem>
      </Menu>
    </>
  );
}
