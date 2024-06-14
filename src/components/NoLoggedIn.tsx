import { FC } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";

const NoLoggedIn: FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = (): void => {
    tonConnectUI.openModal();
    WebApp.HapticFeedback.impactOccurred("light");
  };

  return (
    <div className="no-logged-in">
      <h1>Not logged in</h1>
      <p>Please connect your wallet to access this page.</p>
      <button onClick={handleConnect} className="connect-btn-no-logged-in">
        Connect Wallet
      </button>
    </div>
  );
};

export default NoLoggedIn;
