import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import FAQ from "../../Home/components/FAQ";
import SEOContainer from "../../SEOContainer";
import Explore from "./Explore";
import NewInfluencers from "./NewInfluencers";
import AllInfluencers from "./AllInfluencers";
import InfluencerBanner from "./InfluencerBanner";
import InfluencerDetailBanner from "./InfluencerDetailBanner";

import {
    LeftArrow,
    RightArrow
} from "../../../components/ContentNavigator/arrows";

const Influencers = ({ data, selectedCategory, banner, newInfluencers }) => {
    const defaultCategoryName = "All Ambassadors";
    const { isTabletOrDesktop, user, influencerLikes, callAuthService } =
        useContext(AppContext);
    const [options, setOptions] = useState([]);
    const [category, setCategory] = useState(defaultCategoryName);
    const [sortBy, setSortBy] = useState("Sort By");
    const [displayData, setDisplayData] = useState(data);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterValue, setFilterValue] = useState(defaultCategoryName);
    const [filterByName, setFilterByName] = useState("");

    const [displayInfluencers, setDisplayInfluencers] = useState([]);

    const [selCategoriesData, setSelCategoriesData] = useState(data);

    const [searchInfluencers, setSearchInfluencers] = useState([]);
    const [noSearchInfluencers, setNoSearchInfluencers] = useState([]);
    const [allSearchInfluencers, setAllSearchInfluencers] = useState([]);
    const [searchByName, setSearchByName] = useState("");
    const [perPage, setPerPage] = useState(16);

    const router = useRouter();

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
            options.push(defaultCategoryName);
            // if(catData){

            // }else {

            // }
            data.map((cat) => {
                options.push(cat.name);
            });
            setCategory(defaultCategoryName);
            setDisplayData(data);
        }
    }, [data, user]);

    const handleFilterChange = () => {
        const newCategory = filterValue;
        if (newCategory === defaultCategoryName.toLowerCase()) {
            history.pushState({}, null, "/influencers");

        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === newCategory
            );

            history.pushState({}, null, "/influencers/category/" + selData[0].slug);
        }

        setCategory(newCategory);
    };
    const handleCategoryChange = (e) => {
        const newCategory = e;
        if (e === defaultCategoryName.toLowerCase()) {
            router.push(
                "/influencers"
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === e
            );
            if (selData?.[0]?.slug)
                router.push(
                    "/influencers/category/" + selData[0].slug
                );
        }

        setCategory(newCategory);
    };

    useEffect(() => {
        if (influencerLikes) {
            if (influencerLikes?.length) {
                let populateData = Array.isArray(data) ? data : [data];

                populateData = populateData.map((infcat) => {
                    if (infcat.influencers?.data) {
                        infcat.influencers.data = infcat.influencers?.data.map(
                            (inf) => {
                                if (influencerLikes.includes(inf.id))
                                    inf.like = true;
                                else inf.like = false;
                                return inf;
                            }
                        );
                    }
                    return infcat;
                });
                setSelCategoriesData([]);
                setDisplayData(populateData);
            }
        }
    }, [influencerLikes]);
    useEffect(() => {
        if (data && selectedCategory) {
            let selData = data.filter((item) => item.slug === selectedCategory);
            setCategory(selData[0].name.toLowerCase());
            setSelCategoriesData(selData);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (displayData && category) {
            // setSortBy("Sort by");
            if (category.toLowerCase() !== defaultCategoryName.toLowerCase()) {
                const selData = displayData.filter(
                    (cat) => cat.name.toLowerCase() === category.toLowerCase()
                );

                setSelCategoriesData(selData);
            } else {
                setSelCategoriesData(displayData);
            }
        }
    }, [category, displayData]);

    // useEffect(() => {
    //     if (selectedCategory) return;
    //     if (sortBy.toLowerCase() === "alphabetical") {
    //         const newCatData = selCategoriesData.map((cat) => {
    //             cat.influencers.data?.sort((a, b) =>
    //                 a.name > b.name ? 1 : -1
    //             );
    //             return cat;
    //         });
    //         setSelCategoriesData(newCatData);
    //     } else {
    //         const newCatData = selCategoriesData.map((cat) => {
    //             cat.influencers.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
    //             return cat;
    //         });
    //         setSelCategoriesData(newCatData);
    //     }
    // }, [sortBy]);

    useEffect(() => {
        if (selCategoriesData) {
            setPageNo(0);
            let inf = [];
            selCategoriesData.map((cat) => {
                cat.influencers?.data?.map((influencer) => {
                    inf.push(influencer);
                });
            });
            setDisplayInfluencers(inf);

            setAllSearchInfluencers(inf);
            setSearchInfluencers("");
            setNoSearchInfluencers("");
            setSearchByName("");

            const tp = inf?.length > perPage && inf?.length % perPage === 0 ? inf?.length / perPage : inf?.length > perPage ? parseInt((inf?.length / perPage)) + 1 : 1;

            setTotalPages(tp);
        }
    }, [selCategoriesData]);

    const getBannerImage = () => {
        if (selectedCategory && category !== defaultCategoryName.toLowerCase() && selCategoriesData) {
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
                category.toLowerCase() === defaultCategoryName.toLowerCase())
        ) {
            // return "/assets/designupdate1/influencer_banner.png";
            return !isTabletOrDesktop ? banner[1]?.url || banner[0]?.url : banner[0]?.url;
        } else {
            return null;
        }
    };

    const getSearchByName = (name) => {
        if (searchInfluencers != "" && noSearchInfluencers != "") {
            const disInfList = [...searchInfluencers, ...noSearchInfluencers];
            setAllSearchInfluencers(disInfList);
        }
        // console.log(allSearchInfluencers)

        if (name == "" || name.length < 3) {
            // if (searchInfluencers != "" && noSearchInfluencers != "") {
            setPageNo(0);

            const disInfList = [...searchInfluencers, ...noSearchInfluencers];
            setDisplayInfluencers(disInfList);

            const tp = disInfList?.length > perPage && disInfList?.length % perPage === 0 ? disInfList?.length / perPage : disInfList?.length > perPage ? parseInt((disInfList?.length / perPage)) + 1 : 1;
            setTotalPages(tp);
            // }
        }
        else {
            setPageNo(0);

            let searchInfList = [];
            let noSerachInfList = [];
            console.log(allSearchInfluencers)
            allSearchInfluencers?.map((influencer) => {
                if ((influencer.name.toLowerCase().includes(name.toLowerCase()))) {
                    searchInfList.push(influencer);
                }
                else {
                    noSerachInfList.push(influencer);
                }
            });

            // if( searchInfluencers=="" && noSearchInfluencers=="" ) {
            setSearchInfluencers(searchInfList);
            setNoSearchInfluencers(noSerachInfList);
            // }

            setDisplayInfluencers(searchInfList);

            const tp = searchInfList?.length > perPage && searchInfList?.length % perPage === 0 ? searchInfList?.length / perPage : searchInfList?.length > perPage ? parseInt((searchInfList?.length / perPage)) + 1 : 1;
            setTotalPages(tp);
        }
    }

    const getPagination = (per_page) => {
        setPerPage(per_page)
        setPageNo(0);
        // console.log(perPage, displayInfluencers?.length)
        const tp = displayInfluencers?.length > per_page && displayInfluencers?.length % per_page === 0 ? displayInfluencers?.length / per_page : displayInfluencers?.length > per_page ? parseInt((displayInfluencers?.length / per_page)) + 1 : 1;
        console.log(tp)
        setTotalPages(tp);
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

            <Box w="100% " overflow="hidden">
                {selectedCategory && category !== defaultCategoryName.toLowerCase() ? (
                    <InfluencerDetailBanner getBannerImage={getBannerImage} />
                ) : (
                    <InfluencerBanner getBannerImage={getBannerImage} />
                )}
            </Box>
            <Explore
                data={data}
                defaultCategoryName={defaultCategoryName}
                handleCategoryChange={handleCategoryChange}
                activeCategory={category}
            />
            <NewInfluencers
                newInfluencers={newInfluencers}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            />
            <AllInfluencers
                displayInfluencers={displayInfluencers}
                category={category}
                perPage={perPage}
                setPerPage={setPerPage}
                totalPages={totalPages}
                pageNo={pageNo}
                setPageNo={setPageNo}
                defaultCategoryName={defaultCategoryName}
                selectedCategory={selectedCategory}
                selCategoriesData={selCategoriesData}
                catData={data}
                handleCategoryChange={handleFilterChange}
                setFilterValue={setFilterValue}
                getSearchByName={getSearchByName}
                searchByName={searchByName}
                setSearchByName={setSearchByName}
                getPagination={getPagination}
            />

        </Box>
    );
};

export default Influencers;
