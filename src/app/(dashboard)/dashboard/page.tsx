"use client";
import DailyClaims from "@/components/dashboard/DailyClaims";
import Profile from "@/components/dashboard/Profile";
import Referrals from "@/components/dashboard/Referrals";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { redirect, useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

interface ReferralData {
  name: string;
  point: number;
}

export default function Dashboard() {
  const [activeState, setActiveState] = useState("profile");
  // const { token, setToken, userReferralCode, userPoint } = useGlobalState();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userReferralCode, setUserReferralCode] = useState("");
  const [userReferrerCode, setUserReferrerCode] = useState("");
  const [userPoint, setUserPoint] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [userReferralData, setUserReferralData] = useState<ReferralData[]>([]);

  useEffect(() => {
    if (token === null) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push("/sign-up");
      }
    }
  }, [router, setToken, token]);

  useEffect(() => {
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

      setUserName(data.data.user.name);
      setUserEmail(data.data.user.email);
      setUserReferralCode(data.data.user.referral_code);
      setUserReferrerCode(data.data.user.referrer_code);
      setUserPoint(data.data.user.point.point);
    }

    async function fetchReferrals() {
      try {
        const response = await fetch(
          "https://backend.decodingthefuture.xyz/api/v1/referral/index",
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
        setUserReferralData(data.data);
      } catch (error) {
        console.error("Failed to fetch referral data:", error);
      }
    }

    if (token) {
      getUser();
      fetchReferrals();
    }
  }, [token]);

  return (
    <div className="font-xeroda">
      <div
        style={{
          background: "linear-gradient(93.77deg, #0057FF 0%, #16A0FF 95.76%)",
        }}
        className="h-[340px] w-full lg:px-16 px-4 pt-9 lg:pt-10"
      >
        <div className="flex h-full flex-col items-stretch">
          <div className="flex items-center justify-between">
            <div className=""></div>
            {/* <FaArrowLeft className="lg:w-11 lg:h-11 w-[22px] h-[22px]" /> */}
            <p className="lg:text-4xl text-xl">Your Quest Points</p>
            <div className="">
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
            </div>
          </div>

          <div className="h-full flex-grow space-x-3 flex items-center justify-center">
            <div
              style={{
                background:
                  "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
              }}
              className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
            ></div>
            <p className="lg:text-5xl text-2xl">{userPoint}</p>
          </div>

          <div className="flex text-base lg:text-2xl justify-between">
            <button
              onClick={() => setActiveState("profile")}
              className="lg:w-[131px] w-[100px]"
            >
              <p className="text-center">Profile</p>
              {activeState === "profile" && (
                <div className="lg:h-[10px] h-[5px] w-full bg-white rounded-t-[10px]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveState("referrals")}
              className="lg:w-[131px] w-[100px]"
            >
              <p className="text-center">Referrals</p>
              {activeState === "referrals" && (
                <div className="lg:h-[10px] h-[5px] w-full bg-white rounded-t-[10px]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveState("dailyClaims")}
              className="lg:w-[131px] w-[100px]"
            >
              <p className="text-center">Daily Claims</p>
              {activeState === "dailyClaims" && (
                <div className="lg:h-[10px] h-[5px] w-full bg-white rounded-t-[10px]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <section>
        {activeState === "profile" && (
          <Profile
            userName={userName}
            userEmail={userEmail}
            token={token}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserReferralCode={setUserReferralCode}
            setUserReferrerCode={setUserReferrerCode}
          />
        )}

        {activeState === "referrals" && (
          <Referrals
            referralCode={userReferralCode}
            userReferralData={userReferralData}
          />
        )}

        {activeState === "dailyClaims" && (
          <DailyClaims setUserPoint={setUserPoint} token={token} />
        )}
      </section>
    </div>
  );
}
