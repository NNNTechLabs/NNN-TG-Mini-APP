import React, { useState, useEffect } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useSearchParams, Navigate } from "react-router-dom";
import { loginwithTwitter } from "./Twitterservice";
import "./index.scss";
import { notifyError, notifySuccess } from "../../utils/functions";
const TwitterLoading: React.FC = () => {
  const walletAddress: string = useTonAddress();
  const [searchParams] = useSearchParams();
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddress) {
      loginTwitter();
    } else {
      console.log("Wallet address is not available yet.");
    }
  }, [walletAddress]);

  const loginTwitter = async () => {
    const codeVerifier = localStorage.getItem("codeVerifier");
    try {
      const code: string = searchParams.get("code") ?? "";
      const state: string = searchParams.get("state") ?? "";
      const data = {
        code,
        state,
        codeVerifier: codeVerifier ?? "",
        address: walletAddress.toLowerCase(),
      };
      const result = await loginwithTwitter(data);
      if (result.data.status) {
        localStorage.setItem("token", result.data.jwt_token);
        notifySuccess("Twitter account linked successfully");
        // show user success message
        setRedirect(true);
      } else {
        setTimeout(() => {
          notifyError(result.data.message);
          setRedirect(true);
        }, 3000);
      }
    } catch (e) {
      setTimeout(() => {
        setRedirect(true);
      }, 5000);
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

export default TwitterLoading;
