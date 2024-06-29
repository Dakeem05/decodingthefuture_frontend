"use client";

import ChangePassword from "@/components/auth/ChangePassword";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useGlobalState } from "@/context/GlobalStateContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ForgotPassword() {
  const { forgotPasswordActive, token } = useGlobalState();

  useEffect(() => {
    if (token) {
      redirect("/dashboard");
    }
  }, [token]);

  return (
    <div>
      {forgotPasswordActive ? <ChangePassword /> : <ForgotPasswordForm />}
    </div>
  );
}
