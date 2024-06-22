"use client";
import DailyClaims from "@/components/dashboard/DailyClaims";
import Profile from "@/components/dashboard/Profile";
import Referrals from "@/components/dashboard/Referrals";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileNavigation from "@/components/navigation/MobileNavigation";

export default function Dashboard() {
  const [activeState, setActiveState] = useState("profile");

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
            <FaArrowLeft className="lg:w-11 lg:h-11 w-[22px] h-[22px]" />
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
            <p className="lg:text-5xl text-2xl">1000</p>
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
        {activeState === "profile" && <Profile />}

        {activeState === "referrals" && <Referrals />}

        {activeState === "dailyClaims" && <DailyClaims />}
      </section>
    </div>
  );
}
