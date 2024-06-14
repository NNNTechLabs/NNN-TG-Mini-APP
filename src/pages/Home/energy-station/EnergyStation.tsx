import { FC, useEffect, useState } from "react";
import { useTransferContract } from "../../../hooks/useTransferContract";
import { AnimatePresence } from "framer-motion";
import { useStore } from "../../../context/useStore";

// Components
import EnergyProgress from "../../../components/EnergyProgress";
import {
  TransactionSuccess,
  TransactionFailed,
} from "../../../components/TransactionSuccess";
import Tamabot from "./Tamabot";

// Utils
import { formatNumber } from "../../../utils/functions";

// Assets
import SquadIcon from "../../../assets/svg/squad.svg?react";
import EnergyIcon from "../../../assets/svg/points.svg?react";
import TonIcon from "../../../assets/svg/ton.svg?react";

// Types
import { MissionComponentProps } from "../../../types";

const EnergyStation: FC<MissionComponentProps> = ({ setNavIndex }) => {
  const { userEnergy, userMaxEnergy } = useStore();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const { sendDeposit } = useTransferContract();

  useEffect(() => {
    setNavIndex(0);
  }, []);

  const claimHandler = () => {
    sendDeposit();
  };

  return (
    <>
      <AnimatePresence>
        {isSuccess && <TransactionSuccess setIsSuccess={setIsSuccess} />}
      </AnimatePresence>

      <AnimatePresence>
        {isFailed && <TransactionFailed setIsFailed={setIsFailed} />}
      </AnimatePresence>

      <div className="energy-station-page">
        <img
          className="energy-station-custom-border"
          src="/assets/energy-station-border-top.png"
          draggable="false"
          aria-hidden="true"
          alt=""
        />

        <div className="user-energy-count">
          <span>{formatNumber(16000000)}</span>
          <EnergyIcon />
        </div>

        <div className="energy-station">
          <div className="squad-name-wrapper">
            <SquadIcon />
            <span>YAYLABS</span>
          </div>

          <div className="energy-station-content">
            <div className="my-station">
              <span className="my-station-title">My Station</span>

              <div className="my-station-left">
                <img
                  src="/assets/my-station-battery.png"
                  alt=""
                  className="my-station-battery-img"
                />

                <EnergyProgress value={userEnergy} maxValue={userMaxEnergy} />
              </div>

              <div className="my-station-right">
                <button onClick={claimHandler} className="claim-x2-btn">
                  <TonIcon />
                  <span>CLAIM 2X</span>
                </button>
              </div>
            </div>
          </div>

          <Tamabot />
        </div>
      </div>
    </>
  );
};

export default EnergyStation;
