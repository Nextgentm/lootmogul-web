import React, { } from "react";
import dynamic from 'next/dynamic'
import {Text} from "@chakra-ui/react";

const NftsComponent = dynamic(() => import("../../src/features/Nfts/components"));
import strapi from "../../src/utils/strapi";


export default function NftbyId({ data}) {
 

  return <NftsComponent data={[{nftSet:data, name:"newest"}] || []}  isNewest={true} />;
}

export async function getStaticProps(context) {
  // Fetch data from external API

  const newNfts = await strapi.find("nft-kreds", {
    sort:"createdAt:DESC",
    fields:["slug","marketURL","front_image","back_image", "name", "isAuction", "market_price", "sale_price"]
    }
  );


    
  const data = newNfts?.data;

  if(data)
  { 
    return { props: { data },
    revalidate: 600 }
     
  }
  // Pass data to the page via props
  return { props: { error: newNfts?.error?.message } // In seconds
};

  
}
