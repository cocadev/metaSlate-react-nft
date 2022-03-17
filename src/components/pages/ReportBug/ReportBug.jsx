import React from 'react';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Heading from '../../components/Heading/Heading';
import styles from './ReportBug.module.css'
const ReportBug = () => {
    return (
        <>
            <div style={{ marginTop: 100 }}>
                <Heading>
                    Report a bug
                </Heading>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./images/mainHeadder.png" alt="asdf" draggable="false" className="img-fluid p-4" />
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.formWrapper}>
                            <form action="#">
                                <div className="mb-3">
                                    <label className="text-white fw-normal">Select files</label>
                                    <label htmlFor='f' className={`${styles.input} form-control`} style={{ cursor: "pointer" }}>Screenshot , short mp4 or gif</label>
                                    <input type="file" className={`${styles.input} form-control`} id="f" style={{ display: "none" }} />
                                </div>
                                <div className="mb-3">
                                    <label className="text-white fw-normal">Page Section</label>
                                    <a className={`${styles.dropdownMain} fw-normal`} data-bs-toggle="collapse" href="#collapseExample">
                                        Select page
                                    </a>
                                    <div className="collapse w-100" id="collapseExample">
                                        <div className={`${styles.input}`}>
                                            <span className="fw-bold">Item 1</span>
                                        </div>
                                        <div className={`${styles.input}`}>
                                            <span className="fw-bold">Item 1</span>
                                        </div>
                                        <div className={`${styles.input}`}>
                                            <span className="fw-bold">Item 1</span>
                                        </div>
                                        <div className={`${styles.input}`}>
                                            <span className="fw-bold">Item 1</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="text-white fw-normal">How do we reproduce the problem ?</label>
                                    <textarea rows="3" className={styles.dropdownMain} placeholder="How do we reproduce the problem ?"></textarea>
                                </div>
                                <div>
                                    <button className={`${styles.submit}`}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <GetInTouch />
        </>
    );
};

export default ReportBug;