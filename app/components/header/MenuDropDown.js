import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, ListItemIcon, Typography } from '@mui/material';
import { LuLogOut, LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/firebase/Firebase';
import { GrTransaction } from "react-icons/gr";
import { CiHome } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";


export default function MenuDropDown({
    anchorEl, setAnchorEl, handleClick
}) {

    const router = useRouter()

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const handleLogout =async() => {
        try {
            await signOutUser()
            router.push('/')
            localStorage.removeItem("user")
            handleClose()

        } catch (error) {
            console.log(error)
        }
    }

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
                     router.push('/')
                     handleClose()
                }}>
                    <ListItemIcon>
                        <GoHome fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Home</Typography>
                </MenuItem>

                <MenuItem onClick={() => {
                    router.push('/dashboard')
                    handleClose()
                }}>
                    <ListItemIcon>
                        <MdOutlineAccountBalanceWallet fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Wallet</Typography>
                </MenuItem>
               
                
                <MenuItem onClick={() => {
                     router.push('/accountsettings')
                     handleClose()
                }}>
                    <ListItemIcon>
                        <IoSettingsOutline fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Settings</Typography>
                </MenuItem>
                <Divider sx={{width: 180}}/>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LuLogOut fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Logout</Typography>
                </MenuItem>
            </Box>
        </Menu>
    );
}