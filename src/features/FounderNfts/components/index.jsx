import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    Flex,
    Text,
    Button,
    Center,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import { getStrapiMedia } from "../../../utils/medias";
import LMThumbnailCarousel from "../../../components/LMCarousel/LMThumbnailCarousel";
import NftCard from "./NftCard";

const FounderNfts = ({ data }) => {
    const [featuredNfts, setFeaturedNfts] = useState([]);
    const [mainSliderChild, setMainSliderChild] = useState();
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [visibleCount, setVisibleCount] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const featured = data[0].nftSet.filter((nft) => nft.isFeatured);
        setFeaturedNfts(featured);
        setTotal(data[0].nftSet.length);
        let sliderItem = featured.map((nftData) => {
            return (
                nftData.nft_kred &&
                nftData?.nft_kred?.data && (
                    <Box w={"100%"}>
                        <Box mt="5%">
                            <NftCard
                                isMobileDevice={isMobileDevice}
                                nft={nftData?.nft_kred?.data}
                            />
                        </Box>
                    </Box>
                )
            );
        });
        setMainSliderChild(sliderItem.slice(0, 3));
    }, [data]);

    return (
        <Box pos="relative">
            <Box
                position="relative"
                align="center"
                w="100%"
                h={["460px", "580px"]}
            >
                <Box width="100%" height="100%">
                    {data[0]?.banner.data && (
                        <Image
                            alt={`influencer-banner`}
                            layout="fill"
                            m={"auto"}
                            src={
                                isMobileDevice
                                    ? data[0]?.banner.data?.length > 1 &&
                                      data[0]?.banner.data[1].url
                                        ? getStrapiMedia(
                                              data[0]?.banner.data[1].url
                                          )
                                        : "/assets/influencer-banner-mobile.webp"
                                    : data[0]?.banner.data?.length > 0 &&
                                      data[0]?.banner.data[0].url
                                    ? getStrapiMedia(
                                          data[0]?.banner.data[0].url
                                      )
                                    : "/assets/influencer-banner.webp"
                            }
                        />
                    )}

                    <Flex
                        dir="row"
                        right={["10%", "10%", "10%", "0%"]}
                        top={["45%", "45%", "45%", "10%"]}
                        pos="absolute"
                        width="80%"
                        bg="transparent"
                        justifyContent={[
                            "center",
                            "center",
                            "center",
                            "flex-end"
                        ]}
                    >
                        {featuredNfts?.length > 0 && (
                            <Box
                                position="relative"
                                right={["0%", "0%", "0%", "3%"]}
                                width={["100%", "100%", "100%", "50%"]}
                            >
                                <LMThumbnailCarousel
                                    disableDots={true}
                                    autoplaySpeed={5000}
                                    children1={mainSliderChild}
                                ></LMThumbnailCarousel>
                            </Box>
                        )}
                    </Flex>
                </Box>
            </Box>

            {data &&
                data.map((foundersnft, index) => {
                    return (
                        <Box
                            key={"founders" + index}
                            mx={!isTabletOrDesktop ? 6 : 10}
                            mt={8}
                        >
                            <Grid
                                templateColumns={
                                    !isTabletOrDesktop ? "1fr" : "10fr 2fr"
                                }
                                gap={0}
                            >
                                <GridItem>
                                    <Flex
                                        alignItems={
                                            !isTabletOrDesktop
                                                ? "flex-start"
                                                : "center"
                                        }
                                        flexDirection={
                                            !isTabletOrDesktop
                                                ? "column"
                                                : "row"
                                        }
                                        ml={["0%", "2%"]}
                                    >
                                        <Text
                                            fontFamily="Blanch"
                                            color="white"
                                            fontSize={
                                                !isTabletOrDesktop
                                                    ? "28px"
                                                    : "58px"
                                            }
                                            lineHeight={
                                                !isTabletOrDesktop
                                                    ? "30px"
                                                    : "auto"
                                            }
                                            mb={3}
                                        >
                                            LootMogul Founder's Collection
                                        </Text>
                                    </Flex>
                                </GridItem>
                            </Grid>

                            <Wrap m="auto !important">
                                {foundersnft.nftSet.map(
                                    (item, index) =>
                                        item.nft_kred &&
                                        item.nft_kred.data && (
                                            <WrapItem
                                                mb="3%!important"
                                                mt="auto"
                                                mx="auto!important"
                                            >
                                                <NftCard
                                                    isMobileDevice={
                                                        isMobileDevice
                                                    }
                                                    nft={item?.nft_kred?.data}
                                                    showInfo={true}
                                                />
                                            </WrapItem>
                                        )
                                )}
                            </Wrap>

                            {!isMobileDevice && visibleCount < total && (
                                <Center mt={12}>
                                    <Button
                                        onClick={() => {
                                            visibleCount < total;
                                            setVisibleCount(visibleCount + 8);
                                        }}
                                        style={{
                                            background: "transparent",
                                            border: "2px solid #EDC628",
                                            color: "white",
                                            fontSize: "22px",
                                            width: "250px"
                                        }}
                                    >
                                        Load more
                                    </Button>
                                </Center>
                            )}
                        </Box>
                    );
                })}

            <Box mt={12} mx={isMobileDevice ? 0 : 10}></Box>
        </Box>
    );
};

export default FounderNfts;
