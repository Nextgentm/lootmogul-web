import {
    Box,
    Text,
    WrapItem,
    Wrap,
    Image,
    Flex,
    Link,
    Button
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "../NftCard";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import {
    LeftArrow,
    RightArrow
} from "../../../../components/ContentNavigator/arrows";

const NftCardList = ({ data, isSale = true }) => {
    const ref = useRef();
    const lazyRoot = useRef(null);
    const [showAll, setShowAll] = useState(true);

    const CardInfo = ({ nft }) => {
        return (
            <Box
                key={`nftItem-${nft?.id}`}
                width={"260px"}
                mt="-25px"
                mx={"15px"}
                className="cardInfoClass"
            >
                <Text
                    noOfLines={2}
                    fontWeight="bold"
                    minH="25px"
                    color="white"
                    fontFamily="Sora"
                >
                    {nft?.name}
                </Text>

                {nft?.market_price && (
                    <Flex
                        mt={"3%!important"}
                        justifyContent="center"
                        m={0}
                        p={0}
                        color="white"
                        fontSize={20}
                    >
                        <Box textAlign={"left"}>
                            <Text>
                                {nft?.isAuction ? "Last Bid" : "PRICE: "}
                            </Text>
                            {"    "}
                        </Box>

                        <Text ml="15px" mr="6px" fontWeight="bold">
                            {nft?.market_price
                                ? " " + nft?.market_price + " ETH"
                                : "US $" + nft?.sale_price}
                        </Text>
                        <Image
                            alt="Remaining Time"
                            objectFit="contain"
                            mt="5px"
                            src={
                                "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                            }
                            height="22px"
                            width="22px"
                        />
                        <Box
                            w="24px"
                            h="24px"
                            border={"1px"}
                            borderColor="#ffffff44"
                            mt={"5px"}
                            mr={"6px"}
                            ml={"2px"}
                        >
                            <Image
                                m="auto"
                                h="100%"
                                w="100%"
                                alt="like"
                                src="/assets/designupdate1/games_like_icon.svg"
                            />
                        </Box>
                        <Box
                            w="24px"
                            h="24px"
                            border={"1px"}
                            borderColor="#ffffff44"
                            mt={"5px"}
                        >
                            <Image
                                m="auto"
                                h="100%"
                                w="100%"
                                alt="share"
                                src="/assets/designupdate1/games_share_icon.svg"
                            />
                        </Box>
                    </Flex>
                )}
                <Link
                    href={nft?.marketURL ? nft?.marketURL : "/"}
                    target="_blank"
                    _focus={{ border: "none", textDecoration: "none" }}
                    _hover={{ textDecoration: "none" }}
                >
                    <Button
                        className="influencer-card-btn"
                        fontSize={20}
                        width="270px"
                        mt="10px"
                        mb={"20px"}
                    >
                        BUY NOW
                    </Button>
                </Link>
            </Box>
        );
    };

    const { isMobileDevice } = useContext(AppContext);
    return (
        <Box width="100%" mt={"30px"}>
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
                                        <Box>
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
                                            />
                                            <Image
                                                layout="fill"
                                                w={["296px"]}
                                                h={["418px"]}
                                                mt={"-450px"}
                                                ml={"-12px"}
                                                pos={"absolute"}
                                                src="/assets/side_Frame.png"
                                            />
                                            <CardInfo nft={item} />
                                        </Box>
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
                                        showInfo={true}
                                        lazyRoot={lazyRoot}
                                        defaultInView={
                                            isMobileDevice
                                                ? index < 2
                                                : index < 5
                                        }
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
