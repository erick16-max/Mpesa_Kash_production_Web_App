import { Box } from '@mui/material'
import React, { useContext } from 'react'
import OnboardingSteps from './CustomStepper'
import ColorModeContext from '@/theme/ThemeContextProvider'

export default function StepsSection() {
    const {isTablet} = useContext(ColorModeContext)
  return (
    <Box
        width={'100%'}
        py={4}
        px={isTablet ? 2 : 10}
    >
        <OnboardingSteps />
    </Box>
  )
}
