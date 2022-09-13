import React, { useState, useEffect, forwardRef } from "react";
// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { GrFilter } from "react-icons/gr";
import InfluencersCategories from "./InfluencersCategories";
// const InfluencersCategories =  dynamic(() => import("./InfluencersCategories")) ;
import {
    Box,
    Text,
    Flex,
    HStack,
    Link,
    SimpleGrid,
    Center,
    Wrap,
    WrapItem,
    Grid,
    Image as CImage
} from "@chakra-ui/react";
import Image from "next/image";

import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import FAQ from "../../Home/components/FAQ";
import SEOContainer from "../../SEOContainer";
import Breadcrumbs from "../../../components/Breadcrumbs/index";
import { Select, Heading, Button } from "@chakra-ui/react";
import { CategoryIcon, SortIcon } from "../../../components/Icons";
import { apiLikeRequests, useApiLikeRequests } from "../../Home/api";
import ReadMoreLess from "../ReadMoreLess";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import InfluencersCard from "./InfluencersCategories/InfluencersCard";
// import ContentNavigator from "../../../components/ContentNavigator";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";

const SelectBox = ({ style, icon, title, options, value, onChange }) => {
    return (
        <Flex style={style}>
            <Box pl={4}>{icon}</Box>

            <Select
                pl="0%"
                border="none"
                color="white"
                _focus={{ borderColor: "transparent", boxShadow: "none" }}
                onChange={onChange}
                style={{ paddingLeft: "6px" }}
                defaultValue={value}
                value={value}
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

const Influencers = ({ data, selectedCategory, banner, newInfluencers }) => {
    const defaultCategoryName = "All Category";
    const { isMobileDevice, isTabletOrDesktop, user, influencerLikes } =
        useContext(AppContext);
    const [options, setOptions] = useState([]);
    const [category, setCategory] = useState(defaultCategoryName);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [displayInfluencers, setDisplayInfluencers] = useState([]);

    const [selCategoriesData, setSelCategoriesData] = useState(data);

    const ref = React.useRef();
    const { callAuthService } = useContext(AppContext);

    const lazyRoot = React.useRef(null);

    const sortOptions = [
        "Sort by",
        "Recently added",
        "Number of likes",
        "Alphabetical"
    ];
    const router = useRouter();

    const breadcrumbsPath = [
        {
            label: "Home",
            path: "/"
        },
        { label: "Influencers", path: "/influencers" }
    ];

    
    useEffect(() => {
        if(router.query.access_token){
            if(router.query.provider == "facebook"){
                callAuthService("facebook", router.query.access_token)
            }else{
                callAuthService("google", router.query.access_token)
            }
        }
    }, []);

    useEffect(async () => {
        if (data && data?.length > 0 && options.length == 0) {
            options.push(defaultCategoryName);
            // if(catData){

            // }else {

            // }
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategory(defaultCategoryName);
            setDisplayData(data);
        }
    }, [data, user]);

    const handleCategoryChange = (e) => {
        const newCategory = e;
        if (e === defaultCategoryName.toLowerCase()) {
            router.push(
                {
                    pathname: "/influencers"
                },
                undefined,
                { shallow: true }
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === e
            );
            router.push(
                {
                    pathname: "/influencers/category/" + selData[0].slug
                },
                undefined,
                { shallow: true }
            );
        }

        setCategory(newCategory);
    };
    useEffect(() => {
        if (influencerLikes) {
            if (influencerLikes?.length) {
                let populateData = Array.isArray(data) ? data : [data];

                populateData = populateData.map((infcat) => {
                    if (infcat.influencers?.data) {
                        infcat.influencers.data = infcat.influencers?.data.map(
                            (inf) => {
                                if (influencerLikes.includes(inf.id))
                                    inf.like = true;
                                else inf.like = false;
                                return inf;
                            }
                        );
                    }
                    return infcat;
                });
                setSelCategoriesData([]);
                setDisplayData(populateData);
            }
        }
    }, [influencerLikes]);
    useEffect(() => {
        if (data && selectedCategory) {
            let selData = data.filter((item) => item.slug === selectedCategory);
            setCategory(selData[0].name.toLowerCase());
            setSelCategoriesData(selData);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (displayData && category) {
            setSortBy("Sort by");
            if (category.toLowerCase() !== defaultCategoryName.toLowerCase()) {
                const selData = displayData.filter(
                    (cat) => cat.name.toLowerCase() === category.toLowerCase()
                );

                setSelCategoriesData(selData);
            } else {
                setSelCategoriesData(displayData);
            }
        }
    }, [category, displayData]);

    const handleSortByChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
    };
    useEffect(() => {
        if (selectedCategory) return;
        if (sortBy.toLowerCase() === "alphabetical") {
            const newCatData = selCategoriesData.map((cat) => {
                cat.influencers.data?.sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                return cat;
            });
            setSelCategoriesData(newCatData);
        } else {
            const newCatData = selCategoriesData.map((cat) => {
                cat.influencers.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
                return cat;
            });
            setSelCategoriesData(newCatData);
        }
    }, [sortBy]);

    useEffect(() => {
        if (selCategoriesData) {
            setPageNo(0);
            let inf = [];
            selCategoriesData.map((cat) => {
                cat.influencers?.data?.map((influencer) => {
                    inf.push(influencer);
                });
            });
            setDisplayInfluencers(inf);
            const tp = parseInt((inf?.length / 12).toFixed() || 1);
            console.log("tp", tp);
            console.log("inf", inf.length);
            setTotalPages(tp);
        }
    }, [selCategoriesData]);

    const getBannerImage = () => {
        if (selectedCategory && selCategoriesData) {
            if (selCategoriesData[0] && selCategoriesData[0].banner?.data) {
                return !isTabletOrDesktop
                    ? selCategoriesData[0].banner?.data[1].url
                    : selCategoriesData[0].banner?.data[0].url;
            } else {
                return null;
            }
        } else if (
            banner &&
            (banner ||
                category.toLowerCase() === defaultCategoryName.toLowerCase())
        ) {
            return "/assets/designupdate1/influencer_banner.png";
            // return !isTabletOrDesktop ? banner[1]?.url : banner[0]?.url;
        } else {
            return null;
        }
    };

    return (
        <Box>
            {selectedCategory && selCategoriesData && selCategoriesData[0] && (
                <SEOContainer
                    seoData={
                        selCategoriesData[0]?.seo
                            ? selCategoriesData[0]?.seo
                            : selCategoriesData[0]
                    }
                    content={selCategoriesData[0]}
                />
            )}

            <Box>
                {/* <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} /> */}
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    overflow="hidden"
                >
                    <Box
                        px={10}
                        pb={12}
                        pt="2em"
                        mt={[0, 0, 10]}
                        ml={["0em", "0em", "2em", "2em"]}
                        width={["100%", "100%", "100%", "55%"]}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "1.3rem",
                                "2rem",
                                "3rem",
                                "2.5rem",
                                "4rem"
                            ]}
                        >
                            Play your favorite Influencer Tournament and win NFT
                        </Text>

                        <Text
                            color="white"
                            fontSize={[
                                "1rem",
                                "1.3rem",
                                "1.3rem",
                                "1.3rem",
                                "1.3rem"
                            ]}
                            fontFamily="Sora"
                            fontWeight="normal"
                            width={["100%", "100%", "80%"]}
                        >
                            Become a virtual landlord to some of the largest
                            projects in crypto
                        </Text>

                        <Button
                            mt={6}
                            variant="solid"
                            fontWeight="normal"
                            fontSize={["1.0rem", "1.0rem", "1.3rem"]}
                            padding={"30px 30px"}
                            onClick={() => {
                                executeScroll(0);
                            }}
                        >
                            BUY NFTS
                        </Button>
                    </Box>
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[0, 0, 0, 10]}
                        pb={[0, 0, 0, 12]}
                        pt={[0, 0, 0, 12]}
                        width={["120%", "120%", "120%", "50%"]}
                    >
                        {getBannerImage() && (
                            <Box
                                ml={["20px", "20px", "20px", "-100px"]}
                                mr={["20px", "20px", "20px", "-100px"]}
                            >
                                <Flex
                                    position="relative"
                                    mt={["50px"]}
                                    h={["200px", "200px", "390px"]}
                                >
                                    <Image
                                        m={"auto"}
                                        alt={`nft-banner`}
                                        src={getBannerImage()}
                                        className="custom-img"
                                        layout="fill"
                                    />
                                </Flex>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Box>
            <Box>
                {newInfluencers?.length && (
                    <>
                        <Flex
                            justify="space-between"
                            mt="20px"
                            align="center"
                            mb="20px"
                            ml={["20px", "20px", "20px", "60px"]}
                            mr={["20px", "20px", "20px", "60px"]}
                        >
                            <Text
                                variant="secHeadText"
                                fontSize={["2rem", "2.5rem"]}
                                textAlign="center"
                            >
                                NEW IN INFLUENCERS
                            </Text>
                        </Flex>
                        <Box px="2rem">
                            <ScrollMenu
                                className="no-scrollbar"
                                apiRef={ref}
                                ref={lazyRoot}
                                LeftArrow={LeftArrow}
                                RightArrow={RightArrow}
                                mt={"10px"}
                            >
                                {newInfluencers.map((item, index) => (
                                    <InfluencersCard
                                        //   style={{w:"300px", mr:"10px" ,px:"15px"}}
                                        itemId={`item-${index}`}
                                        key={`item-${index}`}
                                        slug={item.slug}
                                        influencer={item}
                                        lazyRoot={lazyRoot}
                                        wid={["240px", "320px"]}
                                        marginR={["10px", "20px"]}
                                    />
                                ))}
                            </ScrollMenu>
                        </Box>
                    </>
                )}

                <Box
                    mt="20"
                    ml={["20px", "20px", "20px", "60px"]}
                    mr={["20px", "20px", "20px", "60px"]}
                >
                    <Text
                        variant="secHeadText"
                        fontSize={["2rem", "2.5rem"]}
                        display={["none", "none", "block"]}
                    >
                        EXPLORE
                    </Text>

                    <Wrap
                        mt={20}
                        spacing="30px"
                        mx="auto"
                        display={["none", "none", "block"]}
                    >
                        {data?.map((influencerCat, index) => (
                            <WrapItem w={[240, 240, 150, 200, 240]}>
                                <Button
                                    fontSize={[
                                        "15px !important",
                                        "11px !important",
                                        "10px !important",
                                        "13px !important",
                                        "15px !important"
                                    ]}
                                    variant={"segment"}
                                    // width={[240,240,200,200,240]}
                                    onClick={() => {
                                        handleCategoryChange(
                                            influencerCat.name.toLowerCase()
                                        );
                                        //  nftSelectCategory(influencerCat.name.toLowerCase());
                                    }}
                                >
                                    {influencerCat.name}
                                </Button>
                            </WrapItem>
                        ))}
                    </Wrap>

                    <Flex
                        flexDir={["column", "column", "column", "row", "row"]}
                        justify="space-between"
                        mt="20px"
                        align="center"
                        textAlign="center"
                        // my="1em"
                    >
                        <Text
                            fontSize={["2rem", "2.5rem"]}
                            variant="secHeadText"
                        >
                            {category
                                ? category.toUpperCase()
                                : "ALL IN INFLUENCERS"}
                        </Text>
                        <Button
                            fontSize="1.5rem"
                            my="2em"
                            width={240}
                            onClick={() => {
                                // nftSelectCategory(influencerCat.name.toLowerCase());
                            }}
                        >
                            FILTER
                            {/* <Box ml="1em">
                                <GrFilter />
                            </Box> */}
                        </Button>
                    </Flex>
                    <Box>
                        <Grid
                            flexWrap="wrap"
                            rowGap={5}
                            mt="10px"
                            templateColumns={[
                                "repeat(1, 1fr)",
                                "repeat(1, 1fr)",
                                "repeat(2, 1fr)",
                                "repeat(4, 1fr)"
                            ]}
                            gap={"30px"}
                        >
                            {displayInfluencers?.length &&
                                displayInfluencers
                                    .filter(
                                        (_, index) =>
                                            index < (pageNo + 1) * 12 &&
                                            index >= pageNo * 12
                                    )

                                    ?.map((influencer, index) => (
                                        <InfluencersCard
                                            style={{ w: "100%", px: "15px" }}
                                            colSpan={4}
                                            itemId={`item-${index}`}
                                            key={`item-${index}`}
                                            slug={influencer.slug}
                                            influencer={influencer}
                                        />
                                    ))}
                        </Grid>
                    </Box>

                    {totalPages > 0 && (
                        <Center mt={"30px"} height="30px" py="50px">
                            <Flex width={"440px"}>
                                <CImage
                                    width="100px"
                                    onClick={() => {
                                        if (pageNo > 0) setPageNo(pageNo - 1);
                                    }}
                                    src={
                                        pageNo > 0
                                            ? `/assets/designupdate1/arrow-left-selected.svg`
                                            : `/assets/designupdate1/arrow-left-unselected.svg`
                                    }
                                />

                                <Box height="50px" mt="35px">
                                    <Text
                                        color="white"
                                        fontSize={["1rem", "1.5rem"]}
                                        fontFamily="Sora"
                                        fontWeight="bold"
                                        whiteSpace={"nowrap"}
                                    >
                                        Page {pageNo + 1} of {totalPages}
                                    </Text>
                                </Box>

                                <CImage
                                    width="100px"
                                    onClick={() => {
                                        if (pageNo < totalPages - 1)
                                            setPageNo(pageNo + 1);
                                    }}
                                    src={
                                        pageNo < totalPages - 1
                                            ? `/assets/designupdate1/arrow-right-selected.svg`
                                            : `/assets/designupdate1/arrow-right-unselected.svg`
                                    }
                                />
                            </Flex>
                        </Center>
                    )}
                    {category.toLowerCase() !==
                        defaultCategoryName.toLowerCase() &&
                        selectedCategory &&
                        selCategoriesData[0] &&
                        selCategoriesData[0].description &&
                        selCategoriesData[0].description.length > 0 && (
                            <Box>
                                <Heading
                                    fontFamily="Blanch"
                                    color="white"
                                    fontSize="32px"
                                    mt="5%"
                                >
                                    {" "}
                                    Description
                                </Heading>
                                <ReadMoreLess
                                    read={selCategoriesData[0].description}
                                    lines={7}
                                />
                            </Box>
                        )}
                </Box>
            </Box>
        </Box>
    );
};

export default Influencers;