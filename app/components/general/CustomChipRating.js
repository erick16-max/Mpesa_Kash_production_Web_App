import React from 'react';
import { Chip, Box, Rating } from '@mui/material';

export default function CustomChipWithRating() {
  return (
    <Chip
      label={
        <Box display="flex" alignItems="center" gap={0.5}>
          <span>3.8 Ratings</span>
          <Rating
            value={3.8}
            precision={0.1}
            readOnly
            size="small"
          />
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
