import { Box, Image, Flex, Text, Button, Center, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../utils/medias";
import AppContext from "../../../utils/AppContext";
import { useContext } from "react";

import SocialActions from "../SocialActions";
import { useState, useEffect } from "react";

const InfluencerInfo = ({ influencer }) => {
    const { influencerLikes, FetchLikes, toggleLoginModal } =
        useContext(AppContext);

    const [isHeartClick, setHeartClick] = useState(false);
    const onHeartClick = async () => {
        if (!user) {
            toggleLoginModal();
            return;
        }
        if (influencer) {
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" + influencer.id,
                {}
            );
            FetchLikes();
            setHeartClick(!isHeartClick);
        }
    };
    useEffect(() => {
        if (influencerLikes?.includes(influencer.id)) {
            setHeartClick(true);
        }
    }, [influencer, influencerLikes]);
    return (
        <Flex
            direction="column"
            key={`infinfo-${influencer.contestmasters?.data[0]?.id}`}
        >
            <Center>
                {influencer.icon?.data?.url && (
                    <Image
                        w={["290px"]}
                        h={["340px"]}
                        border="1px solid gray"
                        alt={`influencer-dp`}
                        borderRadius={["4px", "8px"]}
                        src={getStrapiMedia(influencer.icon?.data?.url)}
                    />
                )}
            </Center>
            <Box px={["40px", "23px", "0px", "0px", "0px"]}>
                <Text
                    mt="12px"
                    fontSize={"1.2rem"}
                    fontFamily="Sora"
                    color="white"
                    textAlign="left"
                    fontWeight={500}
                >
                    {influencer.name}
                </Text>

                <Flex justify={"space-between"} mt="8px">
                    <Text
                        fontSize={"17px"}
                        fontWeight="200"
                        textAlign="left"
                        color="white"
                    >
                        {influencer.tagline || "N.A."}
                    </Text>
                    <SocialActions
                        onHeartClick={onHeartClick}
                        isHeartClick={isHeartClick}
                        influencer={{ data: influencer }}
                        // showWriteReview
                    />
                </Flex>
                <Flex justifyContent={"flex-start"} w="100%" mt="8px">
                    <Box align="center" mr="20px" key={`info-like`}>
                        <Text fontSize={"1rem"} color="white" fontWeight={700}>
                            {influencer.likeCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Fav
                        </Text>
                    </Box>

                    <Box align="center" mr="20px" key={`info-shared`}>
                        <Text fontSize={"1rem"} color="white" fontWeight={700}>
                            {influencer.shareCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Shared
                        </Text>
                    </Box>

                    <Box align="center" mr="20px" key={`info-reviews`}>
                        <Text fontSize={"1rem"} color="white" fontWeight={700}>
                            {influencer.reviewCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Reviews
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default InfluencerInfo;
