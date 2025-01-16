import React, { useContext } from 'react';
import { Chip, Box, Rating, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ColorModeContext from '@/theme/ThemeContextProvider';
import { LIGHT_MODE } from '@/Constants';

export default function CustomChipWithRating({bgColor, textColor}) {
  const {isMobile} = useContext(ColorModeContext)
  const theme = useTheme()

  return (
    <Chip
      label={
        <Box display="flex" alignItems="center" gap={0.5}>
          <span>3.8 Ratings</span>
            {
              isMobile ? (
                  <StarIcon fontSize='14px' sx={{ color: '#edb21f'}}/>
              ) : (
                <Rating
                  name="text-feedback"
                  value={3.7}
                  readOnly
                  precision={0.5}
                  size='small'
              />
              )
            }
        </Box>
      }
      sx={{
        padding: '4px 8px',
        color: textColor && theme?.palette.mode === LIGHT_MODE ? textColor : '',
         backgroundColor: bgColor  && theme.palette.mode === LIGHT_MODE? bgColor : '',
        fontWeight: 500,
        fontSize: 14,
        borderRadius: 4,
      }}
    />
  );
}
