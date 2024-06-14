/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import Pagination from "../../components/Pagination";
// Components
import Miner from "./Miner";
import { Loader } from "../../components/Loaders";
// Assets
import PointsIcon from "../../assets/svg/points.svg?react";
import {
  AllTimeLeaderboardApi,
  CurrentweekLeaderboardApi,
  List,
  PreviousweekLeaderboardApi,
} from "./LeaderboardServices";

const variants = {
  neutral: { x: "-100%" },
  enter: { x: 0 },
  leave: { x: "-100%" },
};

const LeaderboardButton: FC<{
  isActive: boolean;
  onClick: () => void;
  label: string;
}> = ({ isActive, onClick, label }) => (
  <button
    onClick={onClick}
    className={
      isActive ? "miner-leaderboard-btn active" : "miner-leaderboard-btn"
    }
  >
    <img
      src={
        isActive
          ? "/assets/miner-leaderboard-btn-active.png"
          : "/assets/miner-leaderboard-btn.png"
      }
      className="custom-border miner-leaderboard-btn-custom-border"
      draggable="false"
      aria-hidden="true"
      alt=""
    />
    <span>{label}</span>
  </button>
);

const LeaderboardItem: FC<{
  rank: number;
  avatar: string;
  username: string;
  points: number;
}> = ({ rank, avatar, username, points }) => {
  return (
    <div className="leader-user">
      <img
        src="/assets/leader-container.png"
        className="custom-border leader-container-custom-border"
        draggable="false"
        aria-hidden="true"
        alt=""
      />

      <div className="user-leader-info">
        <div className="user-leader-info-left">
          <span className="user-rank">{rank}</span>
          <img
            className="user-avatar"
            src={avatar}
            draggable="false"
            alt={`${username} avatar`}
          />
          <span className="leaderboard-username">{username}</span>
        </div>
        <div className="user-leader-info-right">
          <PointsIcon />
          <span>{points}</span>
        </div>
      </div>
    </div>
  );
};

const MinerLeaderboard: FC = () => {
  // Current week, past week, all
  //       1          2        3
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [alltimeleaderboardData, setAlltimeleaderboardData] = useState<List[]>(
    []
  );
  const [currentweekleaderboardData, setCurrentweekleaderboardData] = useState<
    List[]
  >([]);
  const [previousweekleaderboardData, setPreviousweekleaderboardData] =
    useState<List[]>([]);

  const fetchLeaderboardData = async (
    apiCall: (page: number) => Promise<any>,
    setData: (data: any[]) => void,
    setLoading: (loading: boolean) => void,
    setTotalPages: (totalPages: number) => void,
    currentPage: number
  ) => {
    setLoading(true);
    try {
      const { data, status } = await apiCall(currentPage);
      if (status) {
        setData(data.List);
        setTotalPages(data.Totalpage);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (activeLeaderboardTab) {
      case 1:
        fetchLeaderboardData(
          CurrentweekLeaderboardApi,
          setCurrentweekleaderboardData,
          setLoading,
          setTotalPages,
          currentPage
        );
        break;
      case 2:
        fetchLeaderboardData(
          PreviousweekLeaderboardApi,
          setPreviousweekleaderboardData,
          setLoading,
          setTotalPages,
          currentPage
        );
        break;
      default:
        fetchLeaderboardData(
          AllTimeLeaderboardApi,
          setAlltimeleaderboardData,
          setLoading,
          setTotalPages,
          currentPage
        );
        break;
    }
  }, [activeLeaderboardTab, currentPage]);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Miner />
      <m.div
        initial="neutral"
        animate="enter"
        exit="leave"
        variants={variants}
        className="miner-leaderboard"
      >
        <img
          src="/assets/miner-leaderboard.png"
          draggable="false"
          aria-hidden="true"
          alt=""
          className="custom-border miner-leaderboard-custom-border"
        />

        <div className="miner-leaderboard-btns">
          <LeaderboardButton
            isActive={activeLeaderboardTab === 1}
            onClick={() => setActiveLeaderboardTab(1)}
            label="Current"
          />
          <LeaderboardButton
            isActive={activeLeaderboardTab === 2}
            onClick={() => setActiveLeaderboardTab(2)}
            label="Past Week"
          />
          <LeaderboardButton
            isActive={activeLeaderboardTab === 3}
            onClick={() => setActiveLeaderboardTab(3)}
            label="All"
          />
        </div>
        <div className="leaders-list">
          {activeLeaderboardTab === 1 &&
            (loading ? (
              <Loader />
            ) : currentweekleaderboardData &&
              currentweekleaderboardData.length > 0 ? (
              currentweekleaderboardData.map((data, index) => (
                <LeaderboardItem
                  key={index}
                  rank={index + 1}
                  avatar="/assets/placeholder.png"
                  username={data?.UserID?.userName}
                  points={data?.TotalRewards}
                />
              ))
            ) : (
              <div>No data exists</div>
            ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />

          {activeLeaderboardTab === 2 &&
            (loading ? (
              <Loader />
            ) : previousweekleaderboardData &&
              previousweekleaderboardData.length > 0 ? (
              previousweekleaderboardData.map((data, index) => (
                <LeaderboardItem
                  key={index}
                  rank={index + 1}
                  avatar="/assets/placeholder.png"
                  username={data?.UserID?.userName}
                  points={data?.TotalRewards}
                />
              ))
            ) : (
              <div>No data exists</div>
            ))}

          {activeLeaderboardTab === 3 &&
            (loading ? (
              <Loader />
            ) : alltimeleaderboardData && alltimeleaderboardData.length > 0 ? (
              alltimeleaderboardData.map((data, index) => (
                <LeaderboardItem
                  key={index}
                  rank={index + 1}
                  avatar="/assets/placeholder.png"
                  username={data?.UserID?.userName}
                  points={data?.TotalRewards}
                />
              ))
            ) : (
              <div>No data exists</div>
            ))}
        </div>

        {/* <div className="current-user-stats">
          <span className="you-indicator">YOU</span>
          <div className="current-user-stats-left">
            <span className="current-user-rank">1</span>
            <img
              className="current-user-avatar"
              src="/assets/placeholder.png"
              draggable="false"
              alt="Mindy avatar"
            />
            <span className="current-user-username">Mindy</span>
          </div>

          <div className="current-user-stats-right">
            <PointsIcon />
            <span>1232131232</span>
          </div>
        </div> */}
      </m.div>
    </>
  );
};

export default MinerLeaderboard;
