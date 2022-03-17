import React, { memo } from 'react';

//react functional component
const UserTopSeller = ({ user }) => {
    return (
        <>
            <div className="author_list_pp">
              <span onClick={()=> window.open("", "_self")}>
              <img class="lazy" src="../img/author/author-10.jpg" alt="" />
                  <i className="fa fa-check"></i>
              </span>
            </div>                                    
            <div className="author_list_info">
                <span onClick={()=> window.open("", "_self")}>{user.name}</span>
                <span className="bot">{user.totalPrice} ETH</span>
            </div>   
        </>     
    );
};

export default memo(UserTopSeller);