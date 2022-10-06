import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

const NftDetailBanner = ({getBannerImage,isMobileDevice}) => {
  return (
    <Box
    mx={"-6vw"}>
    {getBannerImage() && (
                    <Image
                        alt={`nft-banner`}
                        src={getBannerImage()}
                        className="custom-img"
                        layout="fill"
                        objectFit={"fill"}
                        w="100%"
                    />
    )}
</Box>
  )
}

export default NftDetailBanner