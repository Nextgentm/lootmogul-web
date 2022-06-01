import { Text } from "@chakra-ui/react";

import dynamic from 'next/dynamic'
import MyPageLoader from "../../../src/components/MyPageLoader";

const PromotionDetails = dynamic(() => import("../../../src/features/Promotion/PromotionDetails"),  { loading: () => 
  <MyPageLoader/>
 })


export default function PromotionById({ id, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }

  return <PromotionDetails id={id} />;
}
export async function getStaticProps(context) {
  // Fetch data from external API

  const { id = "" } = context.params;

  return { props: { id } ,
  revalidate: 600, // In seconds
};
}


export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL +'/api/campaigns?position=promotio-top&pagination[start]=0&pagination[limit]=100&sort[0]=priority');
  const promotions =  await res.json()

  const paths = promotions.data?.map((promo) => ({
    params: { id: promo.slug || promo.id.toString()},
  }))

  return { paths, fallback: 'blocking' };
}