import { FC, useState } from "react";

// Assets
import EnergyIcon from "../../assets/svg/points.svg?react";
import CoinIcon from "../../assets/svg/coin.svg?react";
import InfoIcon from "../../assets/svg/question-button.svg?react";
import EditIcon from "../../assets/svg/edit.svg?react";
import WebApp from "@twa-dev/sdk";

// Hooks
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

// Types
import { GameUIDProps } from "../../types";
import ItemsTutorial from "./ItemsTutorial";
import { copyToClipboard } from "../../utils/functions";

const gameUID: GameUIDProps[] = [
  {
    gameName: "Game 1",
    gameUID: "1234567890",
  },
  {
    gameName: "Game 2",
    gameUID: "0987654321",
  },
  {
    gameName: "Game 3",
    gameUID: "1357924680",
  },
  {
    gameName: "Game 4",
    gameUID: "2468135790",
  },
  {
    gameName: "Game 5",
    gameUID: "9876543210",
  },
  {
    gameName: "Game 6",
    gameUID: "1234567890",
  },
  {
    gameName: "Game 7",
    gameUID: "0987654321",
  },
  {
    gameName: "Game 8",
    gameUID: "1357924680",
  },
  {
    gameName: "Game 9",
    gameUID: "2468135790",
  },
];

const MyPage: FC = () => {
  useTelegramBackButton({ isVisible: false });

  const [tutorialOpen, setTutorialOpen] = useState(false);

  const connectHandler = () => {
    WebApp.showAlert("In development");
  };

  return (
    <>
      {tutorialOpen ? (
        <ItemsTutorial setTutorialOpen={setTutorialOpen} />
      ) : (
        <div className="my-page">
          <h2 className="my-page-title">MY PAGE</h2>

          <div className="profile-info-container">
            <img
              className="custom-border custom-border-profile"
              src="/assets/my-page-border-one.png"
              draggable="false"
              aria-hidden="true"
              alt=""
            />

            <div className="profile-info-right">
              <div className="profile-info-user-info">
                <span className="user-name">Mindy</span>

                <div className="user-codes">
                  <div
                    onClick={() =>
                      copyToClipboard(
                        "321383821",
                        "Successfully copied your Referral ID"
                      )
                    }
                    className="user-referral-id"
                  >
                    <span>Referral</span>
                    <span>321383821</span>
                  </div>

                  <div className="user-squad-name">
                    <span>Squad</span>
                    <span>YAYLABS</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    "321383821",
                    "Successfully copied your Referral ID"
                  )
                }
                title="Copy your Referral ID"
                className="copy-referral-btn"
              >
                <img src="/assets/copy-referral-btn.png" alt="Copy referral" />
              </button>
            </div>
          </div>

          <div className="balance-info-container">
            <img
              className="custom-border custom-border-balance"
              src="/assets/my-page-border-two.png"
              draggable="false"
              aria-hidden="true"
              alt=""
            />

            <div className="my-balance-title">MY BALANCE</div>

            <div className="user-balances">
              <div className="total-energy">
                <div className="energy-title">
                  <EnergyIcon className="energy-icon-svg" /> Energy
                </div>
                <div className="energy-count">
                  <span>80000</span> / 130493
                </div>
              </div>

              <div className="total-coin">
                <div className="coin-title">
                  <CoinIcon className="coin-icon-svg" /> Coin
                </div>

                <div className="coin-count">0</div>
              </div>
            </div>

            <div className="items-container">
              <div className="items-title">
                <span className="items-text">Items</span>
                <InfoIcon
                  className="info-icon-svg"
                  onClick={() => setTutorialOpen(true)}
                />
              </div>

              <div className="user-inventory-container">
                <div className="mysterybox-count inventory-item">
                  <span>3</span>
                  <img
                    draggable="false"
                    src="/assets/mysterybox-inventory.png"
                    alt="An illustration of a cute, box-shaped robot with a smiling face on a screen, labeled 'Mystery Box.'"
                  />
                </div>
                <div className="raffleusb-count inventory-item empty-item">
                  <span>0</span>
                  <img
                    draggable="false"
                    src="/assets/raffleusb-inventory.png"
                    alt="An illustration of a USB flash drive with a green circuit board design, labeled 'Raffle USB.'"
                  />
                </div>
                <div className="nchip-count inventory-item">
                  <span>13</span>
                  <img
                    draggable="false"
                    src="/assets/nchip-inventory.png"
                    alt="An illustration of a microchip with a neon green and yellow circuit pattern, labeled 'N-Chip.'"
                  />
                </div>
                <div className="ticket-count inventory-item">
                  <span>1</span>
                  <img
                    draggable="false"
                    src="/assets/ticket-inventory.png"
                    alt="An illustration of a raffle ticket with a neon green design, labeled 'Raffle Ticket.'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="social-container">
            <img
              className="custom-border custom-border-social"
              src="/assets/my-page-border-three.png"
              draggable="false"
              aria-hidden="true"
              alt=""
            />

            <div className="social-title">Social</div>

            <div className="social-links-wrapper">
              <button
                onClick={connectHandler}
                title="Link your Twitter"
                className="social-link"
              >
                <img
                  src="/assets/twitter-pixel.png"
                  draggable="false"
                  aria-hidden="true"
                  alt="Twitter icon"
                  className="social-icon"
                />
                <span>Twitter/X</span>
                <span className="islinked-info linked">Linked</span>
              </button>
              <button
                onClick={connectHandler}
                title="Link your Telegram"
                className="social-link"
              >
                <img
                  src="/assets/telegram.png"
                  alt="Telegram icon"
                  aria-hidden="true"
                  draggable="false"
                  className="social-icon"
                />
                <span>Telegram</span>
                <span className="islinked-info linked">Linked</span>
              </button>
              <button
                onClick={connectHandler}
                title="Link your Discord"
                className="social-link"
              >
                <img
                  src="/assets/discord-icon.png"
                  alt="Discord icon"
                  className="social-icon not-linked"
                  aria-hidden="true"
                  draggable="false"
                />
                <span>Discord</span>
                <span className="islinked-info">Not Linked</span>
              </button>
            </div>
          </div>

          <div className="uid-container">
            {gameUID.length >= 5 && (
              <span className="uid-help">Scroll to see more games.</span>
            )}
            <img
              className="custom-border custom-border-uid"
              src="/assets/my-page-border-four.png"
              draggable="false"
              aria-hidden="true"
              alt=""
            />

            <div className="game-uid-title">
              <span>GAME UID</span>
              <EditIcon />
            </div>

            <div className="game-uid-container">
              {gameUID.map((game) => (
                <div key={game.gameName} className="game-uid">
                  <span className="game-name">{game.gameName}</span>
                  <span className="game-uid-info">{game.gameUID}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;
