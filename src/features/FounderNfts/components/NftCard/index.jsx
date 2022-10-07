import {
    Text,
    Button,
    Flex,
    Box,
    HStack,
    Link
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Image from "next/image";

const CardInfo = ({ nft }) => {
    return (
        <Box px="0px" key={`nftItem-${nft?.id}`}>
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
                        <Link href={nft.marketURL}>
                            <Button>BUY ON OPENSEA</Button>
                        </Link>
                    </Flex>
                </>
            )}

            {!nft?.isAuction && (
                <>
                    <Flex justify="space-between" flexDir={"row"}>
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
                        <Link href={nft.marketURL}>
                            <Button>BUY ON OPENSEA</Button>
                        </Link>
                    </Flex>
                </>
            )}
        </Box>
    );
};

const NftCard = ({ nft, isMobileDevice, showInfo = false }) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);
    const heightVal = isMobileDevice && !showInfo ? "200px" : "400px";
    const widthVal = isMobileDevice && !showInfo ? "200px" : "300px";

    const handleClick = (e) => {
        e.preventDefault();
        router.push({
            pathname: "/nfts/[id]",
            query: { id: nft.slug }
        });
    };

    return (
        <Box
            cursor="pointer"
            m="auto"
            textAlign="center"
            w={[
                showInfo ? "300px" : "200px",
                showInfo ? "300px" : "200px",
                showInfo ? "300px" : "200px",
                "300px"
            ]}
            h={[
                showInfo ? "520px" : "200px",
                showInfo ? "520px" : "200px",
                showInfo ? "520px" : "200px",
                showInfo ? "520px" : "420px"
            ]}
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
                h={showInfo && !isMobileDevice ? "400px" : "200px"}
            >
                <Link
                    href={"/nfts/" + nft?.slug}
                    passhref="true"
                    _focus={{ border: "none" }}
                >
                    {nft.front_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={nft.id}
                            id={"background-video" + nft.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: heightVal, width: "100%" }}
                        >
                            <source src={nft.front_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}

                    {nft.front_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height={heightVal}
                            width={widthVal}
                            alt="alt"
                            objectFit={"cover"}
                            title={nft?.name}
                            src={nft.front_image}
                            cursor="pointer"
                        />
                    )}
                </Link>
                <Link
                    href={"/nfts/" + nft?.slug}
                    passhref="true"
                    _focus={{ border: "none" }}
                >
                    {nft?.back_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={nft.id}
                            id={"background-video" + nft.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: heightVal, width: "100%"  }}
                        >
                            <source src={nft?.back_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}

                    {nft?.back_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height={heightVal}
                            width={widthVal}
                            alt="nft"
                            objectFit={"cover"}
                            title={nft?.name}
                            src={nft?.back_image}
                            cursor="pointer"
                            onClick={handleClick}
                        />
                    )}
                </Link>
            </ReactCardFlip>

            {showInfo && <CardInfo nft={nft} />}
        </Box>
    );
};

export default NftCard;
