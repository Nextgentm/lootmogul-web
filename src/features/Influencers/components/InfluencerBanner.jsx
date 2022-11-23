import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const InfluencerBanner = ({ getBannerImage }) => {
    return (
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
        >
            <Box
                px={10}
                width={["100%", "100%", "100%", "55%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "70px",
                        "70px",
                        "100px",
                    ]}
                    textShadow="unset"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="1"
                >
                    Play your favorite Ambassador Tournament and win
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
                width={["120%", "120%", "120%", "50%"]}
            >
                {getBannerImage() && (
                    <Box
                    >
                        <Flex
                            position="relative"
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