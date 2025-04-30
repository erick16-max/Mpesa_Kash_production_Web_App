import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import TransactionCard from './TransactionCard'

export default function TransactionGrid({transactionList}) {
  return (
    <Box
        width={'100%'}
    >
        <Grid container spacing={2}>
            {
                transactionList?.map(transaction => {
                    return(
                        <Grid item xs={12} key={transaction?.id}>
                        <TransactionCard transaction={transaction?.data} />
                        </Grid>
                    )
                })

                
            }
        </Grid>
    </Box>
  )
}
