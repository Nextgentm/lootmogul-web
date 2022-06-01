import { Box, Text, Image, SimpleGrid } from "@chakra-ui/react";

const DroppingSoonNft = () => {

    const droppingSoonImages = [
        { img: "Sporticon.jpg", name: "Sporticon" },
        { img: "Platina.jpg", name: "Platina" },
        { img: "Monster.jpg", name: "Monster" }
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

                    return <Box mt={["5%", "2%"]} key={"ckt" + index} textAlign="center" >
                        <Image alt="nft" ml={["", "", "", "10%"]} alignItems={"center"} background={"#1c1c1c"} src={`/assets/${item.img}`} width={["", "", "", "300px"]} height={["", "200px", "300px", "300px"]} /><br></br>
                        <Text alignContent={"center"} color="white" fontFamily="Sora" fontSize={["12px", "14px", "16px", "22px"]} >{item.name}</Text>
                    </Box>
                })}

            </SimpleGrid>
        </>
    );
}
export default DroppingSoonNft;