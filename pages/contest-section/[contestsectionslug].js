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
  const [contestSections, setContestSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoader, setPageLoader] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setPageLoader(true);
  } 
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    setPageLoader(true);
  } 

  useEffect(() => {
    const getAllContests = async (currentPage) => {  
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
              pagination: {  // pagination for contest-master data
                page: currentPage,
                pageSize: 8,
              }
            },
            image: "*"
          },
  
          pagination: {
            page: 1,
            pageSize: 25,
          },
        });
        setContestSections(res)
        setTotalPage(res?.data[0]?.contestmasters?.pagination?.pageCount)
        setPageLoader(false);
      }
    } 
    getAllContests(currentPage);
  }, [query,currentPage]);

  return (
    <>
      <SEOContainer
        seoData={defaultSEOData}
      />
      {contestSections == '' && <MyPageLoader />}
      {pageLoader === true && <MyPageLoader />}
      <GamesComponent
        contestSectionsData={contestSections?.data || []}
        banners={[]}
        pageOptions = {totalPage}
        nextPage = {nextPage}
        previousPage = {previousPage}
        currentPage = {currentPage}
      />

    </>
  );
}