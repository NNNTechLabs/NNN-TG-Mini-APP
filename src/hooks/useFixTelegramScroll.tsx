import { useEffect } from "react";

const useFixTelegramScroll = () => {
  useEffect(() => {
    const fixTelegramScroll = () => {
      document.documentElement.style.setProperty("overflow", "auto");
      document.body.style.setProperty("overflow", "auto");
      document.documentElement.style.setProperty(
        "height",
        "calc(100vh + 1px)",
        "important"
      );
      document.body.style.setProperty("height", "100%", "important");
    };

    fixTelegramScroll();

    window.addEventListener("resize", fixTelegramScroll);

    return () => {
      window.removeEventListener("resize", fixTelegramScroll);
    };
  }, []);
};

export default useFixTelegramScroll;
