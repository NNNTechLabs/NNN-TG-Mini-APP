import { FC, useState } from "react";
import { motion as m } from "framer-motion";
import { ClaimDailyRewards } from "./HomeServices";
import { notifyError, notifySuccess } from "../../utils/functions";
import { Loader } from "../../components/Loaders";
import { CheckinDetailsTypes } from "./HomeTypes";
interface BonusClaimProps {
  setCheckinDetails: React.Dispatch<React.SetStateAction<CheckinDetailsTypes>>;
}
const BonusClaim: FC<BonusClaimProps> = ({ setCheckinDetails }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClaimBonus = async () => {
    try {
      setLoading(true);
      const { status, data } = await ClaimDailyRewards();
      if (status) {
        notifySuccess(data?.message);
      } else {
        notifyError(data?.message);
      }
      setCheckinDetails((prev) => ({ ...prev, CanClaimMysteryBox: false }));
    } catch (error) {
      notifyError("An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "circOut" }}
      className="login-popup"
    >
      <m.div
        initial={{
          y: "100%",
          x: "-50%",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100%",
          x: "-50%",
        }}
        transition={{ duration: 0.25, ease: "circOut" }}
        onClick={(e) => e.stopPropagation()}
        className="login-popup-content"
      >
        <img
          draggable="false"
          src="/assets/login-content-border-top.png"
          className="login-border-top"
          aria-hidden="true"
          alt=""
        />
        <img
          draggable="false"
          src="/assets/login-content-border.png"
          className="login-border"
          aria-hidden="true"
          alt=""
        />
        <img
          draggable="false"
          src="/assets/login-content-border.png"
          className="login-border-2"
          aria-hidden="true"
          alt=""
        />
        <p>congratulations you got bonus reward click to claim</p>
        {loading ? (
          <Loader />
        ) : (
          <button onClick={handleClaimBonus}>Claim</button>
        )}
      </m.div>
    </m.div>
  );
};
export default BonusClaim;
