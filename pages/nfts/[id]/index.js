import React, { } from "react";
import dynamic from 'next/dynamic'
import {Text} from "@chakra-ui/react";

const NftsComponent = dynamic(() => import("../../../src/features/Nfts/components"));
import strapi from "../../../src/utils/strapi";


export default function NftbyId({ data ,id}) {
 

  return <NftsComponent data={data || []} selectedCategory={id} />;
}

export async function getStaticProps(context) {
  // Fetch data from external API

  const { id = "" } = context.params;
  const filter = isNaN(id) ? {slug:id} : {id:id};
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
     const res = await strapi.find("nft-collections", {
      sort: "priority",
      // publicationState: 'preview',
      //       filters:   { publishedAt: {
      //           $null: true
                
      //         }
             
      //       },
  
            populate:{
              sharedSeo:{populate:["*"]},
              nftSet:{
                populate:{
                  nft_kred:{
                    populate:["*"]
                  }
                }
              },
              banner:{fields:["url"]}
            } ,
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
  if(data)
  { 
    return { props: { id,data },
    revalidate: 600 }
     
  }
  // Pass data to the page via props
  return { props: { error: data?.error?.message } // In seconds
};

  
}


export async function getStaticPaths() {
  // Fetch data from external API
  let pageNo=1;
  let pageCount = 1;
  let data = [];
  do {
     const res = await strapi.find("nft-collections", {
      sort:"priority",
      populate:{
        sharedSeo:{populate:["*"]},
        nftSet:{
         
          populate:{
            nft_kred:{
              populate:["*"]
            }
          }
        },
        banner:{fields:["url"]}
      } ,
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

