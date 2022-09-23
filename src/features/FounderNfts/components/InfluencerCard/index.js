import React from "react";
import {
    Box,
    Center,
    Flex,
    HStack,
    VStack,
    Text,
    Button,
    Link
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
const Card = ({
    content,
    width = "265px",
    isLive = false,
    showsInfo = true,
    isMobileDevice = false,
    mr = "16px"
}) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const router = useRouter();

    return (
        <Box
            mr={mr}
            style={{ overflow: "hidden", width: width }}
            onClick={() =>
                router.push({
                    pathname: "/nfts/[id]",
                    query: { id: content.slug }
                })
            }
        >
            <Box
                className={
                    !isMobileDevice
                        ? "influencer-card"
                        : "influencer-card influencer-card-mobile"
                }
                style={{
                    border: "1px solid #A8A8A8",
                    marginBottom: "12px",
                    borderRadius: "8px",
                    padding: "12px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <VStack
                    spacing={0}
                    style={{ position: "absolute", left: "12px", top: "12px" }}
                >
                    <Text
                        m={0}
                        p={0}
                        color="white"
                        fontWeight="bold"
                        fontFamily="Sora"
                        fontSize="18px"
                    >
                        2021
                    </Text>
                    <Text
                        m={0}
                        p={0}
                        color="white"
                        fontFamily="Sora"
                        textTransform="uppercase"
                        fontSize="12px"
                    >
                        Unique
                    </Text>
                </VStack>

                <Box
                    cursor="pointer"
                    width="100%"
                    height="30px"
                    my={4}
                    style={{
                        position: "absolute",
                        transform: "rotate(-90deg)",
                        zIndex: 2,
                        top: "52px",
                        right: "-30px",
                        width: "120px"
                    }}
                >
                    <Image
                        alt="Logo"
                        objectFit="contain"
                        src="/assets/lm_logo.png"
                        layout="fill"
                    />
                </Box>

                <Box
                    cursor="pointer"
                    width="100%"
                    height="240px"
                    position="relative"
                >
                    <Box
                        style={{
                            height: 350,
                            width: 350,
                            background: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "100%",
                            position: "absolute",
                            // left: "-62px",
                            // top: "-120px",
                            left: "-60px",
                            top: "-140px",
                            overflow: "hidden",
                            border: "2px solid rgba(255, 255, 255, 0.05)",
                            transform: "scale(1.05)"
                        }}
                    >
                        <img
                            src={
                                content && content.preview
                                    ? content.preview
                                    : "/assets/nfts/charley_mosey.svg"
                            }
                            style={{
                                width: "100%",
                                left: "55%",
                                top: "30%",
                                position: "relative",
                                objectFit: "contain",
                                transform: "translateX(-50%)"
                            }}
                        />
                    </Box>
                </Box>

                <Text
                    textAlign="center"
                    fontFamily="Sora"
                    fontWeight="bold"
                    color="orange"
                    px={6}
                    mb={4}
                    fontSize="18px"
                >
                    {content && content.name}
                </Text>

                <Flex justifyContent="space-between">
                    <Text
                        color="#FFF86B"
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontFamily="Sora"
                        fontSize="12px"
                    >
                        Position
                    </Text>

                    <Text
                        color="#FFF86B"
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontFamily="Sora"
                        fontSize="12px"
                    >
                        Shoots
                    </Text>
                </Flex>

                <Flex justifyContent="space-between" mb={2}>
                    <Text
                        color="#A8A8A8"
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontFamily="Sora"
                        fontSize="12px"
                    >
                        XXXX
                    </Text>

                    <Text
                        color="#A8A8A8"
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontFamily="Sora"
                        fontSize="12px"
                    >
                        XXXX
                    </Text>
                </Flex>

                {currentSize !== "base" && (
                    <Center>
                        <Box
                            cursor="pointer"
                            // width="100%"
                            height="16px"
                            width="80px"
                            position="relative"
                            my={2}
                        >
                            <Image
                                alt="Logo"
                                objectFit="contain"
                                src="/assets/lm_logo.png"
                                layout="fill"
                            />
                        </Box>
                    </Center>
                )}

                <Box
                    className="influencer-card-btn-wrapper"
                    position="absolute"
                    m={1}
                    bottom={0}
                    left={0}
                    width="100%"
                    pr={2}
                >
                    <Link href={"/"} width="100%">
                        <Button
                            className="influencer-card-btn"
                            width="100%"
                            fontSize={24}
                        >
                            BUY NOW
                        </Button>
                    </Link>
                </Box>
            </Box>

            {showsInfo && (
                <>
                    <Text fontWeight="bold" color="white" fontFamily="Sora">
                        {content && content.name}
                    </Text>

                    <Flex justifyContent="space-between" m={0} p={0}>
                        <Text color="#7C7C7C" m={0} p={0}>
                            {isLive ? "Last Bid" : "Price"}
                        </Text>

                        <Text color="#7C7C7C">SALE</Text>
                    </Flex>

                    {isLive && (
                        <>
                            <HStack m={0} height="28px" mt={2}>
                                <Box
                                    cursor="pointer"
                                    width="100%"
                                    height="18px"
                                    position="relative"
                                    my={4}
                                >
                                    <Image
                                        alt="Bitcoin"
                                        layout="fill"
                                        objectFit="contain"
                                        src="/assets/nfts/bitcoin.svg"
                                    />
                                </Box>

                                <Text
                                    color="#CFBF8A"
                                    fontWeight="bold"
                                    fontFamily="Sora"
                                    fontSize="12px"
                                >
                                    XXXX
                                </Text>
                            </HStack>

                            <Flex justifyContent="space-between" height="28px">
                                <HStack>
                                    <Box
                                        cursor="pointer"
                                        height="14px"
                                        width="14px"
                                        position="relative"
                                        my={4}
                                    >
                                        <Image
                                            alt="Remaining Time"
                                            objectFit="contain"
                                            src="/assets/nfts/sandclock.svg"
                                        />
                                    </Box>

                                    <Text
                                        color="#CFBF8A"
                                        fontFamily="Sora"
                                        fontSize="12px"
                                        fontWeight="bold"
                                    >
                                        Few Days Left
                                    </Text>
                                </HStack>

                                <HStack>
                                    <Box
                                        cursor="pointer"
                                        height="24px"
                                        position="relative"
                                        my={4}
                                    >
                                        <Image
                                            alt="Share"
                                            objectFit="contain"
                                            src="/assets/nfts/share.svg"
                                            layout="fill"
                                        />
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
                                            layout="fill"
                                        />
                                    </Box>
                                </HStack>
                            </Flex>
                        </>
                    )}

                    {!isLive && (
                        <>
                            <Flex justifyContent="space-between" height="28px">
                                <HStack>
                                    <Box
                                        cursor="pointer"
                                        height="14px"
                                        position="relative"
                                        my={4}
                                    >
                                        <Image
                                            alt="Remaining Time"
                                            objectFit="contain"
                                            src="/assets/nfts/money.svg"
                                            height="16px"
                                            width="16px"
                                        />
                                    </Box>

                                    <Text
                                        color="#CFBF8A"
                                        fontFamily="Sora"
                                        fontSize="12px"
                                        fontWeight="bold"
                                    >
                                        US $250
                                    </Text>
                                </HStack>

                                <HStack>
                                    <Box
                                        cursor="pointer"
                                        height="24px"
                                        position="relative"
                                        my={4}
                                    >
                                        <Image
                                            alt="Share"
                                            objectFit="contain"
                                            src="/assets/nfts/share.svg"
                                            height="22px"
                                            width="22px"
                                        />
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
                </>
            )}
        </Box>
    );
};

export default Card;
