import { FC } from "react";

// Assets
import ResultIcon from "../../assets/svg/result.svg?react";

const MyHistoryNotEmpty: FC = () => {
  const historyArrayLength = 5;

  return (
    <>
      <div className="my-history-container with-history">
        {historyArrayLength > 3 && (
          <p className="scroll-indicator">Scroll to see more</p>
        )}

        <img
          className="custom-border raffle-border-two"
          src="/assets/raffle-custom-border-two.png"
          aria-hidden="true"
          draggable="false"
          alt=""
        />

        <div className="my-history-content">
          {Array.from({ length: historyArrayLength }).map((_, index) => (
            <div key={index + 15} className="my-history-item">
              <div className="my-history-left">
                <span className="my-history-name">1ST ROUND RAFFLE</span>
                <div className="history-raffle-calendar">
                  <img
                    className="calendar-icon"
                    src="/assets/calendar-icon.png"
                    draggable="false"
                    aria-hidden="true"
                    alt=""
                  />
                  <span>2024-08-1 • 2024-08-07</span>
                </div>
              </div>

              <button className="see-results-btn">
                <ResultIcon className="see-results-icon" />
                <span>See Results</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const MyHistoryEmpty: FC = () => {
  return (
    <div className="my-history-container no-history">
      <img
        className="custom-border raffle-border-two"
        src="/assets/my-page-border-three.png"
        aria-hidden="true"
        draggable="false"
        alt=""
      />

      <div className="my-history-content ">
        <span className="join-indicator-text">
          Join the New Raffle with Raffle USB!
        </span>

        <button title="Get Raffle USB" className="get-raffle-btn">
          Get Raffle USB
        </button>
      </div>
    </div>
  );
};

const MyHistory: FC = () => {
  const isEmptyHistory = false;

  return (
    <>
      <h3 className="my-history-title">My History</h3>

      {isEmptyHistory ? <MyHistoryEmpty /> : <MyHistoryNotEmpty />}
    </>
  );
};

export default MyHistory;
