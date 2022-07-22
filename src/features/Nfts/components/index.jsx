import React, { useEffect, useState } from "react";
import { Box, Flex, Heading,HStack, Select } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import Breadcrumbs from "../../../components/Breadcrumbs/index";
import { CategoryIcon, SortIcon } from "../../../components/Icons";
import SEOContainer from "../../SEOContainer";
import ReadMoreLess from "../../Influencers/ReadMoreLess";

import { useRouter } from "next/router";

import NftsCategories from "./NftsCategories";
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
const Nfts = ({ data, selectedCategory, banner }) => {
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
        const newCategory = e.target.value;
        if (e.target.value === defaultCategories.toString().toLowerCase()) {
            router.push(
                {
                    pathname: "/nfts"
                },
                undefined,
                { shallow: true }
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === e.target.value
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
    const getBannerImage = ()=>{
        
        if(selectedCategory && selCategoriesData ){
        if(selCategoriesData[0] && selCategoriesData[0].banner?.data){
            return !isTabletOrDesktop
            ? selCategoriesData[0].banner?.data[1].url
            : selCategoriesData[0].banner?.data[0].url
        }
        else{
return null;
        } 

        }else if(banner && (banner || (categories.toLowerCase() === defaultCategories.toLowerCase()))) {
          return  !isTabletOrDesktop
            ? banner[1]?.url
            : banner[0]?.url
        }         else{
            return null;
                    } 
    }
    const isToShowAll = ()=>{
        return ((selectedCategory || ((categories && categories.toLowerCase() !== defaultCategories.toLowerCase()))));
            }
    return (
        <Box>
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
           {getBannerImage() && < Box  ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}> 
                <Breadcrumbs routes={breadcrumbsPath} style={{ mb: "14px" }} />
              <Flex position="relative" w="100%" h={"350px"} pt={"20px"}>
                    <Image
                        m={"auto"}
                        alt={`nft-banner`}
                        src={getBannerImage()} 
                        className="custom-img"
                       layout="fill"
                    />
                </Flex>
                </Box>}   
            <Box>
                <Box
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
                </Box>
                <Box>
                 {selCategoriesData?.map((nfts, index) => (
                        <NftsCategories
                            isMobileDevice={isMobileDevice}
                            key={`nfts-${index}`}
                            NFTS={nfts}
                           isSelectedCat = {isToShowAll()}
                        />
                   ))}
                </Box>
                {categories.toLowerCase() !== defaultCategories.toLowerCase() &&
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
                    )}
            </Box>
        </Box>
    );
};

export default Nfts;