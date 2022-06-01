import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import {getSeoData} from "../../src/queries/strapiQueries";
//  import InfluencersComponent from '../../src/features/Influencers/components';
// 
const InfluencersComponent = dynamic(
  () => import("../../src/features/Influencers/components"),
  { loading: () => <MyPageLoader /> }
);
const defaultSEOData = {
  metaTitle:"Buy NFTs And Play Games With Your Favorite Influencer",
  metaDescription:"Get To Know More About Your Favorite Influencer At Lootmogul.com | Get A Chance To Play Games And Buy Their NFTs",
  canonicalURL:"https://lootmogul.com/influencers"

};

export default function Influencer({ data, seoData }) {
  return <>
   <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
   <InfluencersComponent data={data || []} />
  </>
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("influencer-categories", {
      fields: ["name", "slug"],
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
  const seoData = await getSeoData("influencers");
  return { props: { data, seoData },
  revalidate: 600, // In seconds
 };
}