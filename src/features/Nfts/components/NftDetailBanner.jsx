import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

const NftDetailBanner = ({getBannerImage,isMobileDevice}) => {
  return (
    <Box
    mx={"-6vw"}
    order="2"
    bgSize="cover"
    textAlign={"center"}
    pb={12}
>
    {getBannerImage() && (
        <Box
           
        >
            <Flex position="relative" w="100%">
                {isMobileDevice ? (
                    <Image
                        m={"auto"}
                        alt={`nft-banner`}
                        src={getBannerImage()}
                        className="custom-img"
                        layout="fill"
                        objectFit={"fill"}
                        w="100%"
                        h="600px"
                    />
                ) : (
                    <Image
                        m={"auto"}
                        alt={`nft-banner`}
                        src={getBannerImage()}
                        className="custom-img"
                        layout="fill"
                        objectFit={"fill"}
                        w="100%"
                        h="600px"
                    />
                )}
            </Flex>
        </Box>
    )}
</Box>
  )
}

export default NftDetailBanner