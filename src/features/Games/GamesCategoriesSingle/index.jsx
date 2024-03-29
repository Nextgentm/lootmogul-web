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

const GamesCategories = ({ isMobileDevice, section, pageOptions, nextPage, previousPage, currentPage, setSearchText }) => {

    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
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
                        href={"/games"}
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

            {content?.contestmasters?.data.length > 0 ? (
                <Wrap m="auto !important">
                    {content?.contestmasters?.data
                        //.sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem mb="2%!important" display={["contents","contents","contents","flex"]}>
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
                <Box>
                    <Text
                        fontSize="1xl"
                        color={"white"}
                        fontFamily={"Sora"}
                        textAlign={"center"}
                    >
                        No Record found
                    </Text>
                </Box>
            )}
            {pageOptions !== 1 && content?.contestmasters?.data.length && <>
                <Flex
                    justifyContent="space-around"
                    mt={20}
                    mb={4}
                    ml="auto"
                    mr="auto"
                    width={["75%", "75%", "50%"]}
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
                            /> </> : <>
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