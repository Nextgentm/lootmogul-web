import {
    Text,
    Flex,
    Box,
    Spacer,
    HStack,
    Popover,
    PopoverTrigger
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));

const CardInfo = ({ nft }) => {
    return (
        <Box pl={"20px"} pr={"20px"} key={`nftItem-${nft?.id}`}>
            <Text
                noOfLines={2}
                fontWeight="bold"
                color="white"
                fontFamily="Sora"
            >
                {nft?.name}
            </Text>

            <Flex justifyContent="space-between" m={0} p={0}>
                <Text color="#7C7C7C">
                    {nft?.isAuction ? "Last Bid" : "Price"}
                </Text>

                <Text color="#7C7C7C">
                    {nft.avail}/{nft.count}
                </Text>
            </Flex>

            {nft?.isAuction && (
                <>
                    <Flex flexDir={"row"}>
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={
                                    nft?.market_price
                                        ? "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                                        : "/assets/nfts/money.svg"
                                }
                                height="16px"
                                width="16px"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                                {nft?.market_price
                                    ? " " + nft?.market_price
                                    : "US $" + nft?.sale_price}
                            </Text>
                        </HStack>
                        <Spacer />
                        <HStack>
                            <Box cursor="pointer" position="relative" my={4}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Image
                                            alt="Share"
                                            objectFit="contain"
                                            src="/assets/nfts/share.svg"
                                            layout="fill"
                                        />
                                    </PopoverTrigger>
                                    <NextShare
                                        link={
                                            process.env.NEXT_BASE_URL + "/nfts/" +
                                            nft?.id
                                        }
                                        caption={
                                            "Check out this NFT collection for " +
                                            nft?.name
                                        }
                                        hashtag="lootmogul"
                                    ></NextShare>
                                </Popover>
                            </Box>

                            <Box
                                cursor="pointer"
                                height="24px"
                                position="relative"
                                my={4}
                            >
                                <Image
                                    alt="Favorite"
                                    objectFit="contain"
                                    src="/assets/nfts/favorite.svg"
                                    height="22px"
                                    width="22px"
                                />
                            </Box>
                        </HStack>
                    </Flex>
                </>
            )}

            {!nft?.isAuction && (
                <>
                    <Flex flexDir={"row"}>
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={
                                    nft?.market_price
                                        ? "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                                        : "/assets/nfts/money.svg"
                                }
                                height="16px"
                                width="16px"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                                {nft?.market_price
                                    ? " " + nft?.market_price
                                    : "US $" + nft?.sale_price}
                            </Text>
                        </HStack>
                        <Spacer />
                        <HStack>
                            <Box cursor="pointer" position="relative" my={4}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Image
                                            alt="Share"
                                            objectFit="contain"
                                            src="/assets/nfts/share.svg"
                                            layout="fill"
                                        />
                                    </PopoverTrigger>
                                    <NextShare
                                        link={
                                            process.env.NEXT_BASE_URL + "/nfts/" +
                                            nft?.id
                                        }
                                        caption={
                                            "Check out this NFT collection for " +
                                            nft?.name
                                        }
                                        hashtag="lootmogul"
                                    ></NextShare>
                                </Popover>
                            </Box>

                            <Box
                                cursor="pointer"
                                height="24px"
                                position="relative"
                                my={4}
                            >
                                <Image
                                    alt="Favorite"
                                    objectFit="contain"
                                    src="/assets/nfts/favorite.svg"
                                    height="22px"
                                    width="22px"
                                />
                            </Box>
                        </HStack>
                    </Flex>
                </>
            )}
        </Box>
    );
};

const NftCard = ({ nft, showInfo = false }) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Box
            cursor="pointer"
            m="auto"
            textAlign="center"
            w={"300px"}
            h={showInfo ? "520px" : "420px"}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <ReactCardFlip
                isFlipped={
                    nft?.back_image && nft?.back_image.length
                        ? isFlipped
                        : false
                }
                flipDirection={"horizontal"}
                infinite={true}
                h={"400px"}
            >
                <Box cursor="pointer">
                    {nft.front_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={nft.id}
                            id={"background-video" + nft.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: "400px", width: "100%"  }}
                        >
                            <source src={nft.front_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}
                    {nft.front_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height="400px"
                            width={"300px"}
                            objectFit={"cover"}
                            alt="nft-image"
                            title={nft?.name}
                            src={nft.front_image}
                            cursor="pointer"
                        />
                    )}
                </Box>
                <Box cursor="pointer">
                    {nft?.back_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={nft.id}
                            id={"background-video" + nft.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: "400px", width: "100%"  }}
                        >
                            <source src={nft?.back_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}
                    {nft?.back_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height="400px"
                            width={"300px"}
                            objectFit={"cover"}
                            alt="nft-image"
                            title={nft?.name}
                            src={nft?.back_image}
                            cursor="pointer"
                        />
                    )}
                </Box>
            </ReactCardFlip>

            {showInfo && <CardInfo nft={nft} />}
        </Box>
    );
};

export default NftCard;
