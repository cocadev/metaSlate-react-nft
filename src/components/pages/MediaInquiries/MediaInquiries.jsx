import React from 'react';
import Heading from '../../components/Heading/Heading'
import styles from './MediaInquiries.module.css'
import GetInTouch from '../../components/GetInTouch/GetInTouch'
const MediaInquiries = () => {
  return (
      <>
          <div style={{ marginTop: 100 }}>
              <Heading>
                  Media Inquiries
              </Heading>
          </div>
          <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-6">
                      <img src="./images/mainHeadder.png" alt="asdf" draggable="false" className="img-fluid p-4" />
                  </div>
                  <div className="col-lg-6">
                      <div className={styles.formWrapper}>
                          <div className="mb-3">
                              <label>Twitter</label>
                              <input type="text" className={`form-control ${styles.input}`} placeholder="Twitter" />
                          </div>
                          <div className="mb-3">
                              <label>Instagram</label>
                              <input type="text" className={`form-control ${styles.input}`} placeholder="Instagram" />
                          </div>
                          <div className="mb-3">
                              <label>Youtube</label>
                              <input type="text" className={`form-control ${styles.input}`} placeholder="Youtube" />
                          </div>
                          <div className="mb-3">
                              <label>Website</label>
                              <input type="text" className={`form-control ${styles.input}`} placeholder="Website" />
                          </div>
                          <div className="mb-3">
                              <label>Topic</label>
                              <input type="text" className={`form-control ${styles.input}`} placeholder="Topic" />
                          </div>
                          <div className="mb-3">
                              <label>Let us know who you are ?</label>
                              <textarea rows="2" className={`form-control ${styles.input}`} placeholder="Enter Your Details" >
                                </textarea>
                          </div>
                          <div>
                              <button className={`${styles.submit}`}>Submit</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <GetInTouch />
      </>
  );
};

export default MediaInquiries;
