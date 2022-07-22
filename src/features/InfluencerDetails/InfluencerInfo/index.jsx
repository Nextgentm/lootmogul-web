import { Box, Avatar, Flex, Text, Button, Center, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../utils/medias";
import { useRouter } from "next/router";

import { setCountForCaptcha } from "../../../services/dataService";
// import Image from "next/image";
import AppContext from "../../../utils/AppContext";
import { useContext } from "react";
import dynamic from "next/dynamic";
const PaidGameConfirmation = dynamic(() => import("../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../components/LMModal/CaptchaPopup"));

const InfluencerInfo = ({ influencer }) => {
    const { showPaidGameConfirmation, CheckAndStartGame, setShowCaptcha, showCaptcha } = useContext(AppContext);
    const router = useRouter();

    return (
        <Flex direction="column"
            align="center" w="200px" h={"270px"}
            key={`infinfo-${influencer.contestmasters?.data[0]?.id}`}
        >

            <Center h="60%">
                {influencer.icon?.data?.url && (
                    <Avatar
                        boxSize="90px"
                        border="5px solid gray"
                        alt={`influencer-dp`}
                        src={getStrapiMedia(influencer.icon?.data?.url)}
                    />
                )}
            </Center>
            <Text
                mt="12px"
                fontSize={"14px"}
                fontFamily="Sora"
                color="white"
                fontWeight={700}
            >
                {influencer.name}
            </Text>

            <Text mt="4px" fontSize={"12px"} fontFamily="Sora" color="white">
                {influencer.tagline || "N.A."}
            </Text>
            <Flex justify={"space-between"} w="160px" mt="8px">
                <Box align="center" key={`info-like`}>
                    <Text fontSize={"10px"} color="white" fontWeight={700}>
                        {influencer.likeCount || 0}
                    </Text>
                    <Text fontSize={"10px"} color="#7C7C7C">
                        Fav
                    </Text>
                </Box>

                <Box align="center" key={`info-shared`}>
                    <Text fontSize={"10px"} color="white" fontWeight={700}>
                        {influencer.shareCount || 0}
                    </Text>
                    <Text fontSize={"10px"} color="#7C7C7C">
                        Shared
                    </Text>
                </Box>

                <Box align="center" key={`info-reviews`}>
                    <Text fontSize={"10px"} color="white" fontWeight={700}>
                        {influencer.reviewCount || 0}
                    </Text>
                    <Text fontSize={"10px"} color="#7C7C7C">
                        Reviews
                    </Text>
                </Box>
            </Flex>


            <Flex direction={"row"} m="8px">

                <Button variant="solid" h={"28px"} flex={1}
                    onClick={(e) => {
                        e.preventDefault();
                        CheckAndStartGame(`infinfo-${influencer.contestmasters.data[0]?.id}`, influencer.contestmasters?.data[0])
                    }}      >
                    Play Now
                </Button>
                {influencer.contestmasters && showCaptcha?.callerKey == `infinfo-${influencer.contestmasters.data[0]?.id}` && <LMNonCloseALert
                    header={"Clear Captcha!"}
                    canClose={false}

                    isOpen={showCaptcha}
                ><CaptchaPopup onChange={() => {
                    setShowCaptcha({});
                    setCountForCaptcha(0);
                    CheckAndStartGame(`infinfo-${influencer.contestmasters.data[0]?.id}`, influencer.contestmasters?.data[0])
                }} /></LMNonCloseALert>
                }
                {influencer.contestmasters?.data && showPaidGameConfirmation?.callerKey == `infinfo-${influencer.contestmasters.data[0]?.id}` && <PaidGameConfirmation contestmaster={influencer.contestmasters.data[0]} />}


                <Button flex={1} ml={"10px"} h="28px" variant="outline" _hover={{textDecoration:"none",bg:"none"}} _focus={{bg:"none"}} >
                    <Link href={"https://nft.lootmogul.com"} _hover={{textDecoration:"none",bg:"none"}} _focus={{border:"none",textDecoration:"none"}} >
                        Buy NFTs
                    </Link>
                </Button>
            </Flex>
        </Flex>
    );
};

export default InfluencerInfo;
