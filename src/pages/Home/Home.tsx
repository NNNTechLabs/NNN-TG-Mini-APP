import { FC, useState, useRef, useEffect } from "react";
import { useTonAddress } from "@tonconnect/ui-react";

// Components
import GameMissions from "./GameMissions";
import SocialQuest from "./SocialQuest";
import DailyCheck from "./DailyCheck";
import NoLoggedIn from "../../components/NoLoggedIn";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";
import EnergyStation from "./energy-station/EnergyStation";

const Home: FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const walletAddress: string = useTonAddress();

  const [navIndex, setNavIndex] = useState<number>(() => {
    const savedIndex = sessionStorage.getItem("navIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  const [navBtns, setNavBtns] = useState([
    { name: "Energy Station", selected: navIndex === 0 },
    { name: "Game Mission", selected: navIndex === 1 },
    { name: "Social Quest", selected: navIndex === 2 },
    { name: "Daily Check-in", selected: navIndex === 3 },
  ]);

  useTelegramBackButton({ isVisible: false });

  const handleNavBtnClick = (index: number) => {
    setNavIndex(index);
    setNavBtns((prevNavBtns) =>
      prevNavBtns.map((btn, i) => ({
        ...btn,
        selected: i === index,
      }))
    );

    sessionStorage.setItem("navIndex", index.toString());
  };

  useEffect(() => {
    // Restore the selected state based on navIndex
    setNavBtns((prevNavBtns) =>
      prevNavBtns.map((btn, i) => ({
        ...btn,
        selected: i === navIndex,
      }))
    );
  }, [navIndex]);

  return (
    <>
      <div className="home-page">
        <div className="home-page-nav" ref={navRef}>
          {navBtns.map((btn, index) => (
            <button
              key={btn.name}
              className={
                navBtns[index].selected ? "home-nav-btn active" : "home-nav-btn"
              }
              onClick={() => handleNavBtnClick(index)}
            >
              <span>{btn.name}</span>
            </button>
          ))}
        </div>
        {walletAddress !== "" ? (
          <>
            {navBtns[0].selected && <EnergyStation setNavIndex={setNavIndex} />}

            {navBtns[1].selected && <GameMissions setNavIndex={setNavIndex} />}

            {navBtns[2].selected && <SocialQuest setNavIndex={setNavIndex} />}

            {navBtns[3].selected && <DailyCheck setNavIndex={setNavIndex} />}
          </>
        ) : (
          <NoLoggedIn />
        )}
      </div>
    </>
  );
};

export default Home;
