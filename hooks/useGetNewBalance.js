import { useState, useCallback, useContext } from "react";
import AppContext from "@/context/AppContext";
import { db, auth } from '@/firebase.config';
import { doc, updateDoc } from "firebase/firestore";

const BACKEND_URL = "https://kash.instantpesa.co.ke/new_deriv";

export const useNewDerivBalance = () => {
  const { userProfile, setUserProfile } = useContext(AppContext);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = useCallback(async () => {
    // 1. Retrieve the access token and user ID from userProfile or local storage
    const token = userProfile?.token 
      

    const uid = auth?.currentUser?.uid || userProfile?.uid;

    if (!token) {
      setError("No access token available. Please log in.");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // 2. Query backend /user-profile endpoint with token
      const res = await fetch(`${BACKEND_URL}/user-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      // 3. Extract balance (prefers target real account or live_balance)
      const realAcc = data.data?.find((acc) => acc.account_type === "real") || data.data?.[0];
      const liveBalance = parseFloat(data.userData?.live_balance || realAcc?.balance || 0.00);

      setBalance(liveBalance);

      // 4. Update Token and Balance inside Firebase Firestore
      if (uid && db) {
        try {
          const userDocRef = doc(db, "users", uid);
          await updateDoc(userDocRef, {
            derivToken: token,
            balance: liveBalance,
            lastTokenSync: new Date(),
          });
          console.log("Token & Balance successfully updated in Firebase Firestore.");
        } catch (dbErr) {
          console.error("Firestore sync error:", dbErr.message);
        }
      }

      // 5. Update global AppContext
      if (setUserProfile) {
        setUserProfile((prev) => ({
          ...prev,
          ...data,
          balance: liveBalance,
          accessToken: token,
        }));
      }

      return liveBalance;
    } catch (err) {
      console.error("fetchBalance error:", err.message);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userProfile, setUserProfile]);

  return {
    balance,
    loading,
    error,
    fetchBalance,
  };
};