import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Box, Text, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import GamesCard from "../../InfluencerDetails/InfluencerGames/InfluencerGameCard";
import ContentNavigator from "../../../components/ContentNavigator/index";
import { useRef, useState } from "react";

const GamesCategories = ({ isMobileDevice, section } ) => {
    const [showAll,setShowAll] = useState(false);
    const ref = useRef();
    const arrowTrashhold = isMobileDevice ? 2 : 5;

    return (
        <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">
        <Flex justify="space-between" mt="20px" align="center" mb="20px">

            <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px", "58px"]}>
                    {section.name}
                </Text>

                <ContentNavigator
                    showViewAll={section.contestmasters.data.length > arrowTrashhold && !isMobileDevice}
                    showArrows={section.contestmasters.data.length > arrowTrashhold}
                    handleLeftArroeClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={()=>setShowAll(!showAll)}
                />
            </Flex>

          {showAll? <Wrap m="auto !important" >
                    {section.contestmasters.data.sort((a,b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem m="auto !important" mb="2%!important"  >
                                <GamesCard
                    style={{ mr: "24px" }}
                        key={`gamescard-${index}`}
                        contestmaster={cm}
                        sectionName={section.name}
                    />
                            </WrapItem>
                        ))}
                   
                </Wrap>:  <ScrollMenu apiRef={ref}>
                {section.contestmasters.data.sort((a,b) => a.priority - b.priority).map((cm, index) => (
                    
                    <GamesCard
                    style={{ mr: "24px" }}
                        itemId={`item-${index}`}
                        key={`item-${index}`}
                        contestmaster={cm}
                        sectionName={section.name}
                    />
                ))}
            </ScrollMenu>
}
        </Box>
    );
};

export default GamesCategories;
