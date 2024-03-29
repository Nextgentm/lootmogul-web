import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import GameCategory from "../BlockChainGame/GameCategory";
import { AppContext } from "../../../utils/AppContext/index";

const CustomBlockChainGame = ({contestmasters,contestSectionsData, blockChainCardData}) => {
    
    const { isMobileDevice } = useContext(AppContext);
    const [contestSections, setContestSections] = useState([]);
    const [contestSectionsTrivia, setContestSectionsTrivia] = useState([]);
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
        
        
        {blockChainCardData.gameSectiontraiv_header && (
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
                 {blockChainCardData.gameSectiontraiv_header && (<Text
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
                    {blockChainCardData.gameSectiontraiv_header}
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
                                gameType="customGame"
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

export default CustomBlockChainGame