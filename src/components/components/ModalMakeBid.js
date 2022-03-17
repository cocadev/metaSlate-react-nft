import React, { useState, useEffect, memo } from "react";
import clsx from 'clsx';
import { useMoralis } from "react-moralis";
import { AUCTION_CONTRACT_ADDRESS, CURRENCY_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, ZERO_ADDRESS } from "./constants/keys";
import { toast } from "react-toastify";
import { SmallLoading } from "../atoms/loading";

const NFTAuctionABI = require("./constants/NFTAuction.json")
const TSlateERC20ABI = require("./constants/TSlateERC20.json")

const ModalMakeBid = (props) => {
  const { Moralis } = useMoralis();
  const [_tokenAmount, setTokenAmount] = useState(Number(props?.minPrice) + 1);
  const [_tokenId, setTokenId] = useState(1);
  const [currency, setCurrency] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const isDiabledMint = false;

  useEffect(() => {
    setTokenId(props.tokenId)
    console.log(props.data.erc20Token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tokenId])

  useEffect(() => {
    if (props.data.erc20Token === CURRENCY_CONTRACT_ADDRESS) {
      setCurrency("tSL8")
    } else if (props.data.erc20Token === ZERO_ADDRESS) {
      setCurrency("MATIC")
    }
  }, [props.data.erc20Token]);
  
  const onTransactBid = async () => {
    var options = {};
    console.log("onTransactBid is called")
    if (props.data.erc20Token === ZERO_ADDRESS.toLowerCase()) {
      console.log(props.data.erc20Token)
      options = {
        chain: "mumbai",
        contractAddress: AUCTION_CONTRACT_ADDRESS,
        functionName: "makeBid",
        abi: NFTAuctionABI.abi,
        params: {
          _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
          // _erc20Token: ZERO_ADDRESS,
          _erc20Token: ZERO_ADDRESS,
          _tokenId: _tokenId,
          _tokenAmount: Moralis.Units.ETH(_tokenAmount),
        }
      }
      setCurrency("MATIC")
    } else if (props.data.erc20Token === CURRENCY_CONTRACT_ADDRESS.toLowerCase()){
      console.log(CURRENCY_CONTRACT_ADDRESS)
      options = {
        chain: "mumbai",
        contractAddress: AUCTION_CONTRACT_ADDRESS,
        functionName: "makeBid",
        abi: NFTAuctionABI.abi,
        params: {
          _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
          // _erc20Token: ZERO_ADDRESS,
          _erc20Token: CURRENCY_CONTRACT_ADDRESS,
          _tokenId: _tokenId,
          _tokenAmount: Moralis.Units.Token(_tokenAmount, 18),
        }
      }
      setCurrency("tSL8")
    } else {
      toast("something went wrong",{type:"error",theme:"dark"})
      console.log(`${props.data.erc20Token} => ${CURRENCY_CONTRACT_ADDRESS}`)
    }

    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ made a bid! ~");
      toast(
        "Congratulations! You made a bid successfully."
      );
      window.location.reload();
    } catch (e) {
      console.error("~ error bid! ~", e);
      toast.error(e.message);
    }
    setIsLoading(false);
    props?.onClose();
  }


  const onMakeBid = async () => {
    setIsLoading(true);

    var options = {};

    if (props.data.erc20Token === ZERO_ADDRESS.toLowerCase()) {
      console.log(props.data.erc20Token)
      options = {
        chain: "mumbai",
        contractAddress: ZERO_ADDRESS,
        // contractAddress: CURRENCY_CONTRACT_ADDRESS,
        functionName: "approve",
        abi: TSlateERC20ABI.abi,
        params: {
          spender: AUCTION_CONTRACT_ADDRESS,
          amount: Moralis.Units.ETH(_tokenAmount),
        },
      };
      setCurrency("MATIC")
    } else if (props.data.erc20Token === CURRENCY_CONTRACT_ADDRESS.toLowerCase()){
      options = {
        chain: "mumbai",
        // contractAddress: ZERO_ADDRESS,
        contractAddress: CURRENCY_CONTRACT_ADDRESS,
        functionName: "approve",
        abi: TSlateERC20ABI.abi,
        params: {
          spender: AUCTION_CONTRACT_ADDRESS,
          amount: Moralis.Units.Token(_tokenAmount, 18),
        },
      };
      setCurrency("tSL8")
    } else {
      toast("something went wrong => 1" , {type:"error",theme:"dark"})
    }
    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ approve a Bid! ~");
      toast(
        "Congratulations! You approve a Bid successfully."
      );
      onTransactBid();
    } catch (e) {
      console.error("~ error approve Bid! ~", e);
      toast.error(e.message);
      setIsLoading(false);
      props?.onClose();
    }
  }

  return (
    <div className='maincheckout'>

      <h3>Make A Bid</h3>

      {
        !isLoading &&
        <>
          {/* <div className="">
            <label>_tokenId</label>
            <input
              name='_tokenId'
              className="form-control"
              value={_tokenId}
              placeholder="unit128"
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div> */}

          <div className="">
            <label>_tokenAmount</label>
            <input
              name='_tokenAmount'
              className="form-control"
              value={_tokenAmount}
              placeholder="unit128"
              type='number'
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </div>
          <h2>{currency}</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button className={clsx("btn-main", isDiabledMint && "btn-disabled")} onClick={onMakeBid}>Make A Bid</button>
            <button className='btn-main mb-5' style={{ background: '#ff343f' }} onClick={props?.onClose}>Cancel</button>
          </div>
        </>
      }

      {isLoading && <SmallLoading />}

    </div>
  );
};

export default memo(ModalMakeBid);