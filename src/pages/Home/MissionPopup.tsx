import React from "react";
import { useStore } from "../../context/useStore";
import { useNavigate } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

// Utils
import { truncateAddress } from "../../utils/functions";

// Assets
import WalletIcon from "../../assets/svg/wallet.svg?react";
import JoystickIcon from "../../assets/svg/joystick.svg?react";
import ExploreIcon from "../../assets/svg/eye.svg?react";
import PointsIcon from "../../assets/svg/points.svg?react";
import CalendarIcon from "../../assets/svg/date.svg?react";
import VerifyButton from "../../assets/svg/go-btn.svg?react";

const MissionPopup: React.FC = () => {
  const navigate = useNavigate();
  const walletAddress: string = useTonAddress();
  const selectedMission = useStore((state) => state.selectedMission);

  useTelegramBackButton({
    isVisible: true,
    onClick: () => {
      WebApp.HapticFeedback.impactOccurred("light");
      useStore.getState().setSelectedMission([]);

      navigate("/");
    },
  });

  if (selectedMission.length === 0) {
    navigate("/");
  }

  return (
    <div className="mission-popup">
      <div className="mission-popup-titles">
        <h2>{selectedMission[0]?.name}</h2>
        <p>{selectedMission[0]?.description}</p>
      </div>

      <div className="user-wallet-wrapper">
        <img
          className="custom-border wallet-custom-border"
          src="/assets/wallet-custom-border.png"
          aria-hidden="true"
          draggable="false"
          alt=""
        />

        <WalletIcon aria-hidden="true" className="wallet-icon" />

        <span className="user-wallet-address">
          {truncateAddress(walletAddress, 10, 10)}
        </span>
      </div>

      <div className="play-explore-wrapper">
        <button
          onClick={() => WebApp.showAlert(selectedMission[0]?.playLink)}
          className="popup-play-btn"
        >
          <JoystickIcon aria-hidden="true" />
          <span>PLAY</span>
        </button>
        <button
          onClick={() => WebApp.showAlert(selectedMission[0]?.missionLink)}
          className="popup-explore-btn"
        >
          <ExploreIcon className="explore-icon" aria-hidden="true" />
          <span>EXPLORE</span>
        </button>
      </div>

      <div className="game-missions-wrapper">
        {selectedMission[0]?.gameQuests?.map((quest) => (
          <div key={quest.name} className="popup-game-mission-card">
            <img
              src={
                quest.isCompleted
                  ? "/assets/game-mission-custom-border-completed.png"
                  : "/assets/game-mission-custom-border.png"
              }
              draggable="false"
              aria-hidden="true"
              className="custom-border game-mission-custom-border"
              alt=""
            />

            <img
              src={quest.imageSrc}
              alt=""
              draggable="false"
              className="game-mission-card-img"
              aria-hidden="true"
            />

            {quest.isCompleted ? (
              <div className="mission-completed-info">
                <span>Mission "{quest.name}" has been completed.</span>
              </div>
            ) : (
              <div className="game-mission-card-info">
                <div className="game-mission-info-left">
                  <h3>{quest.name}</h3>
                  <div className="total-energy-points">
                    <PointsIcon className="points-icon" aria-hidden="true" />
                    <span>{quest.points} Points</span>
                  </div>
                  <div className="expiration">
                    <CalendarIcon
                      className="calendar-icon"
                      aria-hidden="true"
                    />
                    <span>{quest.expirationDate}</span>
                  </div>
                </div>

                <button className="game-mission-verify-btn">
                  <VerifyButton className="verify-icon" aria-hidden="true" />

                  <span>VERIFY</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionPopup;
