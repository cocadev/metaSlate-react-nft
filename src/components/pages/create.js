import React, { useState } from "react";
import Footer from "../components/footer";
import NftCardItem from "../components/NftCardItem";
import { useMoralis, useMoralisFile } from "react-moralis";
import { Loading } from "../atoms/loading";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useNavigate } from "@reach/router";
import { TOKEN_CONTRACT_ADDRESS } from "../components/constants/keys";

const mintingContractABI = require("../components/constants/ERC721WithRoytalties&URI.json")

export const CreatePage = () => {
  const { Moralis, user, account } = useMoralis();
  const [file, setFile] = useState();
  const [baseFile, setBaseFile] = useState();
  const [name, setName] = useState("");
  // const [royalty, setRoyalty] = useState(1);
  const [price, setPrice] = useState(1);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const { isUploading } = useMoralisFile();
  const isDiabledMint =
    isUploading || isLoading || !name || !description || !price || !file;
  const isFullLoading = isUploading || isLoading;

  const uploadImage = async () => {
    const nowTime = new Date().getTime();
    var nftImageFile = new Moralis.File(nowTime, file);
    await nftImageFile.saveIPFS();
    return nftImageFile.ipfs();
  };

  var uploadMetadata = async (imageURL) => {
    const tokenMetadata = {
      name,
      image: imageURL,
      description,
      price,
      video: isVideo,
      authorName: user?.get('authorName') || ''
    };
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(tokenMetadata, null, 4)),
    });
    await file.saveIPFS();
    return file.ipfs();
  };

  const onChangeFile = async (e) => {
    var file = e.target.files[0];

    if (file) {
      const base64 = await convertBase64(file);
      setBaseFile(base64);

      if(file.type.includes('video')){
        setIsVideo(true)
      }else{
        setIsVideo(false)
      }

      setFile(file);
    }
  };

  const onMint = async () => {
    if (!user) {
      toast.error(
        "Sorry, you didn't connect the metamask wallet to our website!"
      );
      return false;
    }
    setIsLoading(true);
    console.log("~ clicked ~");
    const image = await uploadImage();
    const metadata = await uploadMetadata(image);
    
  /*
   * This converts the royalty amount to a the right format accepted by the minting smart contract
   * The royalty can be a maximum of 85%
   * This is so the Auction can still take the Metaslate Fee of 15%
   */
  // const royaltyFromPercent = async () => {
  //   var tempRoyalty = royalty;
  //   if (tempRoyalty >= 1 && tempRoyalty <= 8500) {
  //     tempRoyalty *= 100;
      
  //   } else if (tempRoyalty > 8500) {
  //     tempRoyalty = 8500;
  //   }
  //   console.log(tempRoyalty)
  //   return tempRoyalty;
  // }

    const options = {
      chain: "mumbai",
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      functionName: "mint",
      abi: mintingContractABI.abi,
      params: {
        to: user && user.get("ethAddress"),
        royaltyRecipient: user && user.get("ethAddress"),
        royaltyValue: isChecked ? 250 : 1,
        tokenURI: metadata,
      },
    };

    console.log("~ loading ~", metadata);

    try {
      await Moralis.executeFunction(options).then((res) => console.log('res', res));
      console.log("~ minted! ~");
      toast(
        "Congratulations! you minted the NFT successfuly! But it will appeared in collection page few minutes later."
      );
      navigate("/");
    } catch (e) {
      console.log("~ e! ~", e);

      toast.error(e.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isFullLoading && <Loading />}

      <section style={{ marginTop: isFullLoading ? 0 : -100 }}>
        <div className='d-center hero' style={{ height: 450 }}>
          <h1 style={{ fontWeight: '600' }}>Create</h1>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">
                    PNG, JPG, GIF, WEBP or MP4. Max 200mb. {file && file.name}
                  </p>
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value={isUploading ? "Uploading..." : "Browse"}
                    />
                    <input
                      id="upload_file"
                      type="file"
                      onChange={onChangeFile}
                    />
                  </div>
                </div>

                <div className="spacer-30"></div>

                <h5>Name</h5>
                <input
                  type="text"
                  name="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />


                {/* <h5>Price</h5>
                <input
                  type="number"
                  name="item_price"
                  className="form-control"
                  placeholder="enter price for one item (ETH)"
                  value={tokenPrice}
                  onChange={(e) => setPrice(e.target.value)}
                /> */}

                <div className="spacer-10"></div>

                <h5>Price</h5>

                <input
                  type="number"
                  name="item_royalties"
                  id="item_royalties"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                  <input 
                    type={'checkbox'} 
                    value={isChecked}  
                    onChange={() => setIsChecked(!isChecked)} 
                  /> &nbsp;
                  Royalty? 
                  <div style={{ fontSize: 12, color: 'greenyellow'}}> 
                    Adds a 2.5% royalty awarded to your wallet address when users re-sell this NFT on any EIP2981 compliant platform. 
                  </div> 

                {/* <h5>Royalties</h5>

                <input
                  type="number"
                  name="item_royalties"
                  id="item_royalties"
                  className="form-control"
                  placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  min={0}
                  max={10000}
                  value={royalty}
                  onChange={(e) => setRoyalty(e.target.value)}
                /> */}

                <div className="spacer-30"></div>

                <input
                  type="button"
                  onClick={onMint}
                  className={clsx("btn-main", isDiabledMint && "btn-disabled")}
                  value="CREATE ITEM"
                />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>

            <NftCardItem
              nft={{
                authorImg: "../img/author/author-10.jpg",
                image: baseFile,
                isVideo,
                name: name,
                price,
                description: description,
                token: 'MATIC',
                address: account
              }}
              demo={true}
              zoom={true}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
