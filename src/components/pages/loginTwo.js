import React, { useState } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useMoralis } from "react-moralis";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Logintwo = () => {

  const { login, isAuthenticated, logout, user } = useMoralis();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();
    if(userName && password){
      setIsLoading(true);
      await login(userName, password);
      setIsLoading(false)
    }else {
      toast.error('Validation error!');
    }
  }

  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>User Login</h1>
                <p>
                  {isAuthenticated && 'You are authenticated!'}&nbsp;
                  <span style={{color: 'red', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => logout()}>Log out</span>
                </p>
                {user && <p>
                  username: {user.get("username")} <br/>
                  email: {user.get("email")}<br/>
                  ethAddress: {user.get("ethAddress")}<br/>
                </p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <form name="contactForm" id='contact_form' className="form-border" action=''>
              <h3>Login to your account</h3>


              <div className="field-set">
                <label>Username</label>
                <input
                  type='text'
                  name='userName'
                  id='userName'
                  className="form-control"
                  placeholder="" value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="field-set">
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className="form-control"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button className="btn-main" onClick={onLogin}>
                  {!isLoading && 'Login'}
                  {isLoading && <div aria-hidden="true" className="icon_loading rotating"></div>}  
                </button>

                <div className="clearfix"></div>

                <div className="spacer-single"></div>

                <ul className="list s3">
                  <li>Or login with:</li>
                  <li><span>Facebook</span></li>
                  <li><span>Google</span></li>
                  <li><span>Instagram</span></li>
                </ul>
              </div>
            </form>

          </div>
        </div>
      </section>
      <ToastContainer />

      <Footer />
    </div>
  )
};
export default Logintwo;