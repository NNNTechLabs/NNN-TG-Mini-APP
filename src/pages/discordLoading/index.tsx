import React, { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { loginwithdiscord } from "./service";
import { notifySuccess, notifyError } from "../../utils/functions";
import { useTonAddress } from "@tonconnect/ui-react";
const DiscordLoading: React.FC = () => {
  const walletAddress: string = useTonAddress();
  const [searchParams] = useSearchParams();
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddress) {
      loginDiscord();
    } else {
      console.log("Wallet address is not available yet.");
    }
  }, [walletAddress]);

  const loginDiscord = async () => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const wallet_Address = walletAddress.toLowerCase();

    if (code && state) {
      try {
        const result = await loginwithdiscord({
          code,
          state,
          wallet_Address,
        });
        if (result.status) {
          localStorage.setItem("token", result.data?.jwt_token);
          notifySuccess(result.data.message);
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        } else {
          notifyError(result.data.message || "Something went wrong");
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        }
      } catch (error) {
        notifyError("An error occurred during login.");
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      }
    } else {
      notifyError("Missing code or state parameters.");
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    }
  };

  return (
    <div className="App" style={{ background: "rgba(0, 0, 0, 0.85)" }}>
      {redirect ? (
        <Navigate to="/" />
      ) : (
        <div className="full-content content-center">Authorizing...</div>
      )}
    </div>
  );
};

export default DiscordLoading;
