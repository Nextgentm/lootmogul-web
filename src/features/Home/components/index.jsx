import { Box, Flex, Text } from "@chakra-ui/react";

import InfluencerVideos from "./InfluencerVideos";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import BottomBanners from "./BottomBanners";
import TopBanners from "./TopBanners";

import FeaturedInfluencers from "./FeaturedInfluencers";
import AsSeen from "./AsSeen";
import TrendingGames from "./TrendingGames";
import IntroHeader from "./IntroHeader";
import InstaFollow from "./InstaFollow";
import { useEffect } from "react";

const Home = ({
    topBanners,
    bottomBanners,
    faqData,
    featuredInfluencers,
    trendingGames,
    testimonials
}) => {
    useEffect(() => {
        setTimeout(() => {
            window.location.replace('https://lootmogul.wpengine.com/home')
          }, 5000);
    }, []);

    const renderWhoWeAre = () => (
        <Flex
            direction="column"
            mt="20px"
            mb="20px"
            ml={["20px", "20px", "20px", "60px"]}
            mr={["20px", "20px", "20px", "60px"]}
        >
            <Text
                color="white"
                fontFamily="Blanch"
                fontSize={["28px", "28px", "28px", "58px"]}
            >
                About LootMogul
            </Text>

            <Text variant="hint" mt="10px" fontSize="14px">
                LootMogul is a multiverse blockchain gaming platform for sports
                influencers and fans to engage. Team of 20 blockchain &amp; game
                developers, designers and founders from Santa Monica/Malibu,
                California. Currently, lootmogul has 112 sports athletes signed
                up under a two year contract and a total reach of 65 Million
                people.
            </Text>
        </Flex>
    );

    return (
        <Box>
            <TopBanners bannersList={topBanners} />
            <IntroHeader />

            <InfluencerVideos />
            <FeaturedInfluencers data={featuredInfluencers || []} />
            <TrendingGames data={trendingGames || []} />
            <BottomBanners bannersList={bottomBanners || []} />

            {renderWhoWeAre()}

            <Testimonials data={testimonials} />
            <AsSeen />
            <InstaFollow />

            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
                mt="50px"
            >
                <FAQ title="FREQUENTLY ASKED QUESTIONS" data={faqData} />
            </Box>
        </Box>
    );
};

export default Home;
