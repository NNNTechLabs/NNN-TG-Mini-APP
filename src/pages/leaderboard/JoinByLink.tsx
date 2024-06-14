import { FC, useEffect, useState } from "react";
import { useStore } from "../../context/useStore";
import { motion as m } from "framer-motion";
import { useParams } from "react-router-dom";
// Hooks
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

import PointsIcon from "../../assets/svg/points.svg?react";
import { SquadInfo, getSquadinfoApi, JoinSquadByLink } from "./Squadservices";
import { notifySuccess } from "../../utils/functions";
import { Loader } from "../../components/Loaders";

const joinContentVariants = {
  initial: { y: "100%" },
  enter: { y: 0 },
  leave: { y: "100%" },
};

export const JoinByLink: FC = () => {
  const { setIsJoinSquadOpen } = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [squadInfo, setSquadInfo] = useState<SquadInfo | null>(null);
  const { userId, squadCode } = useParams<{
    userId: string;
    squadCode: string;
  }>();
  useEffect(() => {
    async function fetchData() {
      const dataprops = {
        SquadCode: squadCode ?? "",
      } as { SquadCode: string };
      const squad_info_api = await getSquadinfoApi(dataprops);
      const { data, status } = squad_info_api;
      if (status) {
        setSquadInfo(data.SquadsInfo);
      }
    }
    fetchData();
  }, [userId, squadCode]);

  useTelegramBackButton({
    isVisible: true,
    onClick: () => setIsJoinSquadOpen(false),
  });
  const joinSquadHandler = async () => {
    try {
      setLoading(true);
      const data = {
        SquadCode: squadCode ?? "",
        userId: userId ?? "",
      };
      const join_squad_by_link = await JoinSquadByLink(data);
      if (join_squad_by_link.data.status) {
        notifySuccess("Squad joined successfully");
        setTimeout(() => {
          window.location.assign("/");
        }, 1000);
      } else {
        notifySuccess("code not found");
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  return (
    <div onClick={() => setIsJoinSquadOpen(false)} className="join-squad">
      <m.div
        initial="initial"
        animate="enter"
        exit="leave"
        variants={joinContentVariants}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="join-squad-container"
      >
        <div className="join-squad-titles">
          <h1 className="join-squad-title">{squadInfo?.SquadName}</h1>
          <p className="join-squad-subtitle">1.111 people have joined</p>
        </div>

        <div className="squad-info-wrapper">
          <img
            draggable="false"
            src="/assets/default-squad-avatar.png"
            alt="Squad avatar"
            className="squad-avatar-join"
          />

          <div className="squad-stats">
            <div className="total-energy">
              <span>Total energy</span>
              <div className="energy-count">
                <PointsIcon />
                <span>1231321312</span>
              </div>
            </div>

            <div className="rank-stats">
              <span>Rank</span>

              <span>{squadInfo?.RankName}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button onClick={joinSquadHandler} className="join-squad-button">
            JOIN SQUAD
          </button>
        )}
      </m.div>
    </div>
  );
};
