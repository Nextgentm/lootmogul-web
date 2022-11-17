import { Box, Grid, Image } from "@chakra-ui/react";
import InfluencersCard from "./InfluencersCard";
const InfluencersCategories = ({ influencer }) => {
    return (
        <>
            <Grid
                flexWrap="wrap"
                rowGap={5}
                mt="10px"
                templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(5, 1fr)"
                ]}
                gap={5}
            >
                {influencer.influencers.data
                    .sort((a, b) => a.order - b.order)
                    .map((influencer, index) => (
                        <Box>
                            <InfluencersCard
                                style={{ w: "100%", px: "15px" }}
                                colSpan={4}
                                itemId={`item-${index}`}
                                key={`item-${index}`}
                                slug={influencer.slug}
                                influencer={influencer}
                            />
                            <Image
                                height={"390px"}
                                width={"400px"}
                                src="/assets/side_Frame.png"
                            />
                        </Box>
                    ))}
            </Grid>
        </>
    );
};

export default InfluencersCategories;
