import {
    Text,
    Button,
    Flex,
    Box,
    Spacer,
    HStack,
    Popover,
    PopoverTrigger,
    Link
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Image from "next/image";
// import NextShare from "../../../../utils/socialbuttons";
import { useInView } from "react-intersection-observer";

import * as ga from "../../../../services/googleAnalytics";
import dynamic from "next/dynamic";

const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));

const cardWidth= "380px";
const cardHeight = "560px";
const infoboxWidth= "340px";
const imageHeight = "510px";

const CardInfo = ({ nft }) => {
    return (
        <Box
            pl={"20px"}
            pr={"20px"}
            
            key={`nftItem-${nft?.id}`}
            bg="#00000088"
            border='1px' borderColor='gray.600'
            position={"absolute"}
            bottom={"0px"}
            width= {infoboxWidth}
            ml="20px"
            p={"20px"}
        >
            <Text
                noOfLines={2}
                fontWeight="bold"
                minH="50px"
                color="white"
                fontFamily="Sora"
            >
                {nft?.name}
            </Text>

            <Flex
                mt={"3%!important"}
                justifyContent="center"
                m={0}
                p={0}
                color="white"
                fontSize={20}
            >
                <Box textAlign={"left"}>
                    
                    <Text >
                        {nft?.isAuction ? "Last Bid" : "PRICE: "}
                    </Text>
                    {"    "}
                </Box>
               
                <Text
                   ml="15px"
                   mr= "15px"
                    fontWeight="bold"
                >
                    {nft?.market_price
                        ? " " + nft?.market_price
                        : "US $" + nft?.sale_price}
                </Text>
                <Image
                    alt="Remaining Time"
                    objectFit="contain"
                    src={
                        nft?.market_price
                            ? "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                            : "/assets/nfts/money.svg"
                    }
                    height="16"
                    width="16"
                />

            </Flex>

            <Link
                href={nft?.marketURL ? nft?.marketURL : "/"}
                target="_blank"
                _focus={{ border: "none", textDecoration: "none" }}
                _hover={{ textDecoration: "none" }}

            >
                <Button className="influencer-card-btn" fontSize={20} width="90%" mt="10px">
                    BUY NOW
                </Button>
            </Link>
        </Box>
    );
};

const NftCard = ({
    nft,
    showInfo = false,
    lazyRoot = null,
    defaultInView = false
}) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: defaultInView,
        triggerOnce: true
    });
    const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

    const toBase64 = (str) =>
        typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str);

    const handleClick = (e) => {
        e.preventDefault();
        ga.eventTracking({
            action: "Nft card " + nft.slug + "is clicked",
            params: {
                nft_card: nft.slug
            }
        });
        router.push({
            pathname: "/nfts/[id]",
            query: { id: nft.slug }
        });
    };

    const nftImage = (img) => { return  (<Image
    layout="intrinsic"
    objectFit={"cover"}
    //  blurDataURL={nft.front_image}
    blurDataURL={`data:image/svg+xml;base64,${toBase64(
        convertImage(cardWidth, imageHeight)
    )}`}
    placeholder="blur"
    height={imageHeight}
    width={cardWidth}
    alt={"nft_front" + nft?.id}
    title={nft?.name}
    src={img}
    cursor="pointer"
    quality={50}
    lazyRoot={lazyRoot}
/>)};

    
    return (
        nft && (
            <Link
                href={nft?.marketURL ? nft?.marketURL : "/"}
                target="_blank"
                passHref={true}
                _hover={{ textDecoration: "none" }}
                _focus={{ border: "none", textDecoration: "none" }}
                cursor="pointer"
            >
                <Box
                    // m="auto"
                    // p="3%"
                    mr={"30px"}
                    textAlign="center"
                    w={cardWidth}
                    h={showInfo ? cardHeight : imageHeight}
                    minH={showInfo ? cardHeight : imageHeight}
                    onMouseEnter={() => setIsFlipped(true)}
                    onMouseLeave={() => setIsFlipped(false)}
                >
                    <Box h={cardHeight} minH={cardHeight} ref={ref}>
                        {inView && (
                            <ReactCardFlip
                                isFlipped={
                                    nft?.back_image && nft?.back_image.length
                                        ? isFlipped
                                        : false
                                }
                                flipDirection={"horizontal"}
                                infinite={true}
                            >
                                <Box cursor="pointer">
                                    <Box
                                        _focus={{
                                            border: "none",
                                            textDecoration: "none"
                                        }}
                                        height={imageHeight}
                                        padding={"3%"}
                                        width={cardWidth}
                                    >
                                        {nft?.front_image?.indexOf(".mp4") >
                                            0 && (
                                            <video
                                                className="lazy"
                                                playsinline
                                                key={nft?.id}
                                                id={"background-video" + nft.id}
                                                loop
                                                autoPlay
                                                muted
                                                style={{
                                                    height: "100%",
                                                    width: "full",
                                                    objectFit: "cover"
                                                }}
                                            >
                                                <source
                                                    src={nft?.front_image}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                the Video NFT.
                                            </video>
                                        )}
                                        {nft?.front_image?.indexOf(".mp4") <
                                            0 && 
                                            nftImage(nft.front_image)
                                        }
                                    </Box>
                                </Box>
                                <Box cursor="pointer">
                                    <Box
                                        _focus={{
                                            border: "none",
                                            textDecoration: "none"
                                        }}
                                        padding="3%"
                                        height={imageHeight}
                                        width={cardWidth}
                                    >
                                        {nft?.back_image?.indexOf(".mp4") >
                                            0 && (
                                            <video
                                                className="lazy"
                                                playsinline
                                                key={nft.id}
                                                id={"background-video" + nft.id}
                                                loop
                                                autoPlay
                                                muted
                                                style={{
                                                    height: "100%",
                                                    width: "full",
                                                    objectFit: "cover"
                                                }}
                                            >
                                                <source
                                                    src={nft?.back_image}
                                                    type="video/mp4"
                                                />
                                                Your browser does not support
                                                the Video NFT.
                                            </video>
                                        )}
                                        {nft?.back_image?.indexOf(".mp4") < 0 &&
                                            isFlipped && (
                                              nftImage(nft.back_image)
                                            )}
                                    </Box>
                                </Box>
                            </ReactCardFlip>
                        )}
                        {showInfo && <CardInfo nft={nft} />}
                    </Box>

                    
                </Box>
            </Link>
        )
    );
};

export default NftCard;
