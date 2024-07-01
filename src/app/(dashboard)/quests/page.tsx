"use client";

import MobileNavigation from "@/components/navigation/MobileNavigation";
import QuestList from "@/components/quests/QuestList";
import { useGlobalState } from "@/context/GlobalStateContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface QuestData {
  id: number;
  uuid: string;
  name: string;
  description: string;
  point: number;
  link: string;
  deleted_at?: Date | null;
  created_at?: string;
  updated_at?: string;
  is_complete?: boolean;
  requirement?: string;
}

export default function Quests() {
  // const { token, setToken } = useGlobalState();
  const [quests, setQuests] = useState<QuestData[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()

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
    async function fetchQuests() {
      try {
        const response = await fetch(
          "https://backend.decodingthefuture.xyz/api/v1/quest",
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
        setQuests(data.data);
      } catch (error) {
        console.error("Failed to fetch quest data:", error);
      }
    }

    if (token) {
      fetchQuests();
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
            <div></div>
            <div className="">
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
            </div>
          </div>

          <div className="h-full flex-grow space-x-3 flex items-center justify-center">
            <p className="lg:text-5xl text-2xl">Quest</p>
          </div>
        </div>
      </div>

      <section>
        <QuestList quests={quests} token={token} />
      </section>
    </div>
  );
}
