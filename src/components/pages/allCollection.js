import moment from "moment";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { SmallLoading } from "../atoms/loading";
import { DEMO_AVATAR, TOKEN_CONTRACT_ADDRESS } from "../components/constants/keys";
import NftCardItem from "../components/NftCardItem";
import _ from 'underscore';

import styled from "styled-components";
import { useParams } from "@reach/router";

export const FilterItem = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
`;

export const ChainIcon = styled.img`
  border-radius: 15px;
  margin-right: 12px;
  width: 30px;
  height: 30px;
  border: 1px solid #000;
`;

export const Avatar = styled.img`
  border: 2px solid #3db97b;
  background-color: rgb(255, 255, 255);
  margin-top: -150px;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  z-index: 100;
  cursor: pointer;
`;
export const Title = styled.div`
  font-size: 20px;
  color: #fff; 
  font-weight: 500;
`;
export const GreenDivder = styled.div`
  border-top: 2px solid #337b59
`;

export const Filter = styled.div`
  width: 20%;
  background: #202225;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`

const AllCollection = () => {

   const params = useParams();
   const [height, setHeight] = useState(0);
   const Web3Api = useMoralisWeb3Api();
   const [allData, setAllData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [accounting, setAccounting] = useState();
   const [minPrice, setMinPrice] = useState("");
   const [maxPrice, setMaxPrice] = useState("");

   const [title] = useState();
   const { data } = useMoralisQuery("NftAuctionCreated");
   const { data: bidMade } = useMoralisQuery("BidMade");
   const { data: users } = useMoralisCloudFunction('loadUsers');

   const { account } = useMoralis();
   const pathname = window.location.pathname.split('/')
   const isAll = pathname[pathname.length - 1] === 'all';

   const myInfo = users?.filter(item => item?.attributes?.ethAddress === accounting)

   const username = (myInfo && myInfo[0]?.attributes?.username) || 'Unnamed';
   const avatar = (myInfo && myInfo[0]?.attributes?.avatar) || DEMO_AVATAR
   const banner = myInfo && myInfo[0]?.attributes?.banner;

   console.log('banner', data)

   const bids = bidMade
      .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0)
      || [];

   useEffect(() => {
      if (params?.id) {
         setAccounting(params?.id)
      } else {
         setAccounting(account)
      }
   }, [params, account])

   useEffect(() => {
      setTimeout(() => {
         Web3Api && accounting && onFetch()
      }, 1000)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [accounting])

   const onImgLoad = ({ target: img }) => {
      let currentHeight = height;
      if (currentHeight < img.offsetHeight) {
         setHeight(img.offsetHeight);
      }
   }

   const onFetch = async () => {
      setIsLoading(true)
      const c1 = { address: TOKEN_CONTRACT_ADDRESS, chain: "mumbai" };
      const nftOwners = await Web3Api.token.getNFTOwners(c1);

      setAllData(nftOwners?.result
         .filter(item => isAll ? true : item.owner_of?.toLowerCase() === accounting)
         .sort(function (a, b) {
            return b.token_id - a.token_id
         }))
      setIsLoading(false)
   }
   const [eth, setEth] = useState(false)
   const [weth, setWeth] = useState(false)
   const [sidebar, setSidebar] = useState(false);
   const [zoom, setZoom] = useState(false);
   const selectOnSale = () => {
      if (document.getElementById('eth').checked) {
         setEth(true)
      } else {
         setEth(false)
      }
      if (document.getElementById('weth').checked) {
         setWeth(true)
      } else {
         setWeth(false)
      }
   }

   return (
      <div>

         {isAll && <section style={{ marginTop: -100 }}>
            <div className='d-center hero' style={{ height: 450 }}>
               <h1 style={{ fontWeight: '600' }}>All NFTs</h1>
            </div> 
         </section>}
 
         {!isAll && <section>
            <div 
               className='jumbotron breadcumb no-bg'
               style={banner ? { backgroundImage: `url(${banner})`, backgroundPosition: 'center' } : { background: '#111' }}
            > 
               <div className='mainbreadcumb' style={{ height: 60 }} />
            </div>
            <div className='d-center' style={{ marginTop: 95 }}>
               <Avatar src={avatar} alt='avatar' /><br />
               <h2 style={{ fontWeight: '600' }}>{username}</h2>
               <div style={{ marginTop: -7, fontWeight: '600' }}>
                  Created by <span className="text-primaring">Apostle</span>
               </div>

               <div className="mt-10" style={{ background: '#333', padding: '6px 20px', borderRadius: 20, display: 'flex', alignItems: 'center' }}>
                  <span aria-hidden="true" className="social_twitter" style={{ fontSize: 18, color: '#3db97b' }}></span>
                  <span style={{ fontWeight: '600', marginLeft: 10 }}>FedpunkClub</span> <span style={{ fontSize: 12, marginLeft: 8 }}>linked</span>
               </div>

               <div className="mt-30" style={{ background: '#333', padding: '16px 40px', borderRadius: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', fontWeight: '500', color: '#fff', fontSize: 17 }}>
                  <div style={{ width: 80 }}>
                     <div style={{ textAlign: 'center' }}>9.5K</div>
                     <div style={{ fontSize: 14, textAlign: 'center' }}>Items</div>
                  </div>
                  <div style={{ width: 80 }}>
                     <div style={{ textAlign: 'center' }}>2.5K</div>
                     <div style={{ fontSize: 14, textAlign: 'center' }}>Owners</div>
                  </div>
                  <div style={{ width: 110 }}>
                     <div style={{ textAlign: 'center' }}>0.12</div>
                     <div style={{ fontSize: 14, textAlign: 'center' }}>Floor price</div>
                  </div>
                  <div style={{ width: 120 }}>
                     <div style={{ textAlign: 'center' }}>25</div>
                     <div style={{ fontSize: 14, textAlign: 'center' }}>volume traded</div>
                  </div>
               </div>

               <br />
               <div className="mt-10">
                  This information is a description of the collection written by the creator and will feature here and will continue here until the description is done.
               </div>
               <div>
                  1) Alpha Community 2) Access to Alpha Tools 3) Virtual Experiences 4) Future Alpha Drops 5) Alpha Store (Future) 6) IRL Experiences (Future) 7) Access to App (Future)
               </div>
            </div>

         </section>
         }

         <div style={{ display: 'flex', flexDirection: 'row' }}>

            <div className={`filterbar ${sidebar ? 'showfilter' : ''}`}>

               <FilterItem style={{ justifyContent: 'space-around', alignItems: "center" }}>
                  <Title>Filters</Title>
                  <h3 className="closeSlider mb-0" onClick={e =>setSidebar(false)}>&times;</h3>
               </FilterItem>

               <GreenDivder />

               <div data-bs-toggle="collapse" data-bs-target="#status" style={{ cursor: "pointer" }}>
                  <FilterItem>
                     <Title>Status</Title>
                     <div className="pointer"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                  </FilterItem>
               </div>

               <div className="collapse show" id="status">
                  <div className="bg-darkgreen">
                     <div className="flex flex-row p-20 -mt-5">
                        <div className="grey-btn">Buy Now</div>
                        <div className="grey-btn ml-4">On Auction</div>
                     </div>

                     <div className="flex flex-row p-20 -mt-10">
                        <div className="grey-btn">New</div>
                        <div className="grey-btn ml-4  ">Has Offers</div>
                     </div>
                  </div>
               </div>
               <GreenDivder />
               <div data-bs-toggle="collapse" data-bs-target="#price" style={{ cursor: "pointer" }}>
                  <FilterItem>
                     <Title>Price</Title>
                     <div className="pointer"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                  </FilterItem>
               </div>

               <div className="collapse show" id="price">
                  <div className="bg-darkgreen -mt-5">
                     <div className="flex flex-row p-20 ">
                        <div className="grey-btn w-full">Ether(ETH)</div>
                     </div>

                     <div className="flex flex-row p-20 -mt-10">
                        <input
                           type="number"
                           className="grey-btn"
                           placeholder="Min"
                           value={minPrice}
                           onChange={e => setMinPrice(e.target.value)} />
                        <div className="mx-2 mt-1 text-green">to</div>
                        <input
                           type="number"
                           className="grey-btn"
                           placeholder="Max"
                           value={maxPrice}
                           onChange={e => setMaxPrice(e.target.value)} />
                     </div>
                     <div className="flex flex-row p-20 -mt-10">
                        <div className="grey-btn w-full mt-10 bg-green text-center text-dark bold">Apply</div>
                     </div>
                  </div>
               </div>
               <GreenDivder />
               <div data-bs-toggle="collapse" data-bs-target="#chains" style={{ cursor: "pointer" }}>
                  <FilterItem>
                     <Title>Chains</Title>
                     <div className="pointer"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                  </FilterItem>
               </div>
               <div className="collapse show" id="chains">
                  <div className="bg-darkgreen -mt-5">
                     <div className="p-20">
                        <div className="flex flex-row mt-1">
                           <ChainIcon src="https://opensea.io/static/images/logos/ethereum.png" />
                           Ethereum
                        </div>
                        <div className="flex flex-row mt-2">
                           <ChainIcon src="https://opensea.io/static/images/logos/polygon.svg" />
                           Polygon
                        </div>
                        <div className="flex flex-row mt-2">
                           <ChainIcon src="https://opensea.io/static/images/logos/klaytn.png" />
                           Klaytn
                        </div>
                     </div>
                  </div>
               </div>

               <GreenDivder />

               <div data-bs-toggle="collapse" data-bs-target="#onsale" style={{ cursor: "pointer" }}>
                  <FilterItem>
                     <Title>On sale In</Title>
                     <div className="pointer" data-bs-toggle="collapse" data-bs-target="#onsale"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                  </FilterItem>
               </div>

               <div className="collapse show" id="onsale">
                  <div className="bg-darkgreen " >
                     <div className="flex flex-row p-20 -mt-5">
                        <label className={`grey-btn text-center ${eth ? 'selectonesale' : "noselect"}`} htmlFor="eth" style={{ cursor: "pointer" }}>ETH</label>
                        <input type="radio" name="onsale" id="eth" style={{ display: "none" }} onChange={selectOnSale}/>
                        <label className={`grey-btn text-center ml-4 ${weth ? 'selectonesale' : "noselect"}`} htmlFor="weth" style={{ cursor: "pointer" }}>WETH</label>
                        <input type="radio" name="onsale" id="weth" style={{ display: "none" }} onChange={selectOnSale} />
                     </div>
                  </div>
               </div>
               <GreenDivder />
            </div>
            <div className="w-full mt-30">
               <div className="w-full flex flex-row justify-content-lg-between justify-content-center flex-wrap">
                  <p className="text-white" style={{ margin: '30px 0 0 54px' }}>{allData.length} items</p>
                  <div className="flex flex-row align-items-center flex-wrap my-3 my-md-0">
                     <div className={`dropdown mx-2`}>
                        <div className="grey-btn w-100 items-center pointer justify-content-between" data-bs-toggle="dropdown" style={{display: "flex" }} >
                           <div className="" id="allItems">All Items</div>
                           <div className="pointer"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="allItems">
                           <li><div className="dropdown-item">All Item</div></li>
                           <li><div className="dropdown-item">All Item</div></li>
                           <li><div className="dropdown-item">All Item</div></li>
                        </ul>
                     </div>
                     <div className="filterButton" onClick={e => sidebar ? setSidebar(false) : setSidebar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                           <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                        </svg>
                     </div>
                     <div className={`dropdown mx-2`}>
                        <div className="grey-btn items-center pointer justify-content-between w-100" data-bs-toggle="dropdown" style={{ display: "flex" }} >
                           <div className="" id="allItems">Sort by</div>
                           <div className="pointer"><span aria-hidden="true" className="arrow_carrot-down text-green" style={{ fontSize: 27 }}></span></div>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="allItems">
                           <li><div className="dropdown-item">All Item</div></li>
                           <li><div className="dropdown-item">All Item</div></li>
                           <li><div className="dropdown-item">All Item</div></li>
                        </ul>
                     </div>

                     <div className="grey-btn grid flex flex-row items-center justify-around mr-20" style={{ width: 150, padding: '5px 18px' }}>
                        <span aria-hidden="true" className="icon_grid-3x3 text-green pointer" style={{ fontSize: 30, color: `${zoom ? '#232323' : ''}`}} onClick={e => setZoom(false)}></span>
                        <div style={{ width: 2, height: 30 }} className="bg-green" />
                        <span aria-hidden="true" className="icon_grid-2x2 text-green pointer" style={{ fontSize: 34, color: `${!zoom ? '#232323' : ''}` }} onClick={e => setZoom(true)}></span>
                     </div>
                  </div>
               </div>
               <div className='flex flex-wrap center mt-30'>
                  {isLoading && <SmallLoading />}
                  {allData
                     .map((x, index) => {
                        const nft = x;
                        if (nft?.metadata) {
                           const { name, price, image, video } = JSON.parse(nft?.metadata);
                           const auction = data
                              .filter(item => (moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0))
                              .find(item => item.attributes.tokenId === nft?.token_id);
                           if (!name?.toLowerCase()?.includes(title) && title) {
                              return null
                           }
                           const nftBids = bids.filter((item) => item.attributes.tokenId === nft.token_id)
                           const maxBid = _.max(nftBids, function (nftbid) { return nftbid.attributes.tokenAmount; });
                           const userFind = users.find(item => item.attributes.ethAddress === x.owner_of);
                           const isAuction = (auction) ? moment(auction.attributes.createdAt).add(1, 'days').format('L, LT') : null;

                           return (
                              <NftCardItem
                                 nft={{
                                    "authorImg": "../img/author/author-10.jpg",
                                    "image": image,
                                    isVideo: video,
                                    "name": userFind?.attributes?.username || 'Unnamed',
                                    "price": price,
                                    "description": name,
                                    id: nft.token_id,
                                    token: 'MATIC',
                                    address: x.owner_of,
                                    deadline: isAuction,
                                    avatar: userFind?.attributes?.avatar || DEMO_AVATAR,
                                 }}
                                 zoom={zoom}
                                 mine={nft?.owner_of === account}
                                 hasOffers={maxBid && maxBid?.attributes?.tokenAmount}
                                 key={index}
                                 onImgLoad={onImgLoad}
                                 height={height}
                              />
                           )
                        } else {
                           return null
                        }
                     })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AllCollection;