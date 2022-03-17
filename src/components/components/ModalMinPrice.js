import React, { useState, memo } from "react";
import clsx from 'clsx';
import { useMoralis } from "react-moralis";
import { AUCTION_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constants/keys";
import { toast } from "react-toastify";
import { SmallLoading } from "../atoms/loading";

const NFTAuctionABI = require("./constants/NFTAuction.json")

const ModalMinPrice = (props) => {

  const { Moralis } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const [_newMinPrice, setNewMinPrice] = useState(props?.minPrice);

  const isDiabledMint = false;
  const pathname = window.location.pathname.split('/')
  const _tokenId = pathname[pathname.length - 1];

  const transact = async () => {
    setIsLoading(true);

    const options = {
      chain: "mumbai",
      contractAddress: AUCTION_CONTRACT_ADDRESS,
      functionName: "updateMinimumPrice",
      abi: NFTAuctionABI.abi,
      params: {
        _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
        _tokenId,
        _newMinPrice: Moralis.Units.ETH(_newMinPrice)
      },
    };

    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ update min price! ~");
      toast(
        "Congratulations! You update a min price successfully."
      );
      // navigate("/");
    } catch (e) {
      console.error("~ error update! ~", e);

      toast.error(e.message);
    }
    setIsLoading(false);
    props?.onClose();
  }

  return (
    <div className='maincheckout'>

      <h3>Update Min Price</h3>
      {
        !isLoading &&
        <>

          <div className="">
            <label>min price</label>
            <input
              className="form-control"
              value={_newMinPrice}
              placeholder="unit128"
              type='number'
              onChange={(e) => setNewMinPrice(e.target.value)}
            />
          </div>

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

export default memo(ModalMinPrice);