import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, ListItemIcon, Typography } from '@mui/material';
import { LuLogIn, LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { GrTransaction } from "react-icons/gr";
import { CiHome } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TiUserAddOutline } from "react-icons/ti";


export default function AccountsMenu({
    anchorEl, setAnchorEl, handleClick, setOpenLogin, setopenRegister
}) {

    const router = useRouter()

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

  

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <Box width={200}>
                
               
                
                <MenuItem onClick={() => {
                    setOpenLogin(true)
                     handleClose()
                }}>
                    <ListItemIcon>
                        <LuLogIn fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Login</Typography>
                </MenuItem>
                <Divider sx={{width: 180}}/>
                <MenuItem onClick={() => {
                    setopenRegister(true)
                     handleClose()
                }}>
                    <ListItemIcon>
                        <TiUserAddOutline fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Register Account</Typography>
                </MenuItem>
            </Box>
        </Menu>
    );
}