"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

interface IDailyClaims {
  token: string | null;
  setUserPoint: Dispatch<SetStateAction<number>>;
  lastClaim: Date | string;
  setLastClaim: Dispatch<SetStateAction<Date | string>>;
}

export default function DailyClaims({
  token,
  setUserPoint,
  lastClaim,
  setLastClaim,
}: IDailyClaims) {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    const lastClaimDate = new Date(lastClaim);
    const targetDate: any = new Date(lastClaimDate.getTime() + 24 * 60 * 60 * 1000);

    const updateTimer = () => {
      const now: any = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        setTimeLeft(timeDifference);
        setCanClaim(false);
      } else {
        setTimeLeft(0);
        setCanClaim(true);
      }
    };

    const intervalId = setInterval(updateTimer, 1000);

    updateTimer();

    return () => clearInterval(intervalId);
  }, [lastClaim]);

  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  async function getUser() {
    const response = await fetch(
      "https://backend.decodingthefuture.xyz/api/v1/auth/user",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(
        `Network response was not ok. Status code: ${response.status}. Message: ${responseBody}`
      );
    }

    const data = await response.json();

    setUserPoint(data.data.user.point.point);
    setLastClaim(data.data.user.point.last_claim_at);
  }

  async function claimPoints() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/claim/index",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      getUser();
      toast.success(`${data.message}`);

      setIsLoading(false);
    } catch (error: any) {
      toast.error(`Already Claimed`);
      setIsLoading(false);
    }
  }
  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <div className="bg-[#1B1E24] mb-7 text-center rounded-[10px] flex flex-col lg:flex-row items-center justify-between lg:p-16 py-11 px-10">
        <div className="flex items-center space-x-3">
          <div
            style={{
              background:
                "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
            }}
            className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
          ></div>
          <p className="text-4xl">1000</p>
        </div>
        <p className="text-2xl">Claim daily points every 24hrs</p>
      </div>
      <div className="">
      {timeLeft > 0 ? (
        <p>Time left until next claim: {formatTimeLeft(timeLeft)}</p>
      ) : (
        <p>You can now claim!</p>
      )}
      </div>
      <button
        onClick={claimPoints}
        disabled={!canClaim || isLoading}
        className="bg-[#0057FF] disabled:bg-[#0057FF]/60 disabled:cursor-not-allowed w-full text-white rounded-[10px] text-2xl py-5"
      >
        {isLoading ? <Spinner /> : "Claim"}
      </button>
    </div>
  );
}
