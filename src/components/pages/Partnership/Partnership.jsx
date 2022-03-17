import React from 'react';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Heading from '../../components/Heading/Heading';
import styles from './Partnership.module.css'

const Partnership = () => {
    return (
        <>
            <div style={{ marginTop: 100 }}>
                <Heading> Partnership Offer </Heading>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./images/mainHeadder.png" alt="asdf" draggable="false" className="img-fluid p-4" />
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.formWrapper}>
                            <div className="mb-3">
                                <label className="w-100 form-label"> Do you have a smart contract ?</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label class="form-check-label" for="inlineRadio1">We require one</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label class="form-check-label" for="inlineRadio2">Yes</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="w-100 form-label"> Do you have a smart contract ?</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineRadio3" value="option1" />
                                    <label class="form-check-label" for="inlineRadio3">Link</label>
                                    <input type="text" placeholder="Enter your link"  className={styles.link}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Let us know who you are</label>
                                <textarea rows="2" className={`form-control ${styles.input}`} placeholder="Enter Your requirement" >
                                </textarea>
                            </div>
                            <div className="mb-3">
                                <label>What do you require ?</label>
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
            <GetInTouch></GetInTouch>
        </>
    );
};

export default Partnership;
