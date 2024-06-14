import { FC } from "react";
// import WebApp from "@twa-dev/sdk";

// import { useStore } from "../../context/useStore";
import { motion as m } from "framer-motion";

// Components
import SignUp from "./SignUp";

const LoginPopup: FC = () => {
  // const { setIsLoginOpen, setIsSignUpOpen } = useStore();

  // const closeHandler = (): void => {
  //   WebApp.BackButton.isVisible = false;
  //   setIsLoginOpen(false);
  //   setIsSignUpOpen(false);
  // };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "circOut" }}
      className="login-popup"
    >
      <m.div
        initial={{
          y: "100%",
          x: "-50%",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100%",
          x: "-50%",
        }}
        transition={{ duration: 0.25, ease: "circOut" }}
        onClick={(e) => e.stopPropagation()}
        className="login-popup-content"
      >
        <SignUp />
      </m.div>
    </m.div>
  );
};

export default LoginPopup;
