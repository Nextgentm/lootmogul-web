import strapi from "../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";


const defaultSEOData = {
  metaTitle:
    "Buy & Trade Exclusive Limited Edition NFTs Of Your Favorite Influencers",
  metaDescription:
    "Support Your Favorite Influencers By Buying And Trading Their NFTs. Get To Know More About Your Favorite Influencers On Lootmogul.com",
  canonicalURL: "https://lootmogul.com/nfts",
};
const NftsComponent = dynamic(
  () => import("../../src/features/Nfts/components"),
  { loading: () => <MyPageLoader /> }
);

export default function NFTPage({ nftCollections, newNftSet, seoData }) {
  return (
    <>
      <SEOContainer
        seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData}
      />
      <NftsComponent data={nftCollections || []} newNfts={newNftSet} banner={seoData[0]?.banner?.data} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];

  const newNfts = await strapi.find("nft-kreds", {
    sort:"createdAt:DESC",
    pagination:{limit:10},
    fields:["slug","marketURL","front_image","back_image", "name", "isAuction", "market_price", "sale_price"]
    }
  );


  do {
    const res = await strapi.find("nft-collections", {
      sort:"priority",
      
      populate:{
       
        nftSet:{
          filters:{
            isFeatured:true
          },
          populate:{
            nft_kred:{             
              fields:["slug","marketURL","front_image","back_image", "name", "isAuction", "market_price", "sale_price"]
            }
          }
        },
        banner:{fields:["url"]}
      } ,
      pagination: {
        page: pageNo,
        pageSize: 25,
      },
    });
    if (res?.meta) {
      data.push(res.data);
      if (pageCount == 1) {
        // pageCount = res.meta.pagination.pageCount;
      }
    }

    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  const nftCollections = data.flat();
  const seoData = await getSeoData("nfts");
  const newNftSet = newNfts?.data;

  return {
    props: { nftCollections, newNftSet, seoData },
    revalidate: 600, // In seconds
  };
}
