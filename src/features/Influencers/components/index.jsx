import React, { useState, useEffect, forwardRef } from "react";
// import dynamic from 'next/dynamic';
import InfluencersCategories from "./InfluencersCategories";
// const InfluencersCategories =  dynamic(() => import("./InfluencersCategories")) ;
import { Box, Text, Flex, HStack, Link } from "@chakra-ui/react";
import Image from "next/image";

import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import FAQ from "../../Home/components/FAQ";
import Breadcrumbs from "../../../components/Breadcrumbs/index";
import { Select } from "@chakra-ui/react";
import { CategoryIcon, SortIcon } from "../../../components/Icons";
import { apiLikeRequests, useApiLikeRequests } from "../../Home/api";


const SelectBox = ({ style, icon, title, options, onChange }) => {
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

const Influencers = ({ data, selectedCategory }) => {
    const defaultCategoryName = "Category";
    const { isMobileDevice, isTabletOrDesktop, user,influencerLikes } = useContext(AppContext);
    const [options, setOptions] = useState([]);
    const [category, setCategory] = useState(null);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [selCategoriesData, setSelCategoriesData] = useState(data);
    const sortOptions = [
        "Sort by",
        "Recently added",
        "Number of likes",
        "Alphabetical"
    ];

    const breadcrumbsPath = [
        {
            label: "Home",
            path: "/"
        },
        { label: "Influencers" }
    ];


    useEffect(async () => {
        if (data && data?.length>0 && options.length == 0) {
            options.push(defaultCategoryName);
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategory(defaultCategoryName);
            setDisplayData(data);
        }

    }, [data,user]);
;
const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
};
useEffect(() => {
    if (influencerLikes ) {
            if (influencerLikes?.length) {              
               
                let populateData = Array.isArray(data)?data:[data];
              
                populateData =populateData.map((infcat) => {
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
                if(!selectedCategory){
                    setSelCategoriesData([]);
                }else {
                    const selData = populateData.filter(    
                        (cat) =>
                            cat.id.toString() === selectedCategory.toString()
                    );
                    setSelCategoriesData(selData);
                }
                setDisplayData(populateData);
            
           }
    }
},[influencerLikes]);
useEffect(()=>{
    if(data && selectedCategory){
        
setDisplayData(data);
setSelCategoriesData(data);

    }
},[selectedCategory])

useEffect(() => {
    
        if(displayData && category){
            setSortBy("Sort by");
            if (
                category.toLowerCase() !== defaultCategoryName.toLowerCase()
            ) {
                const selData = displayData.filter(    
                    (cat) =>
                        cat.name.toLowerCase() === category.toLowerCase()
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
        if(selectedCategory) return;
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

    return (
        <Box mt="30px">
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
                <Flex position="relative" w="100%" h={"330px"} pt={"20px"}>
                    <Image
                        m={"auto"}
                        alt={`influencers-banner`}
                        src={
                            !isTabletOrDesktop
                                ? "/assets/influencer-banner-mobile.webp"
                                : "/assets/influencer-banner.webp"
                        }
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
                {/* )} */}

             {!selectedCategory &&(   <HStack spacing="24px" mt="50px">
                    <SelectBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "30px",
                            alignItems: "center",
                            width: "170px"
                        }}
                        icon={<CategoryIcon color="#FFFFFF" />}
                        title="Category"
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
                        onChange={handleSortByChange}
                    />
                </HStack>
                )}
                <Box>
                    {selCategoriesData?.map((influencer, index) => (
                        
                           <InfluencersCategories
                           
                           isMobileDevice={isMobileDevice}
                           key={`influencers-${index}`} 
                           influencer={influencer}
                       />
                      
                       
                    ))}
                </Box>
                {/* <Box mt="50px">
                    <FAQ title="FREQUENTLY ASKED QUESTIONS" />
                </Box> */}
            </Box>
        </Box>
    );
};

export default Influencers;
