import { Box, Text, Image, SimpleGrid } from "@chakra-ui/react";

const DroppingSoonNft = () => {

    const droppingSoonImages = [
        { img: "Corsley.webp", name: "Meta Talent" },
        { img: "Arthur.webp", name: "Mr. Get Shit Done" },
        { img: "Carlos.webp", name: "Game Shark" },
        { img: "Mayank.webp", name: "King of all nerds" },
        { img: "Kartik.webp", name: "Monster" },
        { img: "Kamau.webp", name: "Mind Crusader" },
    ];
    return (
        <>
            <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px"]}>
                DROPPING SOON - NFT SERIES
            </Text>
            <SimpleGrid columns={[2, 3, 3, 3]} ml="10px"
                gridRowGap={5}
                gridColumnGap={10}
                mt="30px"
                mb="30px"
                w="100%">

                {droppingSoonImages.map((item, index) => {

                    return <Box mt={["5%", "2%"]} textAlign="center" filter="auto" blur="5px" >
                        <Image ml={["", "", "", "10%"]} alignItems={"center"} background={"#1c1c1c"} src={`/assets/nfts/${item.img}`} width={["", "", "", "300px"]} height={["", "200px", "300px", "300px"]} /><br></br>
                        <Text alignContent={"center"} color="white" fontFamily="Sora" fontSize={["12px", "12px", "12px", "22px"]} >{item.name}</Text>
                    </Box>
                })}

            </SimpleGrid>
        </>
    );
}
export default DroppingSoonNft;

