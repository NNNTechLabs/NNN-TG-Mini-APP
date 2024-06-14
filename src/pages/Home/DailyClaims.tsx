import { FC, useState, useEffect } from "react";
import { ClaimDailyRewards } from "./HomeServices";
import { notifyError, notifySuccess } from "../../utils/functions";
import { DailyClaim } from "../../types";

const DailyClaims: FC<{
  totalDays: number;
  currentDay: number;
  rewardamount: number;
  canClaim: boolean;
}> = ({ totalDays, currentDay, rewardamount, canClaim }) => {
  const [days, setDays] = useState<DailyClaim[]>([]);

  const [loadingDay, setLoadingDay] = useState<number | null>(null);

  useEffect(() => {
    const adjustedCurrentDay = canClaim ? currentDay : currentDay + 1;
    setDays(
      Array.from({ length: totalDays }, (_, index) => ({
        day: index + 1,
        points: 5,
        isClaimed: index < adjustedCurrentDay - 1,
      }))
    );
  }, [totalDays, currentDay, canClaim]);

  // Function to claim a day
  const handleClaim = async (dayIndex: number) => {
    try {
      setLoadingDay(dayIndex);
      const { status, data } = await ClaimDailyRewards();
      if (status) {
        notifySuccess(data?.message);
        const newDays = days.map((day, index) =>
          index === dayIndex ? { ...day, isClaimed: true } : day
        );
        setDays(newDays);
      } else {
        notifyError(data?.message);
      }
    } catch (error) {
      //
    } finally {
      setLoadingDay(null);
    }
  };

  return (
    <div className="claim-days-container">
      {days.map((day, index) => (
        <div
          className={`claim-box ${
            index === currentDay - 1 ? "active" : "inactive"
          }`}
          key={index}
        >
          <div
            className={
              index === currentDay - 1
                ? "light-element active"
                : "light-element"
            }
          />

          <img
            src="/assets/daily-claim-box.png"
            aria-hidden="true"
            draggable="false"
            className={`custom-border ${
              index !== currentDay - 1 ? "disabled" : ""
            }`}
            alt=""
          />
          <div>
            <div className="claim-box-info">
              <span>Day {day.day}</span>
              {index === currentDay ? (
                <span>{rewardamount} Reward</span>
              ) : (
                <span>{day.points} Points</span>
              )}
            </div>
            {loadingDay === index ? (
              <span className="loader">loading</span>
            ) : (
              <button
                className={
                  index === currentDay - 1 && canClaim
                    ? "claim-btn"
                    : "claim-btn disabled"
                }
                onClick={() => handleClaim(index)}
                disabled={
                  index !== currentDay - 1 || day.isClaimed || !canClaim
                }
              >
                {day.isClaimed
                  ? "Claimed"
                  : index < currentDay - 1
                  ? "Already Claimed"
                  : index === currentDay - 1 && canClaim
                  ? "Claim Now"
                  : "Come Back Tomorrow"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyClaims;
