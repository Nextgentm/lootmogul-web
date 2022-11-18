import { Box, Button, Flex, Grid, Heading, Text, useMediaQuery } from "@chakra-ui/react";
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
    totalPages,
    pageNo,
    setPageNo,
    defaultCategoryName,
    selectedCategory,
    selCategoriesData,
    catData,
    handleCategoryChange,
    setFilterValue,
    dataPrePage
}) => {
    const [isActive, setActive] = useState(true);
    const { isMobileDevice } = useContext(AppContext);
    const handleToggle = () => {
        setActive(!isActive);
    };
    useEffect(() => {
        setActive(true);
    }, [category]);
    const router = useRouter();

    const [isMobile] = useMediaQuery("(max-width:768px)");
    const [isLargeMobile] = useMediaQuery("(max-width: 720px)");
    const [isAvgLaptopDevice] = useMediaQuery("(max-width: 1366px)");
    const [isAvgDeskDevice] = useMediaQuery("(max-width: 1440px)");
    const [isLargeAndAbove] = useMediaQuery("(max-width: 2560px)");
    
    const [columnValues, setColumnValues] = useState('repeat(8, 1fr)');

    useEffect(() => {
        if (isMobile) {
            setColumnValues('repeat(1, 1fr)');
        } else if (isLargeMobile) {
            setColumnValues('repeat(2, 1fr)');
        } else if (isAvgLaptopDevice) {
            setColumnValues('repeat(5, 1fr)');
        } else if (isAvgDeskDevice) {
            setColumnValues('repeat(5, 1fr)');
        } else if (isLargeAndAbove) {
            setColumnValues('repeat(8, 1fr)');
        } else  {
            setColumnValues('repeat(8, 1fr)');
        }
    });
    
    return (
        <Box mt={10} mx={[10, 10, 16]}>
            <Flex
                flexDir={["column", "column", "column", "row"]}
                justify="space-between"
                align="center"
                textAlign="center"
            >
                <Heading variant="sectionTitle">
                    {category ? category.toUpperCase() : "ALL AMBASSADORS"}
                </Heading>

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

                    <Button
                        mt={["7", "7", "7", "0"]}
                        variant="searchBtn"
                        onClick={handleCategoryChange}
                    >
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
                    templateColumns={columnValues}
                >
                    {displayInfluencers?.length &&
                        displayInfluencers
                            .sort((a, b) => a.order - b.order)
                            .filter(
                                (_, index) =>
                                    index < (pageNo + 1) * dataPrePage &&
                                    index >= pageNo * dataPrePage
                            )

                            ?.map((influencer, index) => (
                                <InfluencersCard
                                    style={{ w: "100%", px: 4 }}
                                    colSpan={5}
                                    itemId={`item-${index}`}
                                    key={`item-${index}`}
                                    slug={influencer.slug}
                                    influencer={influencer}
                                />
                            ))}
                </Grid>
            </Box>
            {displayInfluencers?.length && displayInfluencers?.length > 0 ? (
                <Pagination
                    totalPages={totalPages}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                />
            ) : (
                <Box>
                  <Text fontSize='1xl' color={'white'} fontFamily={"Sora"}>No Record found</Text>
                </Box>
            )}
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
