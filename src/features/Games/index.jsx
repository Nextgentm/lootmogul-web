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
       <Banner/>
      </Box> 
      <Box mx={[4, 8]}>
        <Box mb={"10vw"}>
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
    </Box>
  );
};

export default GamesComponent;
