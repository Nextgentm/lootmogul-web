import React, { useContext, useState } from "react";
import { Box, Text, Flex, WrapItem, Wrap } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import ContentNavigator from "../../../components/ContentNavigator";
import GamesCard from "./InfluencerGameCard/index";
import { AppContext } from "../../../utils/AppContext/index";
import { LeftArrow, RightArrow } from "../../../components/ContentNavigator/arrows";

const InfluencerGame = ({ contestmasters }) => {
    console.log("contestmasters", contestmasters);
    const ref = React.useRef();
    const { isMobileDevice } = useContext(AppContext);
    const [showAll, setShowAll] = useState(false);
    const arrowTrashhold = isMobileDevice ? 2 : 5;
    return (
        <Box>
          {contestmasters?.data.length === 0 ? (
                  <Text  mt="20px" color="white">Coming soon.. </Text>
            ):(  <> 
             {/* <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text color="white" fontFamily="Blanch" fontSize="32px">
                    Games
                </Text>

                <ContentNavigator
                    showViewAll={
                        contestmasters?.data.length > arrowTrashhold &&
                        !isMobileDevice
                    }
                    showArrows={contestmasters?.data.length > arrowTrashhold}
                    handleLeftArrowClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={() => setShowAll(!showAll)}
                />
            </Flex> */}
          
                <Box>
                    {showAll ? (
                        <Wrap m="auto !important">
                            {contestmasters?.data.map((cm, index) => (
                                <WrapItem m="auto !important" mb="2%!important">
                                    <GamesCard
                                        style={{ mr: "24px" }}
                                        itemId={`item-${index}`}
                                        key={`item-${index}`}
                                        contestmaster={cm}
                                        sectionName={
                                            cm.contest_section?.data?.name
                                        }
                                    />
                                </WrapItem>
                            ))}
                        </Wrap>
                    ) : (
                        <ScrollMenu className="no-scrollbar" apiRef={ref}
                        LeftArrow={LeftArrow}
                        RightArrow={RightArrow}>
                            {contestmasters?.data.map((cm, index) => (
                                <GamesCard
                                
                                    style={{ mr: "24px" }}
                                    itemId={`item-${index}`}
                                    key={`item-${index}`}
                                    contestmaster={cm}
                                    sectionName={cm.contest_section?.data?.name}
                                />
                            ))}
                        </ScrollMenu>
                    )}
                </Box>
                </>
            )}
        </Box>
    );
};

export default InfluencerGame;