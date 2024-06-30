"use client";
import Rankings from "@/components/leaderboard/Rankings";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Router } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface LeaderboardEntry {
  position: number;
  name: string;
  referrals: number;
  point: number;
}

export default function Leaderboard() {
  // const { userPosition, token, setToken } = useGlobalState();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [userPosition, setUserPosition] = useState(1);
  const [leaderboardTotal, setLeaderboardTotal] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // function getOrdinalSuffix(number: number) {
  //   const lastDigit = parseInt(number.toString().slice(-1));
  //   switch (lastDigit) {
  //     case 1:
  //       return "st";
  //     case 2:
  //       return "nd";
  //     case 3:
  //       return "rd";
  //     default:
  //       return "th";
  //   }
  // }

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


  // const formattedPosition = `${userPosition}${getOrdinalSuffix(userPosition)}`;

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(
          "https://backend.decodingthefuture.xyz/api/v1/leaderboard/index",
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

        setLeaderboardTotal(data.data.total);
        setUserPosition(data.data.position);
        setLeaderboardData(data.data.leaderboard);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    }

    if (token) {
      fetchLeaderboard();
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
            {/* <FaArrowLeft className="lg:w-11 lg:h-11 w-[22px] h-[22px]" /> */}
            <div className=""></div>
            <p className="lg:text-4xl text-xl">Leaderboard</p>
            <div className="">
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
            </div>
          </div>

          <div className="h-full flex-grow space-x-3 flex items-center justify-center">
            {/* <div
              style={{
                background:
                  "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
              }}
              className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
            ></div> */}

            <p className="lg:text-5xl text-2xl">Position:</p>
            <p className="lg:text-5xl text-2xl">{userPosition}</p>
          </div>
        </div>
      </div>

      <section>
        <Rankings leaderboardData={leaderboardData} leaderboardTotal={leaderboardTotal} />
      </section>
    </div>
  );
}
