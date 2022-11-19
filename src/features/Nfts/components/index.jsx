import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Flex,
    SimpleGrid,
    Text,
    Image,
    Tooltip
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
import NftCardInCollection from "./NftsCategories/NftCardInCollection";
import { GrFilter } from "react-icons/gr";
import CategoryComponent from "../categoryComp";
import NftDetailBanner from "./NftDetailBanner";
import NftBanner from "./NftBanner";
import NewNfts from "./NewNfts";
import structuredClone from '@ungap/structured-clone';

const Nfts = ({ data, selectedCategory, banner, newNfts, isNewest, nft }) => {
    const router = useRouter();
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [selCategoriesData, setSelCategoriesData] = useState(data);
    const [priceRange, setPriceRange] = useState(null);
    const [tempPriceRange, setTempPriceRange] = useState(null);

    const defaultCategories = "All NFTs";
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState(defaultCategories);
    const [tempFilterValue, setTempFilterValue] = useState(defaultCategories);


    const { callAuthService } = useContext(AppContext);
    const [breadcumbData, setBreadcumbData] = useState([
        { text: "Home", url: "/nfts", isCurrentPage: false },
        { text: "All NFTs", url: "/nfts", isCurrentPage: true }
    ]);

    useEffect(() => {
        if (!router.isReady) return;
        const access_token = router.query.access_token;
        const provider = router.query.provider;
        if (access_token) {
            if (provider == "facebook") {
                callAuthService("facebook", access_token);
            } else {
                callAuthService("google", access_token);
            }
        }
    }, [router.isReady]);

    useEffect(async () => {
        if (data && data?.length > 0 && options.length == 0) {
            options.push(defaultCategories);
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategories(defaultCategories);
            setTempFilterValue(defaultCategories);
            setDisplayData(data);
        }
        if (window.location.pathname.includes('/nfts/')) {
            let routes = JSON.parse(window.localStorage.getItem('changedNftBreadCrumbData'));
            setBreadcumbData(routes);
        }
    }, [data]);
    const nftFilterCategory = () => {
        const newCategory = tempFilterValue;
        if (newCategory.toString().toLowerCase() === defaultCategories.toString().toLowerCase()) {
            router.push("/nfts");
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === newCategory.toString().toLowerCase()
            );

            history.pushState({}, null, "/nfts/" + selData[0].slug);

        }
        setCategories(newCategory);
        ChangePriceRange(tempPriceRange);

    };
    const nftSearch = (e) => {
        if (data && selectedCategory) {
            var selData = data.filter((item) => item.slug === selectedCategory);
            if (e !== '') {
                selData.forEach(function (nft) {
                    nft.nftSet = nft.nftSet.filter(s => s.nft_kred.data.slug.includes(e));
                });
                setSelCategoriesData(selData);
            }
            else {
                router.push(
                    {
                        pathname: "/nfts/" + selectedCategory.toLowerCase()
                    },
                    undefined,
                    { shallow: true }
                );
            }
        }


    }
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
        setTempFilterValue(newCategory);
        setCategories(newCategory);

        let selData = displayData.filter(
            (data) => data.name.toLowerCase() === newCategory
        );
        let routes = breadcumbData;
        routes = routes.splice(0, 2);
        routes.map((x) => (x.isCurrentPage = false));
        routes.push({
            text: selData[0].name,
            url: "/nfts/" + selData[0].slug,
            isCurrentPage: true
        });

        setBreadcumbData(routes);
        localStorage.setItem("changedNftBreadCrumbData", JSON.stringify(routes));
    };
    useEffect(() => {
        if (data && selectedCategory) {
            let selData = data.filter((item) => item.slug === selectedCategory);
            setTempFilterValue(selData[0].name.toLowerCase());
            setCategories(selData[0].name.toLowerCase());
            let pr = { min: 1000, max: 0 };
            selData[0]?.nftSet?.map((nft) => {
                if (pr.min > nft?.nft_kred?.data?.market_price) pr.min = nft.nft_kred?.data?.market_price;
                if (pr.max < nft?.nft_kred?.data?.market_price) pr.max = nft.nft_kred?.data?.market_price;
            });
            if (pr.min === pr.max) {
                pr.min = 0;
            }
            pr.minSel = pr.min;
            pr.maxSel = pr.max;
            setPriceRange(pr);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (displayData && categories) {
            setSortBy("Sort by");
            if (categories.toLowerCase() !== defaultCategories.toLowerCase()) {
                const clonedData = structuredClone(displayData);
                const selData = clonedData.filter(
                    (cat) => cat.name.toLowerCase() === categories.toLowerCase()
                );

                setSelCategoriesData(selData);
            } else {
                setSelCategoriesData(displayData);
            }

        }
    }, [categories, displayData]);

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
            return !isTabletOrDesktop ? banner?.[1]?.url || banner?.[0]?.url : banner[0]?.url;
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
    const ChangePriceRange = (pr) => {
        setPriceRange((pr) => ({ ...priceRange, minSel: pr.minSel, maxSel: pr.maxSel }));

    }

    useEffect(() => {


        if (displayData && selCategoriesData && selCategoriesData.length <= 1 && priceRange) {
            const clonedData = structuredClone(displayData);

            let selData = clonedData.filter(
                cat => cat.name.toLowerCase() === categories.toLowerCase()
            );

            let nftSet = selData.length ? selData?.[0]?.nftSet : [];
            if (nftSet.length) {
                const newCatNftSet = nftSet.filter(nft =>
                    parseFloat(nft?.nft_kred?.data?.market_price) >= parseFloat(priceRange.minSel) &&
                    parseFloat(nft?.nft_kred?.data?.market_price) <= parseFloat(priceRange.maxSel)

                );
                let newCatData = selData;
                newCatData[0].nftSet = newCatNftSet;
                setSelCategoriesData(newCatData);
            } else setSelCategoriesData([]);
        }
    }, [priceRange]);



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
            {categories.toLowerCase() !== defaultCategories.toLowerCase() ? (
                <NftDetailBanner getBannerImage={getBannerImage} />
            ) : (
                <NftBanner getBannerImage={getBannerImage} />
            )}

            <NewNfts
                newNfts={newNfts}
                defaultCategories={defaultCategories}
                selectedCategory={selectedCategory}
                selCategoriesData={selCategoriesData}
                data={data}
                isNewest={isNewest}
                isToShowAll={isToShowAll}
                displayData={displayData}
                nftSelectCategory={nftSelectCategory}
                nftSearch={nftSearch}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                priceRange={priceRange}
                setPriceRange={setTempPriceRange}
                tempPriceRange={tempPriceRange}
                setTempFilterValue={setTempFilterValue}
                nftFilterCategory={nftFilterCategory}
                breadcumbData={breadcumbData}
            />

        </Box>
    );
};

export default Nfts;
