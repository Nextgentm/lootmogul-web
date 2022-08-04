import { Flex, Box, Text, WrapItem, Wrap } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ContentNavigator from "../../../../components/ContentNavigator";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "../NftCard";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
const NftCardList = ({ data, isSale = true }) => {
    const ref = useRef();
    const [showAll, setShowAll] = useState(false);

    const { isMobileDevice } = useContext(AppContext);
    // console.log("showAll",showAll)
    const arrowThreshold = isMobileDevice ? 2 : 5;
    return (
        <Box width="100%">
            <Flex
                width="100%"
                justifyContent="flex-end"
                alignItems="center"
                mb="2%"
            >
                {/* <Text
                    fontFamily="Blanch"
                    fontSize={["28px", "58px"]}
                    color="white"
                >
                    Popular
                </Text> */}

                <ContentNavigator
                    showViewAll={
                        data.length > arrowThreshold && !isMobileDevice
                    }
                    showArrows={data.length > arrowThreshold}
                    handleLeftArrowClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    onViewAllClicked={() => setShowAll(!showAll)}
                />
            </Flex>
            {data.length === 0 ? (
                <Text
                    fontFamily="Blanch"
                    fontSize={["28px", "58px"]}
                    color="white"
                >
                   No Nfts to display..........
                </Text>
            ) : (
                <Box>
                    {showAll ? (
                        <Wrap m="auto !important">
                            {data
                                .filter((item) => (isSale ? item.isSale : true))
                                .sort((a, b) => a.priority - b.priority)
                                .map((item, index) => (
                                    <WrapItem
                                        m="auto !important"
                                        mb="2%!important"
                                    >
                                        <NftCard
                                            nft={item}
                                            itemId={`nftcard-${index}`}
                                            key={`nftcard-${index}`}
                                            showInfo={true}
                                        />
                                    </WrapItem>
                                ))}
                        </Wrap>
                    ) : (
                        <ScrollMenu className="no-scrollbar" apiRef={ref}>
                            {data
                                .filter((item) => (isSale ? item.isSale : true))
                                .sort((a, b) => a.priority - b.priority)
                                .map((item, index) => (
                                    <NftCard
                                        nft={item}
                                        itemId={`nftcard-${index}`}
                                        key={`nftcard-${index}`}
                                        showInfo={true}
                                    />
                                ))}
                        </ScrollMenu>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default NftCardList;