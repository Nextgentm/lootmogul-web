import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import GamesComponent from "../../src/features/Games/single";
import { useEffect, useState } from "react";
import MyPageLoader from "../../src/components/MyPageLoader";
import { useRouter } from "next/router";

const defaultSEOData = {
  metaTitle: "Play Online Trivia Games With Your Favorite Influencers",
  metaDescription:
    "Play Games With Your Favorite Influencers And Win Exciting Prizes",
  canonicalURL: process.env.NEXT_PUBLIC_SITE_URL + "/games",
};

export default function GamesPage({ }) {
  const { query } = useRouter();

  const getAllContests = async () => {
    if (query.contestsectionslug) {
      const res = await strapi.find("contest-section/custom-contest-section/get-all-games-page-data", {
        filters: {
          slug: {
            $eq: query.contestsectionslug,
          },
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
          },
          image: "*"
        },

        pagination: {
          page: 1,
          pageSize: 25,
        },
      });
      setContestSections(res)
    }
  }
  useEffect(() => {
    getAllContests();
  }, [query]);

  const [contestSections, setContestSections] = useState([]);

  return (
    <>
      <SEOContainer
        seoData={defaultSEOData}
      />
      {contestSections == '' && <MyPageLoader />}
      <GamesComponent
        contestSectionsData={contestSections?.data || []}
        banners={[]}
      />

    </>
  );
}
