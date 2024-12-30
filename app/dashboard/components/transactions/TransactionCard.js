import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";
import { Box, Card, Stack, Typography } from "@mui/material";
import { usdFormatter } from "@/util/LogicFunctions";

export default function TransactionCard({ transaction }) {
 
  return (
    <Card
        variant="outlined"
      sx={{
        backgroundColor: "#f5f5f5",
        width: "100%",
        height: 100,
        px: 3,
        py: 2,
        borderRadius: "12px",
        boxShadow: 0,
        display: 'flex',
        justifyContent:'space-between',
        flexDirection: 'column'

      }}
      >
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'} alignItems={'center'} gap={'2px'}>
            <Typography variant="body2" color={'text.primary'} sx={{ '&::first-letter': { textTransform: 'uppercase' } }}>
                {transaction?.data?.type === 'withdraw' ? "withdraw" : "deposit"}
            </Typography>
            {
                transaction?.data?.type === 'withdraw' ? (
                    <FaArrowTrendDown style={{color: 'red', fontSize: 12}} />
                ):(
                    <FaArrowTrendUp style={{color: 'green', fontSize: 12}} />
                )
            }
            
        </Stack>        
        <Stack>
        <Typography variant="body2" color={'text.secondary'} fontSize={11}>
                {transaction?.data?.transactionId}
            </Typography>
        </Stack>
      </Box>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack>
            <Typography variant="body2" color={'text.secondary'} fontSize={11}>
                {transaction?.data?.date || transaction?.data?.data}
            </Typography>
        </Stack>        
        <Stack>
        <Typography variant="body1" color={transaction?.data?.type === 'withdraw' ? "red" : 'green'} fontWeight={500}>
            {
                transaction?.data?.type === 'withdraw' ? "-" : "+"
            }
                {usdFormatter.format(transaction?.data?.amount)}
            </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
