import { FC, useRef } from "react";
import WebApp from "@twa-dev/sdk";
import { motion as m } from "framer-motion";

// Hooks
import { useOutsideClick } from "../hooks/useOutsideClick";

// Assets
import SuccessIcon from "../assets/svg/success.svg?react";
import FailIcon from "../assets/svg/fail.svg?react";

interface TransactionSuccessProps {
  transactionLink?: string;
  setIsSuccess: (isSuccess: boolean) => void;
}

interface TransactionFailedProps {
  setIsFailed: (isFailed: boolean) => void;
}

export const TransactionFailed: FC<TransactionFailedProps> = ({
  setIsFailed,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsFailed(false));

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ ease: "circOut" }}
      className="transaction-success"
      ref={ref}
    >
      <div className="transaction-success-content">
        <FailIcon className="success-icon fail" aria-hidden="false" />
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="transaction-success-title transaction-failed"
        >
          Transaction failed
        </m.span>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="transaction-success-description"
        >
          Sorry, your transaction has failed.
          <br />
          Please try again.
          <button onClick={() => setIsFailed(false)} className="close-btn">
            Close
          </button>
        </m.div>
      </div>
    </m.div>
  );
};

export const TransactionSuccess: FC<TransactionSuccessProps> = ({
  transactionLink = "",
  setIsSuccess,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsSuccess(false));

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ ease: "circOut" }}
      className="transaction-success"
      ref={ref}
    >
      <div className="transaction-success-content">
        <SuccessIcon className="success-icon" aria-hidden="false" />
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="transaction-success-title"
        >
          Transaction Successful
        </m.span>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="transaction-success-description"
        >
          Congratulations! Your transaction has been successfully completed.
          <br />
          {transactionLink !== "" && (
            <span
              className="check-your-transaction"
              onClick={() => WebApp.openLink(transactionLink)}
            >
              Check your transaction.
            </span>
          )}
          <button onClick={() => setIsSuccess(false)} className="close-btn">
            Close
          </button>
        </m.div>
      </div>
    </m.div>
  );
};
