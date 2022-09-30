import { Grid } from "@chakra-ui/react";
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
                    "repeat(4, 1fr)"
                ]}
                gap={5}
            >
                {influencer.influencers.data.sort((a, b) => a.order - b.order).map((influencer, index) => (
                    <InfluencersCard
                        style={{ w: "100%", px: "15px" }}
                        colSpan={4}
                        itemId={`item-${index}`}
                        key={`item-${index}`}
                        slug={influencer.slug}
                        influencer={influencer}
                    />
                ))}
            </Grid>
        </>
    );
};

export default InfluencersCategories;
