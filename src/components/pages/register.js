import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
// import { Toast } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

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

const Register = () => {
  const { signup, authError, user } = useMoralis();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password === rePassword && password && rePassword && userName && email) {

      setIsLoading(true);

      await signup(
        userName, 
        password, 
        email, 
        {ethAddress: (user && user.get("ethAddress")) ? user.get("ethAddress") : null}
      )

      if (authError) {
        toast.error(authError.message);
      } else {
        // await Moralis.User.requestEmailVerification(email)
        // .then(() => {
        //   console.log("Successfully sent email verification email");
        // })
        // .catch((error) => {
        //   alert("Error: " + error.code + " " + error.message);
        // });
        toast("Congratulations! The signup Success!");
      }
      setIsLoading(false);
    } else {
      toast.error('Validation error!');
    }
  };

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Register</h1>
                <p>Register an account with MetaSlate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3>Don't have an account? Register now.</h3>
            <p>
              Email is optional, but if you may have trouble recovering your
              account, so it may be worthwhile.
            </p>

            <div className="spacer-10"></div>

            <form
              name="contactForm"
              id="contact_form"
              className="form-border"
              action=""
            >
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="field-set">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>  */}

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Email Address:</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Choose a Username:</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <div className="field-set">
                    <label>Phone Number:</label>
                    <PhoneInput
                    defaultCountry="AU"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    />
                  </div>
                </div> */}

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Re-enter Password:</label>
                    <input
                      type="password"
                      name="re-password"
                      id="re-password"
                      className="form-control"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="pull-left">
   
                    <button className="btn-main" onClick={handleSubmit}>
                      {!isLoading && 'Register Now'}
                      {isLoading && <div aria-hidden="true" className="icon_loading rotating"></div>}
                    </button>
                  </div>

                  <div className="clearfix"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />

      <Footer />
    </div>
  );
};
export default Register;
