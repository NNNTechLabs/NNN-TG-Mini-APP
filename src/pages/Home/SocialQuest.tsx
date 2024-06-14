import { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import { TwitterQuestCard } from "./TwitterQuestCard";
import { FullscreenLoader } from "../../components/Loaders";
import { TwitterButton, DiscordButton } from "./SocialButton";

// Utils
import { formatDate } from "../../utils/functions";

// Assets
import SearchIcon from "../../assets/svg/search.svg?react";
import PointsIcon from "../../assets/svg/points.svg?react";
import CalendarIcon from "../../assets/svg/date.svg?react";
import GoButton from "../../assets/svg/go-btn.svg?react";

// Types
import {
  QuestProps,
  SocialQuestListApi,
  TwitterProp,
  QuestCardProps,
  SocialAuthProp,
} from "./SocialQuestServices";
import { MissionComponentProps } from "../../types";

const QuestCard: FC<QuestCardProps> = ({ quest, missionexpirydate }) => {
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
          <span>{quest.Rewards} points</span>
        </div>
      </div>

      <div className="quest-card-right">
        {quest?.isDone === 0 ? (
          <Link
            to={quest.Link}
            style={{
              textDecoration: "none",
            }}
            target="_blank"
            className="quest-btn"
          >
            <GoButton aria-hidden="true" />
            <span>GO</span>
          </Link>
        ) : quest?.isDone === 1 ? (
          <button className="quest-btn">
            <GoButton aria-hidden="true" />
            <span>Claim reward</span>
          </button>
        ) : (
          <button className="quest-btn">
            <GoButton aria-hidden="true" />
            <span>Completed</span>
          </button>
        )}
      </div>
    </div>
  );
};

const SocialQuest: FC<MissionComponentProps> = ({ setNavIndex }) => {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [missionexpiry, setMissionExpiry] = useState<string>("");
  const [discordQuestList, setDiscordQuestList] = useState<QuestProps[]>([]);
  const [telegramQuestList, setTelegramQuestList] = useState<QuestProps[]>([]);
  const [twitterQuestList, setTwitterQuestList] = useState<TwitterProp[]>([]);
  const [socialAuth, setSocialAuth] = useState<SocialAuthProp>({
    discordauth: false,
    twitterauth: false,
  });

  useEffect(() => {
    setNavIndex(2);

    const fetchSocialQuestList = async () => {
      setIsLoading(true);
      try {
        const { status, data } = await SocialQuestListApi();
        if (status) {
          const {
            DiscordAuth,
            TwitterAuth,
            DiscordData,
            TelegramData,
            TwitterData,
            QuestEndDate,
          } = data;
          setSocialAuth({
            discordauth: DiscordAuth,
            twitterauth: TwitterAuth,
          });
          setDiscordQuestList(DiscordData || []);
          setTelegramQuestList(TelegramData || []);
          setTwitterQuestList(TwitterData || []);
          setMissionExpiry(QuestEndDate);
        }
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialQuestList();
  }, []);

  return (
    <section className="social-quests">
      <h2 className="social-quests-title">AVAILABLE SOCIAL QUESTS</h2>

      <div className="search-wrapper">
        <img
          src="/assets/social-search.png"
          aria-hidden="true"
          draggable="false"
          className="social-search-asset"
          alt=""
        />
        <div className="quests-search-input-wrapper">
          <div className="quests-search-input">
            <SearchIcon aria-hidden="true" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="quests-search-input-element"
            />
            <img
              className="border-asset"
              src="/assets/border-accessory.png"
              aria-hidden="true"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="social-quests-container">
        {isloading ? (
          <FullscreenLoader />
        ) : (
          <div className="quests-card-wrapper">
            {socialAuth.discordauth ? (
              discordQuestList.map((quest: QuestProps) => (
                <QuestCard
                  key={quest._id}
                  quest={quest}
                  missionexpirydate={missionexpiry}
                />
              ))
            ) : (
              <DiscordButton />
            )}

            {socialAuth.twitterauth ? (
              twitterQuestList.map((quest: TwitterProp) => (
                <TwitterQuestCard
                  key={quest._id}
                  quest={quest}
                  missionexpirydate={missionexpiry}
                />
              ))
            ) : (
              <TwitterButton />
            )}

            {telegramQuestList.map((quest: QuestProps) => (
              <QuestCard
                key={quest._id}
                quest={quest}
                missionexpirydate={missionexpiry}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialQuest;
