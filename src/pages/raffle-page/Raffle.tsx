import { FC, useState } from "react";
import WebApp from "@twa-dev/sdk";

// Components
import MyHistory from "./MyHistory";
import AllRaffles from "./AllRaffles";
import WinnedRaffle from "./WinnedRaffle";
import RaffleInfo from "./RaffleInfo";

// Assets
import InfoIcon from "../../assets/svg/question-button.svg?react";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";
import CircularProgress from "../../components/CircularProgress";

const Raffle: FC = () => {
  const [isAutoJoin, setIsAutoJoin] = useState<boolean>(false);
  const [isRaffleInfoOpen, setIsRaffleInfoOpen] = useState<boolean>(false);
  const isWinned = false;

  useTelegramBackButton({ isVisible: false });

  const autoJoinHandler = (): void => {
    WebApp.HapticFeedback.impactOccurred("light");
    setIsAutoJoin(!isAutoJoin);
  };

  return isWinned ? (
    <WinnedRaffle />
  ) : (
    <>
      {isRaffleInfoOpen ? (
        <RaffleInfo setIsRaffleInfoOpen={setIsRaffleInfoOpen} />
      ) : (
        <div className="raffle-page">
          <div className="raffle-title-wrapper">
            <h1 className="raffle-title">Node Raffle</h1>
            <InfoIcon
              onClick={() => setIsRaffleInfoOpen(true)}
              className="raffle-tutorial-btn"
            />
          </div>

          <div className="node-raffle-container">
            <img
              draggable="false"
              aria-hidden="true"
              className="custom-border raffle-border-one"
              src="/assets/raffle-custom-border-one.png"
              alt=""
            />

            <div className="node-raffle-top">
              <div className="node-raffle-top-left">
                <span className="raffle-round">2ND ROUND</span>
                <span className="closing-info">Closing in 2 days!</span>
              </div>

              <div className="raffle-calendar-info">
                <img
                  className="calendar-icon"
                  src="/assets/calendar-icon.png"
                  aria-hidden="true"
                  draggable="false"
                  alt=""
                />
                <span className="calendar-info">2024-08-1 • 2024-08-07</span>
              </div>
            </div>

            <div className="node-raffle-inner">
              <div className="node-raffle-inner-top">
                <div className="node-raffle-user-usbs">
                  <span className="your-raffle-usbs">Your USBs:</span>
                  <span className="user-raffle-usb-amount">1x</span>
                  <img
                    className="user-raffle-usb"
                    src="/assets/raffle-usb.png"
                    draggable="false"
                    aria-hidden="true"
                    alt=""
                  />
                </div>

                <button
                  onClick={autoJoinHandler}
                  title="Open Auto Join"
                  className="auto-join-btn"
                >
                  <span>Auto Join</span>
                  <span
                    className={isAutoJoin ? "auto-join on" : "auto-join off"}
                  >
                    {isAutoJoin ? (
                      <img
                        className="on-off-btn-img"
                        src="/assets/on-button.png"
                        draggable="false"
                        aria-hidden="true"
                        alt=""
                      />
                    ) : (
                      <img
                        className="on-off-btn-img"
                        src="/assets/off-button.png"
                        draggable="false"
                        aria-hidden="true"
                        alt=""
                      />
                    )}
                  </span>
                </button>
              </div>

              <div className="node-raffle-inner-center">
                <div className="raffle-machine-wrapper">
                  <img
                    aria-hidden="true"
                    draggable="false"
                    src="/assets/raffle-machine.png"
                    alt=""
                    className="raffle-machine-img"
                  />

                  <img
                    className="raffle-usb-machine"
                    src="/assets/raffle-usb.png"
                    draggable="false"
                    aria-hidden="true"
                    alt=""
                  />
                </div>

                <div className="node-raffle-progress">
                  <CircularProgress
                    size={100}
                    strokeWidth={8}
                    duration={60}
                    showName={true}
                  />
                </div>
              </div>

              <div className="node-raffle-infos-wrapper">
                <div className="announcement-date">
                  <span className="announcement-date-title">
                    Announcement Date:
                  </span>
                  <span className="announcement-date-info">
                    2024-08-08 12:00:00
                  </span>
                </div>

                <div className="participants">
                  <span className="participants-title">Participants:</span>
                  <span className="participants-info">62</span>
                </div>

                <div className="submitted-usbs">
                  <span className="submitted-usbs-title">Submitted USBs:</span>
                  <span className="submitted-usbs-info">1</span>
                </div>
              </div>

              {isAutoJoin && (
                <>
                  <img
                    className="auto-join-asset"
                    src="/assets/auto-electricity-left.gif"
                    aria-hidden="true"
                    alt=""
                  />
                  <img
                    className="auto-join-asset auto-join-asset-right"
                    src="/assets/auto-electricity-left.gif"
                    aria-hidden="true"
                    alt=""
                  />
                </>
              )}
              <button
                className={
                  isAutoJoin
                    ? "join-raffle-btn auto-join-on"
                    : "join-raffle-btn"
                }
              >
                {isAutoJoin ? (
                  <>
                    <img
                      className="auto-join-gif"
                      src="/assets/auto-electricity.gif"
                      aria-hidden="true"
                      alt=""
                    />
                    <span>AUTO JOIN</span>
                    <span>ACTIVATED</span>
                  </>
                ) : (
                  <>
                    <span>JOIN</span>
                    <span>1x Raffle USB</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <MyHistory />
          <AllRaffles />
        </div>
      )}
    </>
  );
};

export default Raffle;
