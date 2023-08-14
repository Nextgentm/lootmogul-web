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
                    Utilize LootMogul’s open AI architecture to create your own (NPCs) Non-Player Characters!
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
                    Own iconic AI avatars of legendary athletes and level up your sports fandom with an exclusive digital collectibles collection.  <br/><br/>
                    Harness the power of LootMogul's open AI architecture to craft your very own Non-Player Characters (NPCs) in the gaming realm. Step into the shoes of legendary athletes through iconic AI avatars, boosting your sports enthusiasm. Elevate your gaming experience with a unique selection of blockchain games and a coveted collection of rare sports NFTs (digital collectibles). 
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
                                width="95%"
                            />
                        </Flex>
                    </Box>
                )}
            </Box>
        </Flex>
    )
}

export default InfluencerBanner