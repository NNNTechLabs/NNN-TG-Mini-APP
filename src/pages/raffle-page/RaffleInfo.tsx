import { FC } from "react";
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

const RaffleInfo: FC<{
  setIsRaffleInfoOpen: (value: boolean) => void;
}> = ({ setIsRaffleInfoOpen }) => {
  useTelegramBackButton({
    isVisible: true,
    onClick: () => {
      setIsRaffleInfoOpen(false);
    },
  });

  return (
    <div className="raffle-info-popup">
      <img
        className="custom-border raffle-info-border"
        src="/assets/tutorial-border.png"
        aria-hidden="true"
        draggable="false"
        alt=""
      />

      <img
        draggable="false"
        aria-hidden="true"
        src="/assets/raffle-info-cover.webp"
        alt=""
        className="raffle-info-cover-img"
      />

      <div className="raffle-info-texts">
        <span className="raffle-question">What is node raffle?</span>

        <div className="raffle-answer">
          <p>
            Lorem ipsum dolor sit amet consectetur. Eget netus blandit felis
            dictum massa congue etiam. Vestibulum quis turpis viverra aliquam
            placerat leo laoreet purus. Suspendisse enim sit sollicitudin aenean
            morbi sagittis vitae. Cursus sit aliquam mi arcu curabitur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            magnam exercitationem quasi quas sint repellendus officiis eaque
            adipisci hic et officia ea fuga, doloremque nobis architecto itaque
            voluptates sunt provident. Animi a eius explicabo, doloribus eaque
            molestiae inventore, odit dolorum unde placeat perspiciatis
            architecto vero. Reiciendis deleniti ipsa consequuntur optio!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            nesciunt omnis vero, dolore deserunt cupiditate minus sint cumque
            quod velit provident consequuntur, repellat, cum non.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaffleInfo;
