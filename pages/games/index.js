// import dynamic from 'next/dynamic'
// import MyPageLoader from '../../src/components/MyPageLoader';
import strapi from "../../src/utils/strapi";
import SEOContainer from '../../src/features/SEOContainer';
import {getSeoData} from "../../src/queries/strapiQueries";
import GamesComponent from '../../src/features/Games/index';


// const GamesComponent = dynamic(() => import(""),  { loading: () => 
//   <MyPageLoader/>
//  })
 const defaultSEOData = {
  metaTitle:"Play Online Trivia Games With Your Favorite Influencers",
  metaDescription:"Play Games With Your Favorite Influencers And Win Exciting Prizes",
  canonicalURL:"https://lootmogul.com/games"

};

export default function GamesPage({ data, banners=[] , seoData}) {
  return <>
    <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
  <GamesComponent contestSections={data || []} banners={banners?.data || []} />
  </>;
}



export async function getStaticProps() {
  // Fetch data from external API
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("contest-sections", {
      fields: ["name", "slug"],
      sort: "priority",
      populate: {
        contestmasters: {
          fields: ["name", "slug","priority","entryFee","isFeatured"],
          populate: {
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
            reward:{

            }
          },
        },
      },

      pagination: {
        page: pageNo,
        pageSize: 25,
      },
    });
  
    if(res?.meta){
      data.push(res.data);
      if(pageCount==1){
        pageCount = res.meta.pagination.pageCount
      }
    }
     pageNo++;
    } while (pageNo<=pageCount);
  // Pass data to the page via props
  data = data.flat();


  try{
    const bannersRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL+'/api/campaigns?sort=priority&populate=bannerImage'
    );
  
     const banners = await bannersRes.json();
     const seoData = await getSeoData("games");
  
     return { props: { data, banners , seoData} };
  } catch (error) {
    console.log(error);
    }
    return { props: { data } ,
    revalidate: 600, // In seconds
  };
  }

