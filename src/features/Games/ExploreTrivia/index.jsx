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
            icon: "trending.png"
        },
        {
            id: 1, label: "Influencer Tournament",
            color: "#FFDBED",
            icon: "role-play.png"
        },
        {
            id: 2,
            label: "Advanced Premium",
            color: "#D0FFD8",
            icon: "badge.png"
        },
        {
            id: 3,
            label: "Free Tournament",
            color: "#FFE7A3",
            icon: "free.png"
        }


    ]:[
       
        {
            id: 0, label: "Influencer Tournament",
            color: "#FFDBED",
            icon: "role-play.png"
        },
        {
            id: 1,
            label: "Advanced Premium",
            color: "#D0FFD8",
            icon: "badge.png"
        },
        {
            id: 2,
            label: "Free Tournament",
            color: "#FFE7A3",
            icon: "free.png"
        }


    ];

    return (
        <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">

            <Flex
                align={["flex-start", "center"]}
                direction={["column", "row"]}
                mt="20px"
            >
                <Flex



                    pr={["20px", 0]}
                    justify="space-between"
                >
                    <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px", "58px"]}>
                        Explore Trivia
                    </Text>

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
                            borderRadius={["5px", "10px"]}
                            h={["26px", "36px", "40px"]}
                            p="10px"
                            w={"100%"}
                            flex={1}
                        >
                            <Image
                                width={"20px"}
                                height={"20px"}
                                alt={item.icon}
                                objectFit={"contain"}
                                src={`/assets/${item.icon}`}
                            />



                            <Text
                                ml={["6px", "6px", "12px", "12px"]}
                                lineHeight={"14px"}
                                width="100%"
                                fontFamily={"Blanch"}
                                color="#363636"
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