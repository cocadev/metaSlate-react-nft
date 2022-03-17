import moment from "moment";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { SmallLoading } from "../atoms/loading";
import { TOKEN_CONTRACT_ADDRESS } from "../components/constants/keys";
import NftCardItem from "../components/NftCardItem";
import Footer from '../components/footer';
import _ from 'underscore';

const LiveAuction = () => {

  const [height, setHeight] = useState(0);
  const Web3Api = useMoralisWeb3Api();
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const { data } = useMoralisQuery("NftAuctionCreated");
  // const { data: users } = useMoralisQuery("_User");
  const { data: bidMade } = useMoralisQuery("BidMade");

  const { account } = useMoralis();
  const bids = bidMade
    .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0)
    || [];

  useEffect(() => {
    setTimeout(() => {
      Web3Api && onFetch()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    setAllData(nftOwners?.result)
    setIsLoading(false)
  }

  const filterNftTitles = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div style={{ marginTop: 200 }}>
      <h1 className='text-center'>Live Auction</h1>

      <div className="items_filter" style={{ display: 'flex', justifyContent: 'center'}}>
        <div className="row form-dark" id="form_quick_search" name="form_quick_search">

          <div className="col">
            <input
              className="form-control"
              id="name_1"
              name="name_1"
              placeholder="search item here..."
              type="text"
              value={title}
              onChange={filterNftTitles}
            />
            <button id="btn-submit" style={{ borderRadius: 5}}>
              <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>

      {isLoading && <SmallLoading />}

      <div className='flex flex-wrap center mt-30'>
        {allData
          .map((x, index) => {
            const nft = x;
            if (nft?.metadata) {
              const { name, description, price, image, video } = JSON.parse(nft?.metadata);
              const auction = data
              .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0)
              .find(item => item.attributes.tokenId === nft?.token_id);

              if(!auction){
                return null
              }

              if (!name?.toLowerCase()?.includes(title) && title) {
                return null
              }

              const nftBids = bids.filter((item) => item.attributes.tokenId === nft.token_id)
              const maxBid = _.max(nftBids, function(nftbid){ return nftbid.attributes.tokenAmount; });

              return (
                <NftCardItem
                  nft={{
                    "authorImg": "../img/author/author-10.jpg",
                    "image": image,
                    isVideo: video,
                    "name": name,
                    "price": price,
                    "description": description,
                    id: nft.token_id,
                    token: 'MATIC',
                    address: x.owner_of,
                    deadline: (auction) ? moment(auction.attributes.createdAt).add(1, 'days').format('L, LT') : null,
                  }}
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
      <Footer />
    </div>
  );
};

export default LiveAuction;