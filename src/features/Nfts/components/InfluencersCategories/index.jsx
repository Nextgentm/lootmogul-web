import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Text, Grid } from "@chakra-ui/react";
import InfluencersCard from "./InfluencersCard";

const InfluencersCategories = ({ isMobileDevice, influencer }) => {
    return (
        <>
            <Text color="white" fontFamily="Blanch" fontSize="32px" mt="20px">
                {influencer.name}
            </Text>

            {isMobileDevice ? (
                <ScrollMenu>
                    {influencer?.influencers?.data?.sort((a, b) => a.order - b.order).map((influencer, index) => (
                        <InfluencersCard
                            style={{ w: "190px", mr: "30px", mt: "10px" }}
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={influencer.slug}
                            influencer={influencer}
                        />
                    ))}
                </ScrollMenu>
            ) : (
                <Grid
                    rowGap={10}
                    mt="10px"
                    templateColumns="repeat(5, 1fr)"
                    gap={6}
                >
                    {influencer.influencers.data.map((influencer, index) => (
                        <InfluencersCard
                            style={{ w: "185px" }}
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={influencer.slug}
                            influencer={influencer}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
};

export default InfluencersCategories;
