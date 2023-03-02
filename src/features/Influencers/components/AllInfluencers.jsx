import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    useMediaQuery,
    Image,
    Link
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import ReadMoreLess from "../ReadMoreLess";
import CategoryComponent from "./categoryComp";
import InfluencersCard from "./InfluencersCategories/InfluencersCard";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import AppContext from "../../../utils/AppContext";
import { useWindowWidth } from "@react-hook/window-size";

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
    const [isAvgLaptopDevice] = useMediaQuery("(max-width: 1366px)");
    const [isAvgDeskDevice] = useMediaQuery("(max-width: 1600px)");
    const [isLargeDesk] = useMediaQuery("(max-width: 1920px)");
    const [isLargeAndAbove] = useMediaQuery("(max-width: 2560px)");
    const [isNormalDesktop] = useMediaQuery("(max-width: 1440px)");
    const [isMediumMobileview] = useMediaQuery("(max-width: 414px)");
    const [isSmallDesktop] = useMediaQuery("(max-width: 1536px)");
    const [isSmDesktop] = useMediaQuery("(max-height: 864px)");

    const [columnValues, setColumnValues] = useState("repeat(8, 1fr)");
    const onlyWidth = useWindowWidth();
    const [width, setWidth] = useState("");
    const [hight, setHight] = useState("");
    const [marLeft, setMarLeft] = useState("");

    useEffect(() => {
        if (isMobile) {
            if (onlyWidth === 720) {
                setColumnValues("repeat(2, 1fr)");
                setHight("320px");
                setWidth("365px");
                setMarLeft("-25px");
            } else if (onlyWidth === 375){
                setColumnValues("repeat(1, 1fr)");
                setHight("325px");
                setWidth("378px");
                setMarLeft("-37px");
            } else if (onlyWidth === 414){
                setColumnValues("repeat(1, 1fr)");
                setHight("325px");
                setWidth("410px");
                setMarLeft("-37px");
            }
            else if (onlyWidth === 721){
                setColumnValues("repeat(1, 1fr)");
                setHight("325px");
                setWidth("410px");
                setMarLeft("-37px");
            }
            else {
                setColumnValues("repeat(1, 1fr)");
                setHight("325px");
                setWidth("368px");
                setMarLeft("-37px");
            }
        } else if (isAvgLaptopDevice) {
            setColumnValues("repeat(5, 1fr)");
            setHight("328px");
            setWidth("254px");
            setMarLeft("-13px");
            
        }
        else if (isAvgLaptopDevice) {
            setColumnValues("repeat(5, 1fr)");
            setHight("328px");
            setWidth("254px");
            setMarLeft("-13px");
            
        }
        else if (isNormalDesktop) {
            setColumnValues("repeat(5, 1fr)");
            setHight("328px");
            setWidth("256px");
            setMarLeft("-9px"); 
        } else if (isAvgDeskDevice) {
            setColumnValues("repeat(5, 1fr)");
            setHight("328px");
            setWidth("252px");
            setMarLeft("11px");
        } else if (isLargeDesk) {
            setColumnValues("repeat(8, 1fr)");
            setHight("328px");
            setWidth("252px");
            setMarLeft("-23px");
        } 
         else if (isLargeAndAbove) {
            setColumnValues("repeat(8, 1fr)");
            setHight("328px");
            setWidth("250px");
            setMarLeft("18px");
        } else {
            setColumnValues("repeat(8, 1fr)");
            setHight("338px");
            setWidth("350px");
            setMarLeft("0px");
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
                <Grid flexWrap="wrap" gap={5} templateColumns={columnValues}>
                    {displayInfluencers?.length &&
                        displayInfluencers
                            .sort((a, b) => a.order - b.order)
                            .filter(
                                (_, index) =>
                                    index < (pageNo + 1) * dataPrePage &&
                                    index >= pageNo * dataPrePage
                            )

                            ?.map((influencer, index) => (
                                <Link href={"/influencer/" + influencer.slug}>
                                    <Flex>
                                        <InfluencersCard
                                            style={{ w: "100%" }}
                                            colSpan={2}
                                            itemId={`item-${index}`}
                                            key={`item-${index}`}
                                            slug={influencer.slug}
                                            influencer={influencer}
                                        />
                                        <Image
                                            height={hight}
                                            width={width}
                                            pos="absolute"
                                            src="/assets/side_Frame.png"
                                            ml={marLeft}
                                            mt={"-28px"}
                                            // left={0}
                                            // right={0}                                          
                                        />
                                    </Flex>
                                </Link>
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
                    <Text fontSize="1xl" color={"white"} fontFamily={"Sora"}>
                        No Record found
                    </Text>
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
