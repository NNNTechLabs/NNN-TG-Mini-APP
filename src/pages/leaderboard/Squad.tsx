import { FC, useState } from "react";
import { useStore } from "../../context/useStore";
import { motion as m } from "framer-motion";
import { UserCurrentSquad, leaveSquadApi } from "./Squadservices";
import { notifyError, notifySuccess } from "../../utils/functions";
import { Loader } from "../../components/Loaders";
export const SquadNoJoined: FC = () => {
  const { setIsCreateSquadOpen } = useStore();

  return (
    <m.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      className="squad-user-info no-squad"
    >
      <img
        src="/assets/leaderboard-squad-border.png"
        draggable="false"
        aria-hidden="true"
        className="custom-border squad-custom-border-one"
        alt=""
      />

      <span className="join-squad-message">JOIN THE SQUAD</span>

      <div className="join-squad-description">
        <span>These Squads recruiting now.</span>
        <span>Do you want to join and earn together?</span>
        <span>Maximize profits and climb rankings!</span>
      </div>

      <button
        onClick={() => {
          setIsCreateSquadOpen(true);
          console.log("Create squad button clicked");
        }}
        className="join-squad-btn"
      >
        <img
          src="/assets/join-squad-btn-border.png"
          draggable="false"
          aria-hidden="true"
          alt=""
          className="custom-border"
        />
        <span>Create & Join Squad</span>
      </button>
    </m.div>
  );
};
interface SquadJoinedProps {
  squad: UserCurrentSquad | null;
}
export const SquadJoined: FC<SquadJoinedProps> = ({ squad }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const LeaveSquadHandler = async () => {
    try {
      setLoading(true);
      const leave_squad_api = await leaveSquadApi();
      if (leave_squad_api.data.status) {
        notifySuccess(leave_squad_api.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        notifyError(leave_squad_api.data.message);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  return (
    <m.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      className="squad-user-info"
    >
      <img
        src="/assets/leaderboard-squad-border.png"
        draggable="false"
        aria-hidden="true"
        className="custom-border squad-custom-border-one"
        alt=""
      />

      <div
        style={{ backgroundImage: "url('/assets/default-squad-avatar.png')" }}
        className="squad-avatar"
      />

      <div className="squad-user-info-right">
        <span className="squad-name">{squad?.SquadName}</span>

        <div className="squad-energy">
          <span>Energy</span>
          <span className="squad-energy-value">{squad?.RankNumber}</span>
        </div>

        <div className="rank-people-wrapper">
          <div className="squad-rank">
            <span>Rank</span>
            <span className="rank-value">{squad?.RankName}</span>
          </div>

          <div className="squad-people">
            <span>People</span>
            <span className="people-value">1.111</span>
          </div>
        </div>

        <div className="squad-buttons">
          <button className="invite-btn">
            <img
              src="/assets/invite-friend-btn.png"
              draggable="false"
              aria-hidden="true"
              alt=""
              className="custom-border"
            />
            <span>Invite Friend</span>
          </button>
          {loading ? (
            <Loader />
          ) : (
            <button onClick={LeaveSquadHandler} className="leave-btn">
              <img
                src="/assets/squad-leave-btn.png"
                draggable="false"
                aria-hidden="true"
                alt=""
                className="custom-border"
              />
              <span>Leave</span>
            </button>
          )}
        </div>
      </div>
    </m.div>
  );
};
