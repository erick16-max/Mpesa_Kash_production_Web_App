import React from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';
import { AccountCircle, Link as LinkIcon, AttachMoney } from '@mui/icons-material';
import { FcApprove } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcEnteringHeavenAlive } from "react-icons/fc";

const steps = [
    {
      icon: <FcApprove style={{ fontSize: 60 }} />,
      title: 'Step 1: Connect and Authenticate with Deriv',
      description: 'Link your account to the Deriv trading platform account securely.',
    },
  {
    icon: <FcBusinessman style={{ fontSize: 60}} />,
    title: 'Step 2: Create Account with our Platform',
    description: 'Create an account with our platform using your Deriv details.',
  },
  {
    icon: <FcEnteringHeavenAlive style={{ fontSize: 60}} />,
    title: 'Step 3: Deposit, Trade & Withdraw',
    description: 'Add, trade & withdraw funds directly in your deriv account using mpesa',
  },
];

export default function OnboardingSteps() {
  return (
    <Box sx={{ flexGrow: 1, margin: 'auto'}}>
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Grid
            item
            xs={12} // Full width on extra-small screens
            sm={12} // Full width on small screens
            md={6} // Half width on medium screens
            lg={4} // One-third width on large screens
            key={index}
          >
            <Card
              variant='outlined'
              sx={{
                // backgroundColor: '#f5f5f5',
                padding: 3,
                borderRadius: '16px',
                boxShadow: 0,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box sx={{ marginRight: 2 }}>{step.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {step.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
