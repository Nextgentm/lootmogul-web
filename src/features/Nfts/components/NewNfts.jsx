import {
    Box,
    Button,
    Center,
    Flex,
    Image,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import CategoryComponent from "../categoryComp";
import NftsCategories from "./NftsCategories";
import NftCardInCollection from "./NftsCategories/NftCardInCollection";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { BiFilterAlt } from "react-icons/bi";
import Breadcumb from "../../Influencers/components/Breadcumb";

const NewNfts = ({
    newNfts,
    selectedCategory,
    defaultCategories,
    selCategoriesData,
    data,
    isNewest,
    isMobileDevice,
    isToShowAll,
    nftSelectCategory,
    displayData,
    LeftArrow,
    RightArrow,
    priceRange,
    setPriceRange,
    setTempFilterValue,
    nftFilterCategory,
    breadcumbData
}) => {
    const ref = React.useRef();
    const lazyRootNew = React.useRef(null);
    const [showFilters, setShowFilters] = React.useState(data);
    const [isActive, setActive] = React.useState("false");


    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <Box mt={5}>
            {newNfts?.length && (
                <>
                    <Flex
                        justify={["center", "center", "space-between"]}
                        mt="20px"
                        align="center"
                        mb="20px"
                        textAlign={"center"}
                    >
                        <Text
                            color="white"
                            fontFamily="Blanch"
                            fontSize={["4rem", "4rem", "4rem", "5rem", "5rem"]}
                        >
                            NEWEST NFTS
                        </Text>
                    </Flex>

                    <Box px={1}>
                        <ScrollMenu
                            className="no-scrollbar"
                            apiRef={ref}
                            ref={lazyRootNew}
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                        >
                            {newNfts
                                ?.sort((a, b) => a.priority - b.priority)
                                .map((item, index) => (
                                    <NftCardInCollection
                                        itemId={`nftcard-${index}`}
                                        key={`nftcard-${index}`}
                                        slug={item.slug}
                                        showInfo={true}
                                        nft={item}
                                        lazyRoot={lazyRootNew}
                                        defaultInView={
                                            isMobileDevice
                                                ? index < 2
                                                : index < 4
                                        }
                                        cardWidth={[
                                            "84vw",
                                            "83vw",
                                            "370px",
                                            "370px"
                                        ]}
                                    />
                                ))}
                        </ScrollMenu>
                    </Box>
                </>
            )}

            {!selectedCategory ? (
                <Center>
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        mt={6}
                    >
                        EXPLORE NFT'S
                    </Text>
                </Center>
            ) : (
                <Flex
                    justifyContent={["space-between"]}
                    alignItems="center"
                    flexDirection={["column", "column", "row"]}
                >
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                    >
                        {selCategoriesData?.[0]?.name}
                    </Text>

                    <Flex alignItems="center" pos="relative">
                        <Button
                            variant={
                                !isActive ? "filterBtnSegment" : "filterBtn"
                            }
                            onClick={() => {
                                setShowFilters(true);
                                handleToggle();
                                //  nftSelectCategory(influencerCat.name.toLowerCase());
                            }}
                        >
                            FILTER
                            <Box ml="1em">
                                <BiFilterAlt color="#FFF" />
                            </Box>
                        </Button>
                        {!isActive ? (
                            <Box
                                pos="relative"
                                top="-8"
                                right="15px"
                                bg="#817688"
                                py="0.5"
                                px="1"
                                pt="0 !important"
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
            )}
            {selectedCategory && showFilters && !isActive && (
                <Flex
                    justifyContent={"space-around"}
                    w="100%"
                    h="100%"
                    mb="60px"
                    alignItems="center"
                    flexDirection={["column", "column", "column", "row"]}
                >
                    <CategoryComponent
                        defaultCategory={defaultCategories}
                        displayData={displayData}
                        selectedCategory={selectedCategory}
                        setTempFilterValue={setTempFilterValue}
                    ></CategoryComponent>

                    <Box w="250px" my={[8, 8, 8, 0]}>
                        <Text
                            color="#fff"
                            fontSize="16px"
                            fontWeight="600"
                            mb="-1"
                        >
                            PRICE RANGE
                        </Text>
                        <RangeSlider
                            defaultValue={[
                                priceRange?.min || 0.1,
                                priceRange?.max || 1
                            ]}
                            min={priceRange?.min || 0.1}
                            max={priceRange?.max || 1}
                            step={0.1}
                            onChangeEnd={(val) => {
                                let newPR = priceRange;
                                newPR.minSel = val[0];
                                newPR.maxSel = val[1];
                                setPriceRange(newPR);
                            }}
                        >
                            <RangeSliderTrack bg="#481A7F">
                                <RangeSliderFilledTrack bg="#E90A63" />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={2.5} index={0} />
                            <RangeSliderThumb boxSize={2.5} index={1} />
                        </RangeSlider>
                        <Text
                            color="#fff"
                            fontSize="16px"
                            fontWeight="600"
                            mt="-1"
                        >
                            {" "}
                            <Flex>
                                {" "}
                                PRICE : {priceRange?.minSel}
                                {/* <Image
                                    alt="Remaining Time"
                                    objectFit="contain"
                                    
                                    src={
                                        "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                                    }
                                    height="22px"
                                    width="22px"
                                /> */}{" "}
                                - {priceRange?.maxSel}{" "}
                                <Image
                                    alt="Remaining Time"
                                    objectFit="contain"
                                    src={
                                        "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                                    }
                                    height="22px"
                                    width="22px"
                                />
                            </Flex>
                        </Text>
                    </Box>
                    <Button
                        mt={["7", "0"]}
                        variant="searchBtn"
                        onClick={nftFilterCategory}
                    >
                        Search
                    </Button>
                </Flex>
            )}
            {isNewest && (
                <Flex
                    justify={"flex-end"}
                    mt="20px"
                    align="center"
                    mb="20px"
                    textAlign={"center"}
                >
                    {!isMobileDevice && (
                        <Flex
                            alignItems="center"
                            cursor="pointer"
                            onClick={() =>
                                router.push({
                                    pathname: "/nfts"
                                })
                            }
                        >
                            <Text
                                color="white"
                                fontFamily="Blanch"
                                fontSize={["1em", "1em", "1.5em", "2em", "2em"]}
                            >
                                VIEW ALL
                            </Text>
                            <Image
                                alt=""
                                src="/assets/rightArrow.png"
                                ml="0.5em"
                            />
                        </Flex>
                    )}
                </Flex>
            )}
            {!isNewest && !selectedCategory && (
                <>
                    <Flex mt={10} mx="auto" flexWrap="wrap">
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
                                nftSelectCategory(
                                    defaultCategories.toLowerCase()
                                );
                            }}
                        >
                            {" "}
                            <Text w="100%" whiteSpace={"pre-wrap"}>
                                {defaultCategories}
                            </Text>
                        </Button>
                        {displayData?.map((nfts, index) => (
                            <Button
                                w={["90vw", "90vw", "auto"]}
                                mr={["0px", "0px", "15px"]}
                                mt="20px"
                                key={index}
                                fontSize={[
                                    "20px !important",
                                    "20px !important",
                                    "16px !important"
                                ]}
                                fontWeight={500}
                                variant={"segment"}
                                onClick={() => {
                                    nftSelectCategory(nfts.name.toLowerCase());
                                }}
                            >
                                {" "}
                                <Text w="100%" whiteSpace={"pre-wrap"}>
                                    {nfts.name}
                                </Text>
                            </Button>
                        ))}
                    </Flex>
                </>
            )}

             <Breadcumb data={breadcumbData}></Breadcumb>

            <Flex w="100%" flexDir={"column"} px="1">
                {selCategoriesData
                    ?.sort((a, b) => a.priority - b.priority)
                    .map((nfts, index) => (
                        <NftsCategories
                            isMobileDevice={isMobileDevice}
                            key={`nftcategories-${index}`}
                            NFTS={nfts}
                            isSelectedCat={isToShowAll()}
                            index={index}
                        />
                    ))}
            </Flex>
        </Box>
    );
};

export default NewNfts;
