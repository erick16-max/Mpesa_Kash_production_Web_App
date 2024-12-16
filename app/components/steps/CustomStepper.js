import React from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';
import { AccountCircle, Link as LinkIcon, AttachMoney } from '@mui/icons-material';

const steps = [
    {
      icon: <LinkIcon sx={{ fontSize: 40, color: '#008ad0' }} />,
      title: 'Step 1: Connect and Authenticate with Deriv',
      description: 'Link your account to the Deriv trading platform account securely.',
    },
  {
    icon: <AccountCircle sx={{ fontSize: 40, color: '#00B67A' }} />,
    title: 'Step 2: Create Account with our Platform',
    description: 'Create an account with our platform using your Deriv details.',
  },
  {
    icon: <AttachMoney sx={{ fontSize: 40, color: '#EDB21F' }} />,
    title: 'Step 3: Deposit, Trade & Withdraw',
    description: 'Add, trade & withdraw funds directly in your deriv account using mpesa',
  },
];

export default function OnboardingSteps() {
  return (
    <Box sx={{ flexGrow: 1}}>
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
              sx={{
                backgroundColor: '#f5f5f5',
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
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#014650' }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
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
