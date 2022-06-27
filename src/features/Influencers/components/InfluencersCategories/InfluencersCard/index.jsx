import { Text, Button, Flex, Box, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../../utils/medias";
import dynamic from 'next/dynamic';
import SocialActions from "../../../../InfluencerDetails/SocialActions";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../../../utils/AppContext";
import strapi from "../../../../../utils/strapi";
import { INFLUENCER_LIKE, Invalidate } from "../../../../Home/api";
import { setCountForCaptcha } from "../../../../../services/dataService";

const PaidGameConfirmation = dynamic(() => import("../../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../../components/LMModal/CaptchaPopup"));



const InfluencersCard = ({ influencer, slug, style }) => {
    const [isHeartClick, setHeartClick] = useState(false);
    const { showPaidGameConfirmation, showLoading, setShowLoading, setShowCaptcha, showCaptcha, CheckAndStartGame, user, toggleLoginModal, FetchLikes } = useContext(AppContext);


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
        <Link href={"/influencer/" + slug} passHref={true} _focus={{ border: "none" }} key={`infCatCard-${influencer.contestmasters?.data[0]?.id}`}>
            <Box {...style}
            >
                <Box
                    cursor="pointer"
                    w="100%"
                    h="220px"
                    position="relative"
                    overflow={"hidden"}

                >
                    <Box
                        className="influencerdiv"
                        pos="relative"
                        w="100%"
                        h="220px"
                    >
                        <Image
                            alt={influencer.icon?.data?.url}
                            layout="fill"
                            objectFit="contain"
                            src={getStrapiMedia(influencer.icon?.data?.url)}
                        />
                    </Box>
                </Box>
                <Text
                    color="white"
                    fontFamily="Sora"
                    fontSize="14px"
                    mt="4px"
                    noOfLines={1}
                >
                    {influencer.name}
                </Text>
                <Flex mt="4px" justify={"space-between"} align="center">
                    <Text
                        noOfLines={1}
                        color="#7C7C7C"
                        fontFamily="Sora"
                        fontSize="12px"
                        width="62%"
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

                <Flex direction={"row"} mt="8px">
                    <Button
                        variant="solid"
                        h={"28px"}
                        w="60px"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowLoading({ "key": `infCatCard-${influencer.contestmasters?.data[0]?.id}`, "show": true });
                            CheckAndStartGame(`infCatCard-${influencer.contestmasters?.data[0]?.id}`, influencer.contestmasters?.data[0])
                        }}
                    >
                        Play Now
                    </Button>
                    {influencer.contestmasters?.data && showPaidGameConfirmation?.callerKey == `infCatCard-${influencer.contestmasters.data[0]?.id}` && <PaidGameConfirmation contestmaster={influencer.contestmasters.data[0]} />}
                    {influencer.contestmasters?.data && showCaptcha?.callerKey == `infCatCard-${influencer.contestmasters?.data[0]?.id}` && <LMNonCloseALert
                        header={"Clear Captcha!"}
                        canClose={false}

                        isOpen={showCaptcha}
                    ><CaptchaPopup onChange={() => {
                        setShowCaptcha({});
                        setCountForCaptcha(0);
                        CheckAndStartGame(`infCatCard-${influencer.contestmasters?.data[0]?.id}`, influencer.contestmasters?.data[0]);
                    }} /></LMNonCloseALert>
                    }
                    <LMNonCloseALert
                        header={"Please Wait....."}
                        canClose={false}
                        isOpen={showLoading.show && showLoading.key === `infCatCard-${influencer.contestmasters?.data[0]?.id}`}
                    ></LMNonCloseALert>

                    <Button
                        flex={1}
                        ml={"10px"}
                        variant="outline"
                        w={"auto"}
                        minW={"auto"}
                        h={"28px"}
                        mt={0}
                    >
                        <Link href={"https://nft.lootmogul.com"}>Buy NFTs</Link>
                    </Button>
                </Flex>
            </Box>
        </Link>
    );
};

export default InfluencersCard;
