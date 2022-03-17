import React, { useState, memo } from "react";
import clsx from 'clsx';
import { useMoralis } from "react-moralis";
import { AUCTION_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constants/keys";
import { toast } from "react-toastify";
import { SmallLoading } from "../atoms/loading";

const auctionContractABI = require("./constants/NFTAuction.json")

const ModalTakeHighestBid = (props) => {

  const { Moralis } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const isDiabledMint = false;

  const transact = async () => {
    setIsLoading(true);

    const options = {
      chain: "mumbai",
      contractAddress: AUCTION_CONTRACT_ADDRESS,
      functionName: "takeHighestBid",
      abi: auctionContractABI.abi,
      params: {
        _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
        _tokenId: props.tokenId,
      },
    };

    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ made a bid! ~");
      toast(
        "Congratulations! You made a bid successfully."
      );
      // navigate("/");
    } catch (e) {
      console.error("~ error bid! ~", e);

      toast.error(e.message);
    }
    setIsLoading(false);
    props?.onClose();
  }

  return (
    <div className='maincheckout'>

      <h3>Take Highest Bid</h3>

      {
        !isLoading &&
        <>
            Are you pretty sure that conclude the auction ?
         
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

export default memo(ModalTakeHighestBid);