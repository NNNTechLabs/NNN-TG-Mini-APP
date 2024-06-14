import { FC, useEffect, useState } from "react";
import { useStore } from "../context/useStore";
import { AnimatePresence } from "framer-motion";

import axios, { AxiosResponse } from "axios";
import {
  useTonAddress,
  TonConnectButton,
  useTonConnectUI,
} from "@tonconnect/ui-react";

// Components
import AreYouSurePopup from "./AreYouSurePopup";

// Utils
import { truncateAddress } from "../utils/functions";

// Assets
import NNNLogo from "../assets/svg/nnn-logo.svg?react";

// Types
import { LoginResponse } from "../types";

const Nav: FC = () => {
  const { setIsSignUpOpen } = useStore();
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress: string = useTonAddress();

  const [areYouSureOpen, setAreYouSureOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (walletAddress && !token) {
      loginWithWallet(walletAddress);
    }
  }, [walletAddress]);

  const handleLogout = () => {
    localStorage.clear();
    tonConnectUI.disconnect();
    setTimeout(() => {
      setAreYouSureOpen(false);
    }, 200);
  };

  const loginWithWallet = async (address: string): Promise<void> => {
    const endpoint = `${_APP_API_URL_}users/loginwithwallet`;
    const userInfo = {
      walletAddress: address.toLowerCase(),
    };

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        endpoint,
        userInfo
      );
      if (response.data?.status && response.data.data.signed) {
        localStorage.setItem("token", response.data.data.jwt_token);
      } else {
        setIsSignUpOpen(true);
      }
    } catch (error) {
      tonConnectUI.disconnect();
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {areYouSureOpen && (
          <AreYouSurePopup
            title="Are you sure you want to log out?"
            onConfirm={handleLogout}
            onCancel={() => setAreYouSureOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="nav-one">
        <NNNLogo className="nnn-logo" />
        {tonConnectUI.connected ? (
          <button
            className="disconnect-btn"
            onClick={() => setAreYouSureOpen(true)}
          >
            {truncateAddress(walletAddress)}
          </button>
        ) : (
          <TonConnectButton className="connect-btn" />
        )}
      </div>
    </>
  );
};

export default Nav;
