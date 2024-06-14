import { FC, useState, useEffect } from "react";
import { useTonAddress } from "@tonconnect/ui-react";

import { useStore } from "../../context/useStore";

// Hooks
// import useTelegramBackButton from "../../hooks/useTelegramBackButton";

// Utils
import { notifyError, truncateAddress } from "../../utils/functions";

// Assets
import TONConnectIcon from "../../assets/svg/toncoin.svg?react";
import CheckIcon from "../../assets/svg/check.svg?react";
import { UserSignup } from "./SignUpService";
import { Loader } from "../Loaders";

const SignUp: FC = () => {
  const { setIsSignUpOpen } = useStore();
  const walletAddress: string = useTonAddress();
  const [username, setUsername] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [tguid, setTguid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tgusername, setTgusername] = useState<string>("");
  const [photourl, setPhotourl] = useState<string>("");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const { id, username, photo_url } = tg.initDataUnsafe.user;
      setUsername(username);
      setTgusername(username);
      setPhotourl(photo_url);
      setTguid(id);
    } else {
      //
    }
  }, []);

  // useTelegramBackButton({
  //   isVisible: true,
  //   onClick: () => {
  //     setIsSignUpOpen(false);
  //   },
  // });

  const handleSignup = async () => {
    setLoading(true);

    const data = {
      ReferralCode: referralCode,
      walletAddress: walletAddress.toLowerCase(),
      username: username,
      telegram_username: tgusername,
      telegram_id: tguid,
      PictureURL: photourl,
    };

    try {
      const signup_api = await UserSignup(data);
      if (signup_api.data.status) {
        localStorage.setItem("token", signup_api.data.authtoken);
        localStorage.setItem(
          "user",
          JSON.stringify(signup_api.data.UserDetails)
        );
        // close the signup modal
        setIsSignUpOpen(false);
      } else {
        notifyError(signup_api.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // notifyError(error);
      console.log("User signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-popup-titles">
        <h1 className="login-popup-title">Sign Up</h1>
        <p className="login-popup-subtitle sign-up-subtitle">
          Wallet{" "}
          <span className="bold-text">{truncateAddress(walletAddress)}</span> is
          not signed up yet. <br />
          Please sign up to continue.
        </p>
      </div>

      <div className="signup-form">
        <div className="wallet-login-wrapper">
          <p className="wallet-login-label">
            Sign In By<span className="asterisk">&#42;</span>
          </p>
          <div className="wallet-login-btn">
            <TONConnectIcon className="ton-connect-icon" />
            <span className="login-popup-btn-text">
              {walletAddress !== ""
                ? truncateAddress(walletAddress)
                : "TONConnect"}
            </span>
            <CheckIcon className="check-icon" />
          </div>
        </div>

        <div className="username-wrapper">
          <p>Username</p>
          <input
            type="text"
            placeholder="nifty-nerd"
            className="login-popup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="referral-wrapper">
          <p>Referral Code</p>
          <input
            type="text"
            placeholder="1234abc"
            className="login-popup-input"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="signup-loader">
            <Loader />
          </div>
        ) : (
          <button className="signup-button" onClick={handleSignup}>
            Sign Up
          </button>
        )}
      </div>
    </>
  );
};

export default SignUp;
