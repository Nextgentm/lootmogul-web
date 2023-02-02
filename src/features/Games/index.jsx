import { useRouter } from "next/router";
import { Box, Button, Text, Link, Flex, Heading } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useRef, useState } from "react";
import BottomBanners from "../Home/components/BottomBanners";
import GamesCategories from "./GamesCategories";
import ExploreTrivia from "./ExploreTrivia";
import GameCarouselCard from "./GameCarouselCard";
import LMThumbnailCarousel from "../../components/LMCarousel/LMThumbnailCarousel";
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
    for (let i = 0; i < 10; i++) {
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
      setCarouselItem(ci.slice(0, 1));
    }
  }, [contestmasters, contestSectionsData]);

  return (
    <Box mx={[4, 8]}>
      <Box mb={"10vw"}>
        <Box>
          <Flex direction={["column", "column", "column", "row"]}>
            <Box w={["100%", "100%", "100%", "70%"]}>
              <Box mt={!isMobileDevice ? 26 : 0}>
                <Text
                  variant="headText"
                  fontSize={[
                    "70px",
                    "70px",
                    "100px",
                  ]}
                  mb={0}
                  fontFamily="var(--chakra-fonts-Blanch)"
                  lineHeight="1"
                  textShadow="unset"
                >
                  Join the fun and win big 
                  <br />
                  with our exciting games!
                </Text>

                <Text
                  color="#FFF !important"
                  fontSize={["18px", "18px", "25px", "1.3em"]}
                  lineHeight={["35px", "35px", "40px"]}
                  fontWeight="normal"
                  width={["100%", "100%", "100%", "50%"]}
                  my="1em"
                >
                  Get a chance to win amazing prizes
                </Text>

                <Button
                  mt={6}
                  mb={6}
                  fontSize={["20px", "20px", "24px"]}
                  fontWeight="normal"
                  onClick={() => {
                    "https://d3vhkc3gcq7ogm.cloudfront.net/en/flick-soccer-lootmogul/index.html?tournament_id=3&game_id=4"
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
        <Flex my="40px" minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading variant="sectionTitle">MarketJs Tournament</Heading>
          </Box>
        </Flex>
        <Box mx={[2.5, 0]}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            apiRef={ref}
          >
            <MarketJs style={{
              w: [
                "75vw",
                "75vw",
                "370px",
                "370px"
              ],
              mx: 3
            }}
              imgUrl="./assets/FlickSoccer.png"
              author="Flick soccer"
              key="Flick soccer"
              sectionName={'Arcade'}
              gameUrl="https://d3vhkc3gcq7ogm.cloudfront.net/en/flick-soccer-lootmogul/index.html?tournament_id=3&game_id=4"
            />
            <MarketJs style={{
              w: [
                "75vw",
                "75vw",
                "370px",
                "370px"
              ],
              mx: 3
            }}
              imgUrl="./assets/hoop-star.jpeg"
              author="Hoop star"
              key="Hoop star"
              sectionName={'Arcade'}
              gameUrl="https://d3vhkc3gcq7ogm.cloudfront.net/en/hoop-star-lootmogul/index.html?tournament_id=1&game_id=2"
            />
          </ScrollMenu>
        </Box>

        <Flex my="40px" minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading variant="sectionTitle">Gamepix Tournament</Heading>
          </Box>
        </Flex>
        <Box mx={[2.5, 0]}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            apiRef={ref}
          >
            <GamePixCard style={{
              w: [
                "75vw",
                "75vw",
                "370px",
                "370px"
              ],
              mx: 3
            }}
              imgUrl="https://games.assets.gamepix.com/Y28AA/thumbnail/small.png"
              author="Fairy Falls"
              key="Fairy Falls"
              sectionName={'Arcade'}
              gameUrl="https://play.gamepix.com/floppy-paper/embed?sid=1"
            />
            <GamePixCard style={{
              w: [
                "75vw",
                "75vw",
                "370px",
                "370px"
              ],
              mx: 3
            }}
              imgUrl="https://games.assets.gamepix.com/E954R/thumbnail/small.png"
              author="Double Plane Venture"
              key="Double Plane Venture"
              sectionName={'Arcade'}
              gameUrl="https://play.gamepix.com/double-plane-venture/embed?sid=1"
            />
          </ScrollMenu>
        </Box>
        <Box>
          {contestSections &&
            contestSections.map((section, index) => (
              <Box
                key={"sec-index-" + index}
                ref={itemRefs[index]}
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
        <MultipleLoggedInUser />
      </Box>
    </Box>
  );
};

export default GamesComponent;
