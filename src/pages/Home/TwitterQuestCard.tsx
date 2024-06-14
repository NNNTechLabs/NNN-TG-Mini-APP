import { FC } from "react";
import { Link } from "react-router-dom";

// Utils
import { formatDate } from "../../utils/functions";
// Assets
import PointsIcon from "../../assets/svg/points.svg?react";
import CalendarIcon from "../../assets/svg/date.svg?react";
import GoButton from "../../assets/svg/go-btn.svg?react";
import { TwitterQuestCardProps, TwitterProp } from "./SocialQuestServices";

const calculateRewards = (mission: TwitterProp) => {
  let totalRewards = 0;

  if (mission.Like) {
    totalRewards += mission.LikeRewards;
  }
  if (mission.Retweet) {
    totalRewards += mission.RetweetRewards;
  }
  if (mission.Comment) {
    totalRewards += mission.CommentRewards;
  }

  return totalRewards;
};

export const TwitterQuestCard: FC<TwitterQuestCardProps> = ({
  quest,
  missionexpirydate,
}) => {
  const expiryDate = new Date(missionexpirydate);
  return (
    <div className="quest-card">
      <img
        src="/assets/social-quest-custom-border.png"
        aria-hidden="true"
        draggable="false"
        className="custom-border social-quest-custom-border"
        alt=""
      />

      <div className="expiration-date">
        <CalendarIcon aria-hidden="true" />
        <span>{formatDate(expiryDate)}</span>
      </div>

      <div className="quest-card-left">
        <p className="quest-name">{quest?.missionName}</p>
        <div className="points">
          <PointsIcon aria-hidden="true" />
          <span>{calculateRewards(quest)} points</span>
        </div>
      </div>

      <div className="quest-card-right">
        <Link to={quest.Link} target="_blank" className="quest-btn">
          <GoButton aria-hidden="true" />
          <span>GO</span>
        </Link>
      </div>
    </div>
  );
};
