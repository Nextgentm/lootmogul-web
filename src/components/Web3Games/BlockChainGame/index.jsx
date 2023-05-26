import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import GameCategory from "./GameCategory";
import { AppContext } from "../../../utils/AppContext/index";
import Slider from "react-slick";

const BlackChainGame = ({contestmasters,contestSectionsData}) => {
    //console.log(contestSectionsData);
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
      console.log(contestSections);

      const horizontalSettings = {
        dots: false,
        infinite: true,
        arrows: true,
        cssEase: "linear",
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 100,
        dotsClass: "slick-dots slick-thumb customSlide limited-dots",
        customPaging: (pagi, i) => (
            <Box
                height="5px"
                width={["40px", "90px"]}
                _before={{ width: "100%" }}
                bg={
                    pagi === currentSlideIndex
                        ? "linear-gradient(180deg, #43C8FF 0%, #45E470 100%), #FFFFFF"
                        : "#8E8E8E"
                }
                borderRadius="20px"
                cursor="pointer"
            />
        )
    };

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
                    mb="1%"
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
    </Box>
    )
}

export default BlackChainGame