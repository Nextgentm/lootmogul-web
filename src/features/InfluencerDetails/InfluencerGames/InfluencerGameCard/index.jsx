import React, { useContext, useState, useEffect } from "react";
import { Text, Flex, Button, Box, Center, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";
import { getStrapiMedia } from "../../../../utils/medias";
import SocialActions from "../../SocialActions";
import { useRouter } from "next/router";
import { nFormatter } from "../../../../utils/utils";
import AppContext from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";
import { setCountForCaptcha } from "../../../../services/dataService";
import dynamic from "next/dynamic";
const PaidGameConfirmation = dynamic(() => import("../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../components/LMModal/CaptchaPopup"));

const GamesCard = ({ contestmaster, style, sectionName }) => {
    const imgUrl = contestmaster?.icon?.data?.url;
    const router = useRouter();
    const [isHeartClick, setHeartClick] = useState(false);
    
    const { showPaidGameConfirmation, CheckAndStartGame,  showCaptcha, setShowCaptcha,user,influencerLikes,FetchLikes,toggleLoginModal} = useContext(AppContext);

    const onHeartClick = async() => {
        if(!user){
            toggleLoginModal();
            return;
        }
        if(contestmaster.influencer?.data?.id){
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" + contestmaster.influencer.data.id,
                {}
              );
              FetchLikes();
            setHeartClick(!isHeartClick);
        }
        
    };
    useEffect(()=>{
        if (influencerLikes?.includes(contestmaster.influencer?.data?.id)){
            setHeartClick(true);
        }
    },[contestmaster,influencerLikes]);

    return (
        <Link  href={"/games/" + contestmaster?.slug} passHref={true} _focus={{border:"none"}}    key= {`igc-${contestmaster?.id}`}>
        <Box overflow={"hidden"} w={"240px"} {...style}
       >
            <VStack>
                <Box
                    backgroundImage={"/assets/gamecardbg.png"}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize={"auto"}
                    borderRadius={"md"}
                    float="left"
                    cursor="pointer"
                    w={"full"}
                    h={["320px", "320px"]}
                  
                >
                    <Flex
                        pt={["25px", "25px"]}
                        pr={["5px", "6px"]}
                        flexDir="row-reverse"
                    >
                        <Text
                            isTruncated
                            color="#FDFFE5"
                            fontSize="14px"
                            fontWeight={"600"}
                            maxWidth={"140px"}
                        >
                            {sectionName}
                        </Text>
                    </Flex>

                    <Center h="60%" m="auto">
                        <Flex width="100%" h="100%" m="auto">
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
                            {contestmaster.reward?.data?.description && (
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
                            )}
                        </Flex>
                    </Center>

                    <Text
                        color="#FDFFE5"
                        fontSize="20px"
                        fontWeight={"600"}
                        align={"center"}
                    >
                        {contestmaster.name}
                    </Text>
                </Box>

                <Flex w={"full"} align="flex-end" justify={"space-between"}>
                    <Box>
                        <Flex>
                            <Image
                                alt="tag"
                                width={"14px"}
                                height={"8px"}
                                objectFit={"contain"}
                                src="/assets/price-tag.png"
                            />

                            <Text ml="6px" color="#CFBF8A" fontSize="12px">
                                {contestmaster.entryFee != 0
                                    ? "Entry Fee - $" + contestmaster.entryFee
                                    : "Free"}
                            </Text>
                        </Flex>

                        <Text mt="4px" color="#7C7C7C" fontSize="10px">
                            {nFormatter(contestmaster.ticketsCount, 1)} Plays
                        </Text>
                    </Box>

                    <SocialActions
                        onHeartClick={onHeartClick}
                        isHeartClick={isHeartClick}
                        imgSize={{ width: "25px", height: "25px" }}
                        influencer={contestmaster.influencer}
                    />
                </Flex>
                
                <Button
                    variant="solid"
                    h={["34px", "28px"]}
                    mt="12px"
                    w="full"
                    onClick={(e) => {
                        e.preventDefault();
                        CheckAndStartGame(`igc-${contestmaster?.id}`, contestmaster)
                    }}
                >
                    Play Now
                </Button>
                {contestmaster && showCaptcha && showCaptcha?.callerKey == `igc-${contestmaster?.id}`&&   <LMNonCloseALert
                header={"Clear Captcha!"}
                canClose={false}
                
                isOpen={showCaptcha}
               ><CaptchaPopup onChange={()=>{
                    setShowCaptcha({});
                    setCountForCaptcha(0);
                    CheckAndStartGame(`igc-${contestmaster?.id}`, contestmaster)
                }}/></LMNonCloseALert>
            }
                {showPaidGameConfirmation?.callerKey == `igc-${contestmaster?.id}`  &&  <PaidGameConfirmation contestmaster={contestmaster}/>}

            </VStack>
        </Box>
        </Link>
    );
};

export default GamesCard;
