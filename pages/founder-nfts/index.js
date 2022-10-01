import strapi from '../../src/utils/strapi';

import {getSeoData} from "../../src/queries/strapiQueries";

import SEOContainer from '../../src/features/SEOContainer';
 import FounderNfts from '../../src/features/FounderNfts/components';


 const defaultSEOData = {
  metaTitle:"Grab Lootmogul Founder's NFTs",
  metaDescription:"Discover The Latest Premium NFTs Of Our Founders. Buy Digital Art And Digital Collectibles On Lootmogul.com Today.",
  canonicalURL:"https://lootmogul.com/founder-nfts"

};

export default function FounderNFTs({ data, seoData }) {
  return <>
  <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
  <FounderNfts data={data || []} />
  </>;
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
     const res = await strapi.find("nft-collections", {
      sort: "id",
      filter:{"slug":"lisa-leslie-loot-mogul-founders-collection"},
      populate: [
        "nftSet.nft_kred",
        "banner"       
    ],
      pagination: {
        page: pageNo,
        pageSize: 100,
      },
    });
    if(res?.meta){
      data.push(res.data);
      if(pageCount==1){
        pageCount = res.meta.pagination.pageCount
      }
    }
     pageNo++;
    } while (pageNo<=pageCount);
  // Pass data to the page via props
  data = data.flat();
  const seoData = await getSeoData("founder-nfts");

  return { props: { data, seoData} ,
  revalidate: 600, // In seconds
};
}
