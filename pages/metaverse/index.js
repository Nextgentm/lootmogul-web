
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import LMVideoPlayer from "../../src/components/LMVideoPlayer";
import AppContext from "../../src/utils/AppContext";
import { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
const defaultSEOData = {
  metaTitle: "Buy And Trade Virtual Land - Join The Metaverse",
  metaDescription: "Lootmogul Is One Of The Best Places To Buy Virtual Land With Crypto. Our Virtual Land Prices Are Quite Affordable To Almost Everyone.",
  canonicalURL: "https://lootmogul.com/metaverse"

};

const Metaverse = ({ seoData }) => {
  const { isMobileDevice, isDesktopDevice } = useContext(AppContext);
  useEffect(() => {
    let pathname = window.location.pathname;
    if (pathname === "/metaverse") {
      window.location.replace("https://lootmogul.wpengine.com/metaverse");
    }
  }, []);
  return (
    <>
      {(seoData || defaultSEOData) && <SEOContainer seoData={(seoData && seoData[0]?.sharedSeo) ? seoData[0]?.sharedSeo : defaultSEOData} />}
      <Box  height={isMobileDevice ? "600px" : '850px'}>
        <LMVideoPlayer mute={true} url={isMobileDevice ? '/assets/videos/nextgenerationmobile.mp4' : '/assets/videos/nextgenerationweb.mp4'} play={true} loop={true} />
      </Box>
      {/* <MetaVersePage /> */}
    </>
  );
};
export default Metaverse;
export async function getStaticProps() {

  const seoData = await getSeoData("metaverse");
  return { props: { seoData } }

}
