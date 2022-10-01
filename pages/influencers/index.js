import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import {getSeoData} from "../../src/queries/strapiQueries";
// 
const InfluencersComponent = dynamic(
  () => import("../../src/features/Influencers/components"),
  { loading: () => <MyPageLoader /> }
);
const defaultSEOData = {
  metaTitle:"Lootmogul | Buy NFTs And Play Games With Your Favorite Influencer",
  metaDescription:"Get To Know More About Your Favorite Influencer At Lootmogul.com | Get A Chance To Play Games And Buy Their NFTs",
  canonicalURL:"https://lootmogul.com/influencers"

};

export default function Influencer({ data, seoData, newInfluencersSet }) {
  return <>
   <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
   <InfluencersComponent data={data || []} newInfluencers={newInfluencersSet} banner={seoData[0]?.banner?.data} />
  </>
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  const newInfluencers = await strapi.find("influencers", {
    sort:"createdAt:DESC",
    fields: ["name", "slug","tagline","order"],
    pagination:{limit:10},
    populate: {
      icon: {
          fields: ["name", "url"],
      },
      contestmasters: {
        fields: ["entryFee"],
        populate: {
          feeWallet: {
            populate: {
              currency: {
                fields: ["type"],
              },
            },
          },
        },
      },
    },
  }
  );


  do {
    const res = await strapi.find("influencer-categories", {
      fields: ["name", "slug","description"],
      sort: "priority",
      populate: {
        influencers: {
          fields: ["name", "slug","tagline","order"],
          populate: {
            icon: {
                fields: ["name", "url"],
            },
            contestmasters: {
              fields: ["entryFee"],
              populate: {
                feeWallet: {
                  populate: {
                    currency: {
                      fields: ["type"],
                    },
                  },
                },
              },
            },
          },
        },
      },

      pagination: {
        page: pageNo,
        pageSize: 100,
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
  const newInfluencersSet = newInfluencers?.data;

  const seoData = await getSeoData("influencers");
  return { props: { data, seoData, newInfluencersSet },
  revalidate: 600, // In seconds
 };
}