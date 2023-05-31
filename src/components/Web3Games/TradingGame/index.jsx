import { Box, Flex, Image, Text, Button, VStack, Link, ListItem, UnorderedList, } from '@chakra-ui/react'
import React from 'react'

const TradingGame = () => {
    return (
    <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
            pb="0"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "70%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "62px",
                    ]}
                >
                    Trending Contest
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "28px"]}
                    width={["100%", "100%", "80%"]}
                >
                    Are You Ready for the Ultimate Cricket Challenge? Play and Win Daily in Our T20 Pro Cricket Contest. One top performer gets to win a prize of INR 500* every day. The contest is free to join.
                </Text>
                <Link
                    href={"/games" }
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                    
                >
                    <Button
                        bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        filter="drop-shadow(0 0 20px #FF0080)"
                        boxShadow="inset 0 0 0px 0px #481A7F"
                        width="180px"
                        fontSize="21px"
                        fontWeight="500"
                        p="28px"
                        mt="30px"
                        mb="30px"
                        >
                        Play Now
                    </Button>
                </Link>    
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["90%", "90%", "30%", "30%"]}
            >
                <Link
                    href={"/games" }
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                >
                    <VStack>
                        <Flex
                            flexDir={"column"}
                            textAlign="center"
                            bgImage={"/assets/designupdate1/gamecard_portrait.png"}
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            bgSize="100% 100%"
                            cursor="pointer"
                            width={"100%"}
                            height={["330px", "300px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="60%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="350px"
                                    src="/assets/Contest_Image.png"
                                />
                            </Flex>
                            <Text
                                mb={10}
                                color="#FDFFE5"
                                fontSize={["16px"]}
                                fontWeight={"600"}
                                align={"center"}
                                mx={10}
                                textOverflow="ellipsis"
                                overflow="visible"
                            >
                                T20 Pro Cricket Championship
                            </Text>
                        </Flex>
                    </VStack>
                </Link>
            </Box>
        </Flex>
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
                    Contest Highlights
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
                    <UnorderedList>
                        <ListItem>The contest joining is FREE to play.</ListItem>
                        <ListItem>To avail the offer play & win maximum contests.</ListItem>
                        <ListItem>A Top Performer to Win INR 500*, everyday.</ListItem>
                        <ListItem>1 winner can win claim reward for max. 3 times in the contest duration.</ListItem>
                        <ListItem>This is a leaderboard contest, the top leaderboard winner will be declared based on the highest points scored.</ListItem>
                        <ListItem>Same winner can only be chosen again if there is a new score. Winner with same score will not be considered again even if they are on top of the leaderboard.</ListItem>
                    </UnorderedList>   
                    <span style={{"fontSize":"14px"}}>For more information, refer to game’s terms and conditions. </span>            
                </Text>
            </Box>
        </Flex>
    </Box>
    )
}

export default TradingGame