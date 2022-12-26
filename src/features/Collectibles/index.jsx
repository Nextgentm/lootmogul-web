import SEOContainer from "../SEOContainer";
import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import MultipleLoggedInUser from "../../components/MultipleLoggedInUser";
import Banner from "./Banner";
import { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import PriceFilter from "../../components/PriceFilter";
import Categories from "./Categories";
import CollectibleView from "./CollectibleView";
import MyPageLoader from "../../components/MyPageLoader";
import { useRouter } from "next/router";

const Collectibles = ({ data, banner }) => {
    const [selCategoriesData, setSelCategoriesData] = useState(data);
    const defaultCategories = "Overview";
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState(defaultCategories);
    const [bannerImage, setBannerImage] = useState(null);
    const [hideFilters, setHideFilters] = useState(false);
    const priceData = ["Price Low To High", "Price High To Low"];
    const [breadcumbData, setBreadcumbData] = useState([]);
    const [subHeader, setSubHeader] = useState('');
    const [isSubPage, setIsSubPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // this is to handle refresh scnerio 
    useEffect(() => {
        debugger;
        if (JSON.stringify(router.query) !== '{}') {
            const category = data.find(c => c.slug.toLowerCase() === router.query.slug.toLowerCase());
            setSelectedCategory(category.name);
            setIsSubPage(true);
        } else {
            setSelectedCategory(defaultCategories);
            setIsSubPage(false);
        }
    }, []);

    useEffect(() => {
        try {
            if (selectedCategory.toLocaleLowerCase() !== 'overview') {
                const selectedData = data.filter(c => c.name.toLowerCase() === selectedCategory.toLowerCase())
                setSelCategoriesData(selectedData);
                const image = !isTabletOrDesktop
                    ? selectedData[0].banner?.data[1].url
                    : selectedData[0].banner?.data[0].url;
                setBannerImage(image);
            } else {
                setSelCategoriesData(data);
                const image = !isTabletOrDesktop
                    ? banner?.[1]?.url || banner?.[0]?.url
                    : banner[0]?.url;
                setBannerImage(image);
            }
        } catch (error) {
            setBannerImage(null);
        }
    }, [selectedCategory]);

    // this effect is to chnage the url after selectedCategoryData is updated
    useEffect(() => {
        if (selectedCategory.toLocaleLowerCase() !== 'overview') {
            window.history.replaceState(selectedCategory, selectedCategory, "/collectibles/" + selCategoriesData[0].slug);
        } else {
            window.history.replaceState(selectedCategory, selectedCategory, "/collectibles");
        }
    }, [selCategoriesData]);

    const nftSearch = (value) => {
        // if (value !== '') {
        //     debugger;
        //     if (selectedCategory.toLocaleLowerCase() !== 'overview') {
        //        selCategoriesData.forEach(nft => {
        //             nft.nftSet = nft.nftSet.filter((s) =>
        //                 s.nft_kred.data.slug.includes(value)
        //             );
        //         });
        //         setSelCategoriesData(selCategoriesData);
        //     }
        // } else {
        //     const selectedData = data.filter(c => c.name.toLowerCase() === selectedCategory.toLowerCase())
        //     setSelCategoriesData(selectedData);
        // }
    };

    const nftPriceSorting = () => { };

    const nftSelectCategory = (value) => {
        setIsLoading(true);
        setIsSubPage(value.toLowerCase() === defaultCategories.toLowerCase() ? false : true);
        setSelectedCategory(value);
        setBreadcumbData([
            { text: "Overview", url: "/nfts", isCurrentPage: false },
            { text: value, url: "/nfts/" + selCategoriesData[0]?.slug, isCurrentPage: true }
        ]);
        setSubHeader(value.toString().toUpperCase());
        setIsLoading(false);
    };

    return (
        <><Box mx={["6vw"]}>
            {/* Need to recheck the details */}
            {/* <SEOContainer
                seoData={selCategoriesData[0]?.seo
                    ? selCategoriesData[0]?.seo
                    : selCategoriesData[0]}
                content={selCategoriesData[0]} /> */}
            {isLoading && <MyPageLoader></MyPageLoader>}

            <Banner isSubPage={isSubPage} banner={bannerImage} />

            <Box mt={5}>
                {/* Explore Option */}
                <Flex
                    justifyContent={["space-between"]}
                    alignItems="center"
                    flexDirection={["column", "column", "row"]}
                >
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        inlineSize={"100"}
                    >
                        EXPLORE
                    </Text>
                    {/* desktop Filters */}

                    {(!isMobileDevice && selectedCategory.toLowerCase() !== defaultCategories.toLowerCase()) && <Flex alignItems="center" pos="relative">
                        <>
                            <InputGroup marginRight={"20px"}>
                                <InputLeftElement
                                    className="InputLeft"
                                    pointerEvents="none"
                                    children={
                                        <SearchIcon
                                            className="SearchIcon"
                                            color="gray.300"
                                        />
                                    }
                                    size="xs"
                                />
                                <Input
                                    type="search"
                                    placeholder="Search by name or attributes"
                                    color={"white"}
                                    onChange={(e) => {
                                        nftSearch(e.target.value);
                                    }}
                                />
                            </InputGroup>

                            {/* <PriceFilter
                                priceData={priceData}
                                nftPriceSorting={nftPriceSorting}
                            ></PriceFilter> */}
                        </>
                    </Flex>}
                </Flex>

                {/* // Mobile Filter with categories */}

                {isMobileDevice && <>
                    <InputGroup marginBottom={"45px"}>
                        <InputLeftElement
                            className="InputLeft"
                            pointerEvents="none"
                            children={
                                <SearchIcon
                                    className="SearchIcon"
                                    color="gray.300"
                                />
                            }
                            size="xs"
                        />
                        <Input
                            type="search"
                            placeholder="Search"
                            color={"white"}
                            SearchIcon
                            onChange={(e) => {
                                nftSearch(e.target.value);
                            }}
                        />
                    </InputGroup>

                    <Categories
                        defaultCategory={defaultCategories}
                        displayData={data}
                        selectedCategory={selectedCategory}
                        // setTempFilterValue={''}
                        nftSelectCategory={nftSelectCategory}
                    ></Categories>

                    {/* <PriceFilter
                        priceData={priceData}
                        nftPriceSorting={nftPriceSorting}
                    ></PriceFilter> */}
                </>}

                {/* // Desktop Categories */}
                {!isMobileDevice && <>
                    <Flex
                        mt={10}
                        mx="auto"
                        flexWrap="wrap"
                        alignContent={"center"}
                    >
                        {/* Overview Button */}

                        <Button
                            w={["95vw", "95vw", "auto"]}
                            mr={["0px", "0px", "15px"]}
                            mt="20px"
                            fontSize={[
                                "20px !important",
                                "20px !important",
                                "16px !important"
                            ]}
                            fontWeight={500}
                            variant={"segment"}
                            onClick={() => {
                                nftSelectCategory(
                                    defaultCategories.toLowerCase()
                                );
                            }}
                            _focus={{
                                bgImage:
                                    "linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            }}
                            bgImage={
                                selectedCategory == defaultCategories &&
                                "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                            }
                        >
                            <Text fontWeight={500}>{defaultCategories}</Text>
                        </Button>

                        {data?.map((cat, index) => (
                            <Button
                                key={index}
                                w={["90vw", "90vw", "auto"]}
                                mr={["0px", "0px", "15px"]}
                                mt="20px"
                                fontSize={[
                                    "20px !important",
                                    "20px !important",
                                    "16px !important"
                                ]}
                                fontWeight={500}
                                variant={"segment"}
                                onClick={() => {
                                    nftSelectCategory(cat.name.toLowerCase());
                                }}
                                _focus={{
                                    bgImage:
                                        "linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                }}
                                bgImage={
                                    selectedCategory.toLowerCase() ===
                                    cat.name.toLowerCase() &&
                                    "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                                }
                            >
                                <Text>{cat.name}</Text>
                            </Button>
                        ))}
                    </Flex>
                </>}

                {/* desktop bredcrumb */}
                {(!isMobileDevice && selectedCategory.toLowerCase() !== defaultCategories.toLowerCase()) && <BreadCrumb data={breadcumbData} mxValue={[]}></BreadCrumb>}

                {/* // Category subheader */}

                <Flex
                    justifyContent={["space-between"]}
                    alignItems="center"
                    flexDirection={["column", "column", "row"]}
                >
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        inlineSize={"100"}
                    >
                        {subHeader}
                    </Text>
                </Flex>

                {/* Overview Data and ALL Data */}
                {/* isSubPage will toggle between overview and other pages */}

                <Flex w="100%" flexDir={"column"} px="1">
                    {selCategoriesData
                        ?.sort((a, b) => a.priority - b.priority)
                        .map((nfts, index) => (
                            <CollectibleView
                                isMobileDevice={isMobileDevice}
                                key={`nftcategories-${index}`}
                                NFTS={nfts}
                                isSelectedCat={false}
                                index={index}
                                nftSelectCategory={nftSelectCategory}
                                showAllData={true}
                                displayAllData={true}
                                isSubPage={isSubPage}
                            />
                        ))}
                </Flex>
            </Box>

            <MultipleLoggedInUser></MultipleLoggedInUser>
        </Box>
        </>
    )

}

export default Collectibles;