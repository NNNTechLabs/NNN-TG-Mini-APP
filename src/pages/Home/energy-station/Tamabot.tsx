import { useState, useRef, FC, useEffect } from "react";
import { useStore } from "../../../context/useStore";
import TierUpgradeIcon from "../../../assets/svg/tier.svg?react";
import ArrowIcon from "../../../assets/svg/arrow.svg?react";
import PointsIcon from "../../../assets/svg/points.svg?react";
import {
  GameState,
  TamabotContentProps,
  TamabotUpgradeProps,
  GifPositionProps,
} from "../../../types";
import useTelegramBackButton from "../../../hooks/useTelegramBackButton";
import { notifyError } from "../../../utils/functions";

const alienImages: string[] = [
  "/alien/1.gif",
  "/alien/2.gif",
  "/alien/3.gif",
  "/alien/4.gif",
  "/alien/5.gif",
];

const initialState: GameState = {
  level: 1,
  energy: 100,
  maxEnergy: 100,
  clickEarnEnergy: 1,
  recoveryEnergyPerSecond: 1,
};

const TamabotUpgrade: FC<TamabotUpgradeProps> = ({
  setIsUpgrading,
  userTamabot,
  alienImageLevelHandler,
}) => {
  useTelegramBackButton({
    isVisible: true,
    onClick: () => setIsUpgrading(false),
  });

  const energyToLevelUp = (level: number): number | null => {
    return level < 1 ? null : 200 * Math.pow(1.3, level - 1);
  };

  return (
    <>
      <h3 className="upgrade-tamabot-title">UPGRADING TAMABOT</h3>

      <div className="upgrade-tamabot-content">
        <div className="upgrade-tamabot-content-left">
          <TierUpgradeIcon className="tier-upgrade-icon" aria-hidden="true" />
          <div className="upgrading-level-info-container">
            <span className="next-level">LEVEL {userTamabot.level + 1}</span>
            <ArrowIcon className="arrow-icon" aria-hidden="true" />
            <span className="current-level">LEVEL {userTamabot.level}</span>
          </div>

          <img
            className="alien-image-upgrade"
            draggable="false"
            alt="User alien"
            src={alienImageLevelHandler(userTamabot.level)}
          />
        </div>

        <div className="upgrade-tamabot-content-right">
          <div className="energy-upgrade-info-wrapper">
            <div className="energy-recovery-wrapper">
              <span className="next-level-info-title">Energy Recovery</span>
              <span className="current-level">
                {userTamabot.recoveryEnergyPerSecond}
              </span>
              <span className="next-level">
                {userTamabot.recoveryEnergyPerSecond + 0.2}
              </span>
            </div>
            <div className="energy-recovery-wrapper">
              <span className="next-level-info-title">Max Energy</span>
              <span className="current-level">{userTamabot.maxEnergy}</span>
              <span className="next-level">{userTamabot.maxEnergy + 10}</span>
            </div>
          </div>

          <button className="upgrade-tamabot-button">
            <span>UPGRADE</span>
            <span>
              <PointsIcon className="points-icon" aria-hidden="true" />
              {`${energyToLevelUp(userTamabot.level)?.toFixed(0)} energy`}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

const TamabotContent: FC<TamabotContentProps> = ({
  userTamabot,
  alienImageLevelHandler,
  userEnergyCount,
  setIsUpgrading,
  isClicking,
}) => {
  useTelegramBackButton({ isVisible: false });

  return (
    <div className="tamabot-content-container">
      <div className={`energy-lines ${isClicking ? "active" : ""}`}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>

      <div className="energy-battery-wrapper">
        <img
          src="/assets/tamabot-battery.png"
          draggable="false"
          aria-hidden="true"
          alt=""
          className="tamabot-battery-img"
        />
        <span className="tamabot-energy-count">{`${userEnergyCount}/${userTamabot.maxEnergy}`}</span>
      </div>

      <div className="tamabot-content">
        <div className="my-tamabot-title">
          <span className="my-tamabot">My Tamabot</span>
          <span className="level-info">LEVEL {userTamabot.level}</span>
        </div>

        <img
          src={alienImageLevelHandler(userTamabot.level)}
          alt={`${userTamabot.level} level alien`}
          draggable="false"
          className={`alien-image ${isClicking ? "clicking" : ""}`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUpgrading(true);
          }}
          className="upgrade-tamabot-btn"
        >
          <span>UPGRADE</span>
        </button>
      </div>
    </div>
  );
};

const Tamabot: FC = () => {
  const { userEnergy, setUserEnergy, userMaxEnergy } = useStore();
  const [userTamabot] = useState<GameState>(initialState);
  const [isUpgrading, setIsUpgrading] = useState<boolean>(false);
  const [showGif, setShowGif] = useState<boolean>(false);
  const [gifPosition, setGifPosition] = useState<GifPositionProps>({
    top: 0,
    left: 0,
    rotation: 0,
  });
  const [userEnergyCount, setUserEnergyCount] = useState<number>(100);
  const [messageShown, setMessageShown] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState(false);

  const tamabotContainerRef = useRef<HTMLDivElement | null>(null);

  const EFFECT_GIF_WIDTH = 75;
  const EFFECT_GIF_HEIGHT = 75;

  const alienImageLevelHandler = (level: number): string => {
    const index = Math.min(Math.floor(level / 5), alienImages.length - 1);
    return alienImages[index];
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isUpgrading || !tamabotContainerRef.current) return;

    if (userEnergy >= userTamabot.maxEnergy) {
      if (!messageShown) {
        notifyError("Your energy is maxed out. Claim your energy!");
        setMessageShown(true);
      }
      return;
    }

    const { clientX, clientY } = e;
    const container = tamabotContainerRef.current?.getBoundingClientRect();

    setGifPosition({
      rotation: Math.random() * 360,
      top: clientY - container.top - EFFECT_GIF_HEIGHT / 2,
      left: clientX - container.left - EFFECT_GIF_WIDTH / 2,
    });

    setShowGif(true);
    setIsClicking(true);

    setTimeout(() => {
      setShowGif(false);
    }, 200);

    setUserEnergyCount((prev) => Math.max(prev - 1, 0));
    setUserEnergy(
      Math.min(userEnergy + userTamabot.clickEarnEnergy, userMaxEnergy)
    );

    clearTimeout((window as any).clickTimeout);

    (window as any).clickTimeout = setTimeout(() => {
      setIsClicking(false);
    }, 1000);
  };

  useEffect(() => {
    if (userEnergyCount < userTamabot.maxEnergy) {
      const interval = setInterval(() => {
        setUserEnergyCount((prev) => Math.min(prev + 1, userTamabot.maxEnergy));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userEnergyCount, userTamabot.maxEnergy]);

  return (
    <div
      ref={tamabotContainerRef}
      className={
        isUpgrading
          ? "tamabot-container upgrading-tamabot"
          : "tamabot-container"
      }
      onClick={handleClick}
    >
      {isUpgrading ? (
        <TamabotUpgrade
          setIsUpgrading={setIsUpgrading}
          userTamabot={userTamabot}
          alienImageLevelHandler={alienImageLevelHandler}
          isClicking={isClicking}
        />
      ) : (
        <TamabotContent
          setIsUpgrading={setIsUpgrading}
          userTamabot={userTamabot}
          userEnergyCount={userEnergyCount}
          alienImageLevelHandler={alienImageLevelHandler}
          isClicking={isClicking}
        />
      )}
      {showGif && (
        <div
          className="gif-overlay"
          style={{
            width: EFFECT_GIF_WIDTH,
            height: EFFECT_GIF_HEIGHT,
            top: gifPosition.top,
            left: gifPosition.left,
            position: "absolute",
            transform: `rotate(${gifPosition.rotation}deg)`,
          }}
        >
          <img
            src="/vfx/click-effect.gif"
            alt="Interactive GIF"
            className="interactive-gif"
          />
        </div>
      )}
      {/* {isClicking && <div className="animation">Animation</div>} */}
    </div>
  );
};

export default Tamabot;
