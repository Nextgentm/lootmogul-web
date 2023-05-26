import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import GamesComponent from "../../src/features/Games/index";
import MultipleLoggedInUser from "../../src/components/MultipleLoggedInUser";

import Banner from "../../src/components/Web3Games/Banner";
import TradingGame from "../../src/components/Web3Games/TradingGame";
import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";

const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Web3 Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:"https://lootmogul.com/web3-games"
};

export default function GamesPage({
  data,
  banners = [],
  contestSectionsData,
  seoData,
}) {
  console.log('-----------'); 
  console.log(contestSectionsData);   
  console.log('-----------'); 
  return (
    <>
      
      <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
        <Banner/>
        <TradingGame/>
        <BlockChainGame 
            contestSectionsData={contestSectionsData?.data || []}
            contestmasters={data || []}
        />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("contestmasters", {
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
        game:{
          fields:"*"
        }
      },

      pagination: {
        page: pageNo,
        pageSize: 25,
      },
    });
    if (res?.meta) {
      console.log("res.data",res.data[0])
      data.push(res.data);
      if (pageCount == 1) {
        pageCount = res.meta.pagination.pageCount;
      }
    }
    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  data = data.flat();

  try {
    const contestSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );

    const contestSectionsData = await contestSectionsRes.json();

    const bannersRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/campaigns?sort=priority&populate=bannerImage"
    );

    const banners = await bannersRes.json();
    const seoData = await getSeoData("games");

    return {
      props: { data, contestSectionsData, banners, seoData },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}