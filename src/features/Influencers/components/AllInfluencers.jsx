import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";
import ReadMoreLess from "../ReadMoreLess";
import CategoryComponent from "./categoryComp";
import InfluencersCard from "./InfluencersCategories/InfluencersCard";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";

const AllInfluencers = ({
    displayInfluencers,
    category,
    totalPages,
    pageNo,
    setPageNo,
    defaultCategoryName,
    selectedCategory,
    selCategoriesData,
    catData,
    handleCategoryChange,
    setFilterValue
}) => {
    const [isActive, setActive] = useState(true);
    const handleToggle = () => {
        setActive(!isActive);
    };
    useEffect(()=>{
        setActive(true);
    },[category])
    const router = useRouter();
    return (
        <Box
            mt="20"
            ml={["20px", "20px", "20px", "60px"]}
            mr={["20px", "20px", "20px", "60px"]}
        >
            <Flex
                flexDir={["column", "column", "column", "row"]}
                justify="space-between"
                align="center"
                textAlign="center"
                mt={["2em", "2.5em"]}
            >
                <Text   color="white"
                              fontFamily="Blanch"
                              fontSize={[
                                  "4rem",
                                  "4rem",
                                  "4rem",
                                  "5rem",
                                  "5rem"
                              ]}>
                    {/* ALL IN INFLUENCERS */}
                    {category ? category.toUpperCase() : "ALL IN INFLUENCERS"}
                </Text>
                <Flex alignItems="center" pos="relative">
                    <Button
                        variant={!isActive ? "filterBtnSegment" : "filterBtn"}
                        onClick={() => {
                            handleToggle();
                            // nftSelectCategory(influencerCat.name.toLowerCase());
                        }}
                    >
                        FILTER
                        <Box ml="10px">
                            <BiFilterAlt color="#FFF" fontSize="25px" />
                        </Box>
                    </Button>
                    {!isActive ? (
                        <Box
                            pos="relative"
                            top="-8"
                            right="15px"
                            bg="#817688"
                            py="0.8"
                            px="1"
                            pt="-1 !important"
                            cursor="pointer"
                            borderRadius="3px"
                            onClick={() => {
                                handleToggle();
                            }}
                        >
                            <CloseIcon h="12px" color="#0f0625" />
                        </Box>
                    ) : (
                        ""
                    )}
                </Flex>
            </Flex>
            {!isActive ? (
                <Flex
                    justifyContent={["flex-start", "space-around"]}
                    w="100%"
                    mb="60px"
                    flexDirection={["column", "column", "column", "row"]}
                >
                    <CategoryComponent
                        selCategoriesData={catData}
                        category={category}
                        defaultCategoryName={defaultCategoryName}
                        setFilterValue={setFilterValue}
                    ></CategoryComponent>

                    <Button mt={["7","7","7", "0"]} variant="searchBtn" onClick = {handleCategoryChange}>
                        Search
                    </Button>
                </Flex>
            ) : (
                ""
            )}
            <Box>
                <Grid
                    flexWrap="wrap"
                    rowGap={10}
                    mt="10px"
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(2, 1fr)",
                        "repeat(3, 1fr)",
                        "repeat(4, 1fr)"
                    ]}
                    gap={"30px"}
                >
                    {displayInfluencers?.length &&
                        displayInfluencers.sort((a, b) => a.order - b.order)
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

           < Pagination totalPages={totalPages} pageNo={pageNo} setPageNo={setPageNo}/> 
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
    );
};

export default AllInfluencers;
