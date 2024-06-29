"use client";
import { useState } from "react";
import InputBox from "../InputBox";
import Link from "next/link";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Spinner from "../Spinner";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    let formData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/auth/login",
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

        if (errorResponse.data.password) setPasswordError("Wrong password");

        throw new Error(errorMessage);
      }
      const data = await response.json();

      sessionStorage.setItem("token", data.data.token);
      toast.success("Login was successful.");
      setIsLoading(false);

      router.push("/dashboard");
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
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(newValue: string) => {
            setEmail(newValue);
          }}
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </div>

      <div className="mb-4">
        <InputBox
          type="password"
          placeholder="Enter password"
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
        {isLoading ? <Spinner /> : "Log In"}
      </button>

      <p className="mt-3 text-base lg:text-xl">
        Don&apos;t have an account yet?{" "}
        <Link href="/sign-up" className="text-[#0768fe]">
          Sign up today
        </Link>
      </p>
    </form>
  );
}
