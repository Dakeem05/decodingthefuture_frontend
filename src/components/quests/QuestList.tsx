"use client";

import { useGlobalState } from "@/context/GlobalStateContext";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "react-toastify";
import Link from "next/link";
import Spinner from "../Spinner";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { UrlObject } from "url";
import { FaCheck } from "react-icons/fa6";

export default function QuestList({ quests, token, setQuests }: any) {
  // const { quests, token } = useGlobalState();
  const [proof, setProof] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [taskClicked, setTaskClicked] = useState(false);
  const router = useRouter();

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

  async function submitQuest(id: number) {
    const formData = {
      quest_id: id,
      proof,
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://backend.decodingthefuture.xyz/api/v1/submit-quest`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(responseBody);
      }

      const data = await response.json();
      toast.success(`${data.data}`);

      fetchQuests();

      setIsLoading(false);
      setClicked(false);
    } catch (error: any) {
      console.error("Failed to fetch quest data:", error);
      toast.error(`Quest Already submitted`);
      setIsLoading(false);
    }
  }

  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <h1 className="text-4xl lg:text-5xl mb-1">
        Decoding The
        <br className="lg:hidden" /> Future Quest
      </h1>
      <p className="text-sm lg:text-lg mb-1">
        Participate in exciting tasks and quests and earn SN points and climb
        the leaderboard to win amazing cash & tech prizes like phones, laptops and more. Join now and let the adventure begin.
      </p>
      {/* <p className="text-sm lg:text-lg mb-1">
        Win a phone and prize up to 500,000 Naira.
      </p>
      <p className="text-sm lg:text-lg">
        Note: All entries will be checked manually to confirm that you completed the task.
      </p> */}

      <div className="mt-20">
        <h1 className="text-xl lg:text-2xl mb-3">Tasks</h1>

        {quests.length < 1 ? (
          <button
            onClick={() => console.log("fetched")}
            className="bg-[#1B1E24] cursor-not-allowed w-full rounded-[10px] py-3 px-3 lg:px-7 last:mb-0 mb-4 text-base flex items-center space-x-2 lg:text-lg"
          >
            <p>No Available Tasks</p>
          </button>
        ) : (
          <div className="">
            {quests.map(
              (
                quest: {
                  is_complete: boolean | undefined;
                  description:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                  point:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                  link: string | UrlObject;
                  requirement: string | undefined;
                  id: number;
                },
                i: Key | null | undefined
              ) => {
                return (
                  <div key={i} className="last:mb-0 mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          disabled={quest.is_complete}
                          className="bg-[#1B1E24] text-left disabled:bg-[#1B1E24]/20 disabled:cursor-not-allowed w-full justify-between rounded-[10px] py-3 px-3 lg:px-7 text-base flex items-center pb-[1rem] space-x-2 lg:text-lg"
                        >
                          <p className="">{quest.name}</p>
                          <div className="flex items-center space-x-1">
                            {quest.is_complete ? (
                              <FaCheck className="w-4 h-4 text-green-500" />
                            ) : (
                              <>
                                <div
                                  style={{
                                    background:
                                      "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
                                  }}
                                  className="w-4 h-4 rounded-full"
                                ></div>
                                <p>{quest.point}</p>
                              </>
                            )}
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-black border border-[#0057FF]">
                        <DialogHeader>
                          <Link
                            href={quest.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <DialogTitle>
                              <button
                                disabled={quest.is_complete}
                                className="text-left mr-10 mb-5 space-x-2"
                                onClick={() => setClicked(true)}
                              >
                                <p className="leading-6">
                                  {" "}
                                  {quest.description}{" "}
                                  <HiOutlineExternalLink className="inline-block" />
                                </p>
                              </button>
                            </DialogTitle>
                          </Link>
                          <DialogDescription className="text-left my-5">
                            Click and complete the above task for {quest.point}{" "}
                            points
                          </DialogDescription>
                        </DialogHeader>
                        <div className="">
                          <p>Submit proof of completion:</p>
                          <input
                            type="text"
                            value={proof}
                            onChange={(e) => setProof(e.target.value)}
                            placeholder={quest.requirement}
                            className="text-sm my-2 lg:text-base border rounded-lg border-[#0057FF] text-white outline-none bg-transparent p-2 w-full"
                          />
                          <button
                            disabled={
                              !clicked || quest.is_complete || isLoading
                            }
                            className="bg-[#0057FF] disabled:cursor-not-allowed disabled:bg-[#0057FF]/50 text-white text-base py-2 lg:text-lg w-full rounded-[10px]"
                            onClick={() => submitQuest(quest.id)}
                          >
                            {isLoading ? <Spinner /> : "Submit"}
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}
