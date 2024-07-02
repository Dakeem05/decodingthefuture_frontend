"use client";

import { useGlobalState } from "@/context/GlobalStateContext";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import { MdDiversity3 } from "react-icons/md";

export default function Rankings({ leaderboardData, leaderboardTotal }: any) {
  // const { leaderboardData, leaderboardTotal } = useGlobalState();

  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <p className="text-xl lg:text-3xl">
        Total Participants ({leaderboardTotal})
      </p>
      <div className="bg-[#1B1E24] rounded-[10px] mt-4 px-2 py-3">
        <div className="bg-[#0F1114] rounded-[10px] py-3 px-3 lg:px-7 mb-4 text-lg lg:text-xl">
          <p>Top 100</p>
        </div>

        {leaderboardData.length < 1 ? (
          <div><p className="text-center">Fetching...</p></div>
        ) : (
          <>
            {leaderboardData.map(
              (
                rank: {
                  position:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
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
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                  referrals:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
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
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                },
                i: Key | null | undefined
              ) => {
                return (
                  <div
                    className="bg-[#0F1114] rounded-[10px] py-3 px-3 lg:px-7 last:mb-0 mb-4 text-base flex items-center space-x-2 lg:text-lg"
                    key={i}
                  >
                    <p>{rank.position}</p>
                    <div className="flex items-center flex-grow space-x-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#0057FF] rounded-full"></div>
                      <p>{rank.name}</p>
                    </div>

                    <div className="flex mr-4 items-center space-x-2">
                      <MdDiversity3 className="w-[22px] h-[22px]" />

                      <p>{rank.referrals}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div
                        style={{
                          background:
                            "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
                        }}
                        className="w-4 h-4 rounded-full"
                      ></div>
                      <p>{rank.point}</p>
                    </div>
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </div>
  );
}
