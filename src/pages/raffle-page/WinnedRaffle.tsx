import { FC } from "react";
import { useNavigate } from "react-router-dom";

const WinnedRaffle: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="raffle-win-page">
      <img
        className="custom-border raffle-win-border"
        src="/assets/raffle-win-border.png"
        aria-hidden="true"
        draggable="false"
        alt=""
      />

      <div className="raffle-name-title">1ST ROUND RAFFLE</div>

      <div className="winned-raffle-info">
        <div className="winned-raffle-info-top">
          <div className="duration info-item">
            <span className="info-item-name">Duration</span>
            <span className="info-item-info">2024-08-1 ~ 2024-08-07</span>
          </div>
          <div className="announcement info-item">
            <span className="info-item-name">Announcement Data</span>
            <span className="info-item-info">2024-08-07 12:00:00</span>
          </div>
          <div className="participants info-item">
            <span className="info-item-name">Participants</span>
            <span className="info-item-info">1082</span>
          </div>
          <div className="submitted-usb info-item">
            <span className="info-item-name">Submitted USB</span>
            <span className="info-item-info">2</span>
          </div>
        </div>

        <div className="winned-raffle-info-bottom">
          <span className="winning-message">Congratulations on winning!</span>
          <span className="winning-info">
            Check{" "}
            <span
              onClick={() => navigate("/my-page")}
              className="my-page-navigate"
            >
              My Page
            </span>{" "}
            to see what you've earned.
          </span>

          <div className="earned-items">
            <div className="blur-element" />
            <div className="earned-item">
              <img
                className="earned-item-img"
                src="/assets/ticket.png"
                aria-hidden="true"
                draggable="false"
                alt=""
              />
              <div className="earned-item-info">
                <span className="earned-item-name">Node Ticket</span>
                <span className="earned-item-amount">1x</span>
              </div>
            </div>

            <div className="earned-item">
              <img
                className="earned-item-img"
                src="/assets/nnn-chip.png"
                aria-hidden="true"
                draggable="false"
                alt=""
              />
              <div className="earned-item-info">
                <span className="earned-item-name">N-Chip</span>
                <span className="earned-item-amount">2x</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/my-page")}
            className="gotomypage-btn"
          >
            GO TO MY PAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnedRaffle;
