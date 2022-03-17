import React from 'react';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Heading from '../../components/Heading/Heading'
import styles from './GetSupport.module.css'
const GetSupport = () => {
    return (
        <>
            <div style={{ marginTop: 100 }}>
                <Heading> Get Support </Heading>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./images/mainHeadder.png" alt="asdf" draggable="false" className="img-fluid p-4" />
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.formWrapper}>
                            <div className="mb-3">
                                <label>Wallet Address</label>
                                <input type="text" className={`form-control ${styles.input}`} placeholder="Enter you wallet address" />
                            </div>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className={`form-control ${styles.input}`} placeholder="Enter Your name" />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="text" className={`form-control ${styles.input}`} placeholder="Enter Your Email" />
                            </div>
                            <div className="mb-3">
                                <label>Describe your issue in detail ?</label>
                                <textarea rows="2" className={`form-control ${styles.input}`} placeholder="Enter Your requirement" >
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

export default GetSupport;
