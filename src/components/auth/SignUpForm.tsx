"use client";
import { useState } from "react";
import InputBox from "../InputBox";
import Link from "next/link";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className="w-full">
      <div className="mb-4">
        <InputBox
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(newValue: string) => {
            setEmail(newValue);
          }}
        />
      </div>

      <div className="mb-4">
        <InputBox
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(newValue: string) => {
            setName(newValue);
          }}
        />
      </div>

      <div className="flex items-center space-x-5 mb-4">
        <InputBox
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(newValue: string) => {
            setPassword(newValue);
          }}
        />
        <InputBox
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(newValue: string) => {
            setConfirmPassword(newValue);
          }}
        />
      </div>

      <button className="uppercase bg-[#0057FF] text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]">
        SIGN UP
      </button>

      <p className="mt-3 text-base lg:text-xl">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-[#0768fe]">
          Log In
        </Link>
      </p>
    </form>
  );
}
