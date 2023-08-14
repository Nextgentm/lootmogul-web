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
                        "48px",
                        "48px",
                        "100px",
                    ]}
                    textShadow="unset"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="1"
                >
                    Utilize LootMogul’s open AI architecture to create Athlete's (NPCs) Non-Player Characters!
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