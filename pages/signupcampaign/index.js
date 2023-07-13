import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import Banner from "../../src/components/Web3Games/Banner";
import TradingGame from "../../src/components/Web3Games/TradingGame";


const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Web3 Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:process.env.NEXT_PUBLIC_SITE_URL+"/web3-games"
};

export default function GamesPage({
  campaignsSectionsResData,
  seoData,
}) {
  return (
    (campaignsSectionsResData?.data[1] ?
    <>     
        <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
        <Banner bannerData={campaignsSectionsResData?.data[1] || []}/>
        <TradingGame tradingCardData={campaignsSectionsResData?.data[1] || []}/>  
    </>
    : 
    <>     
        <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
        <Banner bannerData={campaignsSectionsResData?.data[0] || []}/>
        <TradingGame tradingCardData={campaignsSectionsResData?.data[0] || []}/>  
    </> 
    )
  );
}

export async function getStaticProps() {
  try {
    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/game-campaigns?populate=*"
    );
   
    const campaignsSectionsResData = await campaignsSectionsRes.json();
    const seoData = await getSeoData("games");

    return {
      props: {campaignsSectionsResData, seoData },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}