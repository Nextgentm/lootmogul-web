import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

const NftBanner = ({ getBannerImage }) => {
    return (
        <Box>
            <SimpleGrid
                direction={"column-reverse"}
                columns={[1, 1, 1, 2]}
                spacing={10}
                pt={[10, 10, 10, 20, 20]}
            >
                <Box order="1">
                    <Text
                        color="white"
                        fontSize={[
                            "70px",
                            "70px",
                            "90px",
                        ]}
                        fontFamily="var(--chakra-fonts-Blanch)"
                        lineHeight="1"
                        variant="headText"
                        textShadow="unset"
                    >
                        Buy and Trade <br />
                        Your favorite <br />
                        Influencers NFT
                    </Text>

                    <Text
                        color="white"
                        fontSize={[
                            "1rem",
                            "1.2rem",
                            "1.2rem",
                            "1.2em",
                            "1.5rem"
                        ]}
                        fontWeight="normal"
                        mt="1rem"
                        width={"90%"}
                    >
                        Become a virtual landlord to some of the
                        largest projects in crypto
                    </Text>
                </Box>
                <Box
                    mt={5}
                    order="2"
                    bgSize="cover"
                    textAlign={"center"}
                >
                    {getBannerImage() && (
                        <Flex>
                            <Image
                                m={"auto"}
                                alt={`nft-banner`}
                                src={getBannerImage()}
                                className="custom-img"
                                layout="fill"
                                width={"100%"}
                                height={["300px", "300px", "400px", "400px"]}
                            />
                        </Flex>
                    )}
                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default NftBanner