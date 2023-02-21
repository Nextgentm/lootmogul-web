import {
    Text,
    Button,
    Flex,
    Box,
    Image,
    Link,
    Grid,
    GridItem,
    VStack,
} from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { memo, useCallback, useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useMemo } from "react";

// const cardWidth = "550px";
const cardHeight = "440px";
const imageHeight = "370px";

const Div = styled.div`
    --b: 8px; /* thickness of the border */
    --c: #e90a63; /* color of the border */
    --w: 60px; /* width of border */

    padding: var(--b); /* space for the border */

    position: relative;
    /*Irrelevant code*/
    width: 300px;
    height: 400px;
    box-sizing: border-box;
    margin: 0px;
    display: inline-flex;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    text-align: center;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--c, transparent);
        padding: var(--b);
        border-radius: var(--r);
        -webkit-mask: linear-gradient(0deg, #000 calc(2 * var(--b)), #0000 0)
                50% var(--b) / calc(100% - 2 * var(--w)) 100% repeat-y,
            linear-gradient(-90deg, #000 calc(2 * var(--b)), #0000 0) var(--b)
                50%/100% calc(100% - 2 * var(--w)) repeat-x,
            linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }
`;
const CollectibleCard = memo(({
    nft,
    showInfo = false,
    lazyRoot = null,
    defaultInView = false,
    marBottom,
    cardWidth
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { isMobileDevice } = useContext(AppContext);

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

    const nftImage = useCallback((img) => {
        return (
            <>
                <Image
                    layout="intrinsic"
                    objectFit={"cover"}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        convertImage(300, 400)
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
                />
            </>
        );
    },[]);

    return (
        nft && (
            <>
                {" "}
                <Grid>
                    <GridItem>
                        {" "}
                        <Link
                            href={nft?.marketURL ? nft?.marketURL : "/"}
                            target="_blank"
                            mx="auto"
                            passhref="true"
                            _hover={{ textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            cursor="pointer"
                            // mr={["10px", "30px", "30px"]}
                            w={cardWidth}
                            h={showInfo ? cardHeight : imageHeight}
                            minH={showInfo ? cardHeight : imageHeight}
                        >
                            <Box
                                textAlign="center"
                                onMouseEnter={() => setIsFlipped(true)}
                                onMouseLeave={() => setIsFlipped(false)}
                                marginBottom="-25px"
                            >
                                <Box h={cardHeight} minH={cardHeight} ref={ref}>
                                    {inView && (
                                        <ReactCardFlip
                                            isFlipped={
                                                nft?.back_image &&
                                                    nft?.back_image.length
                                                    ? isFlipped
                                                    : false
                                            }
                                            flipDirection={"horizontal"}
                                            infinite={true}
                                        >
                                            <Box cursor="pointer">
                                                <Div>
                                                    <Box
                                                        _focus={{
                                                            border: "none",
                                                            textDecoration:
                                                                "none"
                                                        }}
                                                        height={imageHeight}
                                                        width={cardWidth}
                                                    >
                                                        {nft?.front_image?.indexOf(
                                                            ".mp4"
                                                        ) > 0 && (
                                                                <video
                                                                    className="lazy"
                                                                    playsinline
                                                                    key={nft?.id}
                                                                    id={
                                                                        "background-video" +
                                                                        nft.id
                                                                    }
                                                                    loop
                                                                    autoPlay
                                                                    muted
                                                                    style={{
                                                                        height: "100%",
                                                                        width: "100%",
                                                                        objectFit:
                                                                            "fill"
                                                                    }}
                                                                >
                                                                    <source
                                                                        src={
                                                                            nft?.front_image
                                                                        }
                                                                        type="video/mp4"
                                                                    />
                                                                    Your browser
                                                                    does not support
                                                                    the Video NFT.
                                                                </video>
                                                            )}
                                                        {nft?.front_image?.indexOf(
                                                            ".mp4"
                                                        ) < 0 &&
                                                            nftImage(
                                                                nft.front_image
                                                            )}
                                                    </Box>
                                                </Div>
                                            </Box>
                                            <Box cursor="pointer">
                                                <Div>
                                                    <Box
                                                        _focus={{
                                                            border: "none",
                                                            textDecoration:
                                                                "none"
                                                        }}
                                                        height={imageHeight}
                                                        width={cardWidth}
                                                    >
                                                        {nft?.back_image?.indexOf(
                                                            ".mp4"
                                                        ) > 0 && (
                                                                <video
                                                                    className="lazy"
                                                                    playsInline
                                                                    key={nft.id}
                                                                    id={
                                                                        "background-video" +
                                                                        nft.id
                                                                    }
                                                                    loop
                                                                    autoPlay
                                                                    muted
                                                                    style={{
                                                                        height: "100%",
                                                                        width: "100%",
                                                                        objectFit:
                                                                            "fill"
                                                                    }}
                                                                >
                                                                    <source
                                                                        src={
                                                                            nft?.back_image
                                                                        }
                                                                        type="video/mp4"
                                                                    />
                                                                    Your browser
                                                                    does not support
                                                                    the Video NFT.
                                                                </video>
                                                            )}
                                                        {nft?.back_image?.indexOf(
                                                            ".mp4"
                                                        ) < 0 &&
                                                            isFlipped &&
                                                            nftImage(
                                                                nft.back_image
                                                            )}
                                                    </Box>
                                                </Div>
                                            </Box>
                                        </ReactCardFlip>
                                    )}
                                </Box>
                            </Box>
                            <GridItem colSpan={5} mb={marBottom}>
                                <Box
                                    w="100%"
                                    bg="#e3e3e3"
                                    display={["none", "none", "none", "block"]}
                                />
                                <VStack>

                                    <div
                                        style={{
                                            width: cardWidth,
                                            height: "50px",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontFamily: "Sora",
                                            textAlign: isMobileDevice ? "center" : "center",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        >
                                        <span style={{ margin: "0 3px" }}>{nft?.name}</span>
                                    </div>

                                    {nft?.market_price && (
                                        <Flex style={{ margin: "0 10px" }}
                                            mt={"3%!important"}
                                            justifyContent="center"
                                            m={0}
                                            p={0}
                                            color="white"
                                            fontSize={20}
                                        >
                                            <Box textAlign={"left"}>
                                                <Text>
                                                    {nft?.isAuction
                                                        ? "Last Bid"
                                                        : "PRICE: "}
                                                </Text>
                                                {"    "}
                                            </Box>

                                            <Text
                                                ml="15px"
                                                mr="6px"
                                                fontWeight="bold"
                                            >
                                                {nft?.market_price
                                                    ? " " + nft?.market_price
                                                    : "US $" +
                                                    nft?.sale_price}{" "}
                                                ETH
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
                                        href={
                                            nft?.marketURL
                                                ? nft?.marketURL
                                                : "/"
                                        }
                                        target="_blank"
                                        _focus={{
                                            border: "none",
                                            textDecoration: "none"
                                        }}
                                        _hover={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            className="influencer-card-btn"
                                            fontSize={12}
                                            size={"md"}
                                            height={"10px"}
                                            width={"300px"}
                                        >
                                            BUY NOW
                                        </Button>
                                    </Link>
                                </VStack>
                            </GridItem>
                        </Link>
                    </GridItem>
                </Grid>
            </>
        )
    );
});

export default CollectibleCard;
