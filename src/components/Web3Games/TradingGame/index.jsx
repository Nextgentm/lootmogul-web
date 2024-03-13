import { Box, Flex, Image, Text, Button, VStack, Link, ListItem, UnorderedList, } from '@chakra-ui/react'
import React from 'react'
import { useContext, useState,useEffect} from "react";
import AppContext from "../../../../src/utils/AppContext";
import dynamic from "next/dynamic";
const LMNonCloseALert = dynamic(() =>
    import("../../../components/LMNonCloseALert")
  );

const TradingGame = ({tradingCardData,trendingtmtData}) => {
    const content =  tradingCardData.trending_contestHighlights;
    const [trendingContest, setTrendingContest] = useState(false);

    const {
        CheckAndStartGame,
        setShowLoading,
        showLoading,
      } = useContext(AppContext);
     
      useEffect(() => {
        if (!trendingtmtData) return;

        const matchedSection = trendingtmtData.find(section => tradingCardData.trending_redirectionUrl == section.slug);
        if (matchedSection) {
            setTrendingContest(matchedSection);
        }
    }, [tradingCardData.trending_redirectionUrl, trendingtmtData]);  

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
                    {tradingCardData.trending_header}
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
                    {tradingCardData.trending_subheader}
                </Text>
                <Link
                    href={"#"}
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
                        onClick={() => {
                            setShowLoading({
                              key: `GameDetail-${trendingContest?.id}`,
                              show: true,
                            });
                            CheckAndStartGame(`GameDetail-${trendingContest?.id}`, trendingContest);
                          }}
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
                    href={"/games/"+trendingContest.slug || '/games'}
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
                                    src={trendingContest?.icon?.data?.url || tradingCardData.trending_gameLogo.data[0].url}
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
                                {trendingContest.name}
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
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>            
                </Text>
            </Box>
        </Flex>

        {tradingCardData.othertrending_redirectionUrl && <>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
            pb="0"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "100%"]}
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
                    {tradingCardData?.othertrending_header}
                </Text>

               
                { trendingtmtData &&
                    trendingtmtData.map((section, index) => ( 
                        tradingCardData.trending_redirectionUrl !== section.slug && <Box
                            bgSize="cover"
                            textAlign={"center"}
                            px={[0, 0, 0, 0]}
                            pb={[0, 0, 0, 12]}
                            width={["90%", "90%", "30%", "25%"]}
                            mt="25px"
                            display={"inline-block"}
                            pr="15px !important"
                        >
                            <Box
                                key={"sec-index-" + index}
                            >
                                <Link
                                    href={ '/games/' + section.slug || '/games'}
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
                                                    src={section?.icon?.data?.url||tradingCardData.trivia_banner_image.data[0].url}
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
                                                {tradingCardData.contests.data[0]?.name}
                                            </Text>
                                        </Flex>
                                    </VStack>
                                </Link>
                                <Link
                                    href={"#"}
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
                                        onClick={() => {
                                            setShowLoading({
                                              key: `GameDetail-${section?.id}`,
                                              show: true,
                                            });
                                            CheckAndStartGame(`GameDetail-${section?.id}`, section);
                                          }}
                                        >
                                        Play Now
                                    </Button>
                                </Link>
                            </Box>
                            <LMNonCloseALert
                                header={"Please Wait....."}
                                canClose={false}
                                isOpen={
                                showLoading.show && showLoading.key === `GameDetail-${section?.id}`
                                }
                            ></LMNonCloseALert>
                        </Box>
                    ))
                }    
            </Box>
        </Flex>
        </>}
        <LMNonCloseALert
            header={"Please Wait....."}
            canClose={false}
            isOpen={
            showLoading.show && showLoading.key === `GameDetail-${trendingContest?.id}`
            }
        ></LMNonCloseALert>
       
    </Box>
    )
}

export default TradingGame