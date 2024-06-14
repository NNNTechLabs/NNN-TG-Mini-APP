import { FC } from "react";
import { NavLink } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { useStore } from "../context/useStore";

// Component
import CircularProgress from "./CircularProgress";

interface DockItemProps {
  to: string;
  label: string;
  img?: string;
  circularProgress?: boolean;
}

const dockButtons: DockItemProps[] = [
  {
    to: "/",
    label: "Mission",
    img: "/assets/mission-nav-icon.png",
  },
  {
    to: "/mystery-box",
    label: "Mystery Box",
    img: "/assets/mysterybox-nav-icon.png",
  },
  {
    to: "/raffle",
    label: "Raffle",
    circularProgress: true,
  },
  {
    to: "/leaderboard",
    label: "Leaderboard",
    img: "/assets/leaderboard-nav-icon.png",
  },
  {
    to: "/my-page",
    label: "My Page",
    img: "/assets/mypage-nav-icon.png",
  },
];

const Dock: FC = () => {
  const { selectedMission, setSelectedMission } = useStore();

  const feedbackHandler = () => {
    if (selectedMission.length > 0) {
      setSelectedMission([]);
    }

    WebApp.HapticFeedback.impactOccurred("light");
  };

  return (
    <nav className="nav-dock">
      <div className="dock-items">
        {dockButtons.map((button: DockItemProps, index: number) => (
          <NavLink
            key={index}
            to={button.to}
            onClick={feedbackHandler}
            className={`dock-item ${
              button.circularProgress ? "dock-raffle" : ""
            }`}
          >
            {/* <div className={`red-dot-element ${index === 2 && "middle-dot"}`} /> */}
            {!button.circularProgress && button.img && (
              <img src={button.img} alt="" />
            )}
            {button.circularProgress && (
              <CircularProgress
                showName={false}
                size={47}
                duration={60}
                strokeWidth={1.5}
              />
            )}
            <span
              className={`${
                button.circularProgress ? "raffle-label" : "dock-label"
              } label`}
            >
              {button.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Dock;
