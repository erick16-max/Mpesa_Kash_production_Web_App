import React, { useContext, useState } from "react";
import { Box, IconButton, Modal, Slide, Typography } from "@mui/material";
import AppContext from "@/context/AppContext";
import ColorModeContext from "@/theme/ThemeContextProvider";
import WithdrawForm from "./WithdrawForm";
import VerifyCodeModal from "@/app/finishaccount/VerifyCodeModal";
import VerifyWithdrawModal from "./VerifyModal";
import CopyRight from "@/app/components/footer/CopyRight";


const BACKEND_URL = "https://kash.instantpesa.co.ke/new_deriv/withdraw";

export default function WithdrawModal({ withdrawRate, rates }) {
  const { isWithdrawModelOpen, setIsWithdrawModelOpen, userProfile, setRefreshing } =
    useContext(AppContext);
  const [isVerifyModelOpen, setIsVerifyModelOpen] = useState(false);
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState();
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
   const [referenceKey, setReferenceKey] = useState("");
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  

  const { isMobile } = useContext(ColorModeContext);

  const isMinimumBalance = userProfile?.balance > rates?.minWithdraw




  // ── STEP 1: user confirms amount → register intent ────────────────────────
  const makeWithdraw = async (e) => {
    e?.preventDefault();
    console.log(amount, Number(isMinimumBalance ))

    if (!amount || Number(amount) < Number(isMinimumBalance )) return;

    setShow(true)

    let phone = userProfile?.phoneNumber || "";
    if (phone.startsWith("+")) phone = phone.slice(1);
    if (phone.startsWith("0")) phone = `254${phone.slice(1)}`;
    if (!phone.startsWith("254")) phone = `254${phone}`;

    try {
      const res = await fetch(`${BACKEND_URL}/register-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userProfile?.uid,
          phone_number: phone,
          cash: amount,
          withdraw_rate: withdrawRate,
          access_token: userProfile?.token,
          email: userProfile?.email,
          platform: "web",
          client_cr:
            userProfile?.derivId ||
            userProfile?.loginid ||
            userProfile?.crNumber,
        }),
      });
      const data = await res.json();

      console.log('withdraw res data', data?.details)

      if (res.ok && data.success) {
        setReferenceKey(data.reference_key);
        setIsVerifyModelOpen(true);
        setShow(false)
      } else {
        alert(data.message || "Failed to initiate withdrawal.");
        setShow("");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while requesting OTP.");
      setLoadingText("");
    } 
  };




   // complete withdrawal
 const completeWithdrawal = async (e) => {
    // Prevent the form from reloading the page and clearing your state
    e?.preventDefault();
    
    try {
      setOtpSubmitting(true);
      
      if (!referenceKey) {
        alert('Reference key required. Please restart the withdrawal.');
        return;
      }

      if (!code) {
        alert('OTP code required');
        return;
      }
  
      const payload = {
        reference_key: referenceKey,
        otp_code: code,
      };

      const response = await fetch(`${BACKEND_URL}/execute-client-withdrawal`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      console.log("Execute Withdrawal Result:", result);

      if (!response.ok) {
        alert(result.message || "Invalid OTP or execution failed.");
        setCode(""); // Clear the input field for the user to try again
        return;
      }

      if (result.success) {
        // Clear state and push to the success screen
        setAmount("");
        setCode("");
        setVisible(false);
        setIsVerifyModelOpen(false);
        setShow(false);
        setIsSuccess(true)
        
      } else {
        alert(result.message || "Invalid OTP or execution failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setOtpSubmitting(false);
    }
  }

  return (
    <Modal
      open={isWithdrawModelOpen}
      onClose={() => setIsWithdrawModelOpen(false)}
    >
      <Slide direction="up" in={isWithdrawModelOpen}>
        <Box
          sx={{
            backgroundColor: "background.paper",
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
            flexDirection={'column'}
          >
            <WithdrawForm 
              makeWithdraw={makeWithdraw}
              show={show}
              withdrawRate={withdrawRate} 
              rates={rates}
              setAmount={setAmount}
              amount={amount}
              isError={isError}
              isSuccess={isSuccess}
             />
             <CopyRight bgColor={'#ffffff'} />
            <VerifyWithdrawModal
              handleVerify={completeWithdrawal}
              show={otpSubmitting}
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
