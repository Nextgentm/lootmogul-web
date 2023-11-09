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
  data,
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
        contestmasters={data || []}
        banners={banners?.data || []}
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
      filters: {
        contest_section: {
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
      },
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

  const filteredDuplicateDataById = [
    ...new Map(data.map((item) => [item["id"], item])).values(),
  ];

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
      props: {
        data: filteredDuplicateDataById,
        contestSectionsData,
        banners,
        seoData,
      },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}
