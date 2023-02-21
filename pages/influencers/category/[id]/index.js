import dynamic from 'next/dynamic'
import MyPageLoader from '../../../../src/components/MyPageLoader';
import NotFound from '../../../../src/features/404';

import strapi from "../../../../src/utils/strapi";
const InfluencersComponent = dynamic(() => import("../../../../src/features/Influencers/components"),
  {
    loading: () =>
      <MyPageLoader />
  });


export default function InfluencerByCategory({ data, id }) {
  let selData = data?.filter((item) => item.slug === id);
  return <>
    {selData?.length > 0 && id ?
      <InfluencersComponent data={data || []} selectedCategory={id} /> :
      <NotFound />}
  </>
}
export async function getStaticProps(context) {
  // Fetch data from external API
  const { id = "" } = context.params;
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("influencer-categories", {
      fields: ["name", "slug", "description"],
      sort: "priority",
      populate: {
        seo: { populate: ["*"] },
        influencers: {
          fields: ["name", "slug", "tagline", "order"],
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
        banner: { populate: ["*"] },
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
  return {
    props: { data, id },
    revalidate: 600, // In seconds
  };
}



export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/influencer-categories?populate=[0]=*&populate[1]=influencers.icon&populate[2]=influencers.contestmasters.feeWallet.currency`
  );
  const data = await res.json();

  const paths = data.data?.map((promo) => ({
    params: { id: promo.slug },
  }))

  return { paths, fallback: 'blocking' };
}