"use client";

import { useState } from 'react';
import InputBox from '../InputBox';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import Modal from '../Modal';
import { useGlobalState } from '@/context/GlobalStateContext';
import VerifyForgotPasswordOTP from './VerifyForgotPasswordOTP';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const { isModalOpen, setIsModalOpen } = useGlobalState();

  const handleSubmit = async () => {
    setIsLoading(true);

    let formData = {
      email
    };

    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/auth/forgot-password",
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

        throw new Error(errorMessage);
      }
      const data = await response.json();

      sessionStorage.setItem("emailToVerify", email);
      toast.success(`${data.data}`);
      
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
      <h1 className="lg:text-3xl text-xl mb-3 lg:mb-9">
          Enter your email to receive an otp
        </h1>
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

      <button
        type="submit"
        disabled={isLoading}
        className="uppercase disabled:cursor-not-allowed bg-[#0057FF] text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]"
      >
        {isLoading ? <Spinner /> : "Get OTP"}
      </button>
    </form>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VerifyForgotPasswordOTP />
      </Modal>
    </>
  )
}
