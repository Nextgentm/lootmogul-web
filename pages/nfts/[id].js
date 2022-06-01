import React, { } from "react";
import dynamic from 'next/dynamic'
import {Text} from "@chakra-ui/react";
// import NFTDetails from '../../src/features/NFTDetails';

const NFTDetails = dynamic(() => import("../../src/features/NFTDetails"));
import strapi from "../../src/utils/strapi";


export default function NftbyId({ data, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }

  return <NFTDetails nftData={data?.data?.length>0 ? data?.data[0] : {} || {}} />;
}

export async function getStaticProps(context) {
  // Fetch data from external API

  const { id = "" } = context.params;
  const filter = isNaN(id) ? {slug:id} : {id:id};
  const data = await strapi.find("nft-kreds",
  { filters: filter
    });
  if(data)
  { 
    return { props: { data:data } };
  }
  // Pass data to the page via props
  return { props: { error: data?.error?.message } ,
  revalidate: 600, // In seconds
};

  
}


export async function getStaticPaths() {
  // Fetch data from external API
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
     const res = await strapi.find("nft-kreds", {
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

  const paths = data?.map((nft) => ({
    params: { id: nft.slug || nft.id.toString()},
  }))

  return { paths, fallback: 'blocking' };
}

