import ColorModeContext from "@/theme/ThemeContextProvider";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import NotifyImage from "../../../public/images/notify.svg";

export default function Disclaimer() {
  const { isMobile, isTablet, setOpenRegisterModal, isExtraMobile } =
    useContext(ColorModeContext);
  return (
    <Box px={isExtraMobile ? 1 : isMobile ? 2 : 10} py={3}>
      <Grid container spacing={4} direction={!isMobile ? 'row' : 'column-reverse'}>
        <Grid item lg={6} alignItems={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
          <Image src={NotifyImage} height={250} alt="disclaimer" />
        </Grid>
        <Grid item lg={6}>
          <Stack gap={1}>
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontWeight: 600,
              }}
              gutterBottom
            >
              Disclaimer
            </Typography>
            <Typography>
              Deriv offers complex derivatives, such as options and contracts
              for difference (“CFDs”). These products may not be suitable for
              all clients, and trading them puts you at risk. Please make sure
              that you understand the following risks before trading Deriv
              products:
            </Typography>
            <Typography>
              1. You may lose some or all of the money you invest in the trade.
            </Typography>
            <Typography>
              2. if your trade involves currency conversion, exchange rates will
              affect your profit and loss. You should never trade with borrowed
              money or with money that you cannot afford to lose.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
