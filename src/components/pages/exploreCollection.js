import React, { useState } from 'react';
import Footer from '../components/footer';
import CollectionCard from '../components/CollectionCard';

const ExploreCollection = () => {

  const [selected, setSelected ] = useState(0);

  return (
    <div>

      <section style={{ marginTop: -100}}>

        <div className='d-center hero' style={{ height: 450}}>
          <h1>Explore Collections</h1>
        </div>

        <div style={{ background: '#333', display: 'flex', flexDirection: 'row', justifyContent: 'center', overflow: "auto" }}>
          {
            COLLECTIONS.map((item, index) =>
              <div 
                className='pointer'
                style={{ padding: 20, color: '#fff', fontWeight: '500',whiteSpace:"nowrap", borderBottom: (selected === index) ? '3px solid #3db97b' : 'none' }}
                key={index}
                onClick={()=>setSelected(index)}
              >
                {item.title}
              </div>)
          }
        </div>

        <div className='flex flex-wrap center mt-30 container' style={{ alignItems: 'center', justifyContent: 'center' }}>

          {
            HOT_COLLECTIONS
              .map((item, index) => (
                <CollectionCard
                  key={index}
                  index={index + 1}
                  avatar={item.avatar_url}
                  banner={item.banner_url}
                  username={item.name}
                  uniqueId={item.unique_id}
                  collectionId={item.id}
                />
              ))}
        </div>
      </section>
      <Footer />
    </div>
  )
};

export default ExploreCollection;

export const HOT_COLLECTIONS = [
  {
    id: 1,
    name: 'Coolcats',
    avatar_url: 'https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s100',
    banner_url: 'https://lh3.googleusercontent.com/H4Iu36XQNJqVlF99-0BuQna0sUlUcIrHt97ss3le_tAWw8DveEBfTktX3S0bP6jpC9FhN1CKZjoYzZFXpWjr1xZfQIwSSLeDjdi0jw=h600',
    unique_id: 'Doodles_LLC',
    category: 'art'
  },
  {
    id: 2,
    name: 'CryptoPunks',
    avatar_url: 'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130',
    banner_url: 'https://lh3.googleusercontent.com/48oVuDyfe_xhs24BC2TTVcaYCX7rrU5mpuQLyTgRDbKHj2PtzKZsQ5qC3xTH4ar34wwAXxEKH8uUDPAGffbg7boeGYqX6op5vBDcbA=h600',
    unique_id: 'CryptoPunks',
    category: 'boats'
  },
  {
    id: 3,
    name: 'alien frens',
    avatar_url: 'https://lh3.googleusercontent.com/_zidXBb2QsMBD6OYdjED63tczeXDUr1ah7zvhSSLHQjU4BF-H-lUexkLJ76_ahmbkkItEiH738jVPG88DOFVdt4GX377cvNNgCyzFT4=s130',
    banner_url: 'https://lh3.googleusercontent.com/tW0tWUsyMpMCjvzJ4S_GhVYNrtv1LrKZdEnUHLLYUwl7G8_j-HtAl928wmT0zrLjTfMFuHBhy54hZ--yf22BQRoRayP6WfMxRfgEpw=h600',
    unique_id: 'NeoTokyoCitadel',
    category: 'Cars'
  },
  {
    id: 4,
    name: 'Lucky Zeros | Purebase',
    avatar_url: 'https://lh3.googleusercontent.com/TCCmviddyXHD60OsM4hnix86QW2VHFH-8Z2aBDSjtSS3tuNC8En3FaK7zlm9tTEPSWGi9DHW_lj24lgXqAQ6ksA3YZPgWrzfeRqN=s100',
    banner_url: 'https://lh3.googleusercontent.com/bEBowpC7ejeIl-Vj-uvelzrAcVPg9joJY-jBjI1yyaZfKOtCeQZ48jmIaGl-l2f55zTqel9_S9PfkOGhAJa0ZGnQQtiE3lb0LNvU=h600',
    unique_id: 'Purebase',
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'iNFT Personality Pod Sale',
    avatar_url: 'https://lh3.googleusercontent.com/0LsJSNxzhiXQ-8TqwrMEJZuLgQnDTEweihqp32L_dXpkywpCIK4o8Fgs9JZDduK1Oj5Ek_xlBqd5lMIJoxSnWRi-GaknxnHINmy2H7Y=s130',
    banner_url: 'https://lh3.googleusercontent.com/PaG7PILKFvHO6ezYERSM-F_zOmnt7zj3ImR5xvxCHDl9lDDefU5l8e7EJHulxj6hpI6frYk7UfjSoIwNgzzykMOZN8b-q0-o_-blsA=h200',
    unique_id: 'Alethea_AI',
    category: 'art'
  },
  {
    id: 6,
    name: 'rekt.news-hacks',
    avatar_url: 'https://lh3.googleusercontent.com/0CJDQH-HOpRunHwWrZCqvpLUToMXMvn-0JuKqUIlL5lRtngsqH2Uyc-LDyk_KYovQPWctNpEEgateW__c_vgmN_SZJODeEVvq7Rn=s100',
    banner_url: 'https://lh3.googleusercontent.com/1P7Ud7Bh0zp5ecoee641xHmeFVPQJvZTYSrPrlHaMLGUrIWYm7zITq1sAckh5V2yiSsKnBk5omqQ9RVRl4_lky9YB28rVLa-pKPemg=h200',
    unique_id: 'rektnews',
    category: 'realEstate'
  },
  {
    id: 7,
    name: 'toomuchlag',
    avatar_url: 'https://lh3.googleusercontent.com/htpLzsBUBrIyx4N97JkCYoTtPaqKK_savGzxiG91XlibSS1hj0n5udojDoI80AFts33M_3DQ10cdZ3rIVq7-dYFalydyMxf9uz6-hQ=s100',
    banner_url: 'https://lh3.googleusercontent.com/fR6ZSaUkEAA4P4Z71SyipyhDM4tayiuv7xzSDPx0kJ94yb_Elc3uVm7_evbTcGQLBEyo72TeBymljkxtfjvEU9Fz3sKDM6-rCYUo=h200',
    unique_id: 'skeleton',
    category: 'art'
  },
  {
    id: 8,
    name: 'BCCG',
    avatar_url: 'https://lh3.googleusercontent.com/lcpoI_5KaLJO8LA6Y0dx42FyTOvZne-tW4EKtoD9UdL6Vdk2UANPwo531EWSslwySarGdu3C9shBAJQsyhoasCa1=s100',
    banner_url: 'https://lh3.googleusercontent.com/YuIwGkeOwa48_qPfter8yOZHY53blID-_M-Y1PfCWDaJ1giXdCv_K6CLZCRQ5jIsTv1SX9zGQuKeHmLreo-j3RqYAQ=h200',
    unique_id: '86A9CD',
    category: 'realEstate'
  }
]

const COLLECTIONS = [
  { title: 'Trending' },
  { title: 'Top' },
  { title: 'Movies' },
  { title: 'TV Series' },
  { title: 'Collactables' },
  { title: 'BTS' },
  { title: 'Collectables' },
  { title: 'Utility' },
  { title: 'Moments' },
  { title: 'Virrtual Worlds' },
]