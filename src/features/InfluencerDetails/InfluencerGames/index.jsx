import React, { useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import ContentNavigator from "../../../components/ContentNavigator";
import GamesCard from "./InfluencerGameCard/index";

const InfluencerGame = ({ contestmasters }) => {
    const ref = React.useRef();

    return (
        <Box mt="30px">
            <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text color="white" fontFamily="Blanch" fontSize="32px">
                    Games
                </Text>

                <ContentNavigator
                    showViewAll={false}
                    showArrows={contestmasters?.data.length > 5}
                    handleLeftArrowClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                />
            </Flex>

            <ScrollMenu className="no-scrollbar" apiRef={ref}>
                {contestmasters?.data.map((cm, index) => (
                    <GamesCard
                        style={{ mr: "24px" }}
                        itemId={`item-${index}`}
                        key={`item-${index}`}
                        contestmaster={cm}
                        sectionName={cm.contest_section?.data?.name}
                    />
                ))}
            </ScrollMenu>
        </Box>
    );
};

export default InfluencerGame;
