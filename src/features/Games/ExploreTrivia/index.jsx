import { Flex, Text, Box, SimpleGrid, Image, Button } from "@chakra-ui/react";
// import Image from "next/image";
import React,{useState} from "react";
const ExploreTrivia = ({ section, executeScroll }) => {
  

  
    const trivias =
        section?.filter((item) => {
            if (
                item.name === "Trending Tournament" &&
                item?.contestmasters?.data?.length > 0
            )
                return item;
        }).length > 0
            ? [
                  {
                      id: 0,
                      label: "Trending Tournament",
                    //   color: "#D0FFD8",
                      icon: "games_trending_icon.svg"
                  },
                  {
                      id: 1,
                      label: "Influencer Tournament",
                    //   color: "#FFDBED",
                      icon: "games_influencer_tournament.svg"
                  },
                  {
                      id: 2,
                      label: "Advanced Premium",
                    //   color: "#D0FFD8",
                      icon: "games_advanced_premium_icon.svg"
                  },
                  {
                      id: 3,
                      label: "Free Tournament",
                    //   color: "#FFE7A3",
                      icon: "games_free_tournament.svg"
                  }
              ]
            : [
                  {
                      id: 0,
                      label: "Influencer Tournament",
                    //   color: "#FFDBED",
                      icon: "games_influencer_tournament.svg"
                  },
                  {
                      id: 1,
                      label: "Advanced Premium",
                    //   color: "#D0FFD8",
                      icon: "games_advanced_premium_icon.svg"
                  },
                  {
                      id: 2,
                      label: "Free Tournament",
                    //   color: "#FFE7A3",
                      icon: "games_free_tournament.svg"
                  }
              ];

    return (
        <Box >
            <Text
               variant="secHeadText"
                fontSize={["25px", "35px"]}
                textAlign={["center","left"]}
                my="30px"
            >
                EXPLORE TRIVIA
            </Text>

            <SimpleGrid columns={[1,1,2,4,4]}
                w="100%"
                px={["", "5%"]}
                mt={["20px", 0]}
                flexWrap="wrap"
            >
                {trivias.map((item, index) => (
                    <Button
                        // style={{ cursor: "pointer" }}
                        onClick={() => {
                            executeScroll(item.id)
                        }}
                        key={`trivia-${index}`}
                        // bg={item.color}
                        align="center"
                        borderRadius="6px"
                        p="10px"
                        mt="20px"
                        mr={["0em","0em","1.5em","1em","1.5em"]}
                        height="140px"
                        flexDir={"column"}
                        textAlign="center"
                        background= {["transparent", "#1c1c1c"]}
                        
                        _hover={{  bgGradient:"linear(90deg, #E90A63 0%, #481A7F 100%)",boxShadow:"0px 0px 30px 10px #e90a6355" }}
                          
                    >
                        <Image
                            boxSize="55px"
                            alt={item.icon}
                            objectFit={"contain"}
                            src={`/assets/designupdate1/${item.icon}`}
                        />

                        <Text
                            my="12px"
                            lineHeight={"14px"}
                            width="100%"
                            fontFamily={"Sora"}
                            fontWeight="normal"
                            color="white"
                            fontSize={["20px", "20px", "13px","13px", "16px"]}
                        >
                            {item.label}
                        </Text>
                    </Button>
                ))}
            </SimpleGrid>
        </Box>
    );
};

 const focus={
    bgGradient:"linear(90deg, #E90A63 0%, #481A7F 100%)",
    boxShadow:"0px 0px 30px 10px #e90a6355"
 }
  const bg={
    bgGradient:"linear(90deg, #FFFF 0%, #481A7F 100%)",
    boxShadow:"0px 0px 30px 10px #e90a6355"
  }
export default ExploreTrivia;
