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
import { useRef, useState, useEffect } from "react";
import ViewAllBtn from "../../../components/ViewAllBtn";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";
import Search from "../../Influencers/components/Search";
import structuredClone from "@ungap/structured-clone";

const GamesCategories = ({ isMobileDevice, section }) => {
    const ref = useRef();
    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
    const [showAll, setShowAll] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState({});
    const [contentBackUp, setContentBackUp] = useState({});

    useEffect(() => {
        if (searchText.length >= 3) {
            const clonedData = structuredClone(content);
            clonedData.contestmasters.data =
                content?.contestmasters?.data.filter((x) =>
                    x.name.toLowerCase().includes(searchText.toLowerCase())
                );
            setContent(clonedData);
        } else {
            setContent(contentBackUp);
        }
    }, [searchText]);

    useEffect(() => {
        setContent(section);
        setContentBackUp(section);
    }, [section]);

    return (
        <Box>
            {/* <Flex justify="space-between" my="40px" align="center" w="100%">
                <Heading variant="sectionTitle">{content.name}</Heading>
                {content.name !== "Trending Tournament" ? (
                    <Box width={"250px"} right="0">
                        <Search searchText={setSearchText}></Search>
                    </Box>
                ) : (
                    ""
                )}
                {content?.contestmasters?.data.length > arrowTrashhold ? (
                    <Box
                        display={{
                            base: "none",
                            md: "flex"
                        }}
                        onClick={() => setShowAll(!showAll)}
                        pos="relative"
                        right="0"
                    >
                        <ViewAllBtn />
                    </Box>
                ) : (
                    ""
                )}
            </Flex> */}
            <Flex my="40px" minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                    <Heading variant="sectionTitle">{content.name}</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap="2">
                    {content.name !== "Trending Tournament" ? (
                        <Box width={"250px"} right="0">
                            <Search searchText={setSearchText}></Search>
                        </Box>
                    ) : (
                        ""
                    )}
                    {content?.contestmasters?.data.length > arrowTrashhold ? (
                        <Box
                            display={{
                                base: "none",
                                md: "flex"
                            }}
                            onClick={() => setShowAll(!showAll)}
                            pos="relative"
                            right="0"
                        >
                            <ViewAllBtn />
                        </Box>
                    ) : (
                        ""
                    )}
                </ButtonGroup>
            </Flex>

            {showAll ? (
                <Wrap m="auto !important">
                    {content?.contestmasters?.data
                        .sort((a, b) => a.priority - b.priority)
                        .map((cm, index) => (
                            <WrapItem m="auto !important" mb="2%!important">
                                <GamesCard
                                    style={{ mr: "24px" }}
                                    key={`gamescard-${index}`}
                                    contestmaster={cm}
                                    sectionName={content.name}
                                />
                            </WrapItem>
                        ))}
                </Wrap>
            ) : (
                <>
                    {content?.contestmasters?.data?.length &&
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
                            <Text
                                fontSize="1xl"
                                color={"white"}
                                fontFamily={"Sora"}
                            >
                                No Record found
                            </Text>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default GamesCategories;
