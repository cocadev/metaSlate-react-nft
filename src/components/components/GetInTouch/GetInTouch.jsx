import React from 'react'
import Heading from '../Heading/Heading'
import styles from './GetInTouch.module.css'

const GetInTouch = () => {
  return (
    <>
      <Heading>Get In <span>Touch</span></Heading>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className={styles.box}>
              <h4 className="fw-bold">Subscribe our news letter</h4>
              <p style={{ color: '#B1B1B1' }}>Signup for our newsletter to get the latest news in your inbox.</p>
              <div className="input-group mb-3">
                <input type="text" className={`form-control ${styles.input}`} placeholder="Enter Email here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className={styles.submit} type="button" id="button-addon2">Submit</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="fw-bold">Join Our Community</h3>
            <div className='d-flex flex-wrap justify-content-md-start justify-content-center'>
              <div>
                <div className='cursor'>
                  <img src={'../../images/insta.png'} alt="insta" className="m-2" />
                </div>
              </div>
              <div>
                <div>
                  <img src={'../../images/twitter.png'} alt="twitter" className="m-2 " />
                </div>
              </div>
              <div>
                <div>
                  <img src={'../../images/youtube.png'} alt="youtube" className="m-2 " />
                </div>
              </div>
              <div>
                <div>
                  <img src={'.././images/discord.png'} alt="discord" className="m-2 " />
                </div>
              </div>
              <div>
                <div>
                  <img src={'../../images/reddit.png'} alt="reddit" className="m-2 " />
                </div>
              </div>
              <div>
                <div>
                  <img src={'../../images/mail.png'} alt="mail" className="m-2 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/><br/>
    </>
  )
}

export default GetInTouch
