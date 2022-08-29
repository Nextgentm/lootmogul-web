// import dynamic from "next/dynamic";
// import MyPageLoader from "../src/components/MyPageLoader";
import {
  apiBanners,
  apiPromotionBanners,
  apiInfluencers,
  apiContestsFeatured,
  apiTestimonials,
  apiFaqs
} from "../src/features/Home/api";
import HomeComponent from '../src/features/Home/components';

import { getSeoData } from "../src/queries/strapiQueries";
import SEOContainer from "../src/features/SEOContainer";
import { useContext, useEffect } from "react";
import LMVideoPlayer from "../src/components/LMVideoPlayer";
import { Box } from "@chakra-ui/react";
import AppContext from "../src/utils/AppContext";
// const SEOContainer = dynamic(() => import("../src/features/SEOContainer"));
const defaultSEOData = {
  metaTitle: "Buy And Trade Your Favorite Influencers NFTs",
  metaDescription: "A Multiverse Blockchain Gaming Platform For Sports Influencers And Fans To Engage | Join And Build Your Own Metaverse Land | Play Games With Influencers",
  canonicalURL: "https://lootmogul.com/"
};

export default function Home({ topBanners, bottomBanners, faqData, featuredInfluencers, trendingGames, testimonials, seoData }) {
  const { isMobileDevice, isDesktopDevice } = useContext(AppContext);
  console.log(isMobileDevice);
  // //console.log("banlen",featuredInfluencers?.length);
  useEffect(()=>{
    setTimeout(() => {
      window.location.replace('https://lootmogul.wpengine.com/home')
    }, 5000);
  },[]); 

  return (
    <>
      <SEOContainer seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData} />
      <Box  height={isMobileDevice ? "600px" : '850px'}>
        <LMVideoPlayer mute={true} url={isMobileDevice ? '/assets/videos/nextgenerationmobile.mp4' : '/assets/videos/nextgenerationweb.mp4'} play={true} loop={true} />
      </Box>
      {/* <HomeComponent
      topBanners={topBanners}
      bottomBanners={bottomBanners}
      faqData={faqData}
      featuredInfluencers={featuredInfluencers}
      trendingGames={trendingGames}
      testimonials={testimonials}
      
    /> */}
    </>
  );
}



export async function getStaticProps() {
  // Fetch data from external API

  try {
    const topBanners = await apiBanners();
    const bottomBanners = await apiPromotionBanners();
    const faqData = await apiFaqs();
    const featuredInfluencers = await apiInfluencers();
    const testimonials = await apiTestimonials();
    const trendingGames = await apiContestsFeatured();
    const seoData = await getSeoData("home");

    return {
      props: { topBanners, bottomBanners, faqData, featuredInfluencers, trendingGames, testimonials, seoData },
      revalidate: 300, // In seconds
    };
  } catch (error) {
    //console.log(error);
  }
  return { props: {} };
}
