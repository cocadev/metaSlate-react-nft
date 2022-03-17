import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "./formatters";
import Blockie from "./blockie";
// import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "./address/address";
import { getExplorer } from "./networks";
import Modal from 'react-modal';
import useWindowSize from "../../hooks/useWindowSize";

const styles = {
  account: {
    height: "36px",
    padding: "0 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 20,
    backgroundColor: "#3db97b",
    cursor: "pointer",
    marginLeft: 30
  },
  text: {
    color: "#fff",
    fontWeight: '600',
    paddingTop: 18
  },
};
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#000',
      width: 360
    },
  };
function Account() {

  const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { width } = useWindowSize();

  if (!isAuthenticated) {
    return (
      <div style={styles.account} onClick={() => authenticate({ signingMessage: "Hello World!" })}>
        <img src="../images/wallet.png" alt="wallet" style={{ width: 30}}/>
        <p style={styles.text}>Auth</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <img src="../images/wallet.png" alt="wallet" style={{ width: 30}}/>
        {width > 768 && <p style={{ marginRight: "5px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>}
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        style={customStyles}
      >
        <h3 className="text-center">Account</h3>
        <div
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
              View on Explorer
            </a>
          </div>
        </div>
        <br/>
        <button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          className="btn-main bg-red" 
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </button>
      </Modal>
    </>
  );
}

export default Account;
