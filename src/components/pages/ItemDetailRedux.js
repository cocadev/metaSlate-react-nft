import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from "../../store/actions/thunks";
import Checkout from "../components/Checkout";
import api from "../../core/api";
import moment from "moment";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetailRedux = ({ nftId }) => {

    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
        setOpenMenu1(false);
        document.getElementById("Mainbtn").classList.add("active");
        document.getElementById("Mainbtn1").classList.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu(false);
        document.getElementById("Mainbtn1").classList.add("active");
        document.getElementById("Mainbtn").classList.remove("active");    
    };

    const dispatch = useDispatch();
    const nftDetailState = useSelector(selectors.nftDetailState);
    const nft = nftDetailState.data ? nftDetailState.data : [];

    const [openCheckout, setOpenCheckout] = React.useState(false);

    useEffect(() => {
        dispatch(fetchNftDetail(nftId));
    }, [dispatch, nftId]);

    return (
        <div>
        <GlobalStyles/>
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
                    <div className="col-md-6 text-center">
                        <img src={ nft.preview_image && api.baseUrl + nft.preview_image.url} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            {/* {nft.item_type === 'on_auction' && */}
                                <>
                                    Auctions ends in 
                                    <div className="de_countdown">
                                        <Clock deadline={nft.deadline} />
                                    </div>
                                </>
                            {/* } */}
                            <h2>{nft.title}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div>
                                <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>
                                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
                            </div>
                            <p>{nft.description}</p>
                            {/* button for checkout */}
                            <button className='btn-main lead mb-5' onClick={() => setOpenCheckout(true)}>Checkout</button>

                            <h6>Creator</h6>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>{nft.author && nft.author.username}</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">

                            <ul className="de_nav">
                                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Bids</span></li>
                                <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>History</span></li>
                            </ul>
                                        
                            <div className="de_tab_content">
                                {openMenu  && (  
                                <div className="tab-1 onStep fadeIn">
                                    {nft.bids && nft.bids.map((bid, index) => (
                                        <div className="p_list" key={index}>
                                            <div className="p_list_pp">
                                                <span>
                                                    <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </div>                                    
                                            <div className="p_list_info">
                                                Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                                <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}

                                {openMenu1 && ( 
                                <div className="tab-2 onStep fadeIn">
                                    {nft.history && nft.history.map((bid, index) => (
                                        <div className="p_list" key={index}>
                                            <div className="p_list_pp">
                                                <span>
                                                    <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </div>                                    
                                            <div className="p_list_info">
                                                Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                                <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                                
                            </div>     
                        </div>          
                    </div>
                </div>
            </div>
        </section>
        <Footer /> 
        { openCheckout &&
            <div className='checkout'>
                <Checkout/>
                <button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
            </div>
        }

        </div>
    );
}

export default memo(ItemDetailRedux);