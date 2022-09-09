import React, { useState, useEffect, forwardRef } from "react";
// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
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
    WrapItem
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
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import InfluencersCard from "./InfluencersCategories/InfluencersCard";
import ContentNavigator from "../../../components/ContentNavigator";

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
        callAuthService("google", router.query.access_token)
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
        const newCategory = e.target.value;
        if (e.target.value === defaultCategoryName.toLowerCase()) {
            router.push(
                {
                    pathname: "/influencers"
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
            return !isTabletOrDesktop ? banner[1]?.url : banner[0]?.url;
        } else {
            return null;
        }
    };

    return (
        <Box mt="30px">
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

            <Box bg="#161F2D">
                {/* <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} /> */}
                <SimpleGrid
                    direction={"column-reverse"}
                    bg="linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.33) 50.79%, rgba(18, 50, 98, 0) 101.39%);"
                    columns={[1, 1, 1, 2]}
                    spacing={10}
                >
                    <Box order={[2, 2, 2, 1]} px={10} pb={12} pt={12}>
                        <Box mt={!isMobileDevice ? 36 : 0}>
                            <Text
                                color="white"
                                fontSize={["3em", "4em"]}
                                fontFamily="CNN"
                            >
                                Play your favorite <br />
                                Influencer Tournament <br />
                                and win NFT
                                {/* <span style={{ color: "#F8ED1D" }}>
                                    New releases
                                </span> */}
                            </Text>

                            <Text
                                color="white"
                                fontSize={"1em"}
                                fontWeight="bold"
                            >
                                Become a virtual landlord to some of the largest{" "}
                                <br />
                                projects in crypto
                            </Text>

                            <Button
                                mt={6}
                                fontSize="24px"
                                width="200px"
                                onClick={() => {
                                    executeScroll(0);
                                }}
                            >
                                Buy NFTS
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        order={[1, 1, 1, 2]}
                        bgSize="cover"
                        textAlign={"center"}
                        px={10}
                        pb={12}
                        pt={12}
                    >
                        {getBannerImage() && (
                            <Box
                                ml={["20px", "20px", "20px", "60px"]}
                                mr={["20px", "20px", "20px", "60px"]}
                            >
                                <Flex
                                    position="relative"
                                    w="100%"
                                    h={"350px"}
                                    pt={"20px"}
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
                </SimpleGrid>
            </Box>
            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
            >
                {/* {isTabletOrDesktop && (
                    <Breadcrumbs
                        routes={breadcrumbsPath}
                        style={{ mb: "14px" }}
                    />
                )}
            {getBannerImage() && (<>   <Flex position="relative" w="100%" h={"350px"} pt={"20px"}>
                 <Image
                        alt={`influencers-banner`}
                        src={getBannerImage()}                        
                       className="custom-img"
                       layout="fill"
                        
                    />
                </Flex>
                <Text
                    fontFamily="Sora"
                    fontSize="14px"
                    color="white"
                    mt={["20px", "40px", "40px"]}
                >
                    Get a chance to play against your favorite influencers and
                    win exciting prizes. Celebrity players like Antonio Andrews,
                    Corsley Edwards, Jake Fraley, Jamal Carter, Trevin Wade and
                    more are already a part of the Loot Mogul family. You can
                    also get to know more about your favorite influencer by just
                    clicking their picture and start playing with them. Hurry
                    Now!!!
                </Text>
                </>)} 
                <HStack spacing="24px" mt="50px">
                    <SelectBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "30px",
                            alignItems: "center",
                            width: "170px"
                        }}
                        value={category}
                        icon={<CategoryIcon color="#FFFFFF" />}
                        title="All Category"
                        options={options}
                        onChange={handleCategoryChange}
                    />
                    <SelectBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "30px",
                            alignItems: "center",
                            width: "170px"
                        }}
                        icon={<SortIcon color="#FFFFFF" />}
                        title="Sort by"
                        options={sortOptions}
                        value={sortBy}
                        onChange={handleSortByChange}
                    />
                </HStack> */}

                {newInfluencers?.length && (
                    <>
                        <Flex
                            justify="space-between"
                            mt="20px"
                            align="center"
                            mb="20px"
                        >
                            <Text
                                color="white"
                                fontFamily="Blanch"
                                fontSize="32px"
                                mt="20px"
                            >
                                NEW IN INFLUENCERS
                            </Text>

                            <ContentNavigator
                                showArrows={true}
                                handleLeftArrowClick={() =>
                                    ref.current.scrollPrev()
                                }
                                handleRightArrowClick={() =>
                                    ref.current.scrollNext()
                                }
                                onViewAllClicked={() =>
                                    router.push({ pathname: "/influencers/newest" })
                                }
                            />
                        </Flex>
                        <ScrollMenu
                            className="no-scrollbar"
                            apiRef={ref}
                            ref={lazyRoot}
                        >
                            {newInfluencers.map((item, index) => (
                                  <InfluencersCard
                                  style={{ w: "375px", mr: "30px", mt: "10px" }}
                                  itemId={`item-${index}`}
                                  key={`item-${index}`}
                                  slug={item.slug}
                                  influencer={item}
                                  lazyRoot={lazyRoot}
                              />
                               
                            ))}
                        </ScrollMenu>
                    </>
                )}

                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        mt={6}
                    >
                        EXPLORE
                    </Text>

                    <Wrap mt={20}>
                {selCategoriesData?.map((influencerCat, index) => (
                    <WrapItem w={240}>
                    <Button
                    mt={2}
                    variant={"segment"}
                    fontSize="24px"
                    width={240}
                    onClick={() => {
                        nftSelectCategory(influencerCat.name.toLowerCase());
                    }}
                >
                    {influencerCat.name}
                </Button>
                </WrapItem>
                ))}
                </Wrap>

                <Flex
                            justify="space-between"
                            mt="20px"
                            align="center"
                            mb="20px"
                        >
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        mt={6}
                    >
                        ALL IN INFLUENCERS
                    </Text>
                    <Button
                    fontSize="24px"
                    width={240}
                    onClick={() => {
                        // nftSelectCategory(influencerCat.name.toLowerCase());
                    }}
                >
                    FILTER
                </Button>
                </Flex>
                <Box>
                    {selCategoriesData?.map((influencer, index) => (
                        <InfluencersCategories
                            isMobileDevice={isMobileDevice}
                            key={`influencers-${index}`}
                            influencer={influencer}
                        />
                    ))}
                </Box>

                {category.toLowerCase() !== defaultCategoryName.toLowerCase() &&
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
    );
};

export default Influencers;