"use client";
import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";
import Modal from "../Modal";
import VerifyOTP from "./VerifyOTP";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

export default function SignUpForm({ refCode }: {refCode: string | null}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [referrerError, setReferrerError] = useState(" ");
  const [passwordError, setPasswordError] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const router = useRouter();

  const { isModalOpen, setIsModalOpen } = useGlobalState();
  
  useEffect(() => {
    if (password !== confirmPassword) {
      setDisableButton(true);
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      setDisableButton(false);
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (refCode !== "") {
      setReferral(refCode)
    }
  }, [refCode])

  const handleSubmit = async () => {
  
    let formData;
    setIsLoading(true);
    if (referral === "") {
      formData = {
        name,
        email,
        password,
      };
    } else {
      formData = {
        name,
        email,
        password,
        referrer_code: referral,
      };
    }
    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/auth/register",
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

        if (errorResponse.data.name) setNameError(errorResponse.data.name[0]);
        if (errorResponse.data.email)
          setEmailError(errorResponse.data.email[0]);
        if (errorResponse.data.referrer_code)
          setReferrerError(errorResponse.data.referrer_code[0]);
        if (errorResponse.data.password)
          setPasswordError(errorResponse.data.password[0]);

        throw new Error(errorMessage);
      }
      const data = await response.json();

      localStorage.setItem("emailToVerify", email);
      localStorage.setItem("token", data.data.token);


      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
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
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(newValue: string) => {
              setName(newValue);
            }}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-5">
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
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        <div className="mb-4">
          <InputBox
            type="text"
            placeholder="Referral Code? (optional)"
            value={referral}
            onChange={(newValue: string) => {
              setReferral(newValue);
            }}
          />
          {referrerError && <p className="text-red-500">{referrerError}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="uppercase disabled:cursor-not-allowed disabled:bg-[#0057FF]/60 bg-[#0057FF] text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]"
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </button>

        <p className="mt-3 text-base lg:text-xl">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#0768fe]">
            Log In
          </Link>
        </p>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VerifyOTP />
      </Modal>
    </>
  );
}
