import { Box, Text, Image, Button, SimpleGrid } from "@chakra-ui/react";

const WhyBuyNft = () => {

    const cricketNftImages = [
        { img: "Mayank.gif", name: "Mayank Dagar", spec: "All-Rounder", path: "https://bit.ly/3tnA71R" },
        { img: "Kartik.gif", name: "Kartik Tyagi", spec: "Right Arm Fast Bowler", path: "https://bit.ly/3afbLjS" }
      
    ];

    return (
        <>

            <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px"]}>
                WHY BUY NFT AT LOOTMOGUL?
            </Text>
            <Text variant="hint" mt="10px" fontSize="14px">
                At Lootmogul, you get In-Real Life(IRL) rewards when you buy NFT.

                Also, every NFT you own is worth utility on Lootmogul Metaverse, and can be auctioned, leased, rented  &amp; or sold in the open marketplace and global metaverse.
            </Text>
            <SimpleGrid columns={[1, 2, 2, 2]} ml="10px" gridRowGap={5} gridColumnGap={5} mt="30px" mb="30px" w="100%">

                {cricketNftImages.map((item, index) => {

                    return <Box mt={["5%", "2%"]} textAlign="center" key={"cktgif"+index} >
                        <Image alt="gif" ml={["", "", "5%", "20%"]} alignItems={"center"} background={"#1c1c1c"} src={`/assets/cricketnfts/${item.img}`} width={["", "380px"]} height={["", "380px"]} />
                        <Text color="white" fontFamily="Blanch" fontSize={["22px", "28px", "28px", "58px"]}>{item.name}</Text>
                        <Text color="white" fontFamily="Sora" fontSize={["12px", "12px", "12px", "22px"]} >{item.spec}</Text>
                        <Button fontSize={["20px", "", "20px", "30px"]} fontFamily="Blanch" color={"black"} borderRadius={["20px"]} margin="auto" mt="2%" width={["130px"]} height={["30px"]} variant="outline" bgColor={"white"} onClick={() => window.open(item.path,"_blank"
                        )} > Explore Now</Button>
                    </Box>

                })}

            </SimpleGrid>
        </>
    );
}
export default WhyBuyNft;

