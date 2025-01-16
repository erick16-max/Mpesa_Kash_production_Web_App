import React from 'react';
import { Chip, Box, Rating, useTheme } from '@mui/material';
import { MdDownload } from "react-icons/md";
import { LIGHT_MODE } from '@/Constants';

export default function CustomDownloadChip({textColor, bgColor}) {
  const theme = useTheme()
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
        color: textColor && theme.palette.mode === LIGHT_MODE ? textColor : '',
        backgroundColor: bgColor  && theme.palette.mode === LIGHT_MODE? bgColor : '',
        fontWeight: 500,
        fontSize: 14,
        borderRadius: 4,
      }}
    />
  );
}
