import React from 'react';
import { Chip, Box, Rating } from '@mui/material';
import { MdDownload } from "react-icons/md";

export default function CustomDownloadChip({textColor, bgColor}) {
  return (
    <Chip
      label={
        <Box display="flex" alignItems="center" gap={0.5}>
          <span>51k+ Downloads</span>
          <MdDownload />
        </Box>
      }
      sx={{
        padding: '4px 8px',
        color: textColor ? textColor : '#333',
        backgroundColor: bgColor ? bgColor : '#f5f5f5',
        fontWeight: 500,
        fontSize: 14,
        borderRadius: 4,
      }}
    />
  );
}
