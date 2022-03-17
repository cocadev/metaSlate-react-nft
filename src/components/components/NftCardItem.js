import React, { memo } from 'react';
import Clock from "./Clock";
import { navigate } from '@reach/router';
import { DEMO_AVATAR } from './constants/keys';

const NftCardItem = ({ nft, className = '', mine, hasOffers, auction, height, onImgLoad, demo, zoom}) => {

  return (
    <div>
      <div className={`${zoom ? "nft-card-big m-3" : "nft-card m-2"}`} style={{ border: nft.deadline && '2px solid yellow'}}>
        <div className={`${zoom ? "nft-card-header-big" : "nft-card-header"}`}>
          {!nft.isVideo && <img onLoad={onImgLoad} src={nft.image || './images/item.jpg'} alt=""/>}
          {nft.isVideo &&
            <video style={{ height: 150 }} controls loop>
              <source src={nft.image} type="video/mp4" />
              Your browser does not support playing this Video
            </video>}
        </div>
        {nft.deadline &&
          <div className="de_countdown" style={{ marginTop: -20}}>
            <Clock deadline={nft.deadline} />
          </div>
        }
        <div className='flex flex-row justify-between items-center' style={{ margin: 12 }}>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <div style={{ marginRight: 10 }}>
              <img
                src={nft?.avatar || DEMO_AVATAR} 
                alt='avatar' 
                style={{ width: 40, height: 40, borderRadius: 20}} 
                className='nft-avatar'
                onClick={()=>navigate('/profile/' + nft.address)}
              />
            </div>

            <div>
              <h6 style={{ height: 23, overflow: 'hidden', maxWidth: zoom ? 140 : 80}}>{nft.name}</h6>
              <div style={{ lineHeight: 1.4, height: 38, overflow: 'hidden', fontSize: 13, marginTop: -9 }}>{nft.description}</div>
            </div>
          </div>

          <div style={{ marginTop: -12}}>
            <div style={{ fontSize: 12, textAlign: 'right' }}>Price</div>
            <div className='flex flex-row' style={{ fontSize: 10, textAlign: 'right' }}>
              <img src={'https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg'} alt='eth' style={{ width: 7, marginRight: 3, marginTop: -2 }} />
              {nft.price}
            </div>
          </div>

          {/* <div className="nft__item_price">
            <PriceUnit price={nft.price} token={nft.token} />
            {hasOffers && <div style={{ color: 'greenyellow' }}>
              Highest Bid: {hasOffers} MATIC
            </div>}
          </div> */}

          {/* TESTNETMETASLATENFT (TMSL8) */}


          {/* <div className="nft__item_like">
            <i className="fa fa-heart"></i><span>{nft.likes}</span>
          </div> */}
        </div>

        {demo && <div className='text-center'>Preview</div>}

        {!demo && <div className='flex flex-row justify-around' style={{ marginTop: -12 }}>
          <div className='nft-btn' onClick={() => navigate(`/${auction ? 'auction' : 'collection'}/${nft.id}`)}>
            View {zoom && 'Details'}
          </div>
          <div className='nft-btn' style={{ background: !mine ? '#3db97b' : '#fc7cc5'}} onClick={() => navigate(`/${auction ? 'auction' : 'collection'}/${nft.id}`)}>
            {mine ? 'List Item' : 'Item Detail'}
          </div>
        </div>}

      </div>
    </div>
  );
};

export default memo(NftCardItem);

