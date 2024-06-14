import { FC } from "react";

const AllRaffles: FC = () => {
  const rafflesArrayLength = 3;

  return (
    <>
      <h3 className="raffles-title">RAFFLES</h3>

      <div className="raffles-container">
        <img
          className="custom-border raffle-border-three"
          src="/assets/raffle-custom-border-three.png"
          aria-hidden="true"
          draggable="false"
          alt=""
        />

        <div className="raffles-content">
          {Array.from({ length: rafflesArrayLength }).map((_, index) => (
            <div key={index} className="raffle-item">
              <div className="raffle-item-left">
                <span className="raffle-item-name">1ST ROUND RAFFLE</span>
                <div className="raffle-item-calendar-info">
                  <img
                    aria-hidden="true"
                    src="/assets/calendar-icon.png"
                    draggable="false"
                    className="calendar-icon"
                    alt=""
                  />
                  <span>2024-08-1 • 2024-08-07</span>
                </div>
              </div>

              <div className="raffle-people-info">387 people joined</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllRaffles;
