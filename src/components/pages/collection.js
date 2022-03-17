import React, { memo, useState } from "react";
import Footer from '../components/footer';
import NftCardItem from '../components/NftCardItem';
import { useNFTBalances } from "react-moralis";
import { useVerifyMetadata } from "../../hooks/useVerifyMetadata";
import { SmallLoading } from "../atoms/loading";
import { TOKEN_CONTRACT_ADDRESS } from "../components/constants/keys";

const Collection = function () {

  const [height, setHeight] = useState(0);
  const { data: NFTBalances, isLoading, isFetching } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  const loading = isLoading || isFetching;

  return (
    <div>
      <section className='container'>
        <div className="row">
          <div className="col-md-12 mt-100">

            <h1 className='text-center'>My Collection</h1>
            {loading && <SmallLoading />}

            <div>
              {/* {error && <>{JSON.stringify(error)}</>}<br /> */}
              <div className="hidden">
                {/* <pre>{
                JSON.stringify(NFTBalances?.result && NFTBalances.result
                  .filter((item) => item.token_address === TOKEN_CONTRACT_ADDRESS), null, 2
                  )
                  }
                  </pre> */}
              </div>
            </div>

            <div className='flex flex-wrap center mt-30'>
              {NFTBalances?.result && NFTBalances.result
                .filter((item) => item.token_address === TOKEN_CONTRACT_ADDRESS)
                .sort(function (a, b) {
                  return b.token_id - a.token_id
                })
                .map((x, index) => {
                  const nft = verifyMetadata(x);
                  if (nft?.metadata) {
                    const { name, description, price, image, video } = nft?.metadata;
                    return (
                      <NftCardItem
                        nft={{
                          "authorImg": "../img/author/author-10.jpg",
                          "image": image,
                          isVideo: video,
                          "name": name,
                          "price": price,
                          "description": description,
                          id: nft.token_id,
                          token: 'MATIC',
                          address: x.owner_of
                        }}
                        key={index}
                        onImgLoad={onImgLoad}
                        height={height}
                      />
                    )
                  } else {
                    return null
                  }
                })}
            </div>

          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
export default memo(Collection);