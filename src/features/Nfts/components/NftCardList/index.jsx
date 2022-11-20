import { Box, Text, WrapItem, Wrap, useMediaQuery } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "../NftCard";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import {
    LeftArrow,
    RightArrow
} from "../../../../components/ContentNavigator/arrows";
import { useWindowWidth } from "@react-hook/window-size";

const NftCardList = ({ data, isSale = true }) => {
    const ref = useRef();
    const lazyRoot = useRef(null);
    const [showAll, setShowAll] = useState(true);
    const { isMobileDevice } = useContext(AppContext);
    const [isMobile] = useMediaQuery("(max-width:768px)");
    const [isAvgLaptopDevice] = useMediaQuery("(max-width: 1366px)");
    const [isAvgDeskDevice] = useMediaQuery("(max-width: 1440px)");
    const [isLargeDesk] = useMediaQuery("(max-width: 1920px)");
    const [isLargeAndAbove] = useMediaQuery("(max-width: 2560px)");
    const [spacing, setSpacing] = useState("");
    const [marBottom, setMarBottom] = useState("30px");
    const [cardWidth, setCardWidth] = useState("300px");
    const onlyWidth = useWindowWidth();

    useEffect(() => {
        if (isMobile) {
            if (onlyWidth === 720) {
                setSpacing("0px");
                setCardWidth("550px");
            } else {
                setSpacing("0px");
            }
        } else if (isAvgLaptopDevice) {
            setSpacing("150px");
            setMarBottom("-70px")
        } else if (isAvgDeskDevice) {
            setSpacing("20px");
        } else if (isLargeDesk) {
            setSpacing("57px");
        } else if (isLargeAndAbove) {
            setSpacing("45px");
        } else {
            setSpacing("20px");
        }
    });

    return (
        <Box width="100%">
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
                        <Wrap m="auto !important" spacing={spacing}>
                            {data
                                .filter((item) => (isSale ? item.isSale : true))
                                .sort((a, b) => a.priority - b.priority)
                                .map((item, index) => (
                                    <WrapItem w={"300px"}>
                                        <NftCard
                                            nft={item}
                                            itemId={`nftcard-${index}`}
                                            key={`nftcard-${index}`}
                                            showInfo={true}
                                            lazyRoot={lazyRoot}
                                            defaultInView={
                                                isMobileDevice
                                                    ? index < 2
                                                    : index < 5
                                            }
                                            marBottom={marBottom}
                                            cardWidth={cardWidth}
                                        />
                                    </WrapItem>
                                ))}
                        </Wrap>
                    ) : (
                        <ScrollMenu
                            className="no-scrollbar"
                            ref={lazyRoot}
                            apiRef={ref}
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                        >
                            {data
                                .filter((item) => (isSale ? item.isSale : true))
                                .sort((a, b) => a.priority - b.priority)
                                .map((item, index) => (
                                    <NftCard
                                        nft={item}
                                        itemId={`nftcard-${index}`}
                                        key={`nftcard-${index}`}
                                        lazyRoot={lazyRoot}
                                        defaultInView={
                                            isMobileDevice
                                                ? index < 2
                                                : index < 5
                                        }
                                        marBottom={marBottom}
                                        cardWidth={cardWidth}
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
