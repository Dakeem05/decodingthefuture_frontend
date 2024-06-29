"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import "react-toastify/dist/ReactToastify.css";

interface QuestData {
  id: number;
  uuid: string;
  name: string;
  description: string;
  point: number;
  link: string;
  deleted_at?: Date | null;
  created_at: string;
  updated_at: string;
  is_complete: boolean;
}

interface ReferralData {
  name: string;
  point: number;
}

interface LeaderboardEntry {
  position: number;
  name: string;
  referrals: number;
  point: number;
}

interface GlobalStateContextType {
  isNotVerified: boolean;
  setIsNotVerified: Dispatch<SetStateAction<boolean>>;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
  userReferralCode: string;
  setUserReferralCode: Dispatch<SetStateAction<string>>;
  userReferrerCode: string;
  setUserReferrerCode: Dispatch<SetStateAction<string>>;
  leaderboardData: LeaderboardEntry[];
  setLeaderboardData: Dispatch<SetStateAction<LeaderboardEntry[]>>;
  userPosition: number;
  leaderboardTotal: number;
  userReferralData: ReferralData[];
  quests: QuestData[];
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  forgotPasswordActive: boolean;
  setForgotPasswordActive: Dispatch<SetStateAction<boolean>>;
  userPoint: number;
  completeRegistration: boolean
  setCompleteRegistration: Dispatch<SetStateAction<boolean>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [completeRegistration, setCompleteRegistration] = useState(false)
  const [isNotVerified, setIsNotVerified] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userReferralCode, setUserReferralCode] = useState("");
  const [userReferrerCode, setUserReferrerCode] = useState("");
  const [userPoint, setUserPoint] = useState(1000);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [userPosition, setUserPosition] = useState(1);
  const [leaderboardTotal, setLeaderboardTotal] = useState(1);
  const [userReferralData, setUserReferralData] = useState<ReferralData[]>([]);
  const [quests, setQuests] = useState<QuestData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
  // const [token, setToken] = useState<string | null>("");
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   // setToken(sessionStorage.getItem("token"))
  // }, []);

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
        },
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
      getUser();
      fetchLeaderboard();
      fetchReferrals();
      fetchQuests();
    }
  }, [token]);

  return (
    <GlobalStateContext.Provider
      value={{
        isNotVerified,
        setIsNotVerified,
        isRegistered,
        setIsRegistered,
        token,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userReferralCode,
        setUserReferralCode,
        userReferrerCode,
        setUserReferrerCode,
        leaderboardData,
        setLeaderboardData,
        userPosition,
        leaderboardTotal,
        userReferralData,
        quests,
        isModalOpen,
        setIsModalOpen,
        userPoint,
        forgotPasswordActive,
        setForgotPasswordActive,
        completeRegistration,
        setCompleteRegistration
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
