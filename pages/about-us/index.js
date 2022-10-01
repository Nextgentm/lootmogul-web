
import {Text} from "@chakra-ui/react";

import AboutUS from '../../src/features/AboutUS'


export default function About({ data,aboutUsData, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }

  return <AboutUS data={data}aboutUsData={aboutUsData} />;
}

export async function getStaticProps(context) {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +'/api/about-us-sections?populate[0]=about_us_profiles.profilePic&populate[1]=about_us_profiles.logo&populate[2]=about_us_profiles.Intro&sort=priority');
  const aboutUs = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +'/api/about-us-profiles?filters[slug]=about-us');

  let data =  await res.json()
  let aboutUsData = await aboutUs.json();

  data = data.data;
  aboutUsData = aboutUsData.data;

  data = data?.map(cat=>{
    if(cat.about_us_profiles?.data?.length){
        let proData =cat.about_us_profiles.data;
        proData = proData.sort((a,b) => a.priority - b.priority);
        cat.about_us_profiles.data = proData;
    }
    return cat;
  })
  return { props: { data , aboutUsData},
  revalidate: 600, // In seconds
};
}