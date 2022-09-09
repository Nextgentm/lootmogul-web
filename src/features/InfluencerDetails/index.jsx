import { Box, Flex, Text } from "@chakra-ui/react";
import { getStrapiMedia } from "../../utils/medias";
import InfluencerInfo from "./InfluencerInfo";
import SocialActions from "./SocialActions";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../utils/AppContext";
import Breadcrumbs from "../../components/Breadcrumbs";
import strapi from "../../utils/strapi";
import Image from "next/image";
import SEOContainer from "../SEOContainer";
import LMSectionTabs from "../../components/LMSectionTabs";
import NftCardList from "../Nfts/components/NftCardList";
import InfluencerGame from "./InfluencerGames";
import InfluencerInfoCollapsable from "./InfluencerInfoCollapsable";
// import dynamic from 'next/dynamic';
// const LMSectionTabs =  dynamic(() => import("../../components/LMSectionTabs")) ;
// const NftCardList =  dynamic(() => import("../Nfts/components/NftCardList")) ;
// const InfluencerGame =  dynamic(() => import("./InfluencerGames")) ;
// const InfluencerInfoCollapsable =  dynamic(() => import("./InfluencerInfoCollapsable")) ;

const InfluencerDetail = ({ influencer }) => {
    const {  isTabletOrDesktop, user ,influencerLikes,FetchLikes,toggleLoginModal} = useContext(AppContext);
    const [isHeartClick, setHeartClick] = useState(false);
    const [fullInfluencer, setFullInfluencer] = useState(influencer);

    const [tabsData, setTabsData] = useState();
    const onHeartClick = async() => {
        if(!user){
            toggleLoginModal();
            return;
        }
        if(influencer){
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" + influencer.id,
                {}
              );
              FetchLikes();
                setHeartClick(!isHeartClick);
            }
        
    };
    useEffect(()=>{
        if (influencerLikes?.includes(influencer.id)){
            setHeartClick(true);
        }
    },[influencer,influencerLikes]);

    // useEffect(async () => {
    //     // fetch user stats
    //     if (influencer?.id) {
    //         const data = await strapi.findOne("influencers", influencer.id, {
    //             populate: [
    //                 "contestmasters.icon",
    //                 "contestmasters.feeWallet.currency",
    //                 "banner",
    //                 "icon",
    //                 "contestmasters.reward",
    //                 "contestmasters.contest_section",
    //                 "nft_kreds"
    //             ]
    //         });
    //         if (data?.data) setFullInfluencer(data.data);
    //     }
    // }, [influencer]);

    const breadcrumbsPath = [
        {
            
            label: "Home",
            path: "/"
        },
        { label: "Influencers", path: "/influencers" },
        { label: influencer.name }
    ];

    useEffect(() => {
        if (fullInfluencer) {
            const td = fullInfluencer?.contestmasters?.data && fullInfluencer?.contestmasters?.data.length>0 ? [
                {
                    tab: <Text>NFTs</Text>,
                    tabPanel: (
                        <>
                            {" "}
                            {fullInfluencer?.nft_kreds?.data.length > 0 && (
                                <NftCardList 
                                    data={fullInfluencer?.nft_kreds?.data?.reverse() || []}
                                    isSale={false}
                                />
                            )}
                            {fullInfluencer?.nft_kreds?.data.length === 0 && (
                                <Text color="white">Coming soon.. </Text>
                            )}
                        </>
                    )
                },
                {
                    tab: <Text>Games</Text>,
                    tabPanel: (
                        fullInfluencer &&  <InfluencerGame
                            contestmasters={
                                fullInfluencer?.contestmasters
                                    ? fullInfluencer?.contestmasters
                                    : influencer?.contestmasters
                            }
                        />
                    )
                }
            ]:[
                {
                    tab: <Text>NFTs</Text>,
                    tabPanel: (
                        <>
                            {" "}
                            {fullInfluencer?.nft_kreds?.data.length > 0 && (
                                <NftCardList
                                    data={fullInfluencer?.nft_kreds?.data?.reverse() || []}
                                    isSale={false}
                                />
                            )}
                            {fullInfluencer?.nft_kreds?.data.length === 0 && (
                                <Text color="white">Coming soon.. </Text>
                            )}
                        </>
                    )
                }];
            setTabsData(td);
        }
    }, [fullInfluencer]);
    const getBannerImage = () =>{
        if(fullInfluencer){
            if(fullInfluencer?.banner && fullInfluencer?.banner?.data){
               
                return  !isTabletOrDesktop
                ? fullInfluencer?.banner?.data?.length > 1 &&
                  fullInfluencer?.banner?.data?.[1]?.url
                    ? getStrapiMedia(
                          fullInfluencer?.banner?.data[1].url
                      )
                    : "/assets/influencer-banner-mobile.webp"
                : fullInfluencer?.banner?.data?.length > 0 &&
                  fullInfluencer?.banner?.data?.[0]?.url
                ? getStrapiMedia(fullInfluencer?.banner?.data[0].url)
                : "/assets/influencer-banner.webp"
            } else if(fullInfluencer?.influencer_category && fullInfluencer?.influencer_category?.data?.banner?.data){
                return  !isTabletOrDesktop
                ? fullInfluencer?.influencer_category?.data?.banner?.data?.length > 1 &&
                  fullInfluencer?.influencer_category?.data?.banner?.data?.[1]?.url
                    ? getStrapiMedia(
                          fullInfluencer?.influencer_category?.data?.banner?.data[1].url
                      )
                    : "/assets/influencer-banner-mobile.webp"
                : fullInfluencer?.influencer_category?.data?.banner?.data?.length > 0 &&
                  fullInfluencer?.influencer_category?.data?.banner?.data?.[0]?.url
                ? getStrapiMedia(fullInfluencer?.influencer_category?.data?.banner?.data[0].url)
                : "/assets/influencer-banner.webp"
            }
        }
    }

    return (
        <Box mr={[0, "20px"]} ml={[0, "20px"]} mb={["10vw"]}>
                <SEOContainer seoData={influencer.sharedSeo} content={influencer} pageName={"influencer"}/> 
{/*                 
            {isTabletOrDesktop && (
                <Breadcrumbs
                    routes={breadcrumbsPath}
                    style={{ mt: "14px", mb: "14px" }}
                />
            )} */}
            <Box position="relative" align="center" width="100%" height={"350px"}>
                <Image
                    alt={`influencer-banner`}
                        m={"auto"}
                        className="custom-img"
                        layout="fill"
                    src={
                        getBannerImage()
                    }
                />
            </Box>

            {!isTabletOrDesktop ? (
                <Box position="relative" align="center" mt="20px" zIndex={10}>
                    <InfluencerInfo influencer={fullInfluencer || influencer} />
                    <SocialActions
                        onHeartClick={onHeartClick}
                        isHeartClick={isHeartClick}
                        influencer={{ data: fullInfluencer || influencer }}
                        style={{ mt: "8px" }}
                        showWriteReview
                    />

                    <InfluencerInfoCollapsable
                        influencer={fullInfluencer || influencer}
                    />
                </Box>
            ) : (
                <Flex mt="20px" ml="12px">
                    <InfluencerInfo influencer={fullInfluencer || influencer} />
                    <Box
                        w="1px"
                        bg="rgba(255, 255, 255, 0.2)"
                        ml="20px"
                        alignSelf={"stretch"}
                    />

                    <Flex
                        direction={"column"}
                        flex={1}
                        ml="20px"
                        align={"flex-end"}
                    >
                        <SocialActions
                            onHeartClick={onHeartClick}
                            isHeartClick={isHeartClick}
                            influencer={{ data: fullInfluencer || influencer }}
                            showWriteReview
                        />

                        <InfluencerInfoCollapsable
                            influencer={fullInfluencer || influencer}
                        />
                    </Flex>
                </Flex>
            )}
            
            <Box mt="30px" id="nftCardList" ml={["20px", "30px"]} mr={["20px", "30px"]}>
            { tabsData && <LMSectionTabs variant={"categoryList"} data={tabsData} />}
            </Box>
        </Box>
    );
};

export default InfluencerDetail;
