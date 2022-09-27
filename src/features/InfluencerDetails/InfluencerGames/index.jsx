import React, { useState } from "react";
import { Box, Text, WrapItem, Wrap } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import GamesCard from "./InfluencerGameCard/index";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";

const InfluencerGame = ({ contestmasters }) => {
    const ref = React.useRef();
    const [showAll, setShowAll] = useState(false);
    return (
        <Box>
            {contestmasters?.data.length === 0 ? (
                <Text mt="20px" color="white">
                    Coming soon..{" "}
                </Text>
            ) : (
                <>
                    <Box>
                        {showAll ? (
                            <Wrap m="auto !important">
                                {contestmasters?.data.map((cm, index) => (
                                    <WrapItem
                                        m="auto !important"
                                        mb="2%!important"
                                    >
                                        <GamesCard
                                            style={{ mr: "24px" }}
                                            itemId={`item-${index}`}
                                            key={`item-${index}`}
                                            contestmaster={cm}
                                            sectionName={
                                                cm.contest_section?.data?.name
                                            }
                                        />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        ) : (
                            <ScrollMenu
                                className="no-scrollbar"
                                apiRef={ref}
                                LeftArrow={LeftArrow}
                                RightArrow={RightArrow}
                            >
                                {contestmasters?.data.map((cm, index) => (
                                    <GamesCard
                                        style={{ mr: "24px" }}
                                        itemId={`item-${index}`}
                                        key={`item-${index}`}
                                        contestmaster={cm}
                                        sectionName={
                                            cm.contest_section?.data?.name
                                        }
                                    />
                                ))}
                            </ScrollMenu>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default InfluencerGame;
