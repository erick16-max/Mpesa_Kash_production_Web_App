import React, { useContext } from 'react';
import { Chip, Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ColorModeContext from '@/theme/ThemeContextProvider';

export default function CustomChipWithRating() {
  const {isMobile} = useContext(ColorModeContext)

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
        backgroundColor: '#f5f5f5',
        color: '#333',
        fontWeight: 500,
        fontSize: 14,
        borderRadius: 4,
      }}
    />
  );
}
