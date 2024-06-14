import { FC } from "react";
import { useStore } from "../../context/useStore";
import { motion as m } from "framer-motion";

// Hooks
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

// Assets
import SquadIcon from "../../assets/svg/squad.svg?react";
import PointsIcon from "../../assets/svg/points.svg?react";

const joinBackgroundVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
};

const joinContentVariants = {
  initial: { y: "100%" },
  enter: { y: 0 },
  leave: { y: "100%" },
};

export const SquadJoinPopup: FC = () => {
  const { setIsJoinSquadOpen } = useStore();

  useTelegramBackButton({
    isVisible: true,
    onClick: () => setIsJoinSquadOpen(false),
  });

  return (
    <div onClick={() => setIsJoinSquadOpen(false)} className="join-squad">
      <m.div
        initial="initial"
        animate="enter"
        exit="leave"
        variants={joinContentVariants}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="join-squad-container"
      >
        <div className="join-squad-titles">
          <h1 className="join-squad-title">YAYLABS</h1>
          <p className="join-squad-subtitle">1.111 people have joined</p>
        </div>

        <div className="squad-info-wrapper">
          <img
            draggable="false"
            src="/assets/default-squad-avatar.png"
            alt="Squad avatar"
            className="squad-avatar-join"
          />

          <div className="squad-stats">
            <div className="total-energy">
              <span>Total energy</span>
              <div className="energy-count">
                <PointsIcon />
                <span>1231321312</span>
              </div>
            </div>

            <div className="rank-stats">
              <span>Rank</span>
              <span>Bronze</span>
            </div>
          </div>
        </div>

        <button className="join-squad-button">JOIN SQUAD</button>
      </m.div>
    </div>
  );
};

export const SquadCreatePopup: FC = () => {
  const { setIsCreateSquadOpen } = useStore();

  useTelegramBackButton({
    isVisible: true,
    onClick: () => setIsCreateSquadOpen(false),
  });

  return (
    <m.div
      initial="initial"
      animate="enter"
      exit="leave"
      variants={joinBackgroundVariants}
      onClick={() => setIsCreateSquadOpen(false)}
      className="create-squad"
    >
      <m.div
        initial="initial"
        animate="enter"
        exit="leave"
        variants={joinContentVariants}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="join-squad-container"
      >
        <div className="join-squad-titles">
          <h1 className="join-squad-title">CREATE OR JOIN SQUAD</h1>
          <p className="join-squad-subtitle">
            Enter the public group or channel link
          </p>
        </div>

        <div className="join-squad-input-wrapper">
          <SquadIcon />
          <input
            type="text"
            placeholder="Your squad name"
            className="join-squad-input squad-name-input"
          />
        </div>

        <div className="join-squad-input-wrapper">
          <SquadIcon />
          <input
            type="text"
            placeholder="0000000"
            className="join-squad-input"
          />
        </div>
        <button className="join-squad-button">JOIN SQUAD</button>
      </m.div>
    </m.div>
  );
};
