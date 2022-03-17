import React, { useState, memo } from "react";
import clsx from 'clsx';
import { useMoralis } from "react-moralis";
import { AUCTION_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constants/keys";
import { toast } from "react-toastify";
import { SmallLoading } from "../atoms/loading";

const NFTAuctionABI = require("./constants/NFTAuction.json")

const ModalWithdrawBid = (props) => {
  const { Moralis } = useMoralis();

  const [isLoading, setIsLoading] = useState(false);

  const isDiabledMint = false;
  const pathname = window.location.pathname.split('/')
  const _tokenId = pathname[pathname.length - 1];

  const transact = async () => {
    setIsLoading(true);

    const options = {
      chain: "mumbai",
      contractAddress: AUCTION_CONTRACT_ADDRESS,
      functionName: "withdrawBid",
      abi: NFTAuctionABI.abi,
      params: {
        _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
        _tokenId,
      },
    };

    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ withdraw a bid! ~");
      toast(
        "Congratulations! You withdraw a bid successfully."
      );
      // navigate("/");
    } catch (e) {
      console.error("~ error withdraw! ~", e);

      toast.error(e.message);
    }
    setIsLoading(false);
    props?.onClose();
  }

  return (
    <div className='maincheckout'>

      <h3>Withdraw Bid</h3>

      {
        !isLoading &&
        <>
          Do you really want to withdraw your bid?

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button className={clsx("btn-main", isDiabledMint && "btn-disabled")} onClick={transact}>Transact</button>
            <button className='btn-main mb-5' style={{ background: '#ff343f' }} onClick={props?.onClose}>Cancel</button>
          </div>
        </>
      }

      {isLoading && <SmallLoading />}

    </div>
  );
};

export default memo(ModalWithdrawBid);