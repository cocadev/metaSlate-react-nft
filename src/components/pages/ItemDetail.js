import React, { useState, useEffect } from "react";
import Footer from '../components/footer';
import { useMoralis, useMoralisCloudFunction, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { DEMO_AVATAR, TOKEN_CONTRACT_ADDRESS, TOKEN_PRICE } from "../components/constants/keys";
import Clock from "../components/Clock";
import ModalCreateDefaultNFTAuction from "../components/ModalCreateDefaultNFTAuction";
import ModalMakeBid from "../components/ModalMakeBid";
import ModalTakeHighestBid from "../components/ModalTakeHighestBid";
import { SmallLoading } from "../atoms/loading";
import moment from "moment";
import ModalWithdrawBid from "../components/ModalWithdrawBid";
import ModalSettleAuction from "../components/ModalSettleAuction";
import ModalBuyNowPrice from "../components/ModalBuyNowPrice";
import _ from 'underscore';
import ModalMinPrice from "../components/ModalMinPrice";

const CollectionDetail = function () {
  const pathname = window.location.pathname.split('/')

  const { account, Moralis } = useMoralis();
  const [myNFT, setMyNFT] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const Web3Api = useMoralisWeb3Api();

  const { data } = useMoralisQuery("NftAuctionCreated");
  const { data: bidMade } = useMoralisQuery("BidMade");
  const { data: nftAuction } = useMoralisQuery("NftAuctionCreated", query => query.equalTo("tokenId", pathname[pathname.length - 1]));
  const { data: buyNowPriceUpdated } = useMoralisQuery("BuyNowPriceUpdated", query => query.equalTo("tokenId", pathname[pathname.length - 1]));
  const { data: minPriceUpdated } = useMoralisQuery("MinimumPriceUpdated", query => query.equalTo("tokenId", pathname[pathname.length - 1]));

  const { data: users } = useMoralisCloudFunction('loadUsers');

  const minPrice = Moralis.Units.FromWei(minPriceUpdated[0]?.attributes?.newMinPrice || nftAuction[0]?.attributes?.minPrice) || 0;
  const buyNowPrice = Moralis.Units.FromWei(buyNowPriceUpdated[0]?.attributes?.newBuyNowPrice || nftAuction[0]?.attributes?.buyNowPrice) || 0;

  const auction = data
    .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0)
    .find(item => item.attributes.tokenId === pathname[pathname.length - 1])

  // const isSettle = data
  //   .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) > 0)
  //   .find(item => item.attributes.tokenId === pathname[pathname.length - 1])

  const [openCreateDefaultNFTAuction, setOpenCreateDefaultNFTAuction] = useState(false);
  const [openMakeBid, setOpenMakeBid] = useState(false);
  const [openTakeHighestBid, setOpenTakeHighestBid] = useState(false);
  const [openWithdrawBid, setOpenWithdrawBid] = useState(false);
  const [openSettleAuction, setOpenSettleAuction] = useState(false);
  const [openBuyNowPrice, setOpenBuyNowPrice] = useState(false);
  const [openMinPrice, setOpenMinPrice] = useState(false);

  

  // const [isTitlePrice, setIsTitlePrice] = useState(true);
  const [isTitleListings, setIsTitleListings] = useState(true);
  const [isTitleOffers, setIsTitleOffers] = useState(true);
  const [isTitleDescription, setIsTitleDescription] = useState(true);
  // const [isTitleProperties, setIsTitleProperties] = useState(false);
  // const [isTitleAbout, setIsTitleAbout] = useState(false);
  const [isTitleDetails, setIsTitleDetails] = useState(false)
  const bids = bidMade
    .filter((item) => (item.attributes.tokenId === pathname[pathname.length - 1]))
    .sort((a, b) => b.attributes.tokenAmount - a.attributes.tokenAmount)
    .slice(0, 5)
    || [];

  useEffect(() => {
    setTimeout(() => {
      Web3Api && onFetch()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFetch = async () => {
    setIsLoading(true)
    const c1 = { address: TOKEN_CONTRACT_ADDRESS, chain: "mumbai" };
    const nftOwners = await Web3Api.token.getNFTOwners(c1);
    setMyNFT(nftOwners?.result.find((item) => item.token_id === pathname[pathname.length - 1]))
    setIsLoading(false)
  }

  const video = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.video;
  const image = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.image;
  const name = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.name;
  const description = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.description;
  const authorName = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.authorName;
  const price = myNFT?.metadata && JSON.parse(myNFT?.metadata)?.price;

  const minBids = _.max(bids, function (item) { return item?.attributes?.tokenAmount })
  const minBid = bids.length > 0 ? minBids?.attributes?.tokenAmount : minPrice

  return (
    <div>
      <section className='container'>
        <div className='row mt-md-5 pt-md-4'>
          <div className="col-md-5 text-center">
            {!video && <img onLoad={myNFT?.metadata?.image} src={image} className="img-fluid img-rounded mb-sm-30" style={{ width: '100%' }} alt="" />}
            {video && <iframe src={image} title='great' width={600} height={340} />}
            {isLoading && <SmallLoading />}

            <div className='offer-title' onClick={() => setIsTitleDescription(!isTitleDescription)}>
              <div><span aria-hidden="true" className="icon_menu"></span>&nbsp;&nbsp;Description</div>
              <span aria-hidden="true" className={`arrow_carrot-${!isTitleDescription ? 'down' : 'up'} text24`}></span>
            </div>

            {isTitleDescription && <div className='offer-body'>
              <div className="mt-2">{description}</div>
            </div>}

            {/* <div className='offer-title' onClick={() => setIsTitleAbout(!isTitleAbout)}>
              <div><span aria-hidden="true" className="icon_menu-square_alt2"></span>&nbsp;&nbsp;About Hidden_Gems</div>
              <span aria-hidden="true" className={`arrow_carrot-${!isTitleAbout ? 'down' : 'up'} text24`}></span>
            </div>

            {isTitleAbout && <div className='offer-body'>

              <div className="mt-2">Comming Soon</div>
            </div>} */}

            {/* <div className='offer-title' onClick={() => setIsTitleProperties(!isTitleProperties)}>
              <div><span aria-hidden="true" className="icon_ribbon_alt"></span>&nbsp;&nbsp;Properties</div>
              <span aria-hidden="true" className={`arrow_carrot-${!isTitleProperties ? 'down' : 'up'} text24`}></span>
            </div>

            {isTitleProperties && <div className='offer-body'>

              <div className="mt-2">Comming Soon</div>
            </div>} */}

            <div className='offer-title' onClick={() => setIsTitleDetails(!isTitleDetails)}>
              <div><span aria-hidden="true" className="icon_building"></span>&nbsp;&nbsp;Details</div>
              <span aria-hidden="true" className={`arrow_carrot-${!isTitleDetails ? 'down' : 'up'} text24`}></span>
            </div>

            {isTitleDetails && <div className='offer-body'>
              <div className="flex flex-row items-center justify-between w-full">
                <div>Contact Address</div>
                <div> 0x495...51</div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div>Token ID</div>
                <div> {myNFT?.token_id}</div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div>Token Standard</div>
                <div> ERC-721</div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div>Blockchain</div>
                <div>Ethereum</div>
              </div>

            </div>}

          </div>
          <div className="col-md-7">
            <div className="item_info">
              {auction && <>
                Auctions ends in
                <div className="de_countdown" style={{ padding: '4px 12px', color: 'greenyellow' }}>
                  <Clock deadline={moment(auction.attributes.createdAt).add(1, 'days').format('L, LT')} />
                </div>
              </>}
              <h2>{name || '-'}</h2>

              <p>
                Owned by &nbsp;
                <span style={{ color: '#2082e1' }}>{authorName || 'unknown'}</span>
                <span style={{ marginLeft: 24, marginRight: 12 }} aria-hidden="true" className="icon_heart"></span>
                <span>
                  260 favorites
                </span>
              </p>

              <div className='offer-card'>
                Highest offer
                <div className="flex flex-row">
                  <img style={{ width: 12 }} src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg" alt="ether" /> &nbsp;&nbsp;&nbsp;
                  <div style={{ fontSize: 40, fontWeight: '500', color: '#fff' }}>{price} <span style={{ fontSize: 18, fontWeight: '400' }}>(${price * TOKEN_PRICE || 0})</span></div>
                </div>
                <div>

                  {auction && <p>
                    <span style={{ color: 'greenyellow', fontWeight: '600' }}>Min</span> {minPrice} MATIC
                    {(myNFT?.owner_of === account) && <span className="withdraw-btn" onClick={() => setOpenMinPrice(true)} style={{ marginLeft: 12 }}>update</span>}
                    &nbsp;&nbsp;&nbsp;&nbsp;<br/><br/>

                    <span style={{ color: 'greenyellow', fontWeight: '600' }}>Buy Now</span> {buyNowPrice} MATIC

                    {(myNFT?.owner_of === account) && <span className="withdraw-btn" onClick={() => setOpenBuyNowPrice(true)} style={{ marginLeft: 12 }}>update</span>}

                  </p>}
                  {!isLoading && <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {!auction && (myNFT?.owner_of === account) && <button
                      className='btn-main m-1'
                      onClick={() => {
                        setOpenCreateDefaultNFTAuction(true)
                      }}
                    >
                      Create Auction
                    </button>}
                    {auction && (myNFT?.owner_of !== account) && <button
                      className='btn-main m-1 '
                      onClick={() => {
                        setOpenMakeBid(true);
                      }}>
                      Make Offer
                    </button>}
                    {/* {auction && <button className='btn-main m-1' onClick={() => setOpenTakeHighestBid(true)}>Take Highest Bid</button>} */}
                    {/* {isSettle && (myNFT?.owner_of === account) && <button
                      className='btn-main m-1'
                      onClick={() => {
                        setOpenSettleAuction(true);
                      }}>
                      Settle Auction
                    </button>} */}
                  </div>}
                </div>
              </div>
              {/* <div className='offer-title' onClick={() => setIsTitlePrice(!isTitlePrice)}>
                <div><span aria-hidden="true" className="icon_datareport_alt"></span>&nbsp;&nbsp;Price History</div>
                <span aria-hidden="true" className={`arrow_carrot-${!isTitlePrice ? 'down' : 'up'} text24`}></span>
              </div>

              {isTitlePrice && <div className='offer-body'>

                <div className="mt-2">Comming Soon</div>
              </div>} */}

              <div className='offer-title' onClick={() => setIsTitleListings(!isTitleListings)}>
                <div><span aria-hidden="true" className="icon_tag_alt"></span>&nbsp;&nbsp;Listings</div>
                <span aria-hidden="true" className={`arrow_carrot-${!isTitleListings ? 'down' : 'up'} text24`}></span>
              </div>

              {isTitleListings && <div className='offer-body  '>
                <div className="mt-2">No listings yet</div>
              </div>}

              <div className='offer-title' onClick={() => setIsTitleOffers(!isTitleOffers)}>
                <div><span aria-hidden="true" className="icon_ul"></span>&nbsp;&nbsp;Offers</div>
                <span aria-hidden="true" className={`arrow_carrot-${!isTitleOffers ? 'down' : 'up'} text24`}></span>
              </div>


              {isTitleOffers && <div className='offer-body'>

                <div className="de_tab">

                  <div className="de_tab_content ">
                    <div className="tab-1 onStep fadeIn">
                      {bids.length === 0 && <p>There are no bids yet</p>}

                      {bids.map((bid, index) => {

                        const userFind = users?.find(xx => xx.attributes.ethAddress === bid.attributes.bidder);
                        const bidderName = userFind?.attributes.username;
                        const bidderAvatar = userFind?.attributes.avatar || DEMO_AVATAR;

                        return (
                        <div key={index} className="p_list">
                          <div className="p_list_pp">
                            <span>
                              <img className="lazy" src={bidderAvatar} alt="" />
                              <i className="fa fa-check"></i>
                            </span>
                          </div>
                          <div className="p_list_info">
                            Bid <b>{Moralis.Units.FromWei(bid.attributes.tokenAmount)} ETH</b>
                            <span>by <b>{bidderName}</b> at {moment(bid.attributes.updatedAt).format('L, LT')}</span>
                          </div>
                          {
                            bid.attributes.bidder === account && bid.attributes.tokenAmount < buyNowPrice &&
                            <div className="p_list_info" onClick={() => setOpenWithdrawBid(true)}>
                              <div className="withdraw-btn">
                                Withdraw
                              </div>
                            </div>
                          }
                          {
                            myNFT?.owner_of === account && index === 0 && bid.attributes.tokenAmount < buyNowPrice &&
                            <div className="p_list_info" onClick={() => setOpenTakeHighestBid(true)}>
                              <div className="withdraw-btn">
                                Take a Highest
                              </div>
                            </div>
                          }
                        </div>)
                        }
                      )}
                    </div>

                  </div>

                </div>
              </div>}
              <br />
            </div>
          </div>

        </div>
      </section>

      <Footer />

      {openCreateDefaultNFTAuction &&
        <div className='checkout'>
          <ModalCreateDefaultNFTAuction
            tokenId={pathname[pathname.length - 1]}
            onClose={() => {
              setOpenCreateDefaultNFTAuction(false)
            }}
            />
        </div>
      }

      {openMakeBid &&
        <div className='checkout'>
          <ModalMakeBid
            tokenId={pathname[pathname.length - 1]}
            onClose={() => setOpenMakeBid(false)}
            minPrice={Moralis.Units.FromWei(minBid)}
            data={nftAuction[0].attributes}
          />
        </div>
      }

      {openTakeHighestBid &&
        <div className='checkout'>
          <ModalTakeHighestBid 
            onClose={() => setOpenTakeHighestBid(false)} 
            tokenId={pathname[pathname.length - 1]}
          />
        </div>
      }

      {openWithdrawBid && <div className='checkout'>
        <ModalWithdrawBid onClose={() => setOpenWithdrawBid(false)} />
      </div>}

      {openSettleAuction && <div className='checkout'>
        <ModalSettleAuction onClose={() => setOpenSettleAuction(false)} />
      </div>}

      {openBuyNowPrice && <div className='checkout'>
        <ModalBuyNowPrice onClose={() => setOpenBuyNowPrice(false)} buyNowPrice={buyNowPrice} />
      </div>}

      {openMinPrice && <div className='checkout'>
        <ModalMinPrice onClose={() => setOpenMinPrice(false)} minPrice={minPrice} />
      </div>}

    </div>
  );
}
export default CollectionDetail;