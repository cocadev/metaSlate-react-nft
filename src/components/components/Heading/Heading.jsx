import React from 'react'
import styles from './Heading.module.css'
const Heading = ({children}) => {
    return (
        <div className={`d-flex align-items-center flex-column ${styles.m100}`} style={{zIndex: 0, position: 'relative'}}>
            <h2 className={`${styles.headingText} fw-bold display-5`}>{children}</h2>
            <div>
                <img src={'../images/heading.png'} alt="" className="img-fluid"/>
            </div>
        </div>
    )
}

export default Heading
