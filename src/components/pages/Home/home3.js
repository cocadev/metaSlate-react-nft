import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import styles from './Home.module.css'
import Heading from '../../components/Heading/Heading'
import NftProcess from '../../components/NftProcess/NftProcess'
import { useMoralis, useMoralisCloudFunction, useMoralisQuery, useMoralisWeb3Api } from 'react-moralis';
import { DEMO_AVATAR, TOKEN_CONTRACT_ADDRESS } from '../../components/constants/keys';
import NftCardItem from '../../components/NftCardItem';
import moment from 'moment';

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .navbar .mainside a{
    background: #32c37d;  
  }
  .navbar .mainside a:hover{
    box-shadow: 2px 2px 20px 0px #32c37d;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
    background: #32c37d;
    border: solid 0px #32c37d;
  }
  .author_list_pp{
    margin-left:0;
  }
  .author_list_pp i, .nft_coll_pp i{
    background: #32c37d;
  }
  .nft__item_action span{
    color: #32c37d;
  }
  #scroll-to-top div{
    background: #32c37d;
  }
  .feature-box.style-3 i{
    background: #32c37d;
  }
  .feature-box.f-boxed:hover{
    background: #7b0f38;
  }
  footer.footer-light #form_subscribe #btn-subscribe i, footer.footer-light .subfooter .social-icons span i{
    background: #32c37d;
  }
  footer.footer-light{
    background: #26292D !important;
  }
  footer.footer-light, footer .widget h5, footer.footer-light a{
    color: #fff;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
  .social-icons i, .btn-main{
    background: #32c37d;
  }
  .btn-main:hover{
    box-shadow: 2px 2px 20px 0px #32c37d;
  }
  .item-dropdown .dropdown a:hover{
    background: #32c37d;
  }
`;

const Homethree = () => {

  const Web3Api = useMoralisWeb3Api();
  const [allData, setAllData] = useState([]);
  const { data: users } = useMoralisCloudFunction('loadUsers');
  const { account } = useMoralis();
  const { data } = useMoralisQuery("NftAuctionCreated");

  useEffect(() => {
    setTimeout(() => {
      Web3Api && onFetch()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFetch = async () => {
    const c1 = { address: TOKEN_CONTRACT_ADDRESS, chain: "mumbai" };
    const nftOwners = await Web3Api.token.getNFTOwners(c1);

    setAllData(nftOwners?.result
      .filter((item, index) => index < 4)
      .sort(function (a, b) {
        return b.token_id - a.token_id
      }))
  }

  return (
    <div>
      <GlobalStyles />
      <div className='hero'>
        {/* <Navbar /> */}
        <section className='container py-5' >
          <div className="row align-items-center" style={{ paddingTop: 90, paddingBottom: 40 }}>
            <div className="col-lg-6">
              <div className={styles.heroimage}>
                <img src={'../../../../images/mainHeadder.png'} className="img-fluid" alt='icon' />
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <h1 className="fw-bolder lh-base">Discover, Collect, And Sell ,<br />
                  Extraordinary NFTS
                </h1>
                <h3 className={`${styles.subheading} lh-base`}>
                  Metaslate is the largest and <br />
                  Greatest NFT marketplace
                </h3>
                <button className={styles.exploreButton}>+ Explore now</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Heading>Top collections over <span>last 7 days</span></Heading>
      <div className="container">
        <div className="row">
          <div className='nft flex flex-row flex-wrap'>
            {allData
              .map((x, index) => {
                const nft = x;
                if (nft?.metadata) {
                  const { name, price, image, video } = JSON.parse(nft?.metadata);
                  const auction = data
                    .filter(item => moment().diff(moment(item.attributes.createdAt).add(1, 'days')) < 0)
                    .find(item => item.attributes.tokenId === nft?.token_id);

                  const userFind = users.find(item => item.attributes.ethAddress === x.owner_of)
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
                        deadline: (auction) ? moment(auction.attributes.createdAt).add(1, 'days').format('L, LT') : null,
                        avatar: userFind?.attributes?.avatar || DEMO_AVATAR
                      }}
                      zoom={true}
                      mine={nft?.owner_of === account}
                      key={index}
                    />
                  )
                } else {
                  return null
                }
              })}
          </div>
        </div>
      </div>

      <br /><br /><br />
      <Heading>Create and Sell Your <span>NFTs</span></Heading>
      <div className="container">
        <div className="row">
          <NftProcess title="Setup your wallet" text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem" img={'wallet'} />
          <NftProcess title="Add your NFTs" text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem" img={'add'} />
          <NftProcess title="Sell Your NFTs" text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem" img={'sell'} />
        </div>
      </div>

      <Footer />

    </div>
  )
};
export default Homethree;