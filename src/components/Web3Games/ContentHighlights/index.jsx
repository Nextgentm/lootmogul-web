import { Box, Flex, Image, Text, Button, VStack, Link, ListItem, UnorderedList, } from '@chakra-ui/react'
import React from 'react'

const ContentHighlights = ({tradingCardData}) => {
    const content =  tradingCardData.trending_contestHighlights;
    return (
    <Box>
        
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="5%"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "90%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="62px"
                >
                    {tradingCardData.trending_header}
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "21",
                        "21"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "35px"]}
                    width={["100%", "100%", "100%"]}
                >
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>            
                </Text>
            </Box>
        </Flex>
    </Box>
    )
}

export default ContentHighlights