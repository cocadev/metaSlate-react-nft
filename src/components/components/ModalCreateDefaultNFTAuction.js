import React, { useState, memo, useEffect } from "react";
import clsx from 'clsx';
import { useMoralis } from "react-moralis";
import { AUCTION_CONTRACT_ADDRESS, CURRENCY_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, METASLATE_FEE_AMOUNT, METASLATE_FEE_ADDRESS, ZERO_ADDRESS  } from "./constants/keys";
import { toast } from "react-toastify";
import { SmallLoading } from "../atoms/loading";
import { Dropdown, DropdownButton } from "react-bootstrap";

const auctionContractABI = require("./constants/NFTAuction.json")
const mintingContractABI = require("../components/constants/ERC721WithRoytalties&URI.json")

const ModalCreateDefaultNFTAuction = (props) => {
  
  const { Moralis, } = useMoralis();
  const [_minPrice, setMinPrice] = useState(1.5);
  const [_buyNowPrice, setBuyNowPrice] = useState(10);
  const [_tokenId, setTokenId] = useState(1);
  const [currency, setCurrency] = useState("tSL8");
  const [isLoading, setIsLoading] = useState(false);
  const isDiabledMint = !_minPrice || !_buyNowPrice;

  useEffect(() => {
    setTokenId(props.tokenId)
  }, [props.tokenId])

  const onApproveNFT = async () => {
    setIsLoading(true);

    const options = {
      chain: "mumbai",
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      functionName: "approve",
      abi: mintingContractABI.abi,
      params: {
        to: AUCTION_CONTRACT_ADDRESS,
        tokenId: _tokenId, 
      },
    };
    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      transact();
      toast(
        "Congratulations! You approved a NFT successfully."
      );
      
    } catch (e) {
      console.error("~ error on approve! ~", e);
      toast.error(e.message);
      setIsLoading(false);
      props?.onClose();
    }
  }

  const transact = async () => {

    var options = {};

    if(currency === "MATIC") {
      options = { 
        chain: "mumbai",
        contractAddress: AUCTION_CONTRACT_ADDRESS,
        functionName: "createDefaultNftAuction",
        abi: auctionContractABI.abi,
        params: {
          _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
          _tokenId,
          _erc20Token: ZERO_ADDRESS,
          _minPrice: Moralis.Units.ETH(_minPrice),
          _buyNowPrice: Moralis.Units.ETH(_buyNowPrice),
          _feeRecipients: [METASLATE_FEE_ADDRESS],
          _feePercentages: [METASLATE_FEE_AMOUNT]
        },
      };
    } else {
      options = { 
        chain: "mumbai",
        contractAddress: AUCTION_CONTRACT_ADDRESS,
        functionName: "createDefaultNftAuction",
        abi: auctionContractABI.abi,
        params: {
          _nftContractAddress: TOKEN_CONTRACT_ADDRESS,
          _tokenId,
          _erc20Token: CURRENCY_CONTRACT_ADDRESS,
          _minPrice: Moralis.Units.Token(_minPrice, 18),
          _buyNowPrice: Moralis.Units.Token(_buyNowPrice, 18),
          _feeRecipients: [METASLATE_FEE_ADDRESS],
          _feePercentages: [METASLATE_FEE_AMOUNT]
        },
      };
    }
    

    try {
      await Moralis.executeFunction(options).then((res) => console.log(res));
      console.log("~ Creating a default auction ~");
      toast(
        "Congratulations! You created an auction successfully."
      );
      window.location.reload();
    } catch (e) {
      console.error("~ error creating auction! ~", e);
      toast.error(e.message);
    }
    setIsLoading(false);
    props?.onClose();
  }

  return (
    <div className='maincheckout'>

      <h3>Create Default NFT Auction</h3>

      {
        !isLoading &&
        <>
          <div className="">
            <label>Floor price</label>
            <input
              name='_minPrice'
              className="form-control"
              type='number'
              value={_minPrice}
              placeholder="unit128"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="">
            <label>Buy now price</label>
            <input
              name='_buyNowPrice'
              className="form-control"
              type='number'
              value={_buyNowPrice}
              placeholder="unit128"
              onChange={(e) => setBuyNowPrice(e.target.value)}
            />
          </div>

          <label>currency</label>
          <DropdownButton 
            id="dropdown-basic-button" 
            title={currency}
          >
            <Dropdown.Item onClick={()=>setCurrency("MATIC")}>MATIC</Dropdown.Item> 
            {/* <Dropdown.Item onClick={()=>setCurrency('ETH')}>ETH</Dropdown.Item> No eth on mumbai */}
            <Dropdown.Item onClick={()=>setCurrency('tSL8')}>tSL8</Dropdown.Item> 
          </DropdownButton>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button className={clsx("btn-main", isDiabledMint && "btn-disabled")} onClick={onApproveNFT}>Transact</button>
            <button className='btn-main mb-5' style={{ background: '#ff343f' }} onClick={props?.onClose}>Cancel</button>
          </div>
        </>
      }

      {isLoading && <SmallLoading />}

    </div>
  );
};

export default memo(ModalCreateDefaultNFTAuction);