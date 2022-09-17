import React, { useContext, useState, useEffect } from "react";
import { Text, Flex, Box, Center, VStack, Link, Button,Image } from "@chakra-ui/react";
// import Image from "next/image";
import { getStrapiMedia } from "../../../../utils/medias";
import SocialActions from "../../SocialActions";
import { useRouter } from "next/router";
import { nFormatter } from "../../../../utils/utils";
import AppContext from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";
import { setCountForCaptcha } from "../../../../services/dataService";
import dynamic from "next/dynamic";
import CountDownTimer from "../../../../components/CountDownTimer";
const PaidGameConfirmation = dynamic(() => import("../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../components/LMModal/CaptchaPopup"));

const GamesCard = ({ contestmaster, style, sectionName }) => {
    const imgUrl = contestmaster?.icon?.data?.url;
    const router = useRouter();
    const [isHeartClick, setHeartClick] = useState(false);
    const [contestStatus,setContestStatus]= useState(false);

    const { showPaidGameConfirmation, CheckAndStartGame, showCaptcha, setShowCaptcha, user, influencerLikes, FetchLikes, toggleLoginModal, setShowLoading, showLoading } = useContext(AppContext);
    const onHeartClick = async () => {
        if (!user) {
            toggleLoginModal();
            return;
        }
        if (contestmaster.influencer?.data?.id) {
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" + contestmaster.influencer.data.id,
                {}
            );
            FetchLikes();
            setHeartClick(!isHeartClick);
        }

    };
    useEffect(() => {
        if (influencerLikes?.includes(contestmaster.influencer?.data?.id)) {
            setHeartClick(true);
        }
    }, [contestmaster, influencerLikes]);

    return (
        <Link href={"/games/" + contestmaster?.slug} passHref={true}  _hover={{ border: "none",textDecoration:"none" }} _focus={{ border: "none",textDecoration:"none" }} key={`igc-${contestmaster?.id}`}>
            <Box overflow={"hidden"} w={"280px"} {...style}
            >
                <VStack>
                    <Flex
                        backgroundImage={"/assets/designupdate1/gamecard_portrait.svg"}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize={"auto"}
                        borderRadius={"md"}
                        cursor="pointer"
                        w={"full"}
                        h={["360px", "360px"]}
                        flexDir={"column"}
                    >
                      
                      <Text
                      mt={"30px"}
                                color="#FDFFE5"
                                fontSize="14px"
                                fontWeight={"600"}
                                textAlign="center"
                            >
                                {sectionName}
                            </Text>

                              
                                {imgUrl && (
                                    <Box
                                        m="auto"
                                        pos="relative"
                                        w="50%"
                                        h="100%"
                                        pt="20px"
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt={imgUrl}
                                            layout="fill"
                                            src={getStrapiMedia(imgUrl)}
                                        />
                                    </Box>
                                )}
                                {/* {contestmaster.reward?.data?.description && (
                                    <VStack w="50%" m={"auto"} mt="20px">
                                        <Text
                                            pl={2}
                                            color="#FDFFE5"
                                            fontSize="14px"
                                            fontWeight={"600"}
                                            align={"center"}
                                        >
                                            Win Up To
                                        </Text>
                                        <Text
                                            color="#F8ED1D"
                                            fontSize="20px"
                                            fontWeight={"600"}
                                            align={"center"}
                                        >
                                            {contestmaster.reward?.data.description}
                                        </Text>
                                    </VStack>
                                )} */}
                        

                        <Text
                            color="#FDFFE5"
                            fontSize="20px"
                            fontWeight={"600"}
                            align={"center"}
                            mb={"30px"}
                        >
                            {contestmaster.name}
                        </Text>
                    </Flex>

                    <Flex w={"full"} align="flex-end" justify={"space-between"} px="1rem">
                        <Box>
                            <Flex>
                                <Image
                                    alt="tag"
                                    boxSize={"30px"}
                                    // objectFit={"contain"}
                                    src="/assets/designupdate1/cash_icon.svg"
                                />

                                <Text ml="6px" color="#FFF" fontSize="17px" fontWeight="400">
                                    {contestmaster.entryFee != 0
                                        ? "Entry Fee - $" + contestmaster.entryFee
                                        : "Free"}
                                </Text>
                            </Flex>

                            <Text mt="4px" ml={"20px"} color="#FFF" fontSize="15px" fontWeight="200">
                                {nFormatter(contestmaster.roomsCount, 1)} Plays
                            </Text>
                        </Box>

                        <SocialActions
                            onHeartClick={onHeartClick}
                            isHeartClick={isHeartClick}
                            imgSize={{ width: "25px", height: "25px" }}
                            influencer={contestmaster.influencer}
                        />
                    </Flex>

                    {contestmaster && contestmaster.contest && (contestmaster?.contest?.status === "active" || contestStatus) && <Button
                        variant="solid"
                        h={["40px", "40px"]}
                        mt="12px"
                        _hover={{textDecoration:"none !important"}}
                        w="full"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowLoading({ "key": `igc-${contestmaster?.id}`, "show": true });
                            CheckAndStartGame(`igc-${contestmaster?.id}`, contestmaster)
                        }}
                    >
                        Play Now
                    </Button>}
                    {contestmaster && contestmaster.contest && (contestmaster?.contest?.status === "upcoming" && !contestStatus) && (
                        <Button m="auto" h={["34px", "28px"]}
                            mt="12px" opacity="1!important" color="primary"
                            w="full" variant="outline" disabled >

                            <CountDownTimer onZero={()=>setContestStatus(true)} startDate={contestmaster.contest.startDate} /> </Button>)}
                    {contestmaster && contestmaster.contest && contestmaster?.contest?.status === "closed" && (<Button h={["34px", "28px"]}
                        mt="12px"
                        w="full" m="auto" variant="outline" disabled >

                        Completed </Button>)}
                    {contestmaster && showCaptcha && showCaptcha?.callerKey == `igc-${contestmaster?.id}` && <LMNonCloseALert
                        header={"Clear Captcha!"}
                        canClose={false}

                        isOpen={showCaptcha}
                    ><CaptchaPopup onChange={() => {
                        setShowCaptcha({});
                        setCountForCaptcha(0);
                        CheckAndStartGame(`igc-${contestmaster?.id}`, contestmaster)
                    }} /></LMNonCloseALert>
                    }
                    {showPaidGameConfirmation?.callerKey == `igc-${contestmaster?.id}` && <PaidGameConfirmation contestmaster={contestmaster} />}

                    <LMNonCloseALert
                        header={"Please Wait....."}
                        canClose={false}
                        isOpen={showLoading.key == `igc-${contestmaster?.id}` && showLoading.show}
                    ></LMNonCloseALert>

                </VStack>
            </Box>
        </Link>
    );
};

export default GamesCard;