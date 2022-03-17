import React from 'react'
import styles from './HomeCollection.module.css'
const HomeCollection = () => {
    return (
        <>
            <div className={`col-lg-3 my-3`}>
                <div className={`${styles.topCollection} d-flex flex-column`}>
                    <p className={`ms-auto m-0 ${styles.green} fw-bold`}>+61.5%</p>
                    <div className="d-flex flex-column align-items-center">
                        <img 
                        src="../images/girl1.png" 
                        alt="colllection" 
                        className={styles.img} />
                        <h4 className='fw-bold mt-2'>CryptoSkulls</h4>
                        <div className="d-flex">
                            <img src="../images/eth.png" alt="eth" style={{height:'20px'}} />
                            <h5 className="ms-2 mb-0">0.0058</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeCollection
