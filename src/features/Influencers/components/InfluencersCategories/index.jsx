import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Text, Grid, Link, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
//import dynamic from 'next/dynamic';
import InfluencersCard from "./InfluencersCard";
const InfluencersCategories = ({ isMobileDevice, influencer }) => {
    const router = useRouter();

    return (
        <>
            {/* <Link cursor="pointer" _hover={{ border: "none", boxShadow: "none", textDecoration: "none" }} _focus={{ border: "none", boxShadow: "none", textDecoration: "none" }} href={"/influencers/category/" + influencer.slug.split('-')[0]}>
                <Text color="white" fontFamily="Blanch" fontSize="32px" mt="20px">
                    {influencer.name}
                </Text>
            </Link> */}

            {/* {isMobileDevice ? (
                <ScrollMenu className="no-scrollbar">
                    {influencer.influencers.data.map((influencer, index) => (

                        <InfluencersCard
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={influencer.slug}
                            influencer={influencer}
                        />

                    ))}
                </ScrollMenu>
            ) : ( */}
                <Grid
                flexWrap="wrap"
                    rowGap={5}
                    mt="10px"
                    templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)","repeat(4, 1fr)"]}
                    gap={5}
                >
                    {influencer.influencers.data.map((influencer, index) => (
                        <InfluencersCard
                        style={ {w:"100%" ,px:"15px"}}
                            colSpan={4}
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={influencer.slug}
                            influencer={influencer}
                        />
                    ))}
                </Grid>
            {/* )} */}
        </>
    );
};

export default InfluencersCategories;