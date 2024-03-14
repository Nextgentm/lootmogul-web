import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";

import Banner from "../../src/components/Web3Games/Banner";
import TradingGame from "../../src/components/Web3Games/TradingGame";
import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";

const defaultSEOData = {
  metaTitle: "Lootmogul | Join LootMogul Skill Sports Gaming",
  metaDescription: "Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
  canonicalURL: process.env.NEXT_PUBLIC_SITE_URL + "/games"
};

export default function GamesPage({
  data,
  campaignsSectionsResData,
}) {
  const skillGameData = data?.data[0] || [];
  const trendingTournamentData = data?.data[1] || [];
  return (
    <>

      <SEOContainer seoData={defaultSEOData} />
      <Banner bannerData={campaignsSectionsResData?.data[0] || []} />
      <TradingGame tradingCardData={campaignsSectionsResData?.data[0] || []}
        trendingtmtData={trendingTournamentData?.contestmasters?.data || []} />
      <BlockChainGame
        skillGameData={skillGameData?.contestmasters?.data || [] || []}
        blockChainCardData={campaignsSectionsResData?.data[0] || []}
      />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let data = [];

  const trending_tmt = await strapi.find("contest-section/custom-contest-section/get-all-games-page-data", {
    filters: {
        $or: [
          {
            name: {
              $eq: "Skill Games",
            },
          },
          {
            name: {
              $eq: "Trending Tournament",
            },
          },
        ],
    },
    sort: "priority",
    populate: {
      contestmasters: {
        fields: ["name", "slug", "priority", "entryFee", "isFeatured", "retries"],
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
          game: {
            fields: "*",
          },
        },
        pagination: {
          page: 1,
          pageSize: 6
        }
      },
      image:"*"
    },

    pagination: {
      page: 1,
      pageSize: 25,
    },
  });
 
  if (trending_tmt?.meta) {
    data = trending_tmt;
  }
  

  try {
    const contestSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      "/api/contest-sections?populate=image&sort=priority"
    );

    /** For trivia games */

    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      "/api/game-campaigns?populate=*&sort=id&pagination[limit]=1"
    );
    const contestSectionsData = await contestSectionsRes.json();
    const campaignsSectionsResData = await campaignsSectionsRes.json();


    return {
      props: { data,contestSectionsData, campaignsSectionsResData },
      revalidate: 300,
    };
  } catch (error) { }
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}