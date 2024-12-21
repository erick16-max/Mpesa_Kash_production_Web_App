import { Grid, Stack, Typography, Button } from '@mui/material'
import React, { useContext } from 'react'
import PlaystoreImage from "../../../public/images/playstore.png";
import Image from 'next/image';
import CustomDownloadChip from '../general/CustomDownloadChip';
import CustomChipWithRating from '../general/CustomChipRating';
import ColorModeContext from '@/theme/ThemeContextProvider';
import Link from 'next/link';

export default function FooterGrid() {
  const { isTablet, isMobile} = useContext(ColorModeContext)
  return (
    <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack gap={8} direction={isMobile ? 'column' : 'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
               <Stack gap={2}>
               <Typography
                     variant={isMobile ? "h5" : "h4"}
                     fontWeight={700}
                     color={"#f5f5f5"}
                     className="interFont"
                     gutterBottom
                     textAlign={isMobile ? 'center' : ''}
                >
                    Try our Mobile App
                </Typography>
                <Stack
                gap={2}
                direction={'row'}
              >
                <CustomDownloadChip 
                    textColor={'#242423'}
                />
                <CustomChipWithRating
                    textColor={'#242423'}

                />
              </Stack>
               </Stack>

                <Button
                variant="contained"
                sx={{
                  height: 50,
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  width: 220,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "16px",
                  backgroundColor: 'primary.light',
                  boxShadow: 0,
                  ml: 2,
                }}
                 LinkComponent={Link}
                href="https://play.google.com/store/apps/details?id=com.binary.mpesaservices"
              >
                Download App
                <Image
                  src={PlaystoreImage}
                  alt="google playstore"
                  height={20}
                />
              </Button>
              
            </Stack>
        </Grid>
    
    </Grid>
  )
}
