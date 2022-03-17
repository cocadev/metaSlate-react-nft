import React, { useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/Home/home3';
import Rangking from './pages/rangking';
import ItemDetail from './pages/ItemDetail';
import Author from './pages/Author';

import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import { CreatePage } from './pages/create';
import Contact from './pages/contact';
import Trending from './pages/trending';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import { useMoralis } from 'react-moralis';
import AllCollection from './pages/allCollection';
import LiveAuction from './pages/liveAuction';
import ExploreCollection from './pages/exploreCollection';
import Support from './pages/Support/Support';
import ReportBug from './pages/ReportBug/ReportBug';
import MediaInquiries from './pages/MediaInquiries/MediaInquiries';
import GetSupport from './pages/GetSupport/GetSupport';
import Partnership from './pages/Partnership/Partnership';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div className="wraper">
      <GlobalStyles />
      <Header />
      <PosedRouter>
        <ScrollTop path="/">
          <Home exact path="/">
            <Redirect to="/home3" />
          </Home>
          <Home path="/home3" />

          <AllCollection path="/all" />
          <AllCollection path="/profile" />
          <AllCollection path="/profile/:id" />

          <Author path="/Author" />
          <CreatePage path="/create" />
          <ItemDetail path="/collection/:nftId" />
          <ExploreCollection path="/explore" />
          <Trending path="/trending" />
          <LiveAuction path="/liveAuction" />
          <Rangking path="/activities" />
          <LoginTwo path="/loginTwo" />
          <Register path="/register" />
          <Contact path="/contact" />
          <Support path="/support" />
          <ReportBug path="/reportbug" />
          <MediaInquiries path="/mediainquiries"/>
          <GetSupport path="/getsupport" />
          <Partnership path="/partnership" />
        </ScrollTop>
      </PosedRouter>
      <ScrollToTopBtn />
      <ToastContainer />
    </div>
  )
};
export default App;