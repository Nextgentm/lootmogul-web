import { Text } from "@chakra-ui/react";

import dynamic from 'next/dynamic'
import MyPageLoader from "../../../../src/components/MyPageLoader";

const AboutUsDetails = dynamic(() => import("../../../../src/features/AboutUs/AmbassadorsProfile"),  { loading: () => 
  <MyPageLoader/>
 })


export default function AmbassadorsDetails({ slug, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }

  return <AboutUsDetails slug={slug} />;
}
export async function getStaticProps(context) {
  // Fetch data from external API

  const  slug  = context.params.slug;


  return { props: { slug } ,
  revalidate: 600, // In seconds
};
}


export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +'/api/about-us-sections/2?populate[0]=about_us_profiles.profilePic');
  const ambassadors =  await res.json()

  const paths = ambassadors.data?.about_us_profiles?.data?.map((profile) => ({
    params: {category:"ambassadors", slug: profile.slug || profile.id.toString()},
  }))

  return { paths, fallback: 'blocking' };
}