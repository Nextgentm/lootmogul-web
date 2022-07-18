import { Box, Flex, Text } from "@chakra-ui/react";

import dynamic from 'next/dynamic'
import { InView } from 'react-intersection-observer';

import InfluencerVideos from './InfluencerVideos';
import FAQ from './FAQ';
import Testimonials from './Testimonials';
import BottomBanners from './BottomBanners';
import TopBanners from './TopBanners';

import FeaturedInfluencers from './FeaturedInfluencers';
import AsSeen from './AsSeen';
import TrendingGames from './TrendingGames';
import IntroHeader from './IntroHeader';
import InstaFollow from './InstaFollow';


// const InfluencerVideos =  dynamic(() => import("./InfluencerVideos")) ;
// const FAQ =  dynamic(() => import("./FAQ")) ;
// const Testimonials =  dynamic(() => import("./Testimonials")) ;
// const BottomBanners =  dynamic(() => import("./BottomBanners")) ;
// const TopBanners =  dynamic(() => import("./TopBanners")) ;
// const FeaturedInfluencers =  dynamic(() => import("./FeaturedInfluencers")) ;
// const AsSeen =  dynamic(() => import("./AsSeen")) ;
// const TrendingGames =  dynamic(() => import("./TrendingGames")) ;
// const IntroHeader =  dynamic(() => import("./IntroHeader")) ;


// const MyPageLoader =  dynamic(() => import("../../../../src/components/MyPageLoader"));


//  const InstaFollow = dynamic(() => import("./InstaFollow"));  

const Home = ({ topBanners, bottomBanners, faqData, featuredInfluencers, trendingGames, testimonials }) => {

  const renderWhoWeAre = () => (
    <Flex direction="column" mt="20px" mb="20px" ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]}>
      <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px"]}>
        About LootMogul
      </Text>



      <Text variant="hint" mt="10px" fontSize="14px">
        LootMogul is a multiverse blockchain gaming platform for sports influencers and fans to engage.

        Team of 20 blockchain &amp; game developers, designers and founders from Santa Monica/Malibu, California.

        Currently, lootmogul has 112 sports athletes signed up under a two year contract and a total reach of 65 Million people.
      </Text>

    </Flex>
  );

  return (
    <Box>
      {/* <UserAvatar/> */}
      <TopBanners bannersList={topBanners} />
      <IntroHeader />

      <InfluencerVideos />
      <FeaturedInfluencers data={featuredInfluencers || []} />
      <TrendingGames data={trendingGames || []} />
      <BottomBanners bannersList={bottomBanners || []} />
      {/* <News /> */}
      {renderWhoWeAre()}

      {/* {renderAsSeen()} */}
      <Testimonials data={testimonials} />
      <AsSeen />
      <InstaFollow />

      <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="50px">
        <FAQ title="FREQUENTLY ASKED QUESTIONS" data={faqData} />
      </Box>

    </Box>
  );
};

export default Home;
