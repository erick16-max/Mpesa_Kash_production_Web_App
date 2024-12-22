"use client"
import { useEffect } from "react";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to /finishaccount directly
    router.push("/finishaccount");
  }, [router]);

  return null; // No UI is rendered, just redirecting.
};

export default Auth;
