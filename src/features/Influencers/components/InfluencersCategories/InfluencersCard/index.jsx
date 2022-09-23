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



const InfluencersCard = ({ influencer, slug, style, wid, marginR }) => {
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
            <Box 
            width={wid} marginRight={marginR} mb="30px" >
                <Box
                    cursor="pointer"
                    w="100%"
                    h="400px"
                    position="relative"
                    overflow={"hidden"}
                    border= "1px solid #A8A8A8"
                    borderRadius= "8px"
                >
                    <Box
                        className="influencerdiv"
                        pos="relative"
                        w="100%"
                        h="500px"
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

                {/* <Flex direction={"row"} mt="8px">
                    <Button
                        variant="solid"
                        h={"28px"}
                        w="60px"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowLoading(true);
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
                        mt={0} _hover={{textDecoration:"none",bg:"none"}} _focus={{bg:"none"}} 
                    >
                        <Link href={"/influencer/" + slug+"#nftCardList"}  _hover={{textDecoration:"none"}} _focus={{border:"none",textDecoration:"none"}} >Buy NFTs</Link>
                    </Button>
                </Flex> */}
            </Box>
        </Link>
    );
};

export default InfluencersCard;