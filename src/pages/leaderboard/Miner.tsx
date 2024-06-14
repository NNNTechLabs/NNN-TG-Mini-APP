import { FC } from "react";
import { motion as m } from "framer-motion";
// Assets
import EnergyIcon from "../../assets/svg/points.svg?react";
import SquadIcon from "../../assets/svg/squad.svg?react";
import ReferralIcon from "../../assets/svg/referral.svg?react";

const variants = {
  neutral: { x: "-100%" },
  enter: { x: 0 },
  leave: { x: "-100%" },
};

const Miner: FC = () => {
  return (
    <m.div
      initial="neutral"
      animate="enter"
      exit="leave"
      variants={variants}
      className="leaderboard-user-info"
    >
      <img
        className="custom-border leaderboard-custom-border-one"
        src="/assets/leaderboard-border-one.png"
        draggable="false"
        aria-hidden="true"
        alt=""
      />

      <div className="leaderboard-user-info-left">
        <span className="leaderboard-username">Mindy</span>
      </div>

      <div className="leaderboard-user-info-right">
        <div className="leaderboard-user-energy leaderboard-miner-info">
          <div className="energy-title">
            <EnergyIcon className="leaderboard-energy-icon" />
            <span>Energy</span>
          </div>

          <span className="user-total-energy user-info">92382138</span>
        </div>

        <div className="leaderboard-user-squad leaderboard-miner-info">
          <div className="squad-title">
            <SquadIcon className="leaderboard-squad-icon" />
            <span className="user-squad">Squad</span>
          </div>

          <span className="user-squad-name user-info">YAYLABS</span>
        </div>

        <div className="leaderboard-user-referral leaderboard-miner-info">
          <div className="referral-title">
            <ReferralIcon className="leaderboard-referral-icon" />
            <span className="user-squad">Referral</span>
          </div>

          <span className="user-referral-name user-info">123458699</span>
          <button
            title="Copy your referral number"
            className="leaderboard-referral-btn"
          >
            <img
              src="/assets/copy-icon.png"
              className="copy-icon"
              draggable="false"
              aria-hidden="true"
              alt=""
            />
          </button>
        </div>
      </div>
    </m.div>
  );
};

export default Miner;
