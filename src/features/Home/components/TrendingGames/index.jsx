import React, { useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import TrendingGamesCard from "./TrendingGamesCard/index";

import ContentNavigator from "../../../../components/ContentNavigator";
import { AppContext } from "../../../../utils/AppContext";
import { useRouter } from "next/router";

const TrendingGames = ({data}) => {

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
                    handleLeftArrowClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={() => {router.push("/games")}}
                    
                />
            </Flex>
          
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
          
        </Box>
    );
};

export default TrendingGames;
