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
    Button,
    Tooltip,
    Image
} from "@chakra-ui/react";
import GamesCard from "../../InfluencerDetails/InfluencerGames/InfluencerGameCard";
import { useState, useEffect } from "react";
import Search from "../../Influencers/components/Search";
import Link from "next/link";

const GamesCategories = ({ isMobileDevice, section, pageOptions, nextPage, previousPage, currentPage }) => {

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
                <Link
                        _focus={{ border: "none", boxShadow: "none" }}
                        _hover={{ textDecoration: "none" }}
                        href={process.env.NEXT_PUBLIC_SITE_URL + "/games"}
                    >
                        <Text
                            color="white"
                            fontFamily="Blanch"
                            fontSize={["0.9em", "1em", "1.5em", "2em", "2em"]}
                            display={"block"}
                            cursor={"pointer"}
                            textAlign={"right"}
                            pr="25px"
                            textDecoration={"underline"}
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
            {pageOptions !== 1 && <>
                <Flex
                justifyContent="space-around"
                mt={20}
                mb={4}
                ml="auto"
                mr="auto"
                width={["75%","75%","50%"]}
                alignItems="center"
            >
                <Flex key="paginator">
                    <Tooltip key="tootltip" label="Previous Page">
                        {currentPage === 1 ? <Image
                            src="/assets/designupdate1/arrow-left-unselected.png"
                            alt="Right"
                            width={100}
                            height={100}
                        /> : <Image
                            src="/assets/designupdate1/arrow-left-selected.png"
                            alt="Right"
                            onClick={previousPage}
                            width={100}
                            height={100}
                            cursor={"pointer"}
                        />
                    }
                    </Tooltip>
                </Flex>

                <Flex alignItems="center" key="paginator2">
                    <Text
                        key="pagetext"
                        flexShrink="0"
                        color="white"
                        mr={8}
                        fontSize={21}
                    >
                        Page{" "}
                        <Text key="pagetext1" fontWeight="bold" as="span">
                            {currentPage}
                        </Text>{" "}
                        of{" "}
                        <Text key="pagetext2" fontWeight="bold" as="span">
                            {pageOptions}
                        </Text>
                    </Text>
                </Flex>

                <Flex key="righticon">
                    <Tooltip label="Next Page" key="righticon1">
                        {currentPage !== pageOptions ? <><Image
                            src="/assets/designupdate1/arrow-right-selected.png"
                            alt="Right"
                            onClick={nextPage}
                            width={100}
                            height={100}
                            cursor={"pointer"}
                        /> </>:<>
                        <Image
                            src="/assets/designupdate1/arrow-right-unselected.png"
                            alt="Right"
                            width={100}
                            height={100}
                        /> </>
                        }
                    </Tooltip>
                </Flex>
            </Flex>
            </>
            }
            
        </Box>
        
    );
};

export default GamesCategories;