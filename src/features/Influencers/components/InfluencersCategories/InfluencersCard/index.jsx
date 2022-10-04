import { Text, Flex, Box, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../../utils/medias";
import SocialActions from "../../../../InfluencerDetails/SocialActions";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../../../utils/AppContext";
import strapi from "../../../../../utils/strapi";

const InfluencersCard = ({ influencer, slug, style, wid, margin }) => {
    const [isHeartClick, setHeartClick] = useState(false);
    const { user, toggleLoginModal, FetchLikes } = useContext(AppContext);

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
        if (influencer?.like) {
            setHeartClick(true);
        }
    }, [influencer]);
    const router = useRouter();
    return (
        <Link
            href={"/influencer/" + slug}
            passHref={true}
            mx="auto"
            width="280px"
            _focus={{ border: "none" }}
            key={`infCatCard-${influencer.contestmasters?.data[0]?.id}`}
        >
            <Box width={wid} mx={margin} mb="30px">
                <Box
                    cursor="pointer"
                    w="100%"
                    
                    position="relative"
                    overflow={"hidden"}
                    border="1px solid #A8A8A8"
                    borderRadius="8px"
                >
                    <Box
                        className="influencerdiv"
                        pos="relative"
                        w="100%"
                        h="400px"
                        overflow={"hidden"}
                    >
                        <Image
                            alt={influencer.icon?.data?.url}
                            layout="fill"
                            src={getStrapiMedia(influencer.icon?.data?.url)}
                        />
                    </Box>
                </Box>
                <Text
                    color="white"
                    fontFamily="Sora"
                    fontSize="1.2rem"
                    fontWeight={"600"}
                    mt="10px"
                    noOfLines={1}
                >
                    {influencer.name}
                </Text>
                <Flex mt="4px" justify={"space-between"} align="center">
                    <Text
                        noOfLines={1}
                        color="white"
                        fontFamily="Sora"
                        fontSize="1rem"
                        width="90%"
                    >
                        {influencer.tagline || "N.A."}
                    </Text>
                    <Box>
                        <SocialActions
                            onHeartClick={onHeartClick}
                            isHeartClick={isHeartClick}
                            imgSize={{ width: 25, height: 25 }}
                            influencer={{ data: influencer }}
                        />
                    </Box>
                </Flex>
            </Box>
        </Link>
    );
};

export default InfluencersCard;
