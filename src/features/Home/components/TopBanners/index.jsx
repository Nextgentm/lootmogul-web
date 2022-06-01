/* eslint-disable @next/next/no-sync-scripts */
import { useContext } from "react";
import { Box, Link,chakra } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../utils/medias";
import Image from "../../../../utils/Image";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from 'next/router';  

import { AppContext } from "../../../../utils/AppContext/index";

import {  imgCntainer } from "./styles";
import * as ga from "../../../../services/googleAnalytics";
import LMSingleCarousel from "../../../../components/LMCarousel/LMSingleCarousel"

const Banners = ({ bannersList }) => {
  const router = useRouter();
  const {  isMobileDevice  ,isNotMobile } = useContext(AppContext);
  const callToAction = (item)=>{
    if(item.callToAction && item.callToAction !== "")
    router.push(item.callToAction);
    else if(item.redirectURL)
    window.open(
      item.redirectURL,
      "_blank"
  );

  }
  return (
    <Box position="relative">
      <Box {...imgCntainer(isMobileDevice)} >
        
        <LMSingleCarousel  disableDots = {false}>

          {bannersList?.length && bannersList.map(
            (
              item,
              index
            ) => {
            
            return   <Image 
                  key={`top-banner-img-${index}`}
                  alt={`action`}
                  w="100%" 
                  h={["453px!important","320px!important","360px!important", "460px!important","580px!important"]}
                  layout = "fill"
                  src={ isNotMobile || item.bannerImage.data.length==1 ? getStrapiMedia(item.bannerImage.data[0].url) : getStrapiMedia(item.bannerImage.data[1].url) }
                  objectFit={"cover"}
                
                  />
                
            
            }
          )}
        </LMSingleCarousel>
      
      </Box>



    </Box>
  );
};

export default Banners;
