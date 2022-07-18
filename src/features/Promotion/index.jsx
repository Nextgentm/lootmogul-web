import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";

import { usePromotionBanners } from "../Home/api";

import PromotionBanners from "./PromotionBanners";
import PromoCard from "./PromoCard";

const Promotion = () => {
    const { data = [] } = usePromotionBanners();

    return (
        <Box>

            <PromotionBanners bannersList={data || []} />

            <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px" >
                <Flex justify="space-between" mt="20px" align="center" mb="20px">
                    <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "58px", "58px"]}>
                        Promotions
                    </Text>
                </Flex>
                <SimpleGrid minChildWidth='339px' spacing='40px' >
                    {data && data.map((data, index) => {
                        return <PromoCard key={"promocard" + index} promotion={data} />
                    })}


                    {/* <PromoCard />
        <PromoCard />
        <PromoCard />
        <PromoCard /> */}

                </SimpleGrid>

            </Box>

        </Box>
    );
};

export default Promotion;
