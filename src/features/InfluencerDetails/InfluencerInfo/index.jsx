import { Box, Image, Flex, Text, Button, Center, Link,  useMediaQuery } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../utils/medias";
import AppContext from "../../../utils/AppContext";
import { useContext } from "react";
import { useWindowWidth } from "@react-hook/window-size";

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
    const [isMobile] = useMediaQuery("(max-width:768px)");
    const [isAvgLaptopDevice] = useMediaQuery("(max-width: 1366px)");
    const [isAvgDeskDevice] = useMediaQuery("(max-width: 1600px)");
    const [isLargeDesk] = useMediaQuery("(max-width: 1920px)");
    const [isLargeAndAbove] = useMediaQuery("(max-width: 2560px)");
    const [isNormalDesktop] = useMediaQuery("(max-width: 1536px)");

    const [columnValues, setColumnValues] = useState("repeat(8, 1fr)");
    const onlyWidth = useWindowWidth();
    const [width, setWidth] = useState("");
    const [hight, setHight] = useState("");
    const [marLeft, setMarLeft] = useState("");

    useEffect(() => {
        if (isMobile) {
            if (onlyWidth === 720) {
                setColumnValues("repeat(2, 1fr)");
                setHight("420px");
                setWidth("375px");
                setMarLeft("-5px");
            } else if (onlyWidth === 375){
                setColumnValues("repeat(1, 1fr)");
                setHight("420px");
                setWidth("370px");
                setMarLeft("-4px");
            }
            else {
                setColumnValues("repeat(1, 1fr)");
                setHight("420px");
                setWidth("380px");
                setMarLeft("-03px");
            }
        } else if (isAvgLaptopDevice) {
            setColumnValues("repeat(5, 1fr)");
            setHight("415px");
            setWidth("390px");
            setMarLeft("-36px");
        } else if (isAvgDeskDevice) {
            setColumnValues("repeat(5, 1fr)");
            setHight("415px");
            setWidth("385px");
            setMarLeft("-35px");
        } else if (isLargeDesk) {
            setColumnValues("repeat(8, 1fr)");
            setHight("410px");
            setWidth("390px");
            setMarLeft("-36px");
        } else if (isLargeAndAbove) {
            setColumnValues("repeat(8, 1fr)");
            setHight("410px");
            setWidth("390px");
            setMarLeft("-37px");
        }else if (isNormalDesktop) {
            setColumnValues("repeat(8, 1fr)");
            setHight("410px");
            setWidth("380px");
            setMarLeft("-58px");
        }
         else {
            setColumnValues("repeat(8, 1fr)");
            setHight("338px");
            setWidth("330px");
            setMarLeft("-40px");
        }
    });
    return (
        <Flex
            direction="column"
            key={`infinfo-${influencer.contestmasters?.data[0]?.id}`}
        >
            <Center>
                {influencer.icon?.data?.url && (
                    <Box>
                        <Image
                            w={["280px"]}
                            h={["340px"]}
                            alt={`influencer-dp`}
                            src={getStrapiMedia(influencer.icon?.data?.url)}
                            style={{borderRadius:"35px"}}
                        />
                        <Image
                            alt={influencer.icon?.data?.url}
                            layout="fill"
                            w={width}
                            h={hight}
                            ml={marLeft}
                            mt={"-376px"}
                            src="/assets/side_Frame.png"
                        />
                    </Box>
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
                {/* <Flex justifyContent={"flex-start"} w="100%" mt="8px">
                    <Box align="center" mr="20px" key={`info-like`}>
                        <Text
                            fontSize={"1rem"}
                            color="#E90A63"
                            fontWeight={700}
                        >
                            {influencer.likeCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Fav
                        </Text>
                    </Box> */}

                    {/* <Box align="center" mr="20px" key={`info-shared`}>
                        <Text
                            fontSize={"1rem"}
                            color="#E90A63"
                            fontWeight={700}
                        >
                            {influencer.shareCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Shared
                        </Text>
                    </Box> */}

                    {/* <Box align="center" mr="20px" key={`info-reviews`}>
                        <Text
                            fontSize={"1rem"}
                            color="#E90A63"
                            fontWeight={700}
                        >
                            {influencer.reviewCount || 0}
                        </Text>
                        <Text fontSize={"17px"} color="#FFF" fontWeight="200">
                            Reviews
                        </Text>
                    </Box>
                </Flex> */}
            </Box>
        </Flex>
    );
};

export default InfluencerInfo;
