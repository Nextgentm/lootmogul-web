import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import GameCategory from "./GameCategory";
import { AppContext } from "../../../utils/AppContext/index";

const BlackChainGame = ({contestmasters,contestSectionsData}) => {
    
    const { isMobileDevice } = useContext(AppContext);
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
      

     

    return ( 
    <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p={[
                "2% 2%",
                "2% 2%",
                "2% 5%",
            ]}
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
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "65px",
                    ]}
                    textAlign="center"
                    mb="5%"
                >
                    Explore Ambassador Blockchain Games
                </Text>
                <Box>
                    {contestSections &&
                    contestSections.map((section, index) => (
                        <Box
                        key={"sec-index-" + index}
                        
                        >
                        {section?.contestmasters?.data &&
                            section?.contestmasters?.data.length > 0 && (
                            <GameCategory
                                key={`games-${index}`}
                                isMobileDevice={isMobileDevice}
                                section={section}
                                type="Blockchain Games"
                            />
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Flex>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            display="none"
            alignItems={"center"}
            p={[
                "2% 0%",
                "2% 0%",
                "2% 5%",
            ]}
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
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "85px",
                    ]}
                    textAlign="center"
                    mb="1%"
                    mt={[10, 10, 5, 0]}
                >
                    Play Free Games
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
                    textAlign="center"
                    m="auto"
                    mb="4%"
                >
                    Here best of all LootMogul blockchain games are free to play, allowing you to jump right into the action without any cost. Join the LootMogul community, show off your skills, and become a true champion on the field.
                </Text>
                <Box className='gameslider'>
                    {contestSections &&
                    contestSections.map((section, index) => (
                        <Box
                        key={"sec-index-" + index}
                        
                        >
                        {section?.contestmasters?.data &&
                            section?.contestmasters?.data.length > 0 && (
                            <GameCategory
                                key={`games-${index}`}
                                isMobileDevice={isMobileDevice}
                                section={section}
                                type="Blockchain Games"
                            />
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Flex>
    </Box>
    )
}

export default BlackChainGame