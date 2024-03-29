import { Text, Box, SimpleGrid, Image, Button } from "@chakra-ui/react";
import React from "react";
const ExploreTrivia = ({ section, executeScroll }) => {
  
  const results = []
  section.forEach((value) => {
    if(value?.contestmasters?.data?.length > 0){
      results.push({
          id: value.priority,
          label: value.label || value.name,
          icon: value.image.data?.url || "/assets/designupdate1/games_influencer_tournament.svg",
      });
    }  
  });

  const trivias = [
    section?.filter((item) => {
      if (
        item.name === "Blockchain Games" &&
        item?.contestmasters?.data?.length > 0
      )
        return item;
    }).length > 0 ? {
      id: 0,
      label: "Blockchain Games",
      icon: "skillgame.png",
    } : {},
    section?.filter((item) => {
      if (
        item.name === "Trending Tournament" &&
        item?.contestmasters?.data?.length > 0
      )
        return item;
    }).length > 0 ? {
      id: 1,
      label: "Trending Tournament",
      icon: "games_trending_icon.svg",
    } : {},
    {
      id: 2,
      label: "Influencer Tournament",
      icon: "games_influencer_tournament.svg",
    },
    {
      id: 3,
      label: "Advanced Premium",
      icon: "games_advanced_premium_icon.svg",
    },
    {
      id: 4,
      label: "Free Tournament",
      icon: "games_free_tournament.svg",
    },
  ].filter(s => s?.id >= 0)


  return (
    <Box>
      <Text
        color="white"
        fontFamily="Blanch"
        fontSize={[
          "4rem",
          "4rem",
          "4rem",
          "5rem",
          "5rem"
        ]}
        my="30px"
        mt="5%"
      >
        EXPLORE TRIVIA
      </Text>

      <SimpleGrid
        columns={[1, 1, 2, results?.length >= 6 ? 6 : results?.length, results?.length >= 6 ? 6 : results?.length]}
        w="100%"
        px={["5%"]}
        mt={["20px", 0]}
        flexWrap="wrap"
      >
        {results.map((item, index) => (
                    
          <Button
            onClick={() => {
              executeScroll(item.id);
            }}
            key={`trivia-${index}`}
            align="center"
            borderRadius="6px"
            p="10px"
            mt="20px"
            mr={["0em", "0em", "1.5em", "1em", "1.5em"]}
            height="140px"
            flexDir={"column"}
            textAlign="center"
            variant={"trivia"}
          >
            <Image
              boxSize="55px"
              alt={item.icon}
              objectFit={"contain"}
              src={`${item.icon}`}
            />

            <Text
              my="12px"
              lineHeight={"14px"}
              width="100%"
              fontFamily={"Sora"}
              fontWeight="normal"
              color="white"
              fontSize={["20px", "20px", "13px", "13px", "16px"]}
              style={{"text-wrap":"wrap"}}
            >
              {item.label}
            </Text>
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ExploreTrivia;
