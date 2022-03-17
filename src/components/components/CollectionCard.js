import React, { memo } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  .col-card {
    cursor: pointer;
    width: 350px;
    height: 345px;
    margin: 10px 4px;
  }
  .nft_wrap {
    width: 328px;
    height: 140px;
    background-repeat: no-repeat, repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  .nft_coll{
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px; 
    }
  }
  
`;

const CollectionCard = ({ index, avatar, banner, username, uniqueId, collectionId }) => {
  return (
    <div className="col-card" index={index} >
      <GlobalStyles />

      <div className="nft_coll" style={{ background: '#333', border: 'none'}}>
        <div className="nft_wrap" style={{ backgroundImage: `url(${banner})`, }}>
        </div>
        <div className="nft_coll_pp">
          <span><img className="lazy" src={avatar} alt="" /></span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div style={{ color: '#3ca872', fontSize: 22, fontWeight: '500'}}>{username}</div>
          <div style={{ fontSize: 12}}>by {uniqueId}</div>
          <div className="w-full d-center mt-10" >
            <p style={{ maxWidth: 300, fontSize: 14}}>This information is a description of the collection written by the creator and will feature here...</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default memo(CollectionCard);