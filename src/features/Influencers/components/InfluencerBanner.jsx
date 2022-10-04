import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const InfluencerBanner = ({getBannerImage}) => {
  return (
    <Flex
                        flexDir={["column", "column", "column", "row"]}
                        w="100%"
                    >
                        <Box
                            px={10}
                            pb={12}
                            pt="2em"
                            mt={[0, 0, 10]}
                            ml={["0em", "0em", "2em", "2em"]}
                            width={["100%", "100%", "100%", "55%"]}
                        >
                            <Text
                                variant="headText"
                                fontSize={[
                                    "2.3rem",
                                    "2.5rem",
                                    "3.2rem",
                                    "2.7rem",
                                    "4rem"
                                ]}
                                lineHeight={[
                                    "44px",
                                    "48px",
                                    "72px",
                                    "50px",
                                    "80px"
                                ]}
                            >
                                Play your favorite Influencer Tournament and win
                                NFT
                            </Text>

                            <Text
                                color="white"
                                fontSize={[
                                    "1rem",
                                    "1.3rem",
                                    "1.3rem",
                                    "1.3rem",
                                    "1.3rem"
                                ]}
                                mt="20px"
                                fontFamily="Sora"
                                fontWeight="normal"
                                lineHeight={["30px", "30px", "36px"]}
                                width={["100%", "100%", "80%"]}
                            >
                                Become a virtual landlord to some of the largest
                                projects in crypto
                            </Text>
                        </Box>
                        <Box
                            bgSize="cover"
                            textAlign={"center"}
                            px={[0, 0, 0, 10]}
                            pb={[0, 0, 0, 12]}
                            pt={[5, 5, 0, 12]}
                            width={["120%", "120%", "120%", "50%"]}
                        >
                            {getBannerImage() && (
                                <Box
                                    ml={["20px", "20px", "20px", "-100px"]}
                                    mr={["20px", "20px", "20px", "-100px"]}
                                >
                                    <Flex
                                        position="relative"
                                        mt={["-35px", "-11px", "50px"]}
                                        h={["200px", "200px", "390px"]}
                                    >
                                        <Image
                                            m={"auto"}
                                            alt={`nft-banner`}
                                            src={getBannerImage()}
                                            className="custom-img"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </Flex>
                                </Box>
                            )}
                        </Box>
                    </Flex>
  )
}

export default InfluencerBanner