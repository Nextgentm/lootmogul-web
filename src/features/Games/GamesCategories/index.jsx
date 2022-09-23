import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Box, Text, Flex, Wrap, WrapItem,useMediaQuery } from "@chakra-ui/react";
import GamesCard from "../../InfluencerDetails/InfluencerGames/InfluencerGameCard";
import ContentNavigator from "../../../components/ContentNavigator/index";
import { useRef, useState } from "react";
import ViewAllBtn from "../../../components/ViewAllBtn";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";
const GamesCategories = ({ isMobileDevice, section }) => {
    const ref = useRef();
    const arrowTrashhold = isMobileDevice ? 2 : 5;
    const [showAll, setShowAll] = useState(false);
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <Box>
            <Flex justify="space-between" my="40px" align="center" w="100%">
                <Text
                w="100%"
                    variant="secHeadText"
                    textTransform="uppercase"
                    fontSize={["20px", "35px"]}
                    my="10px"
                >
                    {section.name}
                </Text>
                {isLargerThan768?(<>{section?.contestmasters?.data.length > arrowTrashhold  ? (
                    <Box onClick={() => setShowAll(!showAll)} w="100%" pos="relative" right="0">
                        <ViewAllBtn />
                    </Box>
                ) : (
                    ""
                )}</>):("")}
                
            </Flex>
            {showAll ? (
                
                <Wrap m="auto !important">
                    {section?.contestmasters?.data
                        .sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem m="auto !important" mb="2%!important">
                                <GamesCard
                                    style={{ mr: "24px" }}
                                    key={`gamescard-${index}`}
                                    contestmaster={cm}
                                    sectionName={section.name}
                                />
                            </WrapItem>
                        ))}
                </Wrap>
            ) : (
                <ScrollMenu
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                    apiRef={ref}
                >
                    {section?.contestmasters?.data
                        ?.sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <GamesCard
                                style={{ mr: "30px" }}
                                itemId={`item-${index}`}
                                key={`item-${index}`}
                                contestmaster={cm}
                                sectionName={section.name}
                            />
                        ))}
                </ScrollMenu>
            )}
        </Box>
    );
};

export default GamesCategories;