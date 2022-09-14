import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    Heading,
    HStack,
    Select,
    SimpleGrid,
    Text,
    Wrap,
    WrapItem,
    Image,
    GridItem
} from "@chakra-ui/react";
// import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import Breadcrumbs from "../../../components/Breadcrumbs/index";
import { CategoryIcon, SortIcon } from "../../../components/Icons";
import SEOContainer from "../../SEOContainer";
import ReadMoreLess from "../../Influencers/ReadMoreLess";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";

import NftsCategories from "./NftsCategories";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "./NftCard";
import ContentNavigator from "../../../components/ContentNavigator";
import CardNavigator from "../../../components/CardNavigator";
import { LeftArrow, RightArrow } from "../../../components/ContentNavigator/arrows";

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

    if(router.query.access_token){
        if(router.query.provider == "facebook"){
            callAuthService("facebook", router.query.access_token)
        }else{
            callAuthService("google", router.query.access_token)
        }
    }

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
            {selectedCategory && selCategoriesData && selCategoriesData[0] && (
                <SEOContainer
                    seoData={
                        selCategoriesData[0]?.seo
                            ? selCategoriesData[0]?.seo
                            : selCategoriesData[0]
                    }
                    content={selCategoriesData[0]}
                />
            )}
            {router.pathname === "/nfts/[id]" ? (
                // <>
                 
                    <Box mx={"-9vw"} 
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
                                            {isMobileDevice?( <Image
                                                m={"auto"}
                                                alt={`nft-banner`}
                                                src={getBannerImage()}
                                                className="custom-img"
                                                layout="fill"
                                                w="100%"
                                                h="600px"
                                            />):( <Image
                                                m={"auto"}
                                                alt={`nft-banner`}
                                                src={getBannerImage()}
                                                className="custom-img"
                                                layout="fill"
                                                w="100%"
                                                h="600px"
                                            />)}
                                           
                                        </Flex>
                                    </Box>
                                )}
                            </Box>
                   
            ) : (
                <>
                    
                    <Box >
                        {/* <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} /> */}
                        <SimpleGrid
                            direction={"column-reverse"}
                            columns={[1, 1, 1, 2]}
                            spacing={10}
                            pt={[10, 10, 10,20,20]}
                            pb={12}
                        >
                            <Box
                                order="1"
                                
                                
                            >
                                
                                    <Text
                                        color="white"
                                        fontSize={[
                                            "2rem",
                                            "3.2em",
                                            "3.5rem",
                                            "4rem",
                                            "4rem"
                                        ]}
                                        fontFamily="CNN"
                                        
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
                                        Become a virtual landlord to 
                                        some of the largest projects in
                                        crypto
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
                            <Box
                                order="2"
                                bgSize="cover"
                                textAlign={"center"}
                            >
                                {getBannerImage() && (
                                    <Flex
                                    >
                                      
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

            <Box
                mt="30px"
                mb="30px"
            >
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
                            justify={["center","center","space-between"]}
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
                            {!isMobileDevice  && <Flex alignItems="center">
                                <Text
                                    color="white"
                                    fontFamily="Blanch"
                                    fontSize={[
                                        "1em",
                                        "1em",
                                        "1.5em",
                                        "2em",
                                        "2em"
                                    ]}
                                >
                                    VIEW ALL
                                </Text>
                                <Image
                                    alt=""
                                    src="/assets/rightArrow.png"
                                    ml="0.5em"
                                    onClick={() =>
                                        router.push({
                                            pathname: "/nfts/newest"
                                        })
                                    }
                                />
                            </Flex>}
                        </Flex>

                        <Box px={["1rem","0rem"]}
                        // mx={["-20px","-40px"]}   
                        
                            // mx={["15px", "15px", "30px", "30px", "30px"]}
                        >
                            {/* <CardNavigator
                                showArrows={true}
                                handleLeftArrowClick={() =>
                                    ref.current.scrollPrev()
                                }
                                handleRightArrowClick={() =>
                                    ref.current.scrollNext()
                                }
                            > */}
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
                            {/* </CardNavigator> */}
                        </Box>
                    </>
                )}

               {! selectedCategory ? <Center>
                    <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        mt={6}
                    >
                        EXPLORE NFT'S
                    </Text>
                </Center>
                :
                <Text
                        color="white"
                        fontSize={["3em", "4em"]}
                        fontFamily="Blanch"
                        mt={6}
                    >
                        {selCategoriesData?.[0].name}
                    </Text>
                }
                <Flex mt={10} ml={["10px","20px"]} flexWrap="wrap" justifyContent={["center","flex-start"]}> 
                    {displayData?.map((nfts, index) => (
                        <Box w={[240, 240, 120, 200, 200]} mx={["10px","20px"]}  my={["10px","20px"]}>
                            <Button
                            w="100%"
                                py="1.5em"
                                mt={2}
                                variant={"segment"}
                                fontSize={[
                                    "15px !important",
                                    "11px !important",
                                    "10px !important",
                                    "13px !important",
                                    "15px !important"
                                ]}
                               
                                onClick={() => {
                                    nftSelectCategory(nfts.name.toLowerCase());
                                }}
                            >
                                {nfts.name}
                            </Button>
                        </Box>
                    ))}
                </Flex>
                <Flex m="auto" w="100%" flexDir={"column"}>
                    {selCategoriesData?.map((nfts, index) => (
                        <NftsCategories
                            isMobileDevice={isMobileDevice}
                            key={`nfts-${index}`}
                            NFTS={nfts}
                            isSelectedCat={isToShowAll()}
                            index={index}
                        />
                    ))}
                </Flex>
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
