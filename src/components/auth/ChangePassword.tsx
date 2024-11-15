"use client";
import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setForgotPasswordActive } = useGlobalState();

  useEffect(() => {
    const storedToken = localStorage.getItem("emailToVerify");
    if (storedToken) {
      setEmail(storedToken);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    let formData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/auth/change-password",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = `HTTP error status: ${
          response.status
        }, Message: ${JSON.stringify(errorResponse.data)}`;

        if (errorResponse.data.email)
          setEmailError(errorResponse.data.email[0]);

        if (errorResponse.data.password)
          setPasswordError(errorResponse.data.password[0]);

        throw new Error(errorMessage);
      }
      const data = await response.json();

      localStorage.removeItem("emailToVerify");
      toast.success(`${data.data}`);
      router.push("/sign-in");
      setForgotPasswordActive(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full"
    >
      <div className="mb-4">
        <InputBox
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(newValue: string) => {
            setPassword(newValue);
          }}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="uppercase disabled:cursor-not-allowed bg-[#0057FF] text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]"
      >
        {isLoading ? <Spinner /> : "Change Password"}
      </button>
    </form>
  );
}
