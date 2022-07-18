import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    Flex,
    Text,
    Select,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FilterIcon } from "../../../components/Icons";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import strapi from "../../../utils/strapi";

import { usePromotionBanners } from "../../Home/api";

import NftCard from "./NftCard";

const SelectBox = ({ style, icon, title, options, onChange }) => {
    return (
        <Flex style={style}>
            <Box pl={[4]}>{icon}</Box>

            <Select
                pl="0%"
                border="none"
                color="white"
                _focus={{ borderColor: "transparent", boxShadow: "none" }}
                onChange={onChange}
                style={{ paddingLeft: "6px" }}
            >
                {options &&
                    options.map((item) => {
                        return (
                            <option
                                style={{
                                    backgroundColor: "black",
                                    color: "white"
                                }}
                                key={item}
                                value={`${item}`.toLowerCase()}
                            >
                                {item}
                            </option>
                        );
                    })}
            </Select>
        </Flex>
    );
};

const PreviewNFTs = ({ nftSelectedCategory }) => {
    const router = useRouter();
    const [data, setPreviewNFTData] = useState();
    const [displayData, setDisplayData] = useState();
    const [featuredNfts, setFeaturedNfts] = useState([]);
    const [mainSliderChild, setMainSliderChild] = useState();
    const bottomBanners = usePromotionBanners();
    const [showAll, setShowAll] = useState(true);
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [visibleCount, setVisibleCount] = useState(8);
    const [total, setTotal] = useState(0);
    const defaultCategories = "All";
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState(null);
    const ref = React.useRef();

    useEffect(async () => {
        const data = await strapi.find("nft-collections", {
            sort: "id",
                        populate: [
                "nftSet.nft_kred"               
            ]
        });
        if (data) {
            setPreviewNFTData(data.data);
            setDisplayData(data.data);
        }
    }, []);

    useEffect(async () => {
        if (data && data?.length > 0 && options.length == 0) {
            options.push(defaultCategories);
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategories(defaultCategories);
            setDisplayData(data);
        }
    }, [data]);
console.log("data",data)
// const selectCategory = (e) => {
//     if (e.target.value.toString().toLowerCase() === "all")
//         setDisplayData(data);
//     else
//         setDisplayData(
//             data?.filter(
//                 (item, index) =>
//                     item.name.toLowerCase() ===
//                     e.target.value.toString().toLowerCase()
//             )
//         );
// };
    const selectCategory = (e) => {
        const newCategory = e.target.value;
        if (e.target.value === defaultCategories.toString().toLowerCase()) {
            router.push(
                {
                    pathname: "/nft-preview"
                },
                undefined,
                { shallow: true }
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === e.target.value
            );

            router.push(
                {
                    pathname: "/nft-preview/category/" + selData[0].slug
                },
                undefined,
                { shallow: true }
            );
        }
        setCategories(newCategory);
    };
    useEffect(() => {
        if (data && nftSelectedCategory) {
            let selData = data.filter((item) => item.slug === nftSelectedCategory);
            setCategories(selData[0].name.toLowerCase());
            setSelCategoriesData(selData);
        }
    }, [nftSelectedCategory]);
    const thumbsliderChild = featuredNfts.map((item, index) => {
        return (
            <Box
                height="120px"
                width="150px"
                mb={6}
                position="relative"
                cursor="pointer"
            >
                <Image
                    src={`/assets/nfts/frame${
                        index === 1 ? "-active" : ""
                    }.png`}
                    alt=""
                    layout="fill"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                />

                <Image
                    src="https://a.espncdn.com/photo/2019/0917/NBA_Decade_Most_defining_16x9.jpg"
                    alt=""
                    layout="fill"
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "contain",
                        padding: "12px 24px"
                    }}
                />
            </Box>
        );
    });

    

    return (
        <Box>
            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
                mt="20px"
            >
                <Flex justify="flex-start" mt="20px" align="center" mb="20px">
                    {/* <Text
                        className="tab-item"
                        fontFamily="Blanch"
                        color="white"
                        cursor="pointer"
                        fontSize={["28px", "28px", "58px", "58px"]}
                    >
                        PREVIEW NFT'S
                    </Text> */}
                    <SelectBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "30px",
                            alignItems: "center",
                            marginLeft: isMobileDevice ? "20px" : "60px",
                            width: "200px"
                        }}
                        icon={<FilterIcon />}
                        title="Categories"
                        options={options}
                        onChange={selectCategory}
                    />
                </Flex>
            </Box>

            {displayData &&
                displayData.map((collection, index) => {
                    return (
                        <Box mx={!isTabletOrDesktop ? 6 : 10} mt={3}>
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
                                            {collection.name.toLocaleUpperCase()}
                                        </Text>
                                    </Flex>
                                </GridItem>
                            </Grid>

                            <Wrap m="auto !important">
                                {collection.nftSet
                                    .sort((a, b) => a.priority - b.priority)
                                    .map((item) => (
                                        <WrapItem m="auto !important">
                                            <NftCard
                                                nft={item?.nft_kred?.data}
                                                showInfo={true}
                                            />
                                        </WrapItem>
                                    ))}
                            </Wrap>
                        </Box>
                    );
                })}
        </Box>
    );
};

export default PreviewNFTs;
