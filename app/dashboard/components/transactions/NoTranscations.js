import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NoDataImage from "../../../../public/images/nodata.svg";

export default function NoTranscations({ type }) {
  return (
    <Box
      width={"100%"}
      minHeight={200}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Image src={NoDataImage} alt="no data" width={100} height={100} />
      {type === "deposit" ? (
        <Typography variant="body1" color={"text.secondary"}>
            No Deposit Transactions, start depositing!
        </Typography>
      ) : type === "withdraw" ? (
        <Typography variant="body1" color={"text.secondary"}>
          No WithrawTransactions, start withdrawing!
        </Typography>
      ) : (
        <Typography variant="body1" color={"text.secondary"}>
          No Transactions, start depositing or withdrawing!
        </Typography>
      )}
    </Box>
  );
}
