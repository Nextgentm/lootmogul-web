import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import GamesComponent from "../../src/features/Games/single";
import { useEffect, useState } from "react";
import MyPageLoader from "../../src/components/MyPageLoader";
import { useRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";

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
  const [searchText, setSearchText] = useState("");

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setPageLoader(true);
  }
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    setPageLoader(true);
  }

  const [isSmallDesktop] = useMediaQuery('(min-width: 1145px)');
  //const [isAvarageDesktop] = useMediaQuery('(min-width: 1360px)');
  //const [isMediumDesktop] = useMediaQuery('(min-width: 1440px)');
  const [isLargeDesktop] = useMediaQuery('(min-width: 1510px)');
  const [isXLargeDesktop] = useMediaQuery('(min-width: 1871px)');
  const [isXXLargeDesktop] = useMediaQuery('(min-width: 2234px)');
  const [isEXLargeDesktop] = useMediaQuery('(min-width: 2600px)');
  const [isEXXLargeDesktop] = useMediaQuery('(min-width: 2960px)');

  let isPaginationSize = 8;
  if(isSmallDesktop){isPaginationSize = 9;}
  if(isLargeDesktop){isPaginationSize = 8;}
  if(isXLargeDesktop){isPaginationSize = 10;}
  if(isXXLargeDesktop){isPaginationSize = 12;}
  if(isEXLargeDesktop){isPaginationSize = 14;}
  if(isEXXLargeDesktop){isPaginationSize = 16;}

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  
  useEffect(() => {
    const getAllContests = async (currentPage, text) => {
      let filters = {};
      if (text) {
        filters = {
          name: {
            searchText: text
          }
        };
      }
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
              filters,
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
                pageSize: isPaginationSize,
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

    // Debounce on search
    const timer = setTimeout(async () => {
      if (searchText !== '' && searchText.length > 0) {
          getAllContests(currentPage, searchText);
      } else{
        getAllContests(currentPage, null);
      }
    }, 500);


    return () => {
      clearTimeout(timer);
    }
  }, [query, currentPage, searchText]);

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
        pageOptions={totalPage}
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        setSearchText={setSearchText}
      />

    </>
  );
}
