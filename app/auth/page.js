
"use client";

import { Suspense } from "react";
import PageLoader from '../components/general/PageLoader'

import AuthCallback from "../components/auth/AuthCallback";


export default function AuthPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthCallback />
    </Suspense>
  );
}