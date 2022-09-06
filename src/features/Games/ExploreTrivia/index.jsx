import { Flex, Text, Box, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";

const ExploreTrivia = ({ section,executeScroll }) => {
    const trivias = section?.filter((item)=>{
        if((item.name === "Trending Tournament") && item?.contestmasters?.data?.length > 0)
        return item;
    }).length > 0?
    [
        {
            id: 0,
            label: "Trending Tournament",
            color: "#D0FFD8",
            icon: "games_trending_icon.svg"
        },
        {
            id: 1, label: "Influencer Tournament",
            color: "#FFDBED",
            icon: "games_influencer_tournament.svg"
        },
        {
            id: 2,
            label: "Advanced Premium",
            color: "#D0FFD8",
            icon: "games_advanced_premium_icon.svg"
        },
        {
            id: 3,
            label: "Free Tournament",
            color: "#FFE7A3",
            icon: "games_free_tournament.svg"
        }


    ]:[
       
        {
            id: 0, label: "Influencer Tournament",
            color: "#FFDBED",
            icon: "games_influencer_tournament.svg"
        },
        {
            id: 1,
            label: "Advanced Premium",
            color: "#D0FFD8",
            icon: "games_advanced_premium_icon.svg"
        },
        {
            id: 2,
            label: "Free Tournament",
            color: "#FFE7A3",
            icon: "games_free_tournament.svg"
        }


    ];

    return (
        <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">

<Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px", "58px"]}>
                        EXPLORE TRIVIA
                    </Text>

            <Flex
                align={["flex-start", "center"]}
                direction={["column", "row"]}
                mt="20px"
            >
               
                <Flex
                 pr={["20px", 0]}
                    justify="space-between"
                >
                   
                    {/* <Box w="25px" h="25px" position={"relative"} top="10px">
                    <Image
                        alt={"ellipse"}
                        src={`/assets/ellipse.png`}
                    />
                </Box> */}
                </Flex>
                <SimpleGrid columns={[2, 4, 4, 4]} spacing={5} w={["100%", "75%"]} ml={["", "5%", "5%"]} mt={["20px", 0]}>
                    {/* <Flex
                    flex={[1, 0.6]}
                    mt={["20px", 0]}
                    w={["100%", "84%", "74%", "100%"]}
                    ml={["auto", "1%", "5%"]}
                    pr={["", "", "10px", "20px"]}

                > */}
                    {trivias.map((item, index) => (

                        <Flex style={{ cursor: "pointer" }}
                            onClick={() => executeScroll(item.id)}
                            key={`trivia-${index}`}
                            bg={item.color}
                            mr={["4px", "16px"]}
                            align="center"
                            borderRadius={["2px", "4px"]}
                            p="10px"
                            w={"100%"}
                            flex={1}
                            flexDir={"column"}
                            textAlign="center"
                            bgGradient="linear(90deg, #E90A63 0%, #481A7F 100%)"
                            box-shadow= "120px 80px 40px 20px #0ff"

                        >
                            <Image
                                width={"20px"}
                                height={"20px"}
                                alt={item.icon}
                                objectFit={"contain"}
                                src={`/assets/designupdate1/${item.icon}`}
                            />



                            <Text
                                mt={["6px", "6px", "12px", "12px"]}
                                lineHeight={"14px"}
                                width="100%"
                                fontFamily={"Blanch"}
                                color="white"
                                fontSize={["12px", "16px", "18px", "20px"]}
                            >
                                {item.label}
                            </Text>
                        </Flex>

                    ))}
                </SimpleGrid>
            </Flex>

        </Box >
    );
};

export default ExploreTrivia;