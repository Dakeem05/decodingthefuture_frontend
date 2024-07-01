"use client";

import ChangePassword from "@/components/auth/ChangePassword";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useGlobalState } from "@/context/GlobalStateContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const { forgotPasswordActive } = useGlobalState();
  const [token, setToken] = useState<string | null>(null);
  let [email, setEmail] = useState("");
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/sign-in");
    } else if (token) {
      router.push("/sign-in");
    }
  }, [token, router, setToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("emailToVerify");
    if (storedToken) {
      setEmail(storedToken);
    }
  }, []);


  return (
    <div>
      {(forgotPasswordActive || email) ? <ChangePassword /> : <ForgotPasswordForm />}
    </div>
  );
}
