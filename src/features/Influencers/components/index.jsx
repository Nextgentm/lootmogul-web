import React, { useState, useEffect, forwardRef } from "react";
// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import InfluencersCategories from "./InfluencersCategories";
// const InfluencersCategories =  dynamic(() => import("./InfluencersCategories")) ;
import { Box, Text, Flex, HStack, Link } from "@chakra-ui/react";
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

const Influencers = ({ data, selectedCategory , banner}) => {
    const defaultCategoryName = "All Category";
    const { isMobileDevice, isTabletOrDesktop, user, influencerLikes } =
        useContext(AppContext);
    const [options, setOptions] = useState([]);
    const [category, setCategory] = useState(defaultCategoryName);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [selCategoriesData, setSelCategoriesData] = useState(data);
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
        { label: "Influencers",path:"/influencers" }
    ];

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
    const getBannerImage = ()=>{
        
        if(selectedCategory && selCategoriesData ){
        if(selCategoriesData[0] && selCategoriesData[0].banner?.data){
            return !isTabletOrDesktop
            ? selCategoriesData[0].banner?.data[1].url
            : selCategoriesData[0].banner?.data[0].url
        }
        else{
return null;
        } 

        }else if(banner && (banner || (category.toLowerCase() === defaultCategoryName.toLowerCase()))) {
          return  !isTabletOrDesktop
            ? banner[1]?.url
            : banner[0]?.url
        }         else{
            return null;
                    } 
    }

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
            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
            >
                {isTabletOrDesktop && (
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

                {/* {!isMobileDevice && ( */}
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
                {/* )} */}

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
                </HStack>

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
