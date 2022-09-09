import React, { useState, useEffect, forwardRef } from "react";
// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
 import {GrFilter} from "react-icons/gr"
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
// import ContentNavigator from "../../../components/ContentNavigator";
import { LeftArrow, RightArrow } from "../../../components/ContentNavigator/arrows";

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

            <Box >
                {/* <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} /> */}
                <Flex
                    flexDir={["column","column","column","row"]}
                >
                    <Box  px={10} pb={12} pt="2em" mt={[0,0,10]} ml={["0em","0em","2em","2em"]} width={["100%","100%","100%","55%"]}>
                        
                            <Text 
                                color="white"
                                fontSize={["1.3rem","2rem","3rem","2.5rem", "4rem"]}
                                fontFamily="CNN"
                            >
                                Play your favorite 
                                Influencer Tournament
                                and win NFT
                                {/* <span style={{ color: "#F8ED1D" }}>
                                    New releases
                                </span> */}
                            </Text>

                            <Text
                                color="white"
                                fontSize={["1rem","1.3rem","1.3rem","1.3rem","1.3rem"]}
                                fontFamily="Sora"

                                fontWeight="normal"
                                width={["100%","100%","80%"]}
                            >
                                Become a virtual landlord to some of the largest
                                
                                projects in crypto
                            </Text>

                            <Button
                                mt={6}
                               variant="solid"
                               fontWeight="normal"
                               fontSize={["1.0rem","1.0rem","1.3rem"]}
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
                        px={[0,0,0,10]}
                        pb={[0,0,0,12]}
                        pt={[0,0,0,12]}
                        width={["120%","120%","120%","50%"]}
                    >
                        {getBannerImage() && (
                            <Box
                                ml={["20px", "20px", "20px", "-100px"]}
                                mr={["20px", "20px", "20px", "-100px"]}
                            >
                                <Flex
                                    position="relative"
                                    mt={["50px"]}
                                    h={["200px","200px","390px"]}
                                    
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
            <Box
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
                            ml={["20px", "20px", "20px", "60px"]}
                            mr={["20px", "20px", "20px", "60px"]}
                         >
                            <Text
                                color="white"
                                fontSize={["2rem", "2.5rem"]}
                                fontFamily="Sora"
                                fontWeight="bold"
                                mt="20px"
                                textAlign="center"
                            >
                                NEW IN INFLUENCERS
                            </Text>

                            {/* <ContentNavigator
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
                            /> */}
                        </Flex>
                        <ScrollMenu
                            className="no-scrollbar"
                            apiRef={ref}
                            ref={lazyRoot}
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                            mt={"10px"}
                        >
                            {newInfluencers.map((item, index) => (
                                <Box w="100% !important" mr={["0px","10px","10px"]} px="15px">
                                  <InfluencersCard
                                //   style={{w:"300px", mr:"10px" ,px:"15px"}}
                                  itemId={`item-${index}`}
                                  key={`item-${index}`}
                                  slug={item.slug}
                                  influencer={item}
                                  lazyRoot={lazyRoot}
                              />
                              </Box>
                               
                            ))}
                        </ScrollMenu>
                    </>
                )}

            <Box 
                     ml={["20px", "20px", "20px", "60px"]}
                            mr={["20px", "20px", "20px", "60px"]}>
                    <Text
                        color="white"
                        fontSize={["2rem", "2.5rem"]}
                        fontFamily="Sora"
                        fontWeight="bold"
                        mt={20} mb="15" display={["none","none","block"]}
                    >
                        EXPLORE
                    </Text>

                    <Wrap mt={20} spacing='30px' mx="auto" display={["none","none","block"]} >
                {selCategoriesData?.map((influencerCat, index) => (
                    <WrapItem w={[240,240,150,200,240]}  >
                    <Button
                    
                    fontSize={["15px !important","11px !important","10px !important","13px !important","15px !important"]}
                    variant={"segment"}
                    // width={[240,240,200,200,240]}
                    onClick={() => {
                      //  nftSelectCategory(influencerCat.name.toLowerCase());
                    }}
                >
                    {influencerCat.name}
                </Button>
                </WrapItem>
                ))}
                </Wrap>

                <Flex
                flexDir={["column","column","column","row","row"]}
                            justify="space-between"
                            mt="20px"
                            align="center"
                            textAlign="center"
                            // my="1em"
                        >
                    <Text
                         color="white"
                         fontSize={["2rem", "2.5rem"]}
                         fontFamily="Sora"
                         fontWeight="bold"
                        //   mb="1em"
                        mt={6}
                    >
                        ALL IN INFLUENCERS
                    </Text>
                    <Button
                    fontSize="24px"
                    my="2em"
                    width={240}
                    onClick={() => {
                        // nftSelectCategory(influencerCat.name.toLowerCase());
                    }}
                >
                    FILTER<Box ml="1em" ><GrFilter/></Box>
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
        </Box>
    );
};

export default Influencers;