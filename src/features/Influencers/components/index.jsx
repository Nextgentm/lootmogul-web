import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import SEOContainer from "../../SEOContainer";
import Explore from "./Explore";
import AllInfluencers from "./AllInfluencers";
import InfluencerBanner from "./InfluencerBanner";
import InfluencerDetailBanner from "./InfluencerDetailBanner";
import Breadcumb from "./Breadcumb";
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight
} from "@react-hook/window-size";
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";

const Influencers = ({ data, selectedCategory, banner }) => {
    const defaultCategoryName = "All Ambassadors";
    const { isTabletOrDesktop, user, influencerLikes, callAuthService } =
        useContext(AppContext);
    const [options, setOptions] = useState([]);
    const [category, setCategory] = useState(defaultCategoryName);
    const [sortBy, setSortBy] = useState("Sort By");
    const [searchString, setSearchString] = useState("");
    const [displayData, setDisplayData] = useState(data);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterValue, setFilterValue] = useState(defaultCategoryName);
    const [displayInfluencers, setDisplayInfluencers] = useState([]);
    const [selCategoriesData, setSelCategoriesData] = useState(data);
    const [displayInfluencersBkup, setDisplayInfluencersBkup] = useState([]);
    const [breadcumbData, setBreadcumbData] = useState([]);
    const router = useRouter();
    const onlyWidth = useWindowWidth();
    const [dataPrePage, setDataPrePage] = useState(16);
    const [isMobile, setIsMobile] = useState(false);

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
            data.map((cat) => {
                options.push(cat.name);
            });
         
            setCategory(defaultCategoryName);
            setDisplayData(data);

            if (window.location.pathname.includes("category")) {
                //console.log('code here');
            }
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

            history.pushState(
                {},
                null,
                "/influencers/category/" + selData[0].slug
            );
        }

        setCategory(newCategory);
    };

    const handleCategoryChange = (e) => {
        const newCategory = e;
        

        if (e === defaultCategoryName.toLowerCase() || e === "") {
            if (!isMobile) {
               
                setBreadcumbData([]);
            }
            router.push(
                {
                    pathname: "/influencers"
                },
                undefined,
                { shallow: true }
            );
        } else if (displayData) {
            let selData = displayData.filter(
                (data) => data.name.toLowerCase() === e
            );
            if (selData?.[0]?.slug)
                router.push(
            
                    "/influencers/",
                    "/influencers/category/" + selData[0].slug,
                    { shallow: true }
                );

            
            localStorage.setItem(
                "changedSlugDetails",
                JSON.stringify(selData[0])
            );
            setBreadcumbData([
                { text: "Ambassadors", url: "/influencers", isCurrentPage: false },
                { text: selData[0].name, url: "/influencers/category/" + selData[0].slug, isCurrentPage: true }
            ]);
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
            if (selData?.length) {
                setCategory(selData[0].name.toLowerCase());
                setSelCategoriesData(selData);
            }
            else {
                router.push('/404')
            }
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

    

    useEffect(() => {
        switch (true) {
            //mobile
            case (onlyWidth <= 720):
                setIsMobile(true);
                setDataPrePage(16);
                break;
            //tablet devices
            case (onlyWidth >= 720 && onlyWidth < 1366):
                setIsMobile(false);
                setDataPrePage(16);
                break;
            //desktop
            case (onlyWidth >= 1366 && onlyWidth < 1920):
                setIsMobile(false);
                setDataPrePage(15);
                break;
            //large devices
            case (onlyWidth >= 1920):
                setIsMobile(false);
                setDataPrePage(16);
                break;
            default:
                break;
        }

    }, [onlyWidth]);

    useEffect(() => {
        if (selCategoriesData) {
            setPageNo(0);
            let inf = [];
            selCategoriesData.map((cat) => {
                cat.influencers?.data?.map((influencer) => {
                    inf.push(influencer);
                });
            });
            if (searchString.length > 0) {
                const filteredData = inf.filter((x) =>
                    x.name.toLowerCase().includes(searchString.toLowerCase())
                );
                setDisplayInfluencers(filteredData);
               
            } else {
            setDisplayInfluencers(inf);
            
            }
            setDisplayInfluencersBkup(inf);
          
           
            const tp =
                inf?.length > 16 && inf?.length % 16 === 0
                    ? inf?.length / 16
                    : inf?.length > 16
                        ? parseInt(inf?.length / 16) + 1
                        : 1;
            setTotalPages(tp);
        }
    }, [selCategoriesData]);

    const getBannerImage = () => {
        if (
            selectedCategory &&
            category !== defaultCategoryName.toLowerCase() &&
            selCategoriesData
        ) {
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
            return !isTabletOrDesktop
                ? banner[1]?.url || banner[0]?.url
                : banner[0]?.url;
        } else {
            return null;
        }
    };

    const searchText = (e) => {
        setSearchString(e);
        let totalRecords = [];
        if (e.length > 0) {
            const filteredData = displayInfluencers.filter((x) =>
                x.name.toLowerCase().includes(e.toLowerCase())
            );
            totalRecords = filteredData;
            setDisplayInfluencers(filteredData);
        } else {
            totalRecords = displayInfluencersBkup;
            setDisplayInfluencers(displayInfluencersBkup);
        }

        setPageNo(0);
        const tp =
            totalRecords?.length > 16 && totalRecords?.length % 16 === 0
                ? totalRecords?.length / 16
                : totalRecords?.length > 16
                    ? parseInt(totalRecords?.length / 16) + 1
                    : 1;

        setTotalPages(tp);
    };

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

            <Box w="100% " overflow="hidden" className="Influencer_banner_image">
                {selectedCategory &&
                    category !== defaultCategoryName.toLowerCase() ? (
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
                searchText={searchText}
                isMobile={isMobile}
            />
            {!isMobile && <Breadcumb data={breadcumbData} mxValue={[10, 10, 16]}></Breadcumb>}
            
            <AllInfluencers
                displayInfluencers={displayInfluencers}
                category={category}
                totalPages={totalPages}
                pageNo={pageNo}
                setPageNo={setPageNo}
                defaultCategoryName={defaultCategoryName}
                selectedCategory={selectedCategory}
                selCategoriesData={selCategoriesData}
                catData={data}
                handleCategoryChange={handleFilterChange}
                setFilterValue={setFilterValue}
                dataPrePage={dataPrePage}
            />
            <Box
                px={10}
                py={["5","20"]}
                width={["100%", "100%", "100%", "90%"]}
                margin={"auto"}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "30px",
                        "30px",
                        "50px",
                    ]}
                    textShadow="unset"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="1"
                >
                   Own iconic AI avatars of legendary athletes and level up your sports fandom with an exclusive digital collectibles collection. 
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "1rem",
                        "1.3rem",
                        "1.3rem",
                        "1.3rem",
                        "1.3rem"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["30px", "30px", "36px"]}
                    width={["100%", "100%", "90%"]}
                >
                    Harness the power of LootMogul's open AI architecture to craft your very own Non-Player Characters (NPCs) in the gaming realm. Step into the shoes of legendary athletes through iconic AI avatars, boosting your sports enthusiasm. Elevate your gaming experience with a unique selection of blockchain games and a coveted collection of rare sports NFTs (digital collectibles). 
                </Text>
            </Box>
        </Box>
    );
};

export default Influencers;
