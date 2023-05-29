import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import SEOContainer from "../../SEOContainer";
import { useRouter } from "next/router";
import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";
import NftDetailBanner from "./NftDetailBanner";
import NftBanner from "./NftBanner";
import NewNfts from "./NewNfts";
import structuredClone from "@ungap/structured-clone";
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";

const Nfts = ({ data, selectedCategory, banner, newNfts, isNewest, nft }) => {
    const router = useRouter();
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [selCategoriesData, setSelCategoriesData] = useState(data);
    const [selCategoriesDataBkup,  setSelCategoriesDataBkup ] = useState();
    const [selAllData, setselAllData] = useState(data);
    const [priceRange, setPriceRange] = useState(null);
    const [tempPriceRange, setTempPriceRange] = useState(null);

    const defaultCategories = "Overview";
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState(defaultCategories);
    const [tempFilterValue, setTempFilterValue] = useState(defaultCategories);
    //const [selectedCategory, setSelectedCategory] = useState(defaultCategories);

    const { callAuthService } = useContext(AppContext);
    const [breadcumbData, setBreadcumbData] = useState([]);
    let initialState = selCategoriesData;
    const secondDefaultCategories = "All NFTs";
    const [showAllData, setShowAllData] = useState(false);
    const [displayAllData, setDisplayAllData] = useState([]);
    const [subHeader, setSubHeader] = useState('');
    const [hideFilters, setHideFilters] = useState(false);
    const [isSubPage, setIsSubPage] = useState(false);

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
        if (window.location.pathname === '/nfts') {
            setHideFilters(true);
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
        if (window.location.pathname.includes("/nfts/")) {
            let routes = JSON.parse(
                window.localStorage.getItem("changedNftBreadCrumbData")
            );
            setBreadcumbData(routes);
        }
        setSelCategoriesDataBkup(selCategoriesData);
        if (!window.location.pathname.includes("/nfts/")) {
            //setSelectedCategory(defaultCategories);
        }
        if (window.location.pathname !== '/nfts') {
            setHideFilters(false);
        }
    }, [data]);

    useEffect(() => {
        if (displayData) {
            setSelCategoriesData(displayData);
            setSelCategoriesDataBkup(displayData);
        }
    }, [displayData]);

    const nftFilterCategory = () => {
        const newCategory = tempFilterValue;
        if (
            newCategory.toString().toLowerCase() ===
            defaultCategories.toString().toLowerCase()
        ) {
            router.push("/nfts");
        } else if (displayData) {
            let selData = displayData.filter(
                (data) =>
                    data.name.toLowerCase() ===
                    newCategory.toString().toLowerCase()
            );

            history.pushState({}, null, "/nfts/" + selData[0].slug);
        }
        setCategories(newCategory);
        ChangePriceRange(tempPriceRange);
    };

    const nftSelectCategory = (e) => {
        const newCategory = e.target?.value || e;
        if (newCategory === secondDefaultCategories) {
            let allDisplayData = [];
            displayData.forEach(x => {
                x.nftSet.forEach(y => {
                    allDisplayData.push(y);
                });
            })
            allDisplayData = allDisplayData?.sort((a, b) => a.priority - b.priority);
            setDisplayAllData(allDisplayData);
            setTempFilterValue(newCategory);
            setCategories(newCategory);
            setShowAllData(true);

            setBreadcumbData([]);
            setSubHeader("All NFTs");
            setHideFilters(false);
            setIsSubPage(false);
            return;
        }
        if (newCategory === defaultCategories.toString().toLowerCase()) {
            const clonedData = structuredClone(displayData);
            
            clonedData.forEach(ele => {
                if (ele.nftSet.length > 6) {
                    ele.nftSet = ele.nftSet.splice(0, 6);
                }
            });
            router.push(
                {
                    pathname: "/nfts"
                },
                undefined,
                { shallow: true }
            );
            setSelCategoriesData(clonedData);
            setSelCategoriesDataBkup(clonedData);
            setBreadcumbData([]);
            setHideFilters(true);
            setIsSubPage(false);
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === newCategory.toLowerCase()
            );
            setSelCategoriesData(selData);
            setSelCategoriesDataBkup(selData);
            router.push(
                // {
                //     pathname: "/nfts/" + selData[0].slug
                // },
                // undefined,
                "/nfts/",
                "/nfts/" + selData[0]?.slug,
                { shallow: true }
            );
            // let routes = breadcumbData;
            // routes = routes.splice(0, 2);
            // routes.map((x) => (x.isCurrentPage = false));
            // routes.push({
            //     text: selData[0]?.name,
            //     url: "/nfts/" + selData[0]?.slug,
            //     isCurrentPage: true
            // });

            setBreadcumbData([
                { text: "Overview", url: "/nfts", isCurrentPage: false },
                { text: selData[0]?.name, url: "/nfts/" + selData[0]?.slug, isCurrentPage: true }
            ]);
    
            
            // localStorage.setItem(
            //     "changedNftBreadCrumbData",
            //     JSON.stringify(routes)
            // );
            setSubHeader(selData[0]?.name.toString().toUpperCase());
            setHideFilters(false);
            setIsSubPage(true);
        }
        setTempFilterValue(newCategory);
        setCategories(newCategory);
        setShowAllData(false);

        if (window.location.pathname !== '/nfts') {
            setHideFilters(false);
        }
    };

    useEffect(() => {
        if (data && selectedCategory) {
            let selData = data.filter((item) => item.slug === selectedCategory);
            setTempFilterValue(selData[0].name.toLowerCase());
            setCategories(selData[0].name.toLowerCase());
            let pr = { min: 1000, max: 0 };
            selData[0]?.nftSet?.map((nft) => {
                if (pr.min > nft?.nft_kred?.data?.market_price)
                    pr.min = nft.nft_kred?.data?.market_price;
                if (pr.max < nft?.nft_kred?.data?.market_price)
                    pr.max = nft.nft_kred?.data?.market_price;
            });
            if (pr.min === pr.max) {
                pr.min = 0;
            }
            pr.minSel = pr.min;
            pr.maxSel = pr.max;
            setPriceRange(pr);
        }
    }, [selectedCategory]);

    const nftSearch = (e) => {
        if (data && categories) {
            if (e.length > 3) {
                const clonedData = structuredClone(displayData);
                const selData = clonedData.filter(
                    (item) => item.name.toLowerCase() === categories.toLowerCase()
                );

                selData.forEach(function (nft) {
                    nft.nftSet = nft.nftSet.filter((s) =>
                        s.nft_kred.data.slug.includes(e)
                    );
                });
                setSelCategoriesData(selData);
            } else {
                const selData = selCategoriesDataBkup.filter(
                    (item) =>
                        item.name.toLowerCase() ===
                        tempFilterValue.toLowerCase()
                );

                setSelCategoriesData(selData);
            }
        }
    };

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

    const nftPriceSorting = (e) => {
        if (e === "Price Low To High") {
            const selData = data.filter(
                (item) => item.slug === selectedCategory
            );
            selData[0].nftSet.sort(
                (a, b) =>
                    a.nft_kred.data.sale_price - b.nft_kred.data.sale_price
            );

            console.log(selData);
            setSelCategoriesData(selData);
        } else {
            const selData = data.filter(
                (item) => item.slug === selectedCategory
            );
            selData.forEach(function (nft) {
                nft.nftSet = nft.nftSet.sort(
                    (a, b) =>
                        a.nft_kred.data.market_price -
                        b.nft_kred.data.market_price
                );
            });
            console.log(selData);
            setSelCategoriesData(selData);
        }
    };

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
            return !isTabletOrDesktop
                ? banner?.[1]?.url || banner?.[0]?.url
                : banner[0]?.url;
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
        setPriceRange((pr) => ({
            ...priceRange,
            minSel: pr.minSel,
            maxSel: pr.maxSel
        }));
    };

    useEffect(() => {
        if (
            displayData &&
            selCategoriesData &&
            selCategoriesData.length <= 1 &&
            priceRange
        ) {
            const clonedData = structuredClone(displayData);

            let selData = clonedData.filter(
                (cat) => cat.name.toLowerCase() === categories.toLowerCase()
            );

            let nftSet = selData.length ? selData?.[0]?.nftSet : [];
            if (nftSet.length) {
                const newCatNftSet = nftSet.filter(
                    (nft) =>
                        parseFloat(nft?.nft_kred?.data?.market_price) >=
                            parseFloat(priceRange.minSel) &&
                        parseFloat(nft?.nft_kred?.data?.market_price) <=
                            parseFloat(priceRange.maxSel)
                );
                let newCatData = selData;
                newCatData[0].nftSet = newCatNftSet;
                setSelCategoriesData(newCatData);
            } else setSelCategoriesData([]);
        }
    }, [priceRange]);

    return (
        <><Box mx={["6vw"]}>
            {selectedCategory && selCategoriesData && selCategoriesData[0] && (
                <SEOContainer
                    seoData={selCategoriesData[0]?.seo
                        ? selCategoriesData[0]?.seo
                        : selCategoriesData[0]}
                    content={selCategoriesData[0]} />
            )}
            {categories.toLowerCase() !== defaultCategories.toLowerCase() ? (
                <NftDetailBanner getBannerImage={getBannerImage} />
            ) : (
                <NftBanner getBannerImage={getBannerImage} />
            )}

            <NewNfts
                newNfts={newNfts}
                defaultCategories={defaultCategories}
                selectedCategory={categories}
                selCategoriesData={selCategoriesData}
                data={data}
                isNewest={isNewest}
                isToShowAll={isToShowAll}
                displayData={displayData}
                nftSelectCategory={nftSelectCategory}
                nftSearch={nftSearch}
                nftPriceSorting={nftPriceSorting}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                priceRange={priceRange}
                setPriceRange={setTempPriceRange}
                tempPriceRange={tempPriceRange}
                setTempFilterValue={setTempFilterValue}
                nftFilterCategory={nftFilterCategory}
                breadcumbData={breadcumbData}
                subHeader={subHeader}
                hideFilters={hideFilters}
                secondDefaultCategories={secondDefaultCategories}
                showAllData={showAllData}
                displayAllData={displayAllData}
                isSubPage={isSubPage}
            />
            {/* <MultipleLoggedInUser /> */}
        </Box></>
    );
};

export default Nfts;
