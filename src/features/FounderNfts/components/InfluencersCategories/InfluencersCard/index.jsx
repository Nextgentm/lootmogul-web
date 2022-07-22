import { Text, Button, Flex, Box, Link } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { getStrapiMedia } from "../../../../../utils/medias";
import SocialActions from "../../../../InfluencerDetails/SocialActions";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useState } from "react";
import AppContext from "../../../../../utils/AppContext";
const PaidGameConfirmation =  dynamic(() => import("../../../../Games/PaidGameConfirmation")) ;
const LMNonCloseALert =  dynamic(() => import("../../../../../components/LMNonCloseALert")) ;
const CaptchaPopup =  dynamic(() => import("../../../../../components/LMModal/CaptchaPopup")) ;

import { setCountForCaptcha } from "../../../../../services/dataService";


const InfluencersCard = ({ influencer, slug, style }) => {
    const router = useRouter();
    const [isHeartClick, setHeartClick] = useState(false);
    const { showPaidGameConfirmation,showLoading,setShowLoading,CheckAndStartGame, showCaptcha, setShowCaptcha} = useContext(AppContext);

    const onHeartClick =() =>{
        setHeartClick(!isHeartClick);
    };
    return (
        <Box
            {...style}
            onClick={() =>
                router.push({
                    pathname: "/influencer/[id]",
                    query: { id: slug }
                })
            }
            key={`InfCard-${influencer.contestmasters?.data[0]}`}
        >
            <Box pos= "relative" cursor="pointer" w="100%" h="220px" position="relative">
                <Image
                    alt={influencer.icon?.data?.url}
                    objectFit="contain"
                    src={getStrapiMedia(influencer.icon?.data?.url)}
                    layout='fill'
                />
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
                    mr="4px"
                    color="#7C7C7C"
                    fontFamily="Sora"
                    fontSize="12px"
                >
                    {influencer.tagline || "N.A."}
                </Text>
                <Box>
                <SocialActions onHeartClick={onHeartClick} isHeartClick={isHeartClick} imgSize={{ width: 25, height: 25 }}
                influencer={{data:influencer}} />
                </Box>
            </Flex>

            <Flex direction={"row"} mt="8px">
          
             
                <Button variant="solid" h={"28px"} w={"60px"} 
                 onClick={(e) => {
                    e.preventDefault();
                    setShowLoading({"key":`InfCard-${influencer.contestmasters?.data[0]?.id}`,"show":true});
                    CheckAndStartGame(`InfCard-${influencer.contestmasters?.data[0]?.id}`,influencer.contestmasters?.data[0])
                }}>
                    Play Now
                </Button>
                {influencer.contestmasters?.data && showCaptcha?.callerKey==  `InfCard-${influencer.contestmasters?.data[0]?.id}` &&  <LMNonCloseALert
                header={"Clear Captcha!"}
                canClose={false}
                
                isOpen={showCaptcha}
               ><CaptchaPopup onChange={()=>{
                    setShowCaptcha({});
                    setCountForCaptcha(0);
                    CheckAndStartGame(`InfCard-${influencer.contestmasters?.data[0]?.id}`,influencer.contestmasters?.data[0])
                }}/></LMNonCloseALert>
            }
            <LMNonCloseALert
                header={"Please Wait....."}
                canClose={false}
                
                isOpen={showLoading.show && showLoading.key === `InfCard-${influencer.contestmasters?.data[0]?.id}` }
               >Loading...</LMNonCloseALert>
                {influencer.contestmasters?.data && showPaidGameConfirmation?.callerKey == `InfCard-${influencer.contestmasters?.data[0]?.id}` &&  <PaidGameConfirmation contestmaster={influencer.contestmasters.data[0]}/>}
                <Button
                    flex={1}
                    ml={"10px"}
                    variant="outline"
                    w={"auto"}
                    h={"28px"}
                    mt={0} _hover={{textDecoration:"none",bg:"none"}} _focus={{bg:"none"}} 
                > <Link href={"https://nft.lootmogul.com" } _hover={{textDecoration:"none"}} _focus={{border:"none",textDecoration:"none"}} >

                    Buy NFTs
                    </Link>
                </Button>
            </Flex>
        </Box>
    );
};

export default InfluencersCard;
