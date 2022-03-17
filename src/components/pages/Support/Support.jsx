import React from 'react';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Heading from '../../components/Heading/Heading';
import styles from './Support.module.css'
const Support = () => {
    return (
        <>
            <div style={{ marginTop: 100 }}>
                {/* <h1 className="text-center fw-bold">Support</h1> */}
            <Heading>Support</Heading>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-3">
                        <div className={styles.card}>
                            <div className={`${styles.cardTheme}`}></div>
                            <h2 className="ms-2 mb-4">Report <br/> a bug</h2>
                            <p className={`lh-lg ${styles.dec}`}>Wondering if Unbounce is the right tool for your business? Chat with our team to see if there’s a fit.Chat with our team to see if there’s a fit.</p>
                            <button className={styles.button}>Let us know about it!</button>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className={styles.card}>
                            <div className={`${styles.cardTheme}`}></div>
                            <h2 className="ms-2 mb-4">Media <br/> Inquiries</h2>
                            <p className={`lh-lg ${styles.dec}`}>Wondering if Unbounce is the right tool for your business? Chat with our team to see if there’s a fit.Chat with our team to see if there’s a fit.</p>
                            <button className={styles.button}>Get in Touch</button>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className={styles.card}>
                            <div className={`${styles.cardTheme}`}></div>
                            <h2 className="ms-2 mb-4">Get <br/> Support</h2>
                            <p className={`lh-lg ${styles.dec}`}>Wondering if Unbounce is the right tool for your business? Chat with our team to see if there’s a fit.Chat with our team to see if there’s a fit.</p>
                            <button className={styles.button}>Let us know about it!</button>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className={styles.card}>
                            <div className={`${styles.cardTheme}`}></div>
                            <h2 className="ms-2 mb-4">Partnership <br />Inquiries</h2>
                            <p className={`lh-lg ${styles.dec}`}>Wondering if Unbounce is the right tool for your business? Chat with our team to see if there’s a fit.Chat with our team to see if there’s a fit.</p>
                            <button className={styles.button}>Let us know about it !</button>
                        </div>
                    </div>
                </div>
            </div>
            <GetInTouch></GetInTouch>
        </>
    );
};

export default Support;