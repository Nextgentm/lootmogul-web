import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
const Banner = ({ banner, isSubPage }) => {
    return (
        <>
            {
                !isSubPage ? 
                <Box>
                    <SimpleGrid
                        direction={"column-reverse"}
                        columns={[1, 1, 1, 2]}
                    >
                        <Box order="1">
                            <Text
                                color="white"
                                fontSize={[
                                    "70px",
                                    "70px",
                                    "85px",
                                ]}
                                fontFamily="var(--chakra-fonts-Blanch)"
                                lineHeight="1"
                                variant="headText"
                                textShadow="unset"
                            >
                                DISCOVER, BUY, TRADE<br/>
                                and unlock the sports star digital collectibles that offer<br />
                                real-life benefits and utilities. 
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
                                Get your hands on exclusive limited-edition digital collectibles of your favorite sports star! 
                            </Text>
                        </Box>
                        <Box
                            mt={5}
                            order="2"
                            bgSize="cover"
                            textAlign={"center"}
                        >

                            <Flex>
                                <Image
                                    m={"auto"}
                                    alt={`nft-banner`}
                                    src={banner}
                                    className="custom-img"
                                    layout="fill"
                                    width={"100%"}
                                    height={["300px", "300px", "400px", "400px"]}
                                />
                            </Flex>

                        </Box>
                    </SimpleGrid>
                </Box> : 
                <Box
                    mx={"-6vw"}>
                        <Image
                            alt={`nft-banner`}
                            src={banner}
                            className="custom-img"
                            layout="fill"
                            objectFit={"fill"}
                            w="100%"
                        />
                </Box>}
        </>
    )
}

export default Banner;