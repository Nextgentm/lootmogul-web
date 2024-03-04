import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import GamesComponent from "../../src/features/Games/index";
import MultipleLoggedInUser from "../../src/components/MultipleLoggedInUser";
const defaultSEOData = {
  metaTitle: "Play Online Trivia Games With Your Favorite Influencers",
  metaDescription:
    "Play Games With Your Favorite Influencers And Win Exciting Prizes",
  canonicalURL: process.env.NEXT_PUBLIC_SITE_URL + "/games",
};

export default function GamesPage({
  banners = [],
  contestSectionsData,
  seoData,
}) {
  return (
    <>
      <SEOContainer
        seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData}
      />
      <GamesComponent
        contestSectionsData={contestSectionsData?.data || []}
        banners={banners?.data || []}
      />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  
    const res = await strapi.find("contest-section/custom-contest-section/get-all-games-page-data", {
      filters: {
          $or: [
            {
              name: {
                $eq: "Free tournaments",
              },
            },
            {
              name: {
                $eq: "Advanced premium tournaments",
              },
            },
            {
              name: {
                $eq: "Ambassador tournaments",
              },
            },
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

    try {
      const bannersRes = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/campaigns?sort=priority&populate=bannerImage"
      );

      const banners = await bannersRes.json();
      const seoData = await getSeoData("games");

      return {
        props: {
          contestSectionsData: res,
          banners,
          seoData,
        },
        revalidate: 300,
      };
    } catch (error) { }
    return {
      props: { data },
      revalidate: 300, // In seconds
    };
  }
