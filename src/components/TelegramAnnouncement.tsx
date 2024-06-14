import { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TelegramComponentProps {
  setIsVisible: (isVisible: boolean) => void;
}

const TelegramAnnouncement: FC<TelegramComponentProps> = ({ setIsVisible }) => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "steps(6)" } });
    const tlLoop = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "steps(6)" },
    });

    tl.from(".announcement-content p", {
      duration: 0.5,
      y: 10,
      scale: 0,
      rotate: () => gsap.utils.random(-10, 10),
      stagger: 0.02,
    })
      .from(".announcement-close", {
        duration: 0.5,
        opacity: 0,
        y: 10,
      })
      .from(".dont-show-again", {
        duration: 0.5,
        opacity: 0,
        y: 10,
      });

    gsap.fromTo(
      ".tube-asset",
      {
        duration: 1,
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
      },
      {
        x: -100,
        y: gsap.utils.random(-170, -200),
        scale: 1,
        rotate: -20,
        ease: "steps(8)",
        opacity: 1,
      }
    );

    gsap.fromTo(
      ".tube-asset-2",
      {
        duration: 1,
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
      },
      {
        x: 100,
        y: gsap.utils.random(170, 200),
        scale: 1.2,
        ease: "steps(8)",
        rotate: 30,
        opacity: 1,
      }
    );

    tlLoop
      .to(".tube-asset", {
        rotate: -17,
        delay: 1,
      })
      .to(
        ".tube-asset-2",
        {
          rotate: 27,
        },
        "<"
      );

    return () => {
      tl.kill();
      tlLoop.kill();
    };
  }, []);

  const handleClose = (): void => {
    setIsVisible(false);
  };

  const handleNoShowAgain = (): void => {
    localStorage.setItem("announcementClosed", "true");
    setIsVisible(false);
  };

  return (
    <div className="telegram-announcement-popup">
      <img
        className="announcement-asset tube-asset"
        src="/assets/energy-tube.png"
        draggable="false"
        aria-hidden="true"
        alt=""
      />
      <img
        className="announcement-asset tube-asset-2"
        src="/assets/energy-tube.png"
        draggable="false"
        aria-hidden="true"
        alt=""
      />
      <div className="announcement-content">
        <p>GET YOUR ENERGY ON TELEGRAM!</p>

        <div className="telegram-announcement-buttons">
          <button onClick={handleClose} className="announcement-close">
            Close
          </button>
          <button onClick={handleNoShowAgain} className="dont-show-again">
            Don't show it again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramAnnouncement;
