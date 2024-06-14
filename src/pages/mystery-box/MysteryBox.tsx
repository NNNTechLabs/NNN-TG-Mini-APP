import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as m } from "framer-motion";

// Components
import MysteryBoxInfo from "./MysteryBoxInfo";

// Utils
import { formatNumber } from "../../utils/functions";

// Assets
import InfoIcon from "../../assets/svg/question-button.svg?react";
import EnergyIcon from "../../assets/svg/points.svg?react";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

const AnimatedImage: FC<{
  boxCount: number;
  threshold: number;
  xPosition: number;
  yPosition: number;
  className: string;
}> = ({ boxCount, threshold, xPosition, yPosition, className }) => (
  <AnimatePresence>
    {boxCount >= threshold && (
      <m.img
        initial={{ opacity: 0, x: xPosition, y: yPosition }}
        animate={{ opacity: 1, x: xPosition, y: 0 }}
        exit={{ opacity: 0, x: xPosition, y: yPosition }}
        src="/assets/mystery-box-excited.gif"
        draggable="false"
        className={className}
        aria-hidden="true"
        alt=""
      />
    )}
  </AnimatePresence>
);

const MysteryBox: FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    showMysteryBoxInfo: false,
    boxCount: 1,
  });

  const boxPrice: number = 10000;

  useTelegramBackButton({ isVisible: false });

  const boxCountHandler = useCallback((type: "plus" | "minus") => {
    setState((prevState) => ({
      ...prevState,
      boxCount:
        type === "plus"
          ? prevState.boxCount + 1
          : Math.max(1, prevState.boxCount - 1),
    }));
  }, []);

  return state.showMysteryBoxInfo ? (
    <MysteryBoxInfo
      setShowMysteryBoxInfo={(show) =>
        setState((prevState) => ({ ...prevState, showMysteryBoxInfo: show }))
      }
    />
  ) : (
    <div className="mystery-box-page">
      <div className="mystery-box-title-wrapper">
        <h1 className="mystery-box-title">Mystery Box</h1>
        <InfoIcon
          className="mystery-box-info-icon"
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              showMysteryBoxInfo: true,
            }))
          }
        />
      </div>

      <div className="mystery-box-container">
        <img
          src="/assets/mystery-box-custom-border.png"
          draggable="false"
          aria-hidden="true"
          className="custom-border mystery-box-custom-border"
          alt=""
        />
        <img
          src="/assets/mystery-box-excited.gif"
          draggable="false"
          className="mystery-box-excited"
          aria-hidden="true"
          alt=""
        />

        <AnimatedImage
          boxCount={state.boxCount}
          threshold={5}
          xPosition={-100}
          yPosition={25}
          className="mystery-box-excited mystery-box-excited-two"
        />
        <AnimatedImage
          boxCount={state.boxCount}
          threshold={10}
          xPosition={-100}
          yPosition={25}
          className="mystery-box-excited mystery-box-excited-three"
        />
        <AnimatedImage
          boxCount={state.boxCount}
          threshold={15}
          xPosition={-100}
          yPosition={25}
          className="mystery-box-excited mystery-box-excited-four"
        />
        <AnimatedImage
          boxCount={state.boxCount}
          threshold={20}
          xPosition={100}
          yPosition={25}
          className="mystery-box-excited mystery-box-excited-five"
        />

        <div className="user-energy-count">
          <span>Total: {formatNumber(10000)}</span>
          <EnergyIcon className="energy-icon" />
        </div>

        <div className="mystery-box-asset-wrapper"></div>

        <div className="mystery-box-buttons">
          <div className="mystery-box-count-wrapper">
            <button
              onClick={() => boxCountHandler("minus")}
              className="count-minus-btn"
            >
              <img src="/assets/count-minus.png" draggable="false" alt="" />
            </button>

            <span className="box-count-text">{state.boxCount}</span>

            <button
              onClick={() => boxCountHandler("plus")}
              className="count-plus-btn"
            >
              <img src="/assets/count-plus.png" draggable="false" alt="" />
            </button>
          </div>

          <button className="mysterybox-buy-btn">
            <span>BUY</span>
            <span>
              {state.boxCount * boxPrice} <EnergyIcon />
            </span>
          </button>
        </div>
      </div>

      <div className="mystery-box-rewards-container">
        <img
          src="/assets/my-page-border-four.png"
          draggable="false"
          aria-hidden="true"
          className="custom-border mystery-box-custom-border"
          alt=""
        />

        <div className="next-rewards-info">
          Collect the Energy by completing <span>Mission</span>.
          <br />
          And get the Mystery Box!
        </div>

        <button onClick={() => navigate("/")} className="gotomissions-btn">
          GO TO MISSIONS
        </button>
      </div>
    </div>
  );
};

export default MysteryBox;
