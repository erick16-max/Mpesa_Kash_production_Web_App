"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "../../components/general/PageLoader";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase.config";

const BACKEND_URL = "https://kash.instantpesa.co.ke";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const errorParam = searchParams.get("error");

        if (errorParam) throw new Error(errorParam);
        if (!code || !state) {
          router.replace("/");
          return;
        }

        // 1. Exchange Code for Token
        const tokenRes = await fetch(`${BACKEND_URL}/new_deriv/web/claim-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, state }),
        });

        const tokenData = await tokenRes.json();
        if (!tokenRes.ok || !tokenData.accessToken) {
          throw new Error(tokenData.message || "Token exchange failed");
        }

        // 2. Fetch Profile to get Account ID
        const profileRes = await fetch(`${BACKEND_URL}/new_deriv/web/user-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: tokenData.accessToken }),
        });

        const profileObj = await profileRes.json();
        if (!profileRes.ok) throw new Error("Unable to fetch profile.");

        const accounts = profileObj.accounts?.data || profileObj.data || [];
        const realAccount = accounts.find((a) => a.account_type === "real" && a.status === "active");

        if (!realAccount) throw new Error("No active real account found.");

        // 3. Logic: Are they currently logged into Firebase?
        const currentUser = auth?.currentUser;

        if (currentUser) {
          // --- EXISTING USER ---
          // They are logged in, just updating their Deriv connection
          console.log("Updating existing user...");
          
          const userDocRef = doc(db, "users", currentUser.uid);
          await updateDoc(userDocRef, {
            token: tokenData.accessToken,
            
          });

          localStorage.setItem("@token", tokenData.accessToken);
          router.replace("/dashboard");
        } else {
          // --- NEW USER (Sign Up flow) ---
          // They are not logged into Firebase yet, save to local for finishaccount
          console.log("Storing for new user...");
          
          const registration = {
            token: tokenData.accessToken,
            loginid: realAccount.account_id,
            derivBalance: realAccount.balance || "0.00",
            fullName: profileObj.fullName || "",
            email: profileObj.email || "",
            nickname: profileObj.nickname || "",

          };

          localStorage.setItem("@token", tokenData.accessToken);
          localStorage.setItem("@pending_registration", JSON.stringify(registration));
          
          router.replace("/finishaccount");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Authentication failed.");
        setTimeout(() => router.replace("/login"), 3000);
      }
    };

    processAuth();
  }, [router, searchParams]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <PageLoader />}
    </div>
  );
}