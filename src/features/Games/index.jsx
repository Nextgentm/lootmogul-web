import { useRouter } from "next/router";
import { Box, Button, Text, Link, Flex, Heading } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useRef, useState } from "react";
import BottomBanners from "../Home/components/BottomBanners";
import GamesCategories from "./GamesCategories";
import ExploreTrivia from "./ExploreTrivia";
import GameCarouselCard from "./GameCarouselCard";
import LMThumbnailCarousel from "../../components/LMCarousel/LMThumbnailCarousel";
import Banner from "../../components/Games/Banner";

import React from "react";
import MultipleLoggedInUser from "../../components/MultipleLoggedInUser";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../../components/ContentNavigator/arrows";
import { GamePixCard } from "./GamePixCard";
import { MarketJs } from "./GamePixCard";

const GamesComponent = ({ contestmasters, contestSectionsData, banners }) => {
  const { isMobileDevice } = useContext(AppContext);

  const [itemRefs, setItemRefs] = useState([]);

  useEffect(() => {
    let irs = [];
    for (let i = 0; i < 100; i++) {
      irs[i] = React.createRef();
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
  const ref = useRef();

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
      setCarouselItem(ci.slice(0, 5));
    }
  }, [contestmasters, contestSectionsData]);

  return (
    <Box> 
      <Box className="top_game_banner">
       <Banner executeScroll={executeScroll} />
      </Box> 
      {isMobileDevice && <Box>
        <Flex direction={["column", "column", "column", "row"]}>
          <Box w={["100%", "100%", "100%", "100%"]}>
              <Box mt={!isMobileDevice ? 25 : 65} ml="30px">
                  <Text
                  variant="headText"
                  fontSize={[
                      "50px",
                      "50px",
                      "70px",
                  ]}
                  mb={0}
                  fontFamily="var(--chakra-fonts-Blanch)"
                  lineHeight={[
                      "50px",
                      "50px",
                      "60px",
                  ]}
                  textShadow="unset"
                  >
                   Experience web3 gaming with 
                  generative AI
                  </Text>

                  <Text
                  color="#FFF !important"
                  fontSize={["14px", "16px", "25px", "1.3em"]}
                  lineHeight={["14px", "18px", "40px"]}
                  fontWeight="normal"
                  width={["100%", "100%", "100%", "50%"]}
                  my="1em"
                  >
                   Join the thrill of top blockchain games and win <br/>amazing prizes!
                  </Text>
                  
              </Box>
          </Box>
        </Flex>
      </Box>
      }
      <Box mx={[4, 8]}>
        <Box mb={"4vw"}>
          <ExploreTrivia
            section={contestSections}
            executeScroll={executeScroll}
          />
        
          <Box>
            {contestSections &&
              contestSections.map((section, index) => (
                <Box
                  key={"sec-index-" + index}
                  ref={itemRefs[section.priority]}
               
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
        <Box
              px={[0,0]}
              width={["100%", "100%", "100%", "100%"]}
              margin={"auto"}
              mb={"4vw"}
          >
             <Text
                variant="headText"
                fontSize={[
                    "34px",
                    "34px",
                    "70px",
                ]}
                mb={0}
                mt="5%"
                fontFamily="var(--chakra-fonts-Blanch)"
                lineHeight={[
                    "30px",
                    "30px",
                    "60px",
                ]}
                textShadow="unset"
                >
                Connect - Play - Learn - Earn                      
                </Text>
              <Text
                  color="white"
                  fontSize={[
                      "1rem",
                      "1.3rem",
                      "1.3rem",
                      "1.4rem",
                      "1.5rem"
                  ]}
                  mt="20px"
                  fontFamily="Sora"
                  fontWeight="normal"
                  lineHeight={["30px", "30px", "36px"]}
                  width={["100%", "100%", "100%"]}
              >
                  Immerse yourself in blockchain gaming trivia and contests galore. Join a universe where cutting-edge technology meets thrilling gameplay. Explore a variety of titles, each offering unique experiences and rewards. Level up your gaming journey and seize the opportunity to win exciting prizes. Join us in this innovative gaming adventure today!
              </Text>
          </Box>
      </Box>
    </Box>
  );
};

export default GamesComponent;