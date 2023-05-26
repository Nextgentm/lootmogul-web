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
import GamesCard from "../../../../features/InfluencerDetails/InfluencerGames/InfluencerGameCard";
import { useRef, useState, useEffect } from "react";
import ViewAllBtn from "../../../../components/ViewAllBtn";
import {
    LeftArrow,
    RightArrow
} from "../../../../components/ContentNavigator/arrows";
//import Search from "../../Influencers/components/Search";
import structuredClone from "@ungap/structured-clone";

const GameCategory = ({ isMobileDevice, section, type }) => {
    const ref = useRef();
    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
    const [showAll, setShowAll] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState({});
    const [contentBackUp, setContentBackUp] = useState({});

    useEffect(() => {
        setTimeout(() => {      
            if (searchText !== '') {
                if (searchText.length > 0) {
                    const clonedData = structuredClone(content);  
                    clonedData.contestmasters.data =
                    content?.contestmasters?.data.filter((x) =>
                    x.name.toLowerCase().includes(searchText.toLowerCase()));
                setContent(clonedData);
                }            
            }
            else {
                setContent(section);
            }
            
        }, 1000);
        
    }, [searchText]);

    useEffect(() => {
        setContent(section);
        setContentBackUp(section);
    }, [section]);

    return (
        <Box>
            <>
                {content.name == type &&
                content?.contestmasters?.data?.length > 0 ? (
                    <Box mx={[2.5, 0]}>
                        <ScrollMenu
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                            apiRef={ref}
                        >
                            {content?.contestmasters?.data
                                ?.sort((a, b) => a.priority - b.priority)
                                .map((cm, index) => (
                                    <GamesCard
                                        style={{
                                            w: [
                                                "75vw",
                                                "75vw",
                                                "370px",
                                                "370px"
                                            ],
                                            mx: 3
                                        }}
                                        itemId={`item-${index}`}
                                        key={`item-${index}`}
                                        contestmaster={cm}
                                        sectionName={content.name}
                                    />
                                ))}
                        </ScrollMenu>
                    </Box>
                ) : (
                    <Box>
                        
                    </Box>
                )}
            </>
        </Box>
    );
};

export default GameCategory;
