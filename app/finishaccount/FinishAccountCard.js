"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { 
  IoCheckmarkCircleOutline, 
  IoCubeOutline, 
  IoPersonOutline, 
  IoMailOutline, 
  IoCallOutline, 
  IoShieldCheckmarkOutline 
} from "react-icons/io5";

// Firebase imports (ensure these match your actual config path)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase.config";

const BACKEND_URL = "https://kash.instantpesa.co.ke"; // Your API domain
const STEPS = ["Nickname", "Profile Details", "Security Keys"];

export default function FinishAccountCard() {
  const router = useRouter();

  // Stepper & UI State
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data State
  const [derivToken, setDerivToken] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [derivBalance, setDerivBalance] = useState("0.00");

  // Step 0: Nickname State
  const [editableNickname, setEditableNickname] = useState("");

  // Step 1: Identity State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Step 2: Security State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Load from LocalStorage and fetch Nickname on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const raw = localStorage.getItem("@pending_registration");
        if (raw) {
          const parsed = JSON.parse(raw);
          const token = parsed.token || "";
          setDerivToken(token);
          setDerivBalance(parsed.derivBalance || "0.00");
          setFullName(parsed.fullName || parsed.profile?.fullName || "");
          setEmail(parsed.email || parsed.profile?.email || "");
          
          if (parsed.loginid) {
            setCrNumber(parsed.loginid);
          }

          // If nickname is already present in storage, use it
          if (parsed.nickname) {
            setEditableNickname(parsed.nickname);
          } 
        }
      } catch (err) {
        console.error("Storage parse error:", err);
      }
    };

    initializeData();
  }, []);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 6000);
  };

  // ── Step 0: Verify Nickname ──────────────────────────────────────
  const handleVerifyNickname = () => {
    const trimmedNick = editableNickname.trim();
    if (!trimmedNick) return showError("Deriv nickname is required.");
    
    setError("");
    setStep(1); // Move directly to personal details
  };

  // ── Step 1: Validate Identity ──────────────────────────────────────
  const handleValidateDetails = () => {
    if (!fullName.trim()) return showError("Legal entity full name string is required.");
    if (!email.trim() || !email.includes("@")) return showError("Valid email processing string required.");
    setError("");
    setStep(2);
  };

  // ── Step 2: Finalize Registration ──────────────────────────────────
  const handleFinalizeRegistration = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return showError("Active phone identifier sequence required.");
    if (password.length < 6) return showError("Encryption key must contain at least 6 characters.");
    if (password !== confirmPassword) return showError("Security string parity error. Strings must match.");

    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      const credentials = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const uid = credentials.user.uid;

      // 2. Format Phone Number
      let cleanPhone = phoneNumber.trim();
      if (cleanPhone.startsWith("+")) cleanPhone = cleanPhone.slice(1);
      if (cleanPhone.startsWith("0")) cleanPhone = cleanPhone.slice(1);
      if (!cleanPhone.startsWith("254")) cleanPhone = `254${cleanPhone}`;

      // 3. Save profile to Firestore
      const recordRef = doc(db, "users", uid);
      await setDoc(recordRef, {
        uid,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: `+${cleanPhone}`,
        derivId: crNumber || "CR0000000",
        nickname: editableNickname.trim() || "Deriv Nickname",
        token: derivToken,
        balance: derivBalance,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        accountStatus: "active",
      });

      // 4. Cleanup and redirect
      localStorage.removeItem("@pending_registration");
      localStorage.removeItem("@token");
      router.push("/dashboard");

    } catch (err) {
      showError(err.message || "Registration deployment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      <Card
        variant="outlined"
        sx={{
          p: { xs: 3, md: 5 },
          width: { xs: "96vw", md: 550 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderRadius: "16px",
        }}
      >
        <Stack spacing={1} textAlign="center">
          <Typography variant="h5" fontWeight={800} color="text.primary">
            Finish Account Setup
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secure your node identity parameters
          </Typography>
        </Stack>

        <Stepper activeStep={step} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ borderRadius: "10px" }}>{error}</Alert>}

        <Box component="form" onSubmit={step === 2 ? handleFinalizeRegistration : (e) => e.preventDefault()}>
          
          {/* STEP 0: NICKNAME */}
          {step === 0 && (
            <Stack spacing={3}>
              <TextField
                label="Deriv Nickname"
                placeholder="client_nickname"
                value={editableNickname}
                onChange={(e) => setEditableNickname(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><IoCubeOutline size={20} /></InputAdornment>
                  ),
                  endAdornment: editableNickname && (
                    <InputAdornment position="end"><IoCheckmarkCircleOutline color="#00c853" size={22} /></InputAdornment>
                  ),
                }}
              />
              
              <Button
                variant="contained"
                onClick={handleVerifyNickname}
                disabled={!editableNickname}
                sx={{ 
                  height: 50, 
                  borderRadius: "12px", 
                  bgcolor: editableNickname ? "#00c853" : "primary.main", 
                  "&:hover": { bgcolor: editableNickname ? "#009624" : "primary.dark" } 
                }}
              >
                Continue
              </Button>
            </Stack>
          )}

          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IoPersonOutline size={20} /></InputAdornment>,
                }}
              />
              <TextField
                label="Deriv Email Address"
                placeholder="client@gateway.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IoMailOutline size={20} /></InputAdornment>,
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => setStep(0)} sx={{ height: 50, borderRadius: "12px", width: "30%" }}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleValidateDetails} sx={{ height: 50, borderRadius: "12px", flex: 1 }}>
                  Continue
                </Button>
              </Stack>
            </Stack>
          )}

          {/* STEP 2: SECURITY */}
          {step === 2 && (
            <Stack spacing={3}>
              <TextField
                label="M-Pesa Phone Number"
                placeholder="07XXXXXXXX"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IoCallOutline size={20} /></InputAdornment>,
                }}
              />
              <TextField
                label="Access Password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IoShieldCheckmarkOutline size={20} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Access Password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IoShieldCheckmarkOutline size={20} /></InputAdornment>,
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => setStep(1)} disabled={loading} sx={{ height: 50, borderRadius: "12px", width: "30%" }}>
                  Back
                </Button>
                <Button type="submit" variant="contained" disabled={loading} sx={{ height: 50, borderRadius: "12px", flex: 1, bgcolor: "#00c853", "&:hover": { bgcolor: "#009624" } }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Finish Account Creation"}
                </Button>
              </Stack>
            </Stack>
          )}
          
        </Box>

        {/* Cancel Action */}
        <Box textAlign="center" mt={2}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", cursor: "pointer", "&:hover": { textDecoration: "underline", color: "error.main" } }}
            onClick={() => {
              if(window.confirm("Are you sure you want to cancel? You will need to authenticate again.")) {
                localStorage.removeItem("@pending_registration");
                router.push("/");
              }
            }}
          >
            Cancel Registration
          </Typography>
        </Box>

      </Card>
    </Box>
  );
}