
import NftBanner from "../../Nfts/components/NftBanner";
import NftDetailBanner from "../../Nfts/components/NftDetailBanner";
import SEOContainer from "../../SEOContainer";
import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Grid
} from "@chakra-ui/react";
import { AppContext } from "../../../utils/AppContext/index";
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";
import Banner from "./Banner";
import { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import CategoryComponent from "../../Nfts/categoryComp";
import CategoryPriceComponent from "../../Nfts/CategoryPriceComponent";
import BreadCrumb from "../../../components/BredCrumb/BredCrumb";
import NftsCategories from "../../Nfts/components/NftsCategories";

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
    
    useEffect(() => {
        try {
            // isParent Overview page
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

    const nftSearch = (e) => {

    };

    const nftPriceSorting = () => { };

    const nftSelectCategory = (value) => {
        setIsSubPage(value.toLowerCase() === defaultCategories.toLowerCase() ? false : true);
        setSelectedCategory(value);
    };

    return (
        <><Box mx={["6vw"]}>
            <SEOContainer
                seoData={selCategoriesData[0]?.seo
                    ? selCategoriesData[0]?.seo
                    : selCategoriesData[0]}
                content={selCategoriesData[0]} />

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
                   
                   {!isMobileDevice &&  <Flex alignItems="center" pos="relative">
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
                                    SearchIcon
                                    onChange={(e) => {
                                        nftSearch(e.target.value);
                                    }}
                                />
                            </InputGroup>

                            <CategoryPriceComponent
                                priceData={priceData}
                                nftPriceSorting={nftPriceSorting}
                            ></CategoryPriceComponent>
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

                    <CategoryComponent
                        defaultCategory={defaultCategories}
                        displayData={selCategoriesData}
                        selectedCategory={selectedCategory}
                        setTempFilterValue={''}
                        nftSelectCategory={nftSelectCategory}
                    ></CategoryComponent>

                    {/* <CategoryPriceComponent
                        priceData={priceData}
                        nftPriceSorting={nftPriceSorting}
                    ></CategoryPriceComponent> */}
                </>}

                {/* // Desktop Categories */}
                <>
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

                        {/* ALl NFTS Button */}

                        {/* <Button
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
                                    defaultCategories
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
                            <Text fontWeight={500}>All NFTs</Text>
                        </Button> */}

                        {data?.map((cat, index) => (
                            <Button
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
                                    selectedCategory ===
                                    cat.name.toLowerCase() &&
                                    "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                                }
                            >
                                <Text>{cat.name}</Text>
                            </Button>
                        ))}

                        {/* desktop bredcrumb */}
                        <BreadCrumb data={breadcumbData} mxValue={[]}></BreadCrumb>

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
                                    <NftsCategories
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



                    </Flex>
                </>
            </Box>

            <MultipleLoggedInUser></MultipleLoggedInUser>
        </Box>
        </>
    )

}

export default Collectibles;