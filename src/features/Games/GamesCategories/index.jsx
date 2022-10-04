import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
  Box,
  Text,
  Flex,
  Wrap,
  WrapItem,
  useMediaQuery,
  Heading,
} from "@chakra-ui/react";
import GamesCard from "../../InfluencerDetails/InfluencerGames/InfluencerGameCard";
import { useRef, useState } from "react";
import ViewAllBtn from "../../../components/ViewAllBtn";
import {
  LeftArrow,
  RightArrow,
} from "../../../components/ContentNavigator/arrows";
const GamesCategories = ({ isMobileDevice, section }) => {
  const ref = useRef();
  const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
  const arrowTrashhold = isMobileDevice ? 2 :isLargerScreen ? 7: 5;
  const [showAll, setShowAll] = useState(false);
  console.log(section?.contestmasters?.data.length);
  return (
    <Box>
      <Flex justify="space-between" my="40px" align="center" w="100%">
      <Heading variant="sectionTitle">
      {section.name}
      </Heading>
            {section?.contestmasters?.data.length > arrowTrashhold ? (
              <Box 
              display={{
                base: "none",
                md: "flex",
              }}
                onClick={() => setShowAll(!showAll)}
                pos="relative"
                right="0"
              >
                <ViewAllBtn />
              </Box>
            ) : (
              ""
            )}
          
      </Flex>
      {showAll ? (
        <Wrap m="auto !important">
          {section?.contestmasters?.data
            .sort((a, b) => a.priority - b.priority)
            .map((cm, index) => (
              <WrapItem m="auto !important" mb="2%!important">
                <GamesCard
                  style={{ mr: "24px" }}
                  key={`gamescard-${index}`}
                  contestmaster={cm}
                  sectionName={section.name}
                />
              </WrapItem>
            ))}
        </Wrap>
      ) : (
        <Box mx={[2.5,0]}>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} apiRef={ref} >
          {section?.contestmasters?.data
            ?.sort((a, b) => a.priority - b.priority)
            .map((cm, index) => (
              <GamesCard
                style={{ w:["75vw","75vw","370px","370px"], mx:3}}
                itemId={`item-${index}`}
                key={`item-${index}`}
                contestmaster={cm}
                sectionName={section.name}
              />
            ))}
        </ScrollMenu>
        </Box>
      )}
    </Box>
  );
};

export default GamesCategories;
