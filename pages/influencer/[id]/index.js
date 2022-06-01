import { Text } from "@chakra-ui/react";
// import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { useEffect } from "react";
// import MyPageLoader from "../../../src/components/MyPageLoader";

import InfluencerDetail from "../../../src/features/InfluencerDetails";
// const InfluencerDetail = dynamic(() => import("../../../src/features/InfluencerDetails"),  { loading: () => 
//   <MyPageLoader/>
//  })

 import strapi from "../../../src/utils/strapi";

export default function InfluencerById({ data, error }) {
  const router = useRouter();
  useEffect(() => {
    if(data && data.data.length === 0)
    router.replace("/");
  },[data]);
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  } 
    return <InfluencerDetail influencer={data?.data.length>0 ? data?.data[0] : {} || {}} />;
  

  
}

export async function getStaticProps(context) {
  // Fetch data from external API

  const { id = "" } = context.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL|| "https://gamification.tpix.in" }/api/influencers?filters[slug]=${id}&populate[1]=icon&populate[2]=sharedSeo&populate[3]=sharedSeo.metaSocial`
  );
  const data = await res.json();
  // Pass data to the page via props
  if (data?.error) return { props: { error: data.error.message } };

  return { props: { data } ,
  revalidate: 600, // In seconds
  };
}


export async function getStaticPaths() {
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
     const res = await strapi.find("influencers", {
      sort: "id",
      pagination: {
        page: pageNo,
        pageSize: 100,
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
  
  const paths = data?.map((influencer) => ({
    params: { id: influencer.slug.toString() },
  }))

  return { paths, fallback: 'blocking' };
}