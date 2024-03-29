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
import React from "react";
import CategoryComponent from "../categoryComp";
import CategoryPriceComponent from "../CategoryPriceComponent";
import NftsCategories from "./NftsCategories";
import { useContext, useRef } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import Breadcumb from "../../Influencers/components/Breadcumb";
import { SearchIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
const NftCard = dynamic(() => import("./NftCard"));

const NewNfts = ({
    newNfts,
    selectedCategory,
    defaultCategories,
    selCategoriesData,
    data,
    nftPriceSorting,
    nftSearch,
    isNewest,
    isToShowAll,
    nftSelectCategory,
    displayData,
    LeftArrow,
    RightArrow,
    priceRange,
    setPriceRange,
    setTempFilterValue,
    nftFilterCategory,
    breadcumbData,
    subHeader,
    hideFilters,
    secondDefaultCategories,
    showAllData,
    displayAllData,
    isSubPage
}) => {
    const ref = React.useRef();
    const lazyRootNew = React.useRef(null);
    const { isMobileDevice } = useContext(AppContext);
    const [showFilters, setShowFilters] = React.useState(data);
    const [isActive, setActive] = React.useState("false");
    const priceData = ["Price Low To High", "Price High To Low"];
    const lazyRoot = useRef(null);

    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <Box mt={5}>
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

                <Flex alignItems="center" pos="relative">
                    {selectedCategory && !isMobileDevice && !hideFilters && (
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
                    )}
                </Flex>
            </Flex>


            {isMobileDevice && selectedCategory && !hideFilters ? (
                <>
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
                        displayData={displayData}
                        selectedCategory={selectedCategory}
                        setTempFilterValue={setTempFilterValue}
                        nftSelectCategory={nftSelectCategory}
                    ></CategoryComponent>

                    <CategoryPriceComponent
                        priceData={priceData}
                        nftPriceSorting={nftPriceSorting}
                    ></CategoryPriceComponent>
                </>
            ) : (
                <>
                    <Flex
                        mt={10}
                        mx="auto"
                        flexWrap="wrap"
                        alignContent={"center"}
                    >
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
                                    secondDefaultCategories
                                );
                            }}
                            _focus={{
                                bgImage:
                                    "linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            }}
                            bgImage={
                                selectedCategory == secondDefaultCategories &&
                                "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                            }
                        >
                            <Text fontWeight={500}>All NFTs</Text>
                        </Button>

                        {displayData?.map((cat, index) => (
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
                    </Flex>
                </>
            )}

            <Breadcumb data={breadcumbData} mxValue={[]}></Breadcumb>

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

            {showAllData ? (
                <Grid
                    templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(4, 1fr)",
                    "repeat(4, 1fr)",
                    ]}
                    rowGap={10}
                    mt="40px"
                    mx="auto"
                    gap={6}
                    width="100%"
                    justifyContent="center"
                >
                    {displayAllData?.map((item, index) => (
                        <NftCard
                        itemId={`nftcard-${index}`}
                        key={`nftcard-${index}`}
                        slug={item?.nft_kred?.data.slug}
                        showInfo={true}
                        nft={item?.nft_kred?.data}
                        defaultInView={isMobileDevice ? index < 2 : index < 5}
                        lazyRoot={lazyRoot}
                        />
                    ))}
                </Grid>
            ) : (
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
                                showAllData={showAllData}
                                displayAllData={displayAllData}
                                isSubPage={isSubPage}
                            />
                        ))}
                </Flex>
            )}
            

        </Box>
    );
};

export default NewNfts;
