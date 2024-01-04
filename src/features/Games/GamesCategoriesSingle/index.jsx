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
import Search from "../../Influencers/components/Search";
import Link from "next/link";

const GamesCategories = ({ isMobileDevice, section }) => {

    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
    const [showAll, setShowAll] = useState(true);
    const [content, setContent] = useState({});
    const [contentBackUp, setContentBackUp] = useState({});
    const [searchText, setSearchText] = useState("");

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

            <Flex my="40px" minWidth="max-content" alignItems="center" gap="2" className="game_section_title">
                <Box p="2">
                    <Heading variant="sectionTitle">{content.name}</Heading>
                </Box>
                <Spacer />
                
                <Box width={"250px"} right="0">
                            <Search searchText={setSearchText}></Search>
                        </Box>
                <Box
                    display={{
                        base: "none",
                        md: "flex"
                    }}
                    pos="relative"
                    right="0"
                >
                    <Link
                        _focus={{ border: "none", boxShadow: "none" }}
                        _hover={{ textDecoration: "none" }}
                        href={process.env.NEXT_PUBLIC_SITE_URL + "/games"}
                    >
                        <Text
                            color="white"
                            fontFamily="Blanch"
                            fontSize={["0.9em", "1em", "1.5em", "2em", "2em"]}
                        >Back</Text>
                    </Link>
                </Box>
            </Flex>

            {showAll ? (
                <Wrap m="auto !important">
                    {content?.contestmasters?.data
                        .sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem mb="2%!important">
                                <GamesCard
                                    style={{ mr: "5px" }}
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
