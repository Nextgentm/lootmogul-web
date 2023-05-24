import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from "react";

const BlackChainGame = ({contestmasters,contestSectionsData}) => {
    console.log(contestmasters);
    const [contestSections, setContestSections] = useState([]);
    useEffect(() => {
        if (contestmasters) {
          const fg = [];
          const cs = [];
    
          contestmasters.map((cm) => {
            if (cm.isFeatured) fg.push(cm);
    
            let section = contestSectionsData?.find(
              (sec) => sec.id == cm.contest_section?.data?.id
            );
            if (section) {
              if (section?.contestmasters?.data)
                section.contestmasters.data?.push(cm);
              else {
                section.contestmasters = {
                  data: [cm]
                };
              }
            }
          });
          
          setContestSections(contestSectionsData);
          
        }
      }, [contestmasters, contestSectionsData]);
      console.log(contestSections);
    return (
        <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
        >
            <Box
                px={10}
                width={["100%", "100%", "100%", "100%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "70px",
                        "70px",
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="65px"
                    textAlign="center"
                >
                    Explore Ambassador Blockchain Games
                </Text>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p="2% 5%"
                >
                <Link
                    href={"/games/" }
                    passhref="true"
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
                            height={["360px", "500px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="50%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="450px"
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
                <Link
                    href={"/games/" }
                    passhref="true"
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
                            height={["360px", "500px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="50%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="450px"
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
                <Link
                    href={"/games/" }
                    passhref="true"
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
                            height={["360px", "500px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="50%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="450px"
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
                <Link
                    href={"/games/" }
                    passhref="true"
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
                            height={["360px", "500px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="50%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="450px"
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
                
                </Flex>
            </Box>
            
        </Flex>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
        >
            <Box
                px={10}
                width={["100%", "100%", "100%", "100%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "70px",
                        "70px",
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="65px"
                    textAlign="center"
                >
                    Play Free Games
                </Text>

                
            </Box>
            
        </Flex>
        </Box>
    )
}

export default BlackChainGame