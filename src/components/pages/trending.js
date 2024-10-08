import React, { memo, useState } from "react";
// import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
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

const Trending = () => {

  const [matic, setMatic] = useState();
  const [dollar, setDollar] = useState();

  return (
    <div>
      <GlobalStyles />

      <section className='container mt-100'>
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <h3 className='text-center'>MATIC Trending</h3>

            <div className="profile_avatar center mt-30">
              <svg width="125" height="125" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                  fill="#8247E5"
                />
                <path
                  d="M20.4896 11.5015C20.1157 11.2878 19.635 11.2878 19.2077 11.5015L16.2166 13.2641L14.1869 14.3858L11.2493 16.1484C10.8754 16.362 10.3947 16.362 9.96736 16.1484L7.67062 14.7596C7.29674 14.546 7.02967 14.1187 7.02967 13.638V10.9674C7.02967 10.5401 7.24332 10.1128 7.67062 9.8457L9.96736 8.51039C10.3412 8.29674 10.822 8.29674 11.2493 8.51039L13.546 9.89911C13.9199 10.1128 14.1869 10.5401 14.1869 11.0208V12.7834L16.2166 11.6083V9.79228C16.2166 9.36499 16.003 8.93769 15.5757 8.67062L11.3027 6.16024C10.9288 5.94659 10.4481 5.94659 10.0208 6.16024L5.64095 8.72404C5.21365 8.93769 5 9.36499 5 9.79228V14.8131C5 15.2404 5.21365 15.6677 5.64095 15.9347L9.96736 18.4451C10.3412 18.6588 10.822 18.6588 11.2493 18.4451L14.1869 16.7359L16.2166 15.5608L19.1543 13.8516C19.5282 13.638 20.0089 13.638 20.4362 13.8516L22.7329 15.1869C23.1068 15.4006 23.3739 15.8279 23.3739 16.3086V18.9792C23.3739 19.4065 23.1602 19.8338 22.7329 20.1009L20.4896 21.4362C20.1157 21.6499 19.635 21.6499 19.2077 21.4362L16.911 20.1009C16.5371 19.8872 16.27 19.4599 16.27 18.9792V17.27L14.2404 18.4451V20.2077C14.2404 20.635 14.454 21.0623 14.8813 21.3294L19.2077 23.8398C19.5816 24.0534 20.0623 24.0534 20.4896 23.8398L24.816 21.3294C25.1899 21.1157 25.457 20.6884 25.457 20.2077V15.1335C25.457 14.7062 25.2433 14.2789 24.816 14.0119L20.4896 11.5015Z"
                  fill="white"
                />
              </svg>
              &nbsp; &nbsp; &nbsp;
              <div className="demo-icon-wrap-s2">
                <span aria-hidden="true" className="arrow_left-right_alt"></span>
              </div>

              <img src="https://www.pngitem.com/pimgs/m/260-2608718_american-flag-in-a-circle-hd-png-download.png" style={{ width: 125, height: 125 }} alt='dollar' />
            </div>

            <div className="field-set mt-30">
              <label>MATIC</label>
              <input
                name='matic'
                className="form-control"
                value={matic}
                onChange={(e) => {
                  setMatic(e.target.value)
                  setDollar(e.target.value * 2.8808)
                }}
              />
            </div>

            <div className="field-set mt-10">
              <label>USD</label>
              <input
                name='usd'
                className="form-control"
                value={dollar}
                onChange={(e) => {
                  setDollar(e.target.value)
                  setMatic(e.target.value / 2.8808)
                }}
              />
            </div>

          </div>
        </div>
        <div class="_form_1"></div>
      </section>

      <Footer />
    </div>
  );
}
export default memo(Trending);