import { FC } from "react";

// Hooks
import useTelegramBackButton from "../../hooks/useTelegramBackButton";

// Types
import { ItemsTutorialProps } from "../../types";

const itemsTutorial: ItemsTutorialProps[] = [
  {
    imageSrc: "/assets/mystery-box.png",
    itemTitle: "Mystery Box",
    itemDescription: (
      <p>
        <span>
          Mystery Box is mystical device that can transform energy into
          meaningful potential. Users can tier up with energy earned from
          completing missions, and each time they tier up, they receive one
          Mystery Box. One Mystery Box can be unlocked by spending a certain
          amount of energy.
        </span>
        <br />
        <br />
        <span>
          When you unlock a Mystery Box, you will be rewarded with an N-Chip or
          Raffle USB.
        </span>
      </p>
    ),
  },
  {
    imageSrc: "/assets/raffle-usb-items.png",
    itemTitle: "Raffle USB",
    itemDescription: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nisi
        possimus voluptate neque obcaecati commodi dignissimos harum, minima
        odio non provident sequi necessitatibus earum molestiae vitae culpa nam
        perferendis eos aut eius. Nobis ratione explicabo doloremque quod
        reiciendis, nam illum iure ducimus unde repellendus fuga nostrum,
        suscipit numquam modi corrupti?
      </p>
    ),
  },
];

interface TutorialComponentProps {
  setTutorialOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemsTutorial: FC<TutorialComponentProps> = ({ setTutorialOpen }) => {
  useTelegramBackButton({
    isVisible: true,
    onClick: () => setTutorialOpen(false),
  });

  return (
    <div className="items-tutorial">
      <img
        src="/assets/tutorial-border.png"
        className="custom-border"
        alt=""
        draggable="false"
        aria-hidden="true"
      />

      <div className="items-info">
        {itemsTutorial.map((item) => (
          <div className="item-container" key={item.itemTitle}>
            <img
              aria-hidden="true"
              src={item.imageSrc}
              alt={item.itemTitle}
              draggable="false"
            />
            <h3>{item.itemTitle}</h3>
            <p>{item.itemDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsTutorial;
