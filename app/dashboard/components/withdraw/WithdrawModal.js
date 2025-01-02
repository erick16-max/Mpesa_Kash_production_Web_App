import React, { useContext, useState } from "react";
import { Box, IconButton, Modal, Slide, Typography } from "@mui/material";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import WithdrawForm from "./WithdrawForm";
import VerifyCodeModal from "@/app/finishaccount/VerifyCodeModal";
import VerifyWithdrawModal from "./VerifyModal";

export default function WithdrawModal({ withdrawRate, rates }) {
  const { isWithdrawModelOpen, setIsWithdrawModelOpen, userProfile } =
    useContext(AppContext);
  const [isVerifyModelOpen, setIsVerifyModelOpen] = useState(false);
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState();
  

  const { isMobile } = useContext(ColorModeContext);

  // verify code
  const makeWithdraw = (e) => {
    e.preventDefault();
    setShow(!show);
    const app_id = 66601;

    const ws = new WebSocket(
      "wss://ws.derivws.com/websockets/v3?app_id=" + app_id
    );

    ws.onopen = () => {
      ws.send(JSON.stringify({ authorize: userProfile?.appAuthToken }));
    };

    ws.onmessage = async (msg) => {
      const data = JSON.parse(msg?.data);
      if (data?.error !== undefined) {
        setShow(show);
        if (
          data?.error?.message === "The token is invalid." ||
          data?.error?.message === "Token is not valid for current app ID."
        ) {
          alert("Your Deriv token has expired");
          return;
        } else {
          alert(data?.error?.message);
          console.log(data?.error?.message);
        }
      } else if (data?.msg_type === "authorize") {
        ws.send(
          JSON.stringify({
            type: "paymentagent_withdraw",
            verify_email: userProfile?.email,
          })
        );
      } else if (data?.msg_type === "verify_email") {
        setShow(show);
        setIsVerifyModelOpen(true);
      }
    };
  };


  // complete withdrawal
  const completeWithdrawal = async () => {
    setVisible(true);
    const formattedPhone = userProfile?.phoneNumber.slice(1)
    const withdrawData = {
      phone_number: `254${formattedPhone}`,
      cash: amount,
      code: code,
      type: "withdraw",
      token: userProfile?.appAuthToken,
      withdraw: withdrawRate,
      withdrawRate: withdrawRate,
      user: userProfile,
      amount: amount,
      source: "app",
    };
    await fetch(
      "https://bservice.binarympesaservices.com/new_binary/b2c",
      {
        method: "POST",
        body: JSON.stringify(withdrawData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((final) => {
        if (final?.message) {
          console.log(final?.message);
          setAmount("");
          setCode("");
          setVisible(false);
          setIsVerifyModelOpen(false);
          setShow(false);
        } else {
          console.log(final?.error);
          setAmount("");
          setCode("");
          setVisible(false);
          setIsVerifyModelOpen(false);
          setShow(false);
        }
      })
      .catch((error) => {
        setVisible(false)
        setIsVerifyModelOpen(false)
        console.log(error)
        return
      })
      .finally(() => {
        setIsVerifyModelOpen(false)
        setVisible(false)
        setCode("")
      })
  };

  return (
    <Modal
      open={isWithdrawModelOpen}
      onClose={() => setIsWithdrawModelOpen(false)}
    >
      <Slide direction="up" in={isWithdrawModelOpen}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: isMobile ? "90vh" : "96vh",
            width: "100vw",
            position: "fixed", // Ensures it stays at the bottom
            bottom: 0, // Aligns it to the bottom
            overflow: "auto",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderWidth: 0,
          }}
        >
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={3}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              color={"text.primary"}
              fontWeight={600}
            >
              Withdraw from Deriv
            </Typography>
            <IconButton
              sx={{
                background: "#f5f5f5",
                width: 34,
                height: 34,
                borderRadius: 1,
              }}
              onClick={() => setIsWithdrawModelOpen(false)}
            >
              x
            </IconButton>
          </Box>
          <Box
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            py={2}
          >
            <WithdrawForm 
              makeWithdraw={makeWithdraw}
              show={show}
              withdrawRate={withdrawRate} 
              rates={rates}
              setAmount={setAmount}
              amount={amount}
             />
            <VerifyWithdrawModal
              handleVerify={completeWithdrawal}
              show={visible}
              code={code}
              setCode={setCode}
              isVerifyModelOpen={isVerifyModelOpen}
              setIsVerifyModelOpen={setIsVerifyModelOpen}
            />
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
