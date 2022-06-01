import React, { useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import TrendingGamesCard from "./TrendingGamesCard/index";

// import { useTrendingContests } from "../../api/index";
import ContentNavigator from "../../../../components/ContentNavigator";
import { AppContext } from "../../../../utils/AppContext";
import { useRouter } from "next/router";

const TrendingGames = ({data}) => {
    // const { data = [] } = useTrendingContests();

    const { isMobileDevice } = useContext(AppContext);
    const ref = React.useRef();
    const router = useRouter();

    return (
        <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">
            <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px", "58px"]}>
                Favorite Contests
                </Text>

                <ContentNavigator
                    showArrows={!isMobileDevice}
                    handleLeftArroeClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={() => {router.push("/games")}}
                    
                />
            </Flex>
            {/* {isMobileDevice ? (
                <Flex>
                    {data.length &&
                        data
                            .slice(0, Math.min(2, data.length))
                            .map((contestmaster, index) => (
                                <TrendingGamesCard
                                    style={{
                                        flex: 1,
                                        ml: index > 0 ? "8px" : 0,
                                        mr: index === 0 ? "8px" : 0
                                    }}
                                    itemId={`item-${index}`}
                                    key={`item-${index}`}
                                    contestmaster={contestmaster}
                                />
                            ))}
                </Flex>
            ) : ( */}
                <ScrollMenu className="no-scrollbar" apiRef={ref}>
                    {data?.length && data.map((contestmaster, index) => (
                        <TrendingGamesCard
                            style={{ mr: "24px", w: "170px" }}
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            contestmaster={contestmaster}
                        />
                    ))}
                </ScrollMenu>
            {/* )} */}
        </Box>
    );
};

export default TrendingGames;
