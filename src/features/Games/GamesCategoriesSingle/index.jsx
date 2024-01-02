import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
    Box,
    Text,
    Flex,
    Wrap,
    WrapItem,
    useMediaQuery,
    Heading,
    Spacer,
    ButtonGroup,
    Button
} from "@chakra-ui/react";
import GamesCard from "../../InfluencerDetails/InfluencerGames/InfluencerGameCard";
import { useState, useEffect } from "react";

const GamesCategories = ({ isMobileDevice, section }) => {
    
    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
    const [showAll, setShowAll] = useState(true);
    const [content, setContent] = useState({});
    const [contentBackUp, setContentBackUp] = useState({});

    useEffect(() => {
        setContent(section);
        setContentBackUp(section);
    }, [section]);

    return (
        <Box>
           
            <Flex my="40px" minWidth="max-content" alignItems="center" gap="2" className="game_section_title">
                <Box p="2">
                    <Heading variant="sectionTitle">{content.name}</Heading>
                </Box>
                <Spacer />
            </Flex>

            {showAll ? (
                <Wrap m="auto !important">
                    {content?.contestmasters?.data
                        .sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem mb="2%!important">
                                <GamesCard
                                    style={{ mr: "13px" }}
                                    key={`gamescard-${index}`}
                                    contestmaster={cm}
                                    sectionName={content.name}
                                />
                            </WrapItem>
                        ))}
                </Wrap>
            ) : (
                <>
                    No Record found
                </>
            )}
        </Box>
    );
};

export default GamesCategories;
