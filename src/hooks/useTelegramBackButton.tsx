import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

interface useTelegramBackButtonProps {
  isVisible: boolean;
  onClick?: () => void;
}

const useTelegramBackButton = ({
  isVisible,
  onClick,
}: useTelegramBackButtonProps) => {
  // if (window.navigator.userAgent.indexOf("Win") != -1) {
  //   return;
  // } else if (window.navigator.userAgent.indexOf("Mac") != -1) {
  //   return;
  // } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
  //   return;
  // } else {
  //   console.log("The user's operating system could not be determined");
  // }
  useEffect(() => {
    if (isVisible) {
      WebApp.BackButton.isVisible = true;
      if (onClick) {
        WebApp.BackButton.onClick(onClick);
      }
    } else {
      WebApp.BackButton.isVisible = false;
      // Optionally, remove the onClick listener if needed
      WebApp.BackButton.onClick(() => {});
    }

    return () => {
      // Clean up the effect when the component unmounts or dependencies change
      WebApp.BackButton.isVisible = false;
      WebApp.BackButton.onClick(() => {});
    };
  }, [isVisible, onClick]);
};

export default useTelegramBackButton;
