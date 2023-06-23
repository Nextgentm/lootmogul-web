import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import GameCategory from "./GameCategory";
import { AppContext } from "../../../utils/AppContext/index";

const BlackChainGame = ({contestmasters,contestSectionsData, blockChainCardData}) => {
    
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
          //console.log('hello cm.contest?.id');
          //console.log(contestSectionsData);
          setContestSections(contestSectionsData);
          
        }
      }, [contestmasters, contestSectionsData]);
      

     

    return ( 
    <Box>
         {blockChainCardData.gameSection1_isVisible && (
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
                 {blockChainCardData.gameSection1_header && (<Text
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
                    mb="1%"
                >
                    {blockChainCardData.gameSection1_header}
                </Text>
                )}
                {blockChainCardData.gameSection1_subheader && (<Text
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
                >
                    {blockChainCardData.gameSection1_subheader}
                </Text>
                )}
                <Box mt="4%" className='gameslider'>
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
                                type="paid"
                            />
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Flex>
        )}

        {blockChainCardData.gameSection2_isVisible && (
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
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
                {blockChainCardData.gameSection2_header && ( <Text
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
                    {blockChainCardData.gameSection2_header}
                </Text>
                )}
                {blockChainCardData.gameSection2_subheader && ( <Text
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
                    
                >
                   {blockChainCardData.gameSection2_subheader}
                </Text>
                )}

                <Box mt="4%" className='gameslider'>
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
                                type="free"
                            />
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Flex>
        )}
    </Box>
    )
}

export default BlackChainGame