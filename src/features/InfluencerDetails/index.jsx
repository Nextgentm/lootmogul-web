import { Box, Flex, Text } from "@chakra-ui/react";
import { getStrapiMedia } from "../../utils/medias";
import InfluencerInfo from "./InfluencerInfo";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../utils/AppContext";
import strapi from "../../utils/strapi";
import Image from "next/image";
import SEOContainer from "../SEOContainer";
import LMSectionTabs from "../../components/LMSectionTabs";
import NftCardList from "../Nfts/components/NftCardList";
import InfluencerGame from "./InfluencerGames";
import InfluencerInfoCollapsable from "./InfluencerInfoCollapsable";
import Breadcumb from "../Influencers/components/Breadcumb";

const InfluencerDetail = ({ influencer, breadcumbData }) => {
    const {
        isTabletOrDesktop,
        user,
        influencerLikes,
        FetchLikes,
        toggleLoginModal
    } = useContext(AppContext);
    const [fullInfluencer, setFullInfluencer] = useState(influencer);
    const [isHeartClick, setHeartClick] = useState(false);
    const [tabsData, setTabsData] = useState();
    const [isTabAvailable, setIsTabAvailable] = useState();

    const onHeartClick = async () => {
        if (!user) {
            toggleLoginModal();
            return;
        }
        if (influencer) {
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" + influencer.id,
                {}
            );
            FetchLikes();
            setHeartClick(!isHeartClick);
        }
    };

    useEffect(() => {
        if (influencerLikes?.includes(influencer.id)) {
            setHeartClick(true);
        }
    }, [influencer, influencerLikes]);

    useEffect(() => {
        if (fullInfluencer) {
            const isContest =
                fullInfluencer?.contestmasters?.data &&
                fullInfluencer?.contestmasters?.data.length > 0;
            const isTabAvailable =
                (fullInfluencer?.contestmasters?.data &&
                    fullInfluencer?.contestmasters?.data.length > 0) ||
                (fullInfluencer?.nft_kreds?.data &&
                    fullInfluencer?.nft_kreds?.data.length > 0);
            console.log("isTabAvailable", isTabAvailable);
            setIsTabAvailable(isTabAvailable);
            const td = isContest
                ? [
                      {
                          tab: <Text>DIGITAL COLLECTIBLES</Text>,
                          tabPanel: (
                              <>
                                  {" "}
                                  {fullInfluencer?.nft_kreds?.data.length >
                                      0 && (
                                      <NftCardList
                                          data={
                                              fullInfluencer?.nft_kreds?.data?.reverse() ||
                                              []
                                          }
                                          isSale={false}
                                      />
                                  )}
                                  {fullInfluencer?.nft_kreds?.data.length ===
                                      0 && (
                                      <Text color="white">Coming soon.. </Text>
                                  )}
                              </>
                          )
                      },
                      {
                          tab: <Text>GAMES</Text>,
                          tabPanel: fullInfluencer && (
                              <InfluencerGame
                                  showAllDefault={true}
                                  contestmasters={
                                      fullInfluencer?.contestmasters
                                          ? fullInfluencer?.contestmasters
                                          : influencer?.contestmasters
                                  }
                              />
                          )
                      }
                  ]
                : [
                      {
                          tab: <Text>NFTS</Text>,
                          tabPanel: (
                              <>
                                  {" "}
                                  {fullInfluencer?.nft_kreds?.data.length >
                                      0 && (
                                      <NftCardList
                                          data={
                                              fullInfluencer?.nft_kreds?.data?.reverse() ||
                                              []
                                          }
                                          isSale={false}
                                          showAll={true}
                                      />
                                  )}
                                  {fullInfluencer?.nft_kreds?.data.length ===
                                      0 && (
                                      <Text color="white">Coming soon.. </Text>
                                  )}
                              </>
                          )
                      }
                  ];
            setTabsData(td);
        }
    }, [fullInfluencer]);

    const getBannerImage = () => {
        if (fullInfluencer) {
            if (fullInfluencer?.banner && fullInfluencer?.banner?.data) {
                return !isTabletOrDesktop
                    ? fullInfluencer?.banner?.data?.length > 1 &&
                      fullInfluencer?.banner?.data?.[1]?.url
                        ? getStrapiMedia(fullInfluencer?.banner?.data[1].url)
                        : "/assets/influencer-banner-mobile.webp"
                    : fullInfluencer?.banner?.data?.length > 0 &&
                      fullInfluencer?.banner?.data?.[0]?.url
                    ? getStrapiMedia(fullInfluencer?.banner?.data[0].url)
                    : "/assets/influencer-banner.webp";
            } else if (
                fullInfluencer?.influencer_category &&
                fullInfluencer?.influencer_category?.data?.banner?.data
            ) {
                return !isTabletOrDesktop
                    ? fullInfluencer?.influencer_category?.data?.banner?.data
                          ?.length > 1 &&
                      fullInfluencer?.influencer_category?.data?.banner
                          ?.data?.[1]?.url
                        ? getStrapiMedia(
                              fullInfluencer?.influencer_category?.data?.banner
                                  ?.data[1].url
                          )
                        : "/assets/influencer-banner-mobile.webp"
                    : fullInfluencer?.influencer_category?.data?.banner?.data
                          ?.length > 0 &&
                      fullInfluencer?.influencer_category?.data?.banner
                          ?.data?.[0]?.url
                    ? getStrapiMedia(
                          fullInfluencer?.influencer_category?.data?.banner
                              ?.data[0].url
                      )
                    : "/assets/influencer-banner.webp";
            }
        }
    };

    return (
        <Box mb={["10vw"]}>
            <SEOContainer
                seoData={influencer.sharedSeo}
                content={influencer}
                pageName={"influencer"}
            />
            <Box
                position="relative"
                align="center"
                width="100vw"
                height={["340px", "370px", "240px", "380px"]}
            >
                <Image
                    alt={`influencer-banner`}
                    objectFit="contain"
                    className="custom-img"
                    layout="fill"
                    src={getBannerImage()}
                />
            </Box>
            <Box mr={[0, "50px"]} ml={[0, "50px"]} mb={["10vw"]}>
                <Breadcumb data={breadcumbData}></Breadcumb>

                {!isTabletOrDesktop ? (
                    <Box
                        position="relative"
                        align="center"
                        mt="20px"
                        zIndex={10}
                    >
                        <InfluencerInfo
                            influencer={fullInfluencer || influencer}
                        />

                        <InfluencerInfoCollapsable
                            influencer={fullInfluencer || influencer}
                        />
                    </Box>
                ) : (
                    <Flex mt="30px">
                        <InfluencerInfo
                            influencer={fullInfluencer || influencer}
                        />

                        <Flex
                            direction={"column"}
                            flex={1}
                            ml="20px"
                            align={"flex-end"}
                        >
                            <InfluencerInfoCollapsable
                                influencer={fullInfluencer || influencer}
                            />
                        </Flex>
                    </Flex>
                )}

                {isTabAvailable && (
                    <Box
                        color="white"
                        border="solid 2px"
                        borderColor={"#421d7a"}
                        bg="#270e4699"
                        borderRadius={["4px", "8px"]}
                        p="30px"
                        w="100%"
                        id="nftCardList"
                        mt="30px"
                    >
                        {tabsData && (
                            <LMSectionTabs
                                variant={"categoryList"}
                                data={tabsData}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default InfluencerDetail;
