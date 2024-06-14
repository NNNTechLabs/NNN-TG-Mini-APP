import { FC, useState } from "react";
import { notifyError } from "../../utils/functions";
import PointsIcon from "../../assets/svg/points.svg?react";
// import CalendarIcon from "../../assets/svg/date.svg?react";
import GoButton from "../../assets/svg/go-btn.svg?react";
import { AuthDiscordApi, TwitterAuthApi } from "./SocialQuestServices";
import { useTonAddress } from "@tonconnect/ui-react";
import { Loader } from "../../components/Loaders";
export const TwitterButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const walletAddress: string = useTonAddress();

  const handleTwitterAuth = async () => {
    try {
      setLoading(true);
      const twitter_api = await TwitterAuthApi({ walletAddress });
      if (twitter_api.status) {
        localStorage.setItem(
          "codeVerifier",
          twitter_api.data.data.codeVerifier
        );
        location.href = twitter_api.data.data.url;
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quest-card">
      <img
        src="/assets/social-quest-custom-border.png"
        aria-hidden="true"
        draggable="false"
        className="custom-border social-quest-custom-border"
        alt=""
      />
      <div className="quest-card-left">
        <p className="quest-name">Connect Twitter Account</p>
        <div className="points">
          <PointsIcon aria-hidden="true" />
          <span>5 points</span>
        </div>
        {/* <div className="expiration-date">
			<CalendarIcon aria-hidden="true" />
		  </div> */}
      </div>

      <div className="quest-card-right">
        {loading ? (
          <Loader className="social-quest-btn-loader" />
        ) : (
          <button onClick={handleTwitterAuth} className="quest-btn">
            <GoButton aria-hidden="true" />
            <span>GO</span>
          </button>
        )}
      </div>
    </div>
  );
};
export const DiscordButton: FC = () => {
  const walletAddress: string = useTonAddress();
  const [loading, setLoading] = useState<boolean>(false);

  const connectDiscord = async () => {
    setLoading(true);
    const api_response = await AuthDiscordApi(walletAddress.toLowerCase());
    if (api_response.data.status) {
      window.location.href = api_response.data.redirectUrl;
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      notifyError("Something went wrong, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="quest-card">
      <img
        src="/assets/social-quest-custom-border.png"
        aria-hidden="true"
        draggable="false"
        className="custom-border social-quest-custom-border"
        alt=""
      />
      <div className="quest-card-left">
        <p className="quest-name">Connect Discord Account</p>
        <div className="points">
          <PointsIcon aria-hidden="true" />
          <span>5 points</span>
        </div>
        {/* <div className="expiration-date">
			<CalendarIcon aria-hidden="true" />
		  </div> */}
      </div>

      <div className="quest-card-right">
        {loading ? (
          <Loader className="social-quest-btn-loader" />
        ) : (
          <button onClick={connectDiscord} className="quest-btn">
            <GoButton aria-hidden="true" />
            <span>GO</span>
          </button>
        )}
      </div>
    </div>
  );
};
