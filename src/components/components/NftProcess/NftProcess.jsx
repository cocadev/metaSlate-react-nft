import React from 'react';
import styles from './NftProcess.module.css';
const NftProcess = ({title , text ,img}) => {
    return (
        <>
            <div className="col-lg-4 mb-4">
                <div className="d-flex align-items-center ms-2">
                    <div><img src={`../images/${img}.png`} alt="wallet" className={styles.processImg}/></div>
                    <h3 className="ms-4 mb-0">{title}</h3>
                </div>
                <div className={`${styles.box} lh-base mb-0`}>{text}</div>
            </div>
        </>
    )
}

export default NftProcess

