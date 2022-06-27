import dynamic from 'next/dynamic'
import MyPageLoader from '../../../../src/components/MyPageLoader';
import { useEffect } from "react";
import { useRouter } from "next/router";
const InfluencersComponent = dynamic(() => import("../../../../src/features/Influencers/components"), 
  { loading: () => 
    <MyPageLoader/>
   });
  

export default function InfluencerByCategory({ data,id }) {
  const router = useRouter();
  
  return <InfluencersComponent data={data?.data || []} selectedCategory={id} />;
}
export async function getStaticProps(context) {
    // Fetch data from external API
  
    const { id = "" } = context.params;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL|| "https://gamification.tpix.in" }/api/influencer-categories?filters[slug]=${id}&populate=[0]=*&populate[1]=influencers.icon&populate[2]=influencers.contestmasters.feeWallet.currency`
      );
      const data = await res.json();
    return { props: {data, id } ,
    revalidate: 600, // In seconds
  };
  }
 


export async function getStaticPaths() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL|| "https://gamification.tpix.in" }/api/influencer-categories?populate=[0]=*&populate[1]=influencers.icon&populate[2]=influencers.contestmasters.feeWallet.currency`
      );
      const data = await res.json();
  
    const paths = data.data?.map((promo) => ({
      params: { id:promo.slug},
    }))
  
    return { paths, fallback: 'blocking' };
  }