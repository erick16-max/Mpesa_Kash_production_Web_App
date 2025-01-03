import React, { useContext } from 'react'
import { Avatar, Button, Card, Stack, Typography} from '@mui/material'
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import AppContext from '@/context/AppContext';
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import ColorModeContext from '@/theme/ThemeContextProvider';
import Link from 'next/link';
import { signOutUser } from '@/firebase/Firebase';
import { useRouter } from 'next/navigation';



export default function AccountCard() {
    const {userProfile} = useContext(AppContext)
    const {isMobile} = useContext(ColorModeContext)

    const router = useRouter()

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
    <Card
        variant="outlined"
        sx={{
            p: 3,
            backgroundColor: '#ffffff',
            width: isMobile ? '100%' : '80%',
            my: 3
        }}
    >
        <Stack spacing={3}>
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Avatar
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        color: 'primary.light',
                        backgroundColor: '#ffffff'
                    }}
                ><FaUserCircle fontSize={40}/></Avatar>
                <Typography variant='body2' color={'text.secondary'} fontWeight={500}>{userProfile?.fullname}</Typography>
                <Typography variant='body2' color={'text.secondary'} fontWeight={500}>{userProfile?.email}</Typography>
                <Typography variant='body2' color={'text.secondary'} fontWeight={500}>{userProfile?.phoneNumber}</Typography>
                <Typography variant='body2' color={'text.secondary'} fontWeight={500}>{userProfile?.user?.loginid}</Typography>
            </Stack>
            <Button
                variant='contained'
                sx={{
                    height: 55,
                    borderRadius: '12px',
                    textTranform: 'none',
                    fontWeight: 600,

                }}
                endIcon={<RiLockPasswordLine />}
            >
                Change Password
            </Button>
            <Button
                 variant='contained'
                 sx={{
                     height: 55,
                     borderRadius: '12px',
                     textTranform: 'none',
                     fontWeight: 600,
 
                 }}
                 endIcon={<MdOutlinePhoneAndroid />}
            >
                Change Phone Number
            </Button>
            <Button
                variant='contained'
                color='error'
                sx={{
                    height: 55,
                    borderRadius: '12px',
                    textTranform: 'none',
                    fontWeight: 600,
                    color: 'error',
                    boxShadow: 1,


                }}
                onClick={handleLogout}
            >
                LogOut
            </Button>
            <Button
                variant='contained'
                color='error'
                sx={{
                    height: 55,
                    borderRadius: '12px',
                    textTranform: 'none',
                    fontWeight: 600,
                    boxShadow: 1,

                }}
                LinkComponent={Link}
                href='https://accounts.binarympesaservices.com'
                target='__blank'
            >
                Delete Account
            </Button>
            
        </Stack>

    </Card>
  )
}
