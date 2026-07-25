// components/UpdateNicknameModal.jsx

"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase.config";

export default function UpdateNicknameModal({
  open,
  userProfile,
  onClose,
  onUpdated,
}) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

 const saveNickname = async () => {
  if (!nickname?.trim()) return;

  try {
    setLoading(true);

    console.log("Current user:", auth?.currentUser);

    const ref = doc(db, "users", auth?.currentUser?.uid);

    console.log("Updating document:", ref.path);

    await updateDoc(ref, {
      nickname: nickname?.trim(),
    });

    console.log("Nickname updated successfully.");

    onUpdated?.(nickname?.trim());
    onClose?.();
  } catch (err) {
    console.error("Update failed:", err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: 420,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Complete your Deriv Profile
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 3 }}
          >
            Please enter your Deriv nickname exactly as it appears in your
            Deriv account. This is required before making deposits or
            withdrawals.
          </Typography>

          <TextField
            fullWidth
            label="Deriv Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, height: 50 }}
            disabled={loading || !nickname.trim()}
            onClick={saveNickname}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Save Nickname"
            )}
          </Button>
        </Card>
      </Box>
    </Modal>
  );
}