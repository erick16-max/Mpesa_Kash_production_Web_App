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
                    router.push('/dashboard')
                    handleClose()
                }}>
                    <ListItemIcon>
                        <LuLayoutDashboard fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Dashboard</Typography>
                </MenuItem>
               
                {/* <MenuItem onClick={() => {
                     router.push('/transactions')
                     handleClose()
                }}>
                    <ListItemIcon>
                        <GrTransaction fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Transactions</Typography>
                </MenuItem> */}
                <MenuItem onClick={() => {
                     router.push('/accountsettings')
                     handleClose()
                }}>
                    <ListItemIcon>
                        <IoSettingsOutline fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Account Settings</Typography>
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