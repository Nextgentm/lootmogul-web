
import MetaVersePage from "../../src/features/MetaVersePage";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
const defaultSEOData = {
  metaTitle: "Buy And Trade Virtual Land - Join The Metaverse",
  metaDescription:
    "Lootmogul Is One Of The Best Places To Buy Virtual Land With Crypto. Our Virtual Land Prices Are Quite Affordable To Almost Everyone.",
  canonicalURL: "https://lootmogul.com/metaverse",
};

const Metaverse = ({ seoData }) => {
  return (
    <>
      {(seoData || defaultSEOData) && (
        <SEOContainer
          seoData={
            seoData && seoData[0]?.sharedSeo
              ? seoData[0]?.sharedSeo
              : defaultSEOData
          }
        />
      )}
      <MetaVersePage />



    </>
  );
};
export default Metaverse;
export async function getStaticProps() {

  const seoData = await getSeoData("metaverse");
  return { props: { seoData } };
}

