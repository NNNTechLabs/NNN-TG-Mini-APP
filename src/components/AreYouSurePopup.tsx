import { FC } from "react";
import { motion as m } from "framer-motion";

interface AreYouSurePopupProps {
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSurePopup: FC<AreYouSurePopupProps> = ({
  title = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onCancel}
      className="areyousure-popup"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="areyousure-content"
      >
        <h2 className="areyousure-title">{title}</h2>

        <div className="areyousure-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </m.div>
    </m.div>
  );
};

export default AreYouSurePopup;
