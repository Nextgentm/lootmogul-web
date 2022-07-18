import React, { useContext } from "react";

import { Box, Text, Flex } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ContentNavigator from "../../../../components/ContentNavigator";
import FeaturedInfluencersCard from "./FeaturedInfluencersCard";
// import { useFeaturedInfluencers } from "../../api/index";
import { AppContext } from "../../../../utils/AppContext";
import { useRouter } from "next/router";

const FeaturedInfluencers = ({data=[]}) => {
    // const { data = [] } = useFeaturedInfluencers();

    const { isMobileDevice } = useContext(AppContext);

    const router = useRouter();

    const ref = React.useRef();
    return (
        <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">
            <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px", "58px"]}>
                Trending Influencers
                </Text>

                <ContentNavigator
                    showArrows={!isMobileDevice}
                    handleLeftArrowClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={() => router.push("/influencers")}
                />
            </Flex>

            {/* {isMobileDevice ? (
                <Flex>
                    {data.length &&
                        data
                            .map((influencer, index) => (
                                <FeaturedInfluencersCard
                                    style={{
                                        flex: 1,
                                        ml: index > 0 ? "8px" : 0,
                                        mr: index === 0 ? "8px" : 0
                                    }}
                                    itemId={`item-${index}`}
                                    key={`item-${index}`}
                                    influencer={influencer}
                                />
                            ))}
                </Flex>
            ) : ( */}
                <ScrollMenu className="no-scrollbar" apiRef={ref}>
                    {data?.length && data.map((influencer, index) => (
                        <FeaturedInfluencersCard
                            style={{ mr: "24px", w: "175px" }}
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            influencer={influencer}
                        />
                    ))}
                </ScrollMenu>
            {/* )} */}
        </Box>
    );
};

export default FeaturedInfluencers;
