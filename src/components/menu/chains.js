import { useEffect, useState } from "react";
import { PolygonLogo } from "./logos";
import { useChain } from "react-moralis";

const styles = {
  btn: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
    border: "1px solid rgb(231, 234, 243)",
    borderRadius: "5px",
    background: '#fff',
    width: 150,
  },
  btn1: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
    border: "0px solid rgb(231, 234, 243)",
    borderRadius: "0px",
    background: '#fff',
    width: 190,
    color: '#444',
    cursor: 'pointer'
  },
  pop: {
    position: 'absolute'
  }
};

const menuItems = [
  // {
  //   key: "0x1",
  //   value: "Ethereum",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x4",
  //   value: "Rinkeby Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x38",
  //   value: "Binance",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x61",
  //   value: "Smart Chain Testnet",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x89",
  //   value: "Polygon",
  //   icon: <PolygonLogo />,
  // },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { switchNetwork, chainId } = useChain();
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // console.log("chain", chain)

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    // console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (key) => {
    // console.log("switch to: ", key);
    setIsOpen(false);
    switchNetwork(key);
  };

  return (
    <div style={{width: 160,}}>
      <button style={styles.btn} onClick={()=>setIsOpen(!isOpen)}>
        {selected?.icon}
        <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
      </button>

      {isOpen && <div className="mt-1" style={styles.pop}>
        {menuItems.map((item) => (
          <div key={item.key} onClick={()=>handleMenuClick(item.key)} style={{...styles.btn, ...styles.btn1}}>
            {item.icon}
            <span style={{ marginLeft: "5px" }}>{item.value}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default Chains;
