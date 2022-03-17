import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { ToastContainer, toast } from 'react-toastify';

export const WalletBtn = function () {

  const { authenticate, isAuthenticated, user, authError } = useMoralis();

  const [connectWalletText, setCWT] = useState("Connect Wallet");

  useEffect(() => {
    authError && toast.error(authError.message);
  }, [authError])

  useEffect(()=>{

    if(user){
      if(user.get("accounts")){
        const userAddress = user.get("accounts")[0];
        setCWT(userAddress.substring(0,6) + "..." + userAddress.substring(36,42));
      }

    }
  }, [user, isAuthenticated])

  const connectMeta = async () => {
   await authenticate({ signingMessage: "Moralis Authentication" })
  };

  return (
    <div className="mainside">
      <button onClick={connectMeta} className="btn-main">
        {connectWalletText}
      </button>
      <ToastContainer />
    </div>
  );
};