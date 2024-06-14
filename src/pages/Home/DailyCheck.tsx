import { FC, useEffect, useState } from "react";
import { CheckinDetailsTypes } from "./HomeTypes";
import { DailyCheckinDetails } from "./HomeServices";

// Components
import DailyClaims from "./DailyClaims";
import BonusClaim from "./BonusClaim";
// import { FullscreenLoader } from "../../components/Loaders";

// Types
import { MissionComponentProps } from "../../types";

const electricitySrc = "/assets/auto-electricity-left.gif";

const DailyCheck: FC<MissionComponentProps> = ({ setNavIndex }) => {
  const token = localStorage.getItem("token");
  const [checkinDetails, setCheckinDetails] = useState<CheckinDetailsTypes>({
    status: false,
    day: 0,
    MysteryBox: false,
    CanClaimDailyReward: false,
    CanClaimMysteryBox: false,
    TotalDayCounter: 0,
    TodayRewards: 0,
  });

  useEffect(() => {
    setNavIndex(3);

    getDetails();
  }, [token]);

  const getDetails = async () => {
    const { status, data } = await DailyCheckinDetails();
    if (status) {
      setCheckinDetails(data);
    }
  };

  const getProgressBarWidth = () => {
    const maxDays = 7;
    return `${(checkinDetails.day / maxDays) * 100}%`;
  };

  const getInverseClipPathWidth = () => {
    const maxDays = 7;

    return `${((maxDays - checkinDetails.day) / maxDays) * 100}%`;
  };

  return (
    <>
      {checkinDetails.CanClaimMysteryBox && (
        <BonusClaim setCheckinDetails={setCheckinDetails} />
      )}

      {/* <FullscreenLoader /> */}
      <section className="daily-checkin">
        <div className="bonus-rewards-wrapper">
          <h2 className="bonus-rewards-title">BONUS REWARDS</h2>

          <div className="points-title">
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                key={index}
                className={`points ${
                  index + 1 <= checkinDetails.day ? "claimed" : ""
                }`}
              >
                Day {index + 1}
              </span>
            ))}
          </div>

          <div className="bonus-rewards-progress-wrapper">
            <div
              className="electricity-gif-wrapper"
              style={{
                clipPath: `inset(0% ${getInverseClipPathWidth()} 0% 0%)`,
              }}
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <img
                  key={index}
                  src={electricitySrc}
                  draggable="false"
                  className={`electricity-gif electricity-gif-${index + 1}`}
                  aria-hidden="true"
                  alt=""
                />
              ))}
            </div>
            <div className="bonus-progress-container">
              <div className="bonus-progress-bar">
                <img
                  src="/assets/nnn-chip.png"
                  draggable="false"
                  aria-hidden="true"
                  className="nnn-chip-asset"
                  alt=""
                />

                <div
                  className="bonus-progress-inner"
                  style={{ width: getProgressBarWidth() }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="daily-check-container">
          <img
            src="assets/daily-check-container.png"
            draggable="false"
            className="daily-check-container-image"
            aria-hidden="true"
            alt=""
          />
          <h2 className="daily-claim-title">DAILY CLAIM</h2>

          <DailyClaims
            currentDay={checkinDetails?.day}
            canClaim={checkinDetails.CanClaimDailyReward}
            rewardamount={checkinDetails.TodayRewards}
            totalDays={7}
          />
        </div>
      </section>
    </>
  );
};

export default DailyCheck;
