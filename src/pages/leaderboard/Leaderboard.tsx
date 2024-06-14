import { FC, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Components
import MinerLeaderboard from "./MinerLeaderboard";
import SquadLeaderboard from "./SquadLeaderboard";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

const Leaderboard: FC = () => {
  const [activeTab, setActiveTab] = useState({ miner: true, squad: false });

  const tabChangeHandler = (tab: string) => {
    if (tab === "miner") {
      setActiveTab({ miner: true, squad: false });
    } else {
      setActiveTab({ miner: false, squad: true });
    }
  };

  useTelegramBackButton({ isVisible: false });

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-btns-wrapper">
        <div
          onClick={() => tabChangeHandler("miner")}
          className={
            activeTab.miner
              ? "miner-btn leaderboard-btn active"
              : "miner-btn leaderboard-btn"
          }
        >
          {activeTab.miner ? (
            <img
              className="custom-border"
              src="/assets/leaderboard-btn-active.png"
              aria-hidden="true"
              draggable="false"
              alt=""
            />
          ) : (
            <img
              className="custom-border"
              src="/assets/leaderboard-btn.png"
              aria-hidden="true"
              draggable="false"
              alt=""
            />
          )}

          <span>Miner</span>
        </div>

        <div
          onClick={() => tabChangeHandler("squad")}
          className={
            activeTab.squad
              ? "squad-btn leaderboard-btn active"
              : "squad-btn leaderboard-btn"
          }
        >
          {activeTab.squad ? (
            <img
              className="custom-border"
              src="/assets/leaderboard-btn-active.png"
              aria-hidden="true"
              draggable="false"
              alt=""
            />
          ) : (
            <img
              className="custom-border"
              src="/assets/leaderboard-btn.png"
              aria-hidden="true"
              draggable="false"
              alt=""
            />
          )}

          <span>Squad</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab.miner ? <MinerLeaderboard /> : <SquadLeaderboard />}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;
