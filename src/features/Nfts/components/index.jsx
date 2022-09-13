import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Flex,

    Select,
    SimpleGrid,
    Text,
    Wrap,
    WrapItem,
    Image,

} from "@chakra-ui/react";

import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import SEOContainer from "../../SEOContainer";
import { useRouter } from "next/router";

import NftsCategories from "./NftsCategories";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "./NftCard";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";
import ViewAllBtn from "../../../components/ViewAllBtn";

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
const Nfts = ({ data, selectedCategory, banner, newNfts }) => {
    const router = useRouter();
    const [featuredNfts, setFeaturedNfts] = useState([]);
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [selCategoriesData, setSelCategoriesData] = useState(data);

    const defaultCategories = "All";
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState(defaultCategories);
    const ref = React.useRef();

    const lazyRootNew = React.useRef(null);

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
        { label: "nft" }
    ];

    const { callAuthService } = useContext(AppContext);

    useEffect(() => {
        callAuthService("google", router.query.access_token)
    }, []);

    useEffect(async () => {
        
        if (data && data?.length > 0 && options.length == 0) {
            options.push(defaultCategories);
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategories(defaultCategories);
            setDisplayData(data);
        }
    }, [data]);

    const nftSelectCategory = (e) => {
        const newCategory = e.target?.value || e;
        if (newCategory === defaultCategories.toString().toLowerCase()) {
            router.push(
                {
                    pathname: "/nfts"
                },
                undefined,
                { shallow: true }
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === newCategory
            );

            router.push(
                {
                    pathname: "/nfts/" + selData[0].slug
                },
                undefined,
                { shallow: true }
            );
        }
        setCategories(newCategory);
    };
    useEffect(() => {
        if (data && selectedCategory=="newest") {
            // setCategories("NEWEST");
            setSelCategoriesData(data);
        }else
        if (data && selectedCategory) {
            let selData = data.filter((item) => item.slug === selectedCategory);
            setCategories(selData[0].name.toLowerCase());
            setSelCategoriesData(selData);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (displayData && categories) {
            setSortBy("Sort by");
            if (categories.toLowerCase() !== defaultCategories.toLowerCase()) {
                const selData = displayData.filter(
                    (cat) => cat.name.toLowerCase() === categories.toLowerCase()
                );

                setSelCategoriesData(selData);
            } else {
                setSelCategoriesData(displayData);
            }
        }
    }, [categories, displayData]);

    const handleSortByChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
    };
    useEffect(() => {
        if (selectedCategory) return;
        if (sortBy.toLowerCase() === "alphabetical") {
            const newCatData = selCategoriesData?.map((cat) => {
                cat.nfts?.data?.sort((a, b) => (a.name > b.name ? 1 : -1));
                return cat;
            });
            setSelCategoriesData(newCatData);
        } else {
            const newCatData = selCategoriesData?.map((cat) => {
                cat.nfts?.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
                return cat;
            });
            setSelCategoriesData(newCatData);
        }
    }, [sortBy]);
    const getBannerImage = () => {
        if (selectedCategory && selCategoriesData) {
            if (selCategoriesData[0] && selCategoriesData[0].banner?.data) {
                return !isTabletOrDesktop
                    ? selCategoriesData[0].banner?.data[1].url
                    : selCategoriesData[0].banner?.data[0].url;
            } else {
                return null;
            }
        } else if (
            banner &&
            (banner ||
                categories.toLowerCase() === defaultCategories.toLowerCase())
        ) {
            return !isTabletOrDesktop ? banner[1]?.url : banner[0]?.url;
        } else {
            return null;
        }
    };
    const isToShowAll = () => {
        return (
            selectedCategory ||
            (categories &&
                categories.toLowerCase() !== defaultCategories.toLowerCase())
        );
    };
    return (
        <Box mx={["6vw"]}>
            {selectedCategory && selCategoriesData?.[0] && (
                <SEOContainer
                    seoData={
                        selCategoriesData[0]?.seo
                            ? selCategoriesData[0]?.seo
                            : selCategoriesData[0]
                    }
                    content={selCategoriesData[0]}
                />
            )}
            {router.pathname === "/nfts/[id]" || router.pathname === "/nfts/newest" ? (
                <>
                    <Box>
                        <Flex
                            flexDirection={[
                                "column",
                                "column",
                                "column",
                                "row",
                                "row"
                            ]}
                            bg="linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.33) 50.79%, rgba(18, 50, 98, 0) 101.39%);"
                            // columns={[1, 1, 1, 2]}
                            spacing={10}
                        >
                            <Box
                                order="1"
                                pb={12}
                                pt={["3em", "3em", "3em", "6em", "6em"]}
                            >
                                <Box mt={!isMobileDevice ? 10 : 0}>
                                    {selCategoriesData?.map((nfts, index) => (
                                        <Text
                                            textAlign={[
                                                "center",
                                                "center",
                                                "center",
                                                "left",
                                                "left"
                                            ]}
                                            color="white"
                                            fontSize={[
                                                "38px",
                                                "3.2em",
                                                "5em",
                                                "3.5em",
                                                "4em"
                                            ]}
                                            fontFamily="CNN"
                                        >
                                            {nfts.name} Collection
                                        </Text>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                                order="2"
                                bgSize="cover"
                                textAlign={"center"}
                                // px={["1", "2", "3", "10"]}
                                pb={12}
                                pt={12}
                            >
                                {getBannerImage() && (
                                    <Box
                                        ml={["20px", "20px", "20px", "60px"]}
                                        mr={["20px", "20px", "20px", "60px"]}
                                    >
                                        <Flex
                                            position="relative"
                                            w="100%"
                                            // h={"500px"}
                                            // pt={"20px"}
                                        >
                                            {isMobileDevice ? (
                                                <Image
                                                    m={"auto"}
                                                    alt={`nft-banner`}
                                                    src="/assets/nftcategorymobile.png"
                                                    className="custom-img"
                                                    layout="fill"
                                                    w="100%"
                                                    h="600px"
                                                />
                                            ) : (
                                                <Image
                                                    m={"auto"}
                                                    alt={`nft-banner`}
                                                    src="/assets/nftcategorydesktop.png"
                                                    className="custom-img"
                                                    layout="fill"
                                                    w="100%"
                                                    h="600px"
                                                />
                                            )}
                                        </Flex>
                                    </Box>
                                )}
                            </Box>
                        </Flex>
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        {/* <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} /> */}
                        <SimpleGrid
                            direction={"column-reverse"}
                            columns={[1, 1, 1, 2]}
                            spacing={10}
                            pt={[10, 10, 10, 20, 20]}
                            pb={12}
                        >
                            <Box order="1">
                                <Text
                                    variant="headText"
                                    fontSize={[
                                        "2rem",
                                        "3.2em",
                                        "3.5rem",
                                        "4rem",
                                        "4rem"
                                    ]}
                                >
                                    Buy and Trade <br />
                                    Your favorite <br />
                                    Influencers NFT
                                    {/* <span style={{ color: "#F8ED1D" }}>
                                    New releases
                                </span> */}
                                </Text>

                                <Text
                                    color="white"
                                    fontSize={[
                                        "1rem",
                                        "1.2rem",
                                        "1.2rem",
                                        "1.2em",
                                        "1.5rem"
                                    ]}
                                    fontWeight="normal"
                                    mt="1rem"
                                    width={"90%"}
                                >
                                    Become a virtual landlord to some of the
                                    largest projects in crypto
                                </Text>

                                <Button
                                    mt={6}
                                    fontSize={["1.5rem"]}
                                    onClick={() => {
                                        executeScroll(0);
                                    }}
                                >
                                    BUY NFTS
                                </Button>
                            </Box>
                            <Box order="2" bgSize="cover" textAlign={"center"}>
                                {getBannerImage() && (
                                    <Flex>
                                        <Image
                                            m={"auto"}
                                            alt={`nft-banner`}
                                            src="/assets/designupdate1/nft_banner.png"
                                            className="custom-img"
                                            layout="fill"
                                            width={"100%"}
                                            height={"100%"}
                                            // boxSize="500px"
                                        />
                                    </Flex>
                                )}
                            </Box>
                        </SimpleGrid>
                    </Box>
                </>
            )}

            <Box mt="30px" mb="30px">
                {/* <Box
                    ml={["20px", "20px", "20px", "60px"]}
                    mr={["20px", "20px", "20px", "60px"]}
                    mt="20px"
                >
                    <Flex
                        justify="flex-start"
                        mt="20px"
                        align="center"
                        mb="20px"
                    >
                        <HStack spacing="24px" mt="50px">
                            <SelectBox
                                style={{
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "30px",
                                    alignItems: "center",
                                    width: "170px"
                                }}
                                value={categories}
                                icon={<CategoryIcon color="#FFFFFF" />}
                                title="All Category"
                                options={options}
                                onChange={nftSelectCategory}
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
                    </Flex>
                </Box> */}

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
                                 variant="secHeadText"
                                fontSize={[
                                    "2rem",
                                    "2.5rem",
                                    
                                ]}
                            >
                                NEWEST NFTS
                            </Text>
                            {!isMobileDevice && (
                                <Box
                                    onClick={() =>
                                        router.push({
                                            pathname: "/nfts/newest"
                                        })
                                    }
                                >
                                    <ViewAllBtn />
                                </Box>
                            )}
                        </Flex>

                        <Box
                            mx={["0px", "0px", "-40px"]}
                            // mx={["15px", "15px", "30px", "30px", "30px"]}
                        >
                           
                            <ScrollMenu
                                className="no-scrollbar"
                                apiRef={ref}
                                ref={lazyRootNew}
                                LeftArrow={LeftArrow}
                                RightArrow={RightArrow}
                            >
                                {newNfts.map((item, index) => (
                                    <NftCard
                                        // style={{ w: "250px", mr: "30px", mt: "10px" }}
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
                                    />
                                ))}
                            </ScrollMenu>
                        </Box>
                    </>
                )}

                <Center>
                    <Text
                        variant="secHeadText"
                        fontSize={["2.5em", "2em"]}
                      
                        mt={6}
                    >
                        EXPLORE NFT'S
                    </Text>
                </Center>
                <Wrap mt={20} w="100%" spacingX="20px">
                    {selCategoriesData?.map((nfts, index) => (
                        <WrapItem
                            width={["100%", "100%", "300px", "300px", "300px"]}
                        >
                            <Button
                                mt={2}
                                variant={"segment"}
                                fontSize={["28px", "24px"]}
                                width={"100%"}
                                onClick={() => {
                                    nftSelectCategory(nfts.name.toLowerCase());
                                }}
                            >
                                {nfts.name}
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>
                <Box>
                    {selCategoriesData?.map((nfts, index) => (
                        <NftsCategories
                            isMobileDevice={isMobileDevice}
                            key={`nfts-${index}`}
                            NFTS={nfts}
                            isSelectedCat={isToShowAll()}
                            index={index}
                        />
                    ))}
                </Box>
                {/* {categories.toLowerCase() !== defaultCategories.toLowerCase() &&
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
                              
                                Description
                            </Heading>
                            <ReadMoreLess
                                read={selCategoriesData[0].description}
                                lines={7}
                            />
                        </Box>
                    )} */}
            </Box>
        </Box>
    );
};

export default Nfts;
