import { Text } from "@chakra-ui/react";

import AmbassadorsProfile from "../../../../src/features/AboutUs/AmbassadorsProfile"



export default function AmbassadorsDetails({slug, aboutUsData, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }

  return <AmbassadorsProfile slug={slug} aboutUsData={aboutUsData} />;
}
export async function getStaticProps(context) {
    // Fetch data from external API
    const  slug  = context.params.slug;
    const aboutUs = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +'/api/about-us-profiles?filters[slug]='+slug+'&populate[0]=profilePic&populate[1]=sharedSeo');

    let aboutUsData = await aboutUs.json();
  
    aboutUsData = aboutUsData.data;
  
  
    return { props: {slug, aboutUsData},
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