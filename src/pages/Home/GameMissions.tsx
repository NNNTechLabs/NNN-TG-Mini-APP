import { FC, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/useStore";

// Types
import { GameMission, MissionComponentProps } from "../../types";

// Assets
import PointsIcon from "../../assets/svg/points.svg?react";
import EnterIcon from "../../assets/svg/enter.svg?react";

const gameMissions: GameMission[] = [
  {
    name: "My Cat is Fishing Star",
    category: "(Demo)",
    totalReward: 500,
    imageSrc: "/assets/catfish.png",
    playLink: "https://t.me/ViperTest1_bot",
    missionLink: "/mission/arena-fight",
    linkLink: "/link/arena-fight",
    description: "This is a demo game.",
    gameQuests: [
      {
        name: "Catch 10 Fishes",
        points: 5,
        expirationDate: "2021-08-01 22.00",
        id: "1",
        isCompleted: true,
        imageSrc: "/assets/energy-tube.png",
      },
      {
        name: "Catch 20 Fishes",
        points: 10,
        expirationDate: "2021-08-01 22.00",
        id: "2",
        isCompleted: false,
        imageSrc: "/assets/placeholder.png",
      },
      {
        name: "Catch 30 Fishes",
        points: 20,
        expirationDate: "2021-08-01 22.00",
        id: "3",
        isCompleted: false,
        imageSrc: "/assets/placeholder1.png",
      },
    ],
  },
  {
    name: "Starboys Spacetroop",
    category: "(Demo)",
    totalReward: 300,
    imageSrc: "/assets/spacetroop.png",
    playLink: "https://t.me/StarboysGameTestBot",
    missionLink: "/mission/space-invaders",
    linkLink: "/link/space-invaders",
    gameQuests: [
      {
        name: "Kill 10 Aliens",
        points: 5,
        expirationDate: "2021-08-01 22.00",
        id: "1",
        isCompleted: true,
        imageSrc: "/assets/energy-tube.png",
      },
      {
        name: "Kill 20 Aliens",
        points: 10,
        expirationDate: "2021-08-01 22.00",
        id: "2",
        isCompleted: false,
        imageSrc: "/assets/placeholder.png",
      },
      {
        name: "Kill 30 Aliens",
        points: 20,
        expirationDate: "2021-08-01 22.00",
        id: "3",
        isCompleted: false,
        imageSrc: "/assets/placeholder1.png",
      },
    ],
  },
  {
    name: "HELLIC the Cat Saver",
    category: "(Demo)",
    totalReward: 450,
    imageSrc: "/assets/hellic.png",
    playLink: "/play/mystic-quest",
    missionLink: "/mission/mystic-quest",
    linkLink: "/link/mystic-quest",
    gameQuests: [
      {
        name: "Save 10 Cats",
        points: 5,
        expirationDate: "2021-08-01 22.00",
        id: "1",
        isCompleted: true,
        imageSrc: "/assets/energy-tube.png",
      },
      {
        name: "Save 20 Cats",
        points: 10,
        expirationDate: "2021-08-01 22.00",
        id: "2",
        isCompleted: false,
        imageSrc: "/assets/placeholder.png",
      },
      {
        name: "Save 30 Cats",
        points: 20,
        expirationDate: "2021-08-01 22.00",
        id: "3",
        isCompleted: false,
        imageSrc: "/assets/placeholder1.png",
      },
    ],
  },
  {
    name: "Rumble Royal",
    category: "(Demo)",
    totalReward: 450,
    imageSrc: "/assets/rumble-rush.png",
    playLink: "/play/mystic-quest",
    missionLink: "/mission/mystic-quest",
    linkLink: "/link/mystic-quest",
    gameQuests: [
      {
        name: "Win 10 Matches",
        points: 5,
        expirationDate: "2021-08-01 22.00",
        id: "1",
        isCompleted: true,
        imageSrc: "/assets/energy-tube.png",
      },
      {
        name: "Win 20 Matches",
        points: 10,
        expirationDate: "2021-08-01 22.00",
        id: "2",
        isCompleted: false,
        imageSrc: "/assets/placeholder.png",
      },
      {
        name: "Win 30 Matches",
        points: 20,
        expirationDate: "2021-08-01 22.00",
        id: "3",
        isCompleted: false,
        imageSrc: "/assets/placeholder1.png",
      },
    ],
  },
  {
    name: "Vaaaampee",
    category: "(Demo)",
    totalReward: 450,
    imageSrc: "/assets/vampe.png",
    playLink: "/play/mystic-quest",
    missionLink: "/mission/mystic-quest",
    linkLink: "/link/mystic-quest",
    gameQuests: [
      {
        name: "Win 10 Matches",
        points: 5,
        expirationDate: "2021-08-01 22.00",
        id: "1",
        isCompleted: true,
        imageSrc: "/assets/energy-tube.png",
      },
      {
        name: "Win 20 Matches",
        points: 10,
        expirationDate: "2021-08-01 22.00",
        id: "2",
        isCompleted: false,
        imageSrc: "/assets/placeholder.png",
      },
      {
        name: "Win 30 Matches",
        points: 20,
        expirationDate: "2021-08-01 22.00",
        id: "3",
        isCompleted: false,
        imageSrc: "/assets/placeholder1.png",
      },
    ],
  },
];

const GameMissions: FC<MissionComponentProps> = ({ setNavIndex }) => {
  const { setSelectedMission } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    setNavIndex(1);
  }, []);

  const missionNavigateHandler = (
    gameName: string,
    mission: GameMission[]
  ): void => {
    WebApp.HapticFeedback.impactOccurred("light");

    setSelectedMission(mission);

    navigate(`/mission/${gameName}`);
  };

  return (
    <section className="game-missions">
      {gameMissions.map((mission, index) => (
        <div className="game-mission" key={index}>
          <img
            src="/assets/game-mission-border.png"
            aria-hidden="true"
            draggable="false"
            className="mission-frame"
            alt=""
          />
          <div
            style={{ backgroundImage: `url(${mission.imageSrc})` }}
            className="game-mission-top"
          >
            <div className="game-card-gradient" />
            <div className="game-mission-title-wrapper">
              <h5 className="game-name">{mission.name}</h5>
              <p className="game-category">{mission.category}</p>
            </div>
          </div>

          <div className="game-mission-bottom">
            <div className="game-rewards">
              <div className="rewards-title">
                <span>REWARDS</span>
                <PointsIcon className="points-icon" aria-hidden="true" />
              </div>
              <div className="rewards-list">
                - Total {mission.totalReward} Points
              </div>
            </div>

            <div className="game-mission-buttons">
              <button
                onClick={() =>
                  missionNavigateHandler(
                    mission.name.toLowerCase().replace(/\s+/g, "-"),
                    [mission]
                  )
                }
                className="game-mission-button"
              >
                <span>GET IN</span>
                <EnterIcon className="enter-icon" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GameMissions;
