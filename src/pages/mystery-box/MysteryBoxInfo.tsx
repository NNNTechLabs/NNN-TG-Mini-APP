import { FC } from "react";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

interface FAQItem {
  question: string;
  answer: string;
}

interface MysteryBoxInfoProps {
  setShowMysteryBoxInfo: (showMysteryBoxInfo: boolean) => void;
}

const faqItems: FAQItem[] = [
  {
    question: "WHAT IS MYSTERY BOX?",
    answer:
      "Spend energy to open the mystery box. Mystery boxes are the best route to get N-Chips, which will be airdropped in NNN Coin, and Raffle USBs, which are entries to the Node Raffle.",
  },
  {
    question: "HOW DO I GET A MYSTERY BOX?",
    answer:
      "You'll receive one Mystery Box for every tier you climb. Work your way up the tiers to get as many Mystery Boxes as possible.",
  },
  {
    question: "HOW DO I OPEN A MYSTERY BOX?",
    answer: "You can open Mystery Boxes by spending Energy.",
  },
  {
    question: "HOW DO I GET ENERGY THEN?",
    answer:
      "Collect Energy by completing various quests in Missions. At Energy Stations, you can upgrade your aliens that can collect energy for you.",
  },
];

const MysteryBoxInfo: FC<MysteryBoxInfoProps> = ({ setShowMysteryBoxInfo }) => {
  useTelegramBackButton({
    isVisible: true,
    onClick: () => setShowMysteryBoxInfo(false),
  });

  return (
    <div className="mystery-box-info">
      <img
        className="mystery-box-cover-img"
        src="/assets/mystery-box-cover.webp"
        aria-hidden="true"
        draggable="false"
        alt=""
      />

      <div className="mystery-box-questions">
        {faqItems.map((faqItem) => (
          <div key={faqItem.answer} className="faq-item">
            <h3 className="faq-question">{faqItem.question}</h3>
            <p className="faq-answer">{faqItem.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MysteryBoxInfo;
