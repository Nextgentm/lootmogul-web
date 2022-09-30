import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const InfluencerDetailBanner = ({getBannerImage}) => {
  return (
    <Box mr={[0, "50px"]} ml={[0, "50px"]}>
    {getBannerImage() && (
        <Box
            position="relative"
            align="center"
            width="100%"
            height={"350px"}
        >
            <Image
                alt={`influencer-banner`}
                m={"auto"}
                className="custom-img"
                layout="fill"
                src={getBannerImage()}
            />
        </Box>
    )}
</Box>
  )
}

export default InfluencerDetailBanner
