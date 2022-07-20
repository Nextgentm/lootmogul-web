import strapi from "../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
// const Nfts = dynamic(() => import("../../src/features/Nfts/components"),  { loading: () =>
//   <MyPageLoader/>
//  })

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

export default function NFTPage({ data, seoData }) {
  return (
    <>
      <SEOContainer
        seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData}
      />
      <NftsComponent data={data || []} banner={seoData[0]?.banner?.data} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("nft-collections", {
      sort:"priority",
      populate:{
       
        nftSet:{
          
          populate:{
            nft_kred:{             
              populate:["*"]
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
        pageCount = res.meta.pagination.pageCount;
      }
    }
    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  data = data.flat();
  const seoData = await getSeoData("nfts");

  return {
    props: { data, seoData },
    revalidate: 600, // In seconds
  };
}
