import React, { useEffect, useState } from "react";
import  { setDefaultBreakpoints } from "react-socks";
import { Link } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";
import Account from "./account";
import useWindowSize from "../../hooks/useWindowSize";
// import Chains from "./chains";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function () {

  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const { width } = useWindowSize();

  const isMobile = width < 600;

  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };

  const closeMenu = () => {
    // setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };


  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });


  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <header id="myHeader" className="navbar" style={{ height: 90}}>
      <div className="container">
        <div className="flex flex-row items-center w-full" >

          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
    
                {!isMobile && <img src="/img/LOGOblade.png" style={{ width: 170, marginTop: -12}} alt="#" />}
                {isMobile && <img src="green.png" alt="#" style={{ width: 35 }} />}
          
              </NavLink>
            </div>
          </div>

          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div>

          <div className="ml-4 flex flex-row" >
            <div className="navbar-item" style={{ marginLeft: 30}}>
              <NavLink to="/" >
                {!isMobile ? <>Home</> : <span aria-hidden="true" className="icon_house_alt"></span>}
              </NavLink>
            </div>
            <div className="navbar-item" style={{ marginLeft: 20}}>
              <div ref={ref1}>
                <div
                  className="dropdown-custom dropdown-toggle btn"
                  onMouseEnter={handleBtnClick1}
                  onMouseLeave={closeMenu1}
                >
                  
                  {!isMobile ? <>Explore</> : <span aria-hidden="true" className="icon_archive_alt"></span>}

                  {openMenu1 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu1}>
                        <NavLink to="/all">All</NavLink>
                        <NavLink to="/explore">Explore Collection</NavLink>
                        <NavLink to="/create">Create</NavLink>
                        <NavLink to="/profile">My Collection</NavLink>
                        <NavLink to="/liveAuction">Live Auction</NavLink>
                        <NavLink to="/activities">Activities</NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="navbar-item">
              <div ref={ref2}>
                <div
                  className="dropdown-custom dropdown-toggle btn"
                  onMouseEnter={handleBtnClick2}
                  onMouseLeave={closeMenu2}
                >
                  {!isMobile ? <>User</> : <span aria-hidden="true" className="icon_profile"></span>}
                  {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/Author">Author</NavLink>
                        <NavLink to="/trending">Trending</NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full"/>

          <Account />

        </div>

      </div>
    </header>
  );
};
export default Header;
