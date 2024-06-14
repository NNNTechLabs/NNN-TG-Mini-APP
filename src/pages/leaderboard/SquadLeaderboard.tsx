import { FC, useEffect, useState } from "react";
import { useStore } from "../../context/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  AllSquad,
  SquadListApi,
  joinSquadByCodeApi,
  UserCurrentSquad,
} from "./Squadservices";
// Components
import { SquadJoined, SquadNoJoined } from "./Squad";

// Assets
import PointsIcon from "../../assets/svg/points.svg?react";
import { Loader } from "../../components/Loaders";
import { notifyError, notifySuccess } from "../../utils/functions";

const variants = {
  neutral: { x: "100%" },
  enter: { x: 0 },
  leave: { x: "100%" },
};

const RecommendedSquad: FC<{
  squadName: string;
  squadAvatar: string;
  squadEnergy: number;
  SquadCode: string;
}> = ({ squadName, squadAvatar, squadEnergy, SquadCode }) => {
  const { setIsJoinSquadOpen } = useStore();
  const [loading, setLoading] = useState(false);
  const joinSquadHandler = async (code: string) => {
    try {
      setLoading(true);
      const join_squad_api_response = await joinSquadByCodeApi({
        SquadCode: code,
      });
      if (join_squad_api_response.status) {
        notifySuccess(join_squad_api_response.data.message);
        setIsJoinSquadOpen(false);
      } else {
        notifyError(join_squad_api_response.data.message);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="recommended-squad">
      <img
        src="/assets/recommended-squad-border.png"
        draggable="false"
        aria-hidden="true"
        alt=""
        className="custom-border recommended-squad-custom-border"
      />

      <div className="recommended-squad-left">
        <img
          src={squadAvatar || "/assets/default-squad-avatar.png"}
          className="recommended-squad-avatar"
          draggable="false"
          alt={`${squadName} avatar`}
        />
        <span className="recommended-squad-name">{squadName}</span>
      </div>

      <div className="recommended-squads-points">
        <PointsIcon />
        <span>{squadEnergy}</span>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <button
          onClick={() => joinSquadHandler(SquadCode)}
          className="join-btn"
        >
          JOIN &#187;
        </button>
      )}
    </div>
  );
};

const LeaderboardButton: FC<{
  isActive: boolean;
  onClick: () => void;
  label: string;
}> = ({ isActive, onClick, label }) => (
  <button
    onClick={onClick}
    className={
      isActive ? "miner-leaderboard-btn active" : "miner-leaderboard-btn"
    }
  >
    <img
      src={
        isActive
          ? "/assets/miner-leaderboard-btn-active.png"
          : "/assets/miner-leaderboard-btn.png"
      }
      className="custom-border miner-leaderboard-btn-custom-border"
      draggable="false"
      aria-hidden="true"
      alt=""
    />
    <span>{label}</span>
  </button>
);

const LeaderboardItem: FC<{
  rank: number;
  avatar: string;
  username: string;
  points: number;
}> = ({ rank, avatar, username, points }) => {
  return (
    <div className="leader-user">
      <img
        src="/assets/leader-container.png"
        className="custom-border leader-container-custom-border"
        draggable="false"
        aria-hidden="true"
        alt=""
      />

      <div className="user-leader-info">
        <div className="user-leader-info-left">
          <span className="user-rank">{rank}</span>
          <img
            className="user-avatar"
            src={avatar}
            draggable="false"
            alt={`${username} avatar`}
          />
          <span className="leaderboard-username">{username}</span>
        </div>
        <div className="user-leader-info-right">
          <PointsIcon />
          <span>{points}</span>
        </div>
      </div>
    </div>
  );
};

const SquadLeaderboard: FC = () => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState(1);
  const [isAllSquadsActive, setIsAllSquadsActive] = useState(true);
  const [SquadList, setSquadList] = useState<AllSquad[]>([]);
  const [dataloading, setDataloading] = useState<boolean>(false);
  const [UserCurrentSquad, setUserCurrentSquad] =
    useState<UserCurrentSquad | null>(null);
  const [isUserJoinedSquad, setIsUserJoinedSquad] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataloading(true);
        const fetchSquadList = await SquadListApi();
        setSquadList(fetchSquadList.data.AllSquads);
        const CurrentSquad = fetchSquadList.data.user_current_squad;
        if (
          CurrentSquad &&
          typeof CurrentSquad === "object" &&
          !Array.isArray(CurrentSquad)
        ) {
          setIsUserJoinedSquad(true);
          setUserCurrentSquad(fetchSquadList.data.user_current_squad);
        }
      } catch (error) {
        //
      } finally {
        setDataloading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <AnimatePresence>
        {isUserJoinedSquad ? (
          <SquadJoined squad={UserCurrentSquad} />
        ) : (
          <SquadNoJoined />
        )}
      </AnimatePresence>

      <m.div
        initial={variants.neutral}
        animate={variants.enter}
        exit={variants.leave}
        className="squad-leaderboard"
      >
        <img
          src="/assets/miner-leaderboard.png"
          draggable="false"
          aria-hidden="true"
          alt=""
          className="custom-border miner-leaderboard-custom-border"
        />

        {isUserJoinedSquad && (
          <div className="squad-leaderboard-btns">
            <button
              onClick={() => setIsAllSquadsActive(true)}
              className={
                isAllSquadsActive ? "all-squads-btn active" : "all-squads-btn"
              }
            >
              <img
                src={
                  isAllSquadsActive
                    ? "/assets/all-squad-btn-active.png"
                    : "/assets/all-squad-btn.png"
                }
                draggable="false"
                aria-hidden="true"
                alt=""
                className="custom-border all-squads-btn-custom-border"
              />
              <span className="all-squads-btn-text">All Squads</span>
            </button>
            <button
              onClick={() => setIsAllSquadsActive(false)}
              className={
                !isAllSquadsActive ? "my-squad-btn active" : "my-squad-btn"
              }
            >
              <img
                src={
                  isAllSquadsActive
                    ? "/assets/my-squad-btn.png"
                    : "/assets/my-squad-btn-active.png"
                }
                draggable="false"
                aria-hidden="true"
                alt=""
                className="custom-border my-squad-btn-custom-border"
              />
              <span>My Squad</span>
            </button>
          </div>
        )}

        {isUserJoinedSquad ? (
          isAllSquadsActive ? (
            <>
              <div className="miner-leaderboard-btns">
                <LeaderboardButton
                  isActive={activeLeaderboardTab === 1}
                  onClick={() => setActiveLeaderboardTab(1)}
                  label="Current"
                />
                <LeaderboardButton
                  isActive={activeLeaderboardTab === 2}
                  onClick={() => setActiveLeaderboardTab(2)}
                  label="Past Week"
                />
                <LeaderboardButton
                  isActive={activeLeaderboardTab === 3}
                  onClick={() => setActiveLeaderboardTab(3)}
                  label="All"
                />
              </div>

              <div className="leaders-list">
                {activeLeaderboardTab === 1 &&
                  Array.from({ length: 13 }).map((_, index) => (
                    <LeaderboardItem
                      key={index}
                      rank={index + 1}
                      avatar="/assets/placeholder.png"
                      username="YAYLABS Squad"
                      points={1232131232}
                    />
                  ))}

                {activeLeaderboardTab === 2 &&
                  Array.from({ length: 13 }).map((_, index) => (
                    <LeaderboardItem
                      key={index}
                      rank={index + 1}
                      avatar="/assets/placeholder.png"
                      username="YAYLABS Squad"
                      points={1232131232}
                    />
                  ))}

                {activeLeaderboardTab === 3 &&
                  Array.from({ length: 13 }).map((_, index) => (
                    <LeaderboardItem
                      key={index}
                      rank={index + 1}
                      avatar="/assets/placeholder.png"
                      username="YAYLABS Squad"
                      points={1232131232}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="leaders-list my-squad-info">
              <LeaderboardItem
                rank={1}
                avatar="/assets/placeholder.png"
                username="YAYLABS Squad"
                points={1232131232}
              />
            </div>
          )
        ) : (
          <div className="recommended-squads-container">
            <h4 className="recommended-squads-title">
              RECOMMENDED SQUADS FOR YOU
            </h4>

            <div className="recommended-squads-container">
              {dataloading ? (
                <Loader />
              ) : (
                SquadList?.map((squad: AllSquad, index: number) => (
                  <RecommendedSquad
                    key={index}
                    SquadCode={squad.SquadCode}
                    squadAvatar="/assets/placeholder.png"
                    squadEnergy={squad?.totalRewards}
                    squadName={squad.SquadName}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </m.div>
    </>
  );
};

export default SquadLeaderboard;
