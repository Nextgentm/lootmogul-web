import React, { useContext } from "react";
import { Text, Button, Box, Center, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../../utils/medias";
import { useRouter } from "next/router";
import Image from "next/image";
import AppContext from "../../../../../utils/AppContext";
import {setCountForCaptcha} from "../../../../../services/dataService";
import * as ga from "../../../../../services/googleAnalytics";
import dynamic from "next/dynamic";
const PaidGameConfirmation = dynamic(() => import("../../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../../components/LMModal/CaptchaPopup"));


const TrendingGamesCard = ({ contestmaster, style }) => {
    const { showPaidGameConfirmation, CheckAndStartGame, showCaptcha, setShowCaptcha } =
        useContext(AppContext);
    const router = useRouter();
    const img = contestmaster?.icon?.data?.url;
    return (
        <Link  href={"/games/" + contestmaster.slug} passHref={true} _focus={{border:"none"}}   key={`tgc-${contestmaster?.id}`}>
        <Box {...style} overflow="hidden"
       >
            <Box
                cursor="pointer"
                w="100%"
                h="220px"
                position="relative"
                onClick={() => {
                    ga.eventTracking({
                        action: "Trending game "+ contestmaster.slug +"is clicked",
                        params:{
                          "game": contestmaster.slug 
                        }
                    
                      });
                   }}
            >
                {img && (
                    <Center h="100%" className="influencerdiv">
                        <Image
                            alt={img}
                            objectFit="contain"
                            src={getStrapiMedia(img)}
                            layout="fill"
                        />
                    </Center>
                )}
            </Box>
            <Text
                color="white"
                fontFamily="Sora"
                fontSize="14px"
                mt="4px"
                noOfLines={1}
            >
                {contestmaster.name}
            </Text>
            <Text
                noOfLines={1}
                color="#7C7C7C"
                fontFamily="Sora"
                fontSize="12px"
                mt="2px"
                w="100%"
            >
                {contestmaster.description || "Quiz game"}
            </Text>

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    CheckAndStartGame(`tgc-${contestmaster?.id}`, contestmaster);
                }}
                w="full"
                variant="solid"
                h={["34px", "28px"]}
                mt="6px"
            >
                Play Now
            </Button>
            {contestmaster && showCaptcha && showCaptcha?.callerKey == `tgc-${contestmaster?.id}` &&    <LMNonCloseALert
                header={"Clear Captcha!"}
                canClose={false}
                
                isOpen={showCaptcha}
               ><CaptchaPopup onChange={()=>{
                    setShowCaptcha({});
                    setCountForCaptcha(0);
                    CheckAndStartGame(`tgc-${contestmaster?.id}`, contestmaster);
                }}/></LMNonCloseALert>
            }
            {showPaidGameConfirmation?.callerKey == `tgc-${contestmaster?.id}` && (
                <PaidGameConfirmation contestmaster={contestmaster} />
            )}
        </Box>
        </Link>
    );
};

export default TrendingGamesCard;
