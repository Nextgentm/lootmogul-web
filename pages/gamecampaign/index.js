import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";

import Banner from "../../src/components/Web3Games/Banner";
import TradingGame from "../../src/components/Web3Games/TradingGame";
import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";
import CustomBlockChainGame from "../../src/components/Web3Games/CustomBlockChainGame";

const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Skill Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:process.env.NEXT_PUBLIC_SITE_URL+"/games"
};

export default function GamesPage({
  data,
  contestSectionsData,
  contestSectionsDataTrivia,
  campaignsSectionsResData,
}) {
  //console.log(data);
  return (
    <>
      
      <SEOContainer seoData={defaultSEOData}/> 
        <Banner bannerData={campaignsSectionsResData?.data[0] || []}/>
        <TradingGame tradingCardData={campaignsSectionsResData?.data[0] || []}/>
        <CustomBlockChainGame 
            contestSectionsData={contestSectionsDataTrivia?.data || []}
            contestmasters={data || []}
            blockChainCardData={campaignsSectionsResData?.data[0] || []}
            
        />
        <BlockChainGame 
            contestSectionsData={contestSectionsData?.data || []}
            contestmasters={data || []}
            blockChainCardData={campaignsSectionsResData?.data[0] || []}
 
        />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let data = [];
  
    const res = await strapi.find("contestmasters", {
      filters: {
        contest_section: {
          $or: [
            {
              name: {
                $eq: "Skill Games",
              },
            },
          ],
        },
      },
      fields: ["name", "slug", "priority", "gamecampaignpriority", "entryFee", "isFeatured", "retries"],
      sort: "priority",
      populate: {
        contest_section: {
          fields: ["name", "slug"],
        },
        icon: {
          fields: ["name", "url"],
        },
        feeWallet: {
          populate: {
            currency: {
              fields: ["type"],
            },
          },
        },
        reward: {},
        game:{
          fields:"*"
        }
      },

      pagination: {
        page: 1,
        pageSize: 6, // 25
      },
    });
    if (res?.meta) {
      data = res.data;
    }
    
  try {
    const contestSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );

    /** For trivia games */
    const contestSectionsRestrivia = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );
    const contestSectionsDataTrivia = await contestSectionsRestrivia.json();
    
    /** For trivia games */
    
    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/game-campaigns?populate=*&sort=id&pagination[limit]=1"
    );
    const contestSectionsData = await contestSectionsRes.json();
    const campaignsSectionsResData = await campaignsSectionsRes.json();

    
    return {
      props: { data, contestSectionsData, contestSectionsDataTrivia, campaignsSectionsResData},
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}