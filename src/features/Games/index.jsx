import { useRouter } from "next/router";
import { Box,  Button, Text, Link, Flex } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useState } from "react";
import BottomBanners from "../Home/components/BottomBanners";
import GamesCategories from "./GamesCategories";
import ExploreTrivia from "./ExploreTrivia";
import GameCarouselCard from "./GameCarouselCard";
import LMThumbnailCarousel from "../../components/LMCarousel/LMThumbnailCarousel";
import React from "react";

const GamesComponent = ({ contestmasters, contestSectionsData, banners }) => {
    const { isMobileDevice } = useContext(AppContext);

    const [itemRefs, setItemRefs] = useState([]);
    
    useEffect(() => {
      let irs = [];
      for(let i=0;i<10;i++){
          irs[i]= React.createRef() ;
      }
      setItemRefs(irs);
    }, []);
    
    const router = useRouter();
    const [contestSections, setContestSections] = useState([]);

    const [featuredGames, setFeaturedGames] = useState([]);
    const [carouselItem, setCarouselItem] = useState();

    const bottomBanners = banners.filter(
        ({ position }) => position === "promotion_top"
    );

    const executeScroll = (id) => {
        itemRefs[id].current.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    const { callAuthService } = useContext(AppContext);

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

    useEffect(() => {
        if (contestmasters) {
            const fg = [];
            const cs = [];
            // //console.log("contestmasters",contestmasters);
            contestmasters.map((cm) => {
                if (cm.isFeatured) fg.push(cm);

                let section = contestSectionsData?.find(
                    (sec) => sec.id == cm.contest_section?.data?.id
                );
                if (section) {
                    if (section?.contestmasters?.data)
                        section.contestmasters.data?.push(cm);
                    else {
                        section.contestmasters = {
                            data: [cm]
                        };
                    }
                }
            });
            setFeaturedGames(fg);

            setContestSections(contestSectionsData);
            const ci = fg.map((item, index) => {
                return (
                    <Link
                        _hover={{ textDecoration: "none" }}
                        _focus={{ border: "none", boxShadow: "none" }}
                        href={"/games/" + item.slug}
                        width="100%"
                        height={"100%"}
                        key={"gameCar" + index}
                    >
                        <GameCarouselCard
                            sectionName={item.contest_section?.name}
                            contestmaster={item}
                        />
                    </Link>
                );
            });
            setCarouselItem(ci.slice(0, 1));
        }
    }, [contestmasters, contestSectionsData]);

    return (
      <Box mx={[4,8]}>
            <Box mb={"10vw"}>
                <Box>
                <Flex direction={["column", "column", "column", "row"]}>
            <Box pb={[5, 5, 12]} w={["100%", "100%", "100%", "70%"]}>
              <Box mt={!isMobileDevice ? 26 : 0}>
                <Text
                  variant="headText"
                  fontSize={["35px", "2.5em", "53px", "3.5em", "4em"]}
                  mt={["3rem", "5rem", "5rem"]}
                  mb={0}
                  lineHeight={["50px", "45px", "80px"]}
                >
                  Check out New releases
                  <br />
                  ARE YOU READY TO PLAY?
                </Text>

                <Text
                  color="#FFF !important"
                  fontSize={["18px", "18px", "25px", "1.3em"]}
                  lineHeight={["35px", "35px", "40px"]}
                  fontWeight="normal"
                  width={["100%", "100%", "100%", "50%"]}
                  my="1em"
                >
                  Become a virtual landlord to some of the largest projects in
                  crypto
                </Text>

                <Button
                  mt={6}
                  fontSize={["20px", "20px", "24px"]}
                  fontWeight="normal"
                  onClick={() => {
                    executeScroll(0);
                  }}
                >
                  Play Now
                </Button>
              </Box>
            </Box>
            <Box
              w={["100%", "100%", "100%", "30%"]}
              m="auto"
              bgSize="cover"
              textAlign={"center"}
              px={10}
              pb={12}
              pt={[0, 0, 0, 8, 12]}
              mt={[]}
            >
              {carouselItem && (
                <LMThumbnailCarousel
                  isLimitedDots={true}
                  disableDots={true}
                  autoplaySpeed={5000}
                  children1={carouselItem}
                ></LMThumbnailCarousel>
              )}
            </Box>
          </Flex>
        </Box>

        <ExploreTrivia
          section={contestSections}
          executeScroll={executeScroll}
        />
        <Box>
          {contestSections &&
            contestSections.map((section, index) => (
              <Box
                key={"sec-index-" + index}
                ref = {itemRefs[index]}
                // ref={(el) => {
                //   let iR = itemRefs;
                //   iR[index] = el;
                //   setItemRefs(iR);
                // }}
              >
                {section?.contestmasters?.data &&
                  section?.contestmasters?.data.length > 0 && (
                    <GamesCategories
                      key={`games-${index}`}
                      isMobileDevice={isMobileDevice}
                      section={section}
                    />
                  )}
              </Box>
            ))}
        </Box>

        {bottomBanners && <BottomBanners bannersList={bottomBanners} />}
      </Box>
    </Box>
  );
};

export default GamesComponent;
