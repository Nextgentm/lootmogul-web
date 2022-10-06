import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const InfluencerDetailBanner = ({getBannerImage}) => {
  return (
    <Box
    mx={"-6vw"}>
    {getBannerImage() && (
        
            <Image
            src={getBannerImage()}
                alt={`influencer-banner`}
                className="custom-img"
                layout="fill"
                objectFit={"fill"}
                w="100%"
                
            />
    )}
</Box>
  )
}

export default InfluencerDetailBanner
