import React, { lazy, Suspense, useEffect, useState } from "react";
import { useStore } from "./context/useStore";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import Home from "./pages/Home/Home";
import Nav from "./components/Nav";
import { SuspenseLoader } from "./components/Loaders";
import LoginPopup from "./components/login/LoginPopup";
import {
  SquadCreatePopup,
  SquadJoinPopup,
} from "./pages/leaderboard/SquadPopups";
import { JoinByLink } from "./pages/leaderboard/JoinByLink";
import TelegramAnnouncement from "./components/TelegramAnnouncement";
import useFixTelegramScroll from "./hooks/useFixTelegramScroll";

const PopupLazy = lazy(() => import("./pages/Home/MissionPopup"));
const TwitterAuthLazy = lazy(() => import("./pages/twitterLoading"));
const DiscordAuthLazy = lazy(() => import("./pages/discordLoading"));
const MyPageLazy = lazy(() => import("./pages/my-page/MyPage"));
const LeaderboardLazy = lazy(() => import("./pages/leaderboard/Leaderboard"));
const RaffleLazy = lazy(() => import("./pages/raffle-page/Raffle"));
const MysteryBoxLazy = lazy(() => import("./pages/mystery-box/MysteryBox"));
const MissionPopupLazy = lazy(() => import("./pages/Home/MissionPopup"));

import { HomeProps } from "./types";
import Dock from "./components/Dock";

const App: React.FC = () => {
  const { isSignUpOpen, isCreateSquadOpen, isJoinSquadOpen } = useStore();
  const [isTelegramAnnouncementVisible, setIsTelegramAnnouncementVisible] =
    useState(true);

  useFixTelegramScroll();

  useEffect(() => {
    localStorage.getItem("announcementClosed") &&
      setIsTelegramAnnouncementVisible(false);
  }, []);

  const routes: HomeProps = [
    { path: "/", element: <Home /> },
    { path: "/popup", element: <Suspense fallback={<SuspenseLoader />}><PopupLazy /></Suspense> },
    { path: "/twitter-auth", element: <Suspense fallback={<SuspenseLoader />}><TwitterAuthLazy /></Suspense> },
    { path: "/discord-auth", element: <Suspense fallback={<SuspenseLoader />}><DiscordAuthLazy /></Suspense> },
    { path: "/my-page", element: <Suspense fallback={<SuspenseLoader />}><MyPageLazy /></Suspense> },
    { path: "/leaderboard", element: <Suspense fallback={<SuspenseLoader />}><LeaderboardLazy /></Suspense> },
    { path: "/raffle", element: <Suspense fallback={<SuspenseLoader />}><RaffleLazy /></Suspense> },
    { path: "/mystery-box", element: <Suspense fallback={<SuspenseLoader />}><MysteryBoxLazy /></Suspense> },
    { path: "/mission/:game", element: <Suspense fallback={<SuspenseLoader />}><MissionPopupLazy /></Suspense> },
    // join squad using link
    {path: "/join-squad/:userId/:squadCode", element: <JoinByLink />}
  ]; // prettier-ignore

  return (
    <TonConnectUIProvider
      manifestUrl="https://dev.nnn-telegram-front.pages.dev/tonconnect-manifest.json"
      actionsConfiguration={{ twaReturnUrl: "https://t.me/nnntesting_bot" }}
    >
      {isTelegramAnnouncementVisible && (
        <TelegramAnnouncement setIsVisible={setIsTelegramAnnouncementVisible} />
      )}

      <AnimatePresence>
        {isCreateSquadOpen && <SquadCreatePopup />}
      </AnimatePresence>

      <AnimatePresence>{isJoinSquadOpen && <SquadJoinPopup />}</AnimatePresence>

      <ToastContainer limit={1} />
      <Nav />

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      <Dock />

      <AnimatePresence>{isSignUpOpen && <LoginPopup />}</AnimatePresence>
    </TonConnectUIProvider>
  );
};

export default App;
