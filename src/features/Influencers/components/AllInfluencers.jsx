import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    Input,
    FormControl,
    Image,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { BiFilterAlt } from "react-icons/bi";
import ReadMoreLess from "../ReadMoreLess";
import CategoryComponent from "./categoryComp";
import InfluencersCard from "./InfluencersCategories/InfluencersCard";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";
import AppContext from "../../../utils/AppContext";

const AllInfluencers = ({
    displayInfluencers,
    category,
    perPage,
    totalPages,
    pageNo,
    setPageNo,
    defaultCategoryName,
    selectedCategory,
    selCategoriesData,
    catData,
    handleCategoryChange,
    setFilterValue,
    getSearchByName,
    searchByName,
    setSearchByName
}) => {
    const [isActive, setActive] = useState(true);
    const [isGridActive, setGridActive] = useState(false);
    const { isMobileDevice } = useContext(AppContext);
    const handleToggle = () => {
        setActive(!isActive);
    };
    useEffect(() => {
        setActive(true);
    }, [category])
    const router = useRouter();
    return (
        <Box
            mt={10}
            mx={[10, 10, 16]}
        >
            <Flex
                flexDir={["column", "column", "column", "row"]}
                justify="space-between"
                align="center"
                textAlign="center"
            >
                <Heading variant="sectionTitle">{category ? category.toUpperCase() : "ALL AMBASSADORS"}
                </Heading>

                <Flex alignItems="center" justify="flex-end" w="50%" maxW="575px">
                    <Flex alignItems="center" w="70%">
                        <FormControl w="100%" mb="0">
                            <Input
                                id="search_by_name"
                                type="text"
                                placeholder="Search by name..."
                                value={searchByName}
                                onChange={(e) => setSearchByName(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        getSearchByName(e.target.value)
                                    }
                                }}
                                color="#fff"
                                _placeholder={{ color: "#fff" }}
                            />
                        </FormControl>
                    </Flex>

                    <Flex alignItems="center" ml="20px" border="1px solid #fff" borderRadius="5px" p="5px 10px" h="40px">
                        <Image
                            alt="Grid 2"
                            src="/assets/grid-2.png"
                            width="25px"
                            height="25px"
                            onClick={() => {setGridActive(false)}}
                        />

                        <Image
                            alt="Grid 5"
                            src="/assets/grid-5.png"
                            width="25px"
                            height="25px"
                            ml="10px"
                        />
                    </Flex>
                </Flex>

                {/* <Flex alignItems="center" pos="relative">
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
                </Flex> */}
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

                    <Button mt={["7", "7", "7", "0"]} variant="searchBtn" onClick={handleCategoryChange}>
                        Search
                    </Button>
                </Flex>
            ) : (
                ""
            )}
            <Box mt={5}>
                <Grid
                    flexWrap="wrap"
                    gap={10}
                    className={`ambassadors_list ${isGridActive ? "grid_6" : ""}`}
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(2, 1fr)",
                        "repeat(3, 1fr)",
                        "repeat(4, 1fr)",
                        "repeat(6, 1fr)"
                    ]}
                // gap={"30px"}
                >
                    {displayInfluencers?.length &&
                        displayInfluencers.sort((a, b) => a.order - b.order)
                            .filter(
                                (_, index) =>
                                    index < (pageNo + 1) * perPage &&
                                    index >= pageNo * perPage
                            )

                            ?.map((influencer, index) => (
                                <InfluencersCard
                                    style={{ w: "100%", px: 4 }}
                                    colSpan={4}
                                    itemId={`item-${index}`}
                                    key={`item-${index}`}
                                    slug={influencer.slug}
                                    influencer={influencer}
                                />
                            ))}

                </Grid>
            </Box>

            < Pagination totalPages={totalPages} pageNo={pageNo} setPageNo={setPageNo} />
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
