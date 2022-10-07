import { Text, Button, Flex, Box, Center, Link } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../../utils/medias";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../../../../../utils/AppContext";
import { setCountForCaptcha } from "../../../../../services/dataService";
import * as ga from "../../../../../services/googleAnalytics";
import dynamic from "next/dynamic";
const PaidGameConfirmation = dynamic(() => import("../../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../../components/LMModal/CaptchaPopup"));

const FeaturedInfluencersCard = ({ influencer: influencerObj, style }) => {
  const router = useRouter();
  const { showPaidGameConfirmation, CheckAndStartGame, showCaptcha, setShowCaptcha, showLoading, setShowLoading } = useContext(AppContext);

  const influencer = influencerObj;
  return (
    <Link href={"/influencer/" + influencerObj?.slug} passhref="true" _focus={{ border: "none" }}
      key={`fic-${influencer.contestmasters?.data[0]?.id}`}
    >
      <Box
        {...style}

      >
        <Box cursor="pointer" w="100%" h="220px" position="relative" overflow="hidden"
          onClick={() => {
            ga.eventTracking({
              action: "Featured Influencer " + influencerObj.slug + "is clicked",
              params: {
                "influencer": influencerObj.slug
              }

            });
          }}
        >

          <Box w="100%" h="220px">
            <Center h="100%">
              <Image className="influencerdiv"
                alt={influencer.icon?.data?.url}
                objectFit="cover"
                src={getStrapiMedia(influencer.icon?.data?.url)}
                layout='fill'

              />
            </Center>
          </Box>
        </Box>
        <Text color="white" fontFamily="Sora" fontSize="14px" mt="4px" noOfLines={1}>
          {influencer.name}
        </Text>
        <Text noOfLines={1} color="#7C7C7C" fontFamily="Sora" fontSize="12px" mt="2px" w="100%">
          {influencer.tagline || "N.A."}
        </Text>

        <Flex direction={["column", "column", "column", "row"]} mt={["16px", "16px", "16px", "8px"]}>


          <Button variant="solid" h={["34px", "34px", "34px", "28px"]} w={["100%"]}
            onClick={(e) => {
              e.preventDefault();
              setShowLoading({ "key": `fic-${influencer.contestmasters?.data[0]?.id}`, "show": true });
              CheckAndStartGame(`fic-${influencer.contestmasters?.data[0]?.id}`, influencer.contestmasters?.data[0])
            }

            }>
            Play Now
          </Button>
          {influencer.contestmasters?.data && showCaptcha && showCaptcha?.callerKey == `fic-${influencer.contestmasters?.data[0]?.id}` && <LMNonCloseALert
            header={"Clear Captcha!"}
            canClose={false}
            isOpen={showCaptcha}
          ><CaptchaPopup onChange={() => {
            setShowCaptcha({});
            setCountForCaptcha(0);
            CheckAndStartGame(`fic-${influencer.contestmasters?.data[0]?.id}`, influencer.contestmasters?.data[0]);
          }} /></LMNonCloseALert>
          }
          {influencer.contestmasters?.data && showPaidGameConfirmation?.callerKey == `fic-${influencer.contestmasters.data[0]?.id}` && <PaidGameConfirmation contestmaster={influencer.contestmasters.data[0]} />}

          <LMNonCloseALert
            header={"Please Wait....."}
            canClose={false}
            isOpen={showLoading.show && showLoading.key === `fic-${influencer.contestmasters?.data[0]?.id}`}
          ></LMNonCloseALert>

          <Button
            ml={[0, 0, 0, "10px"]}
            variant="outline"
            w={["100%", "100%", "100%", "full"]}
            h={["34px", "34px", "34px", "28px"]}
            mt={["16px", "16px", "16px", 0]} _hover={{textDecoration:"none",bg:"none"}} _focus={{bg:"none"}} 
          >
            <Link href={"/influencer/" + influencerObj?.slug+"#nftCardList"} _hover={{textDecoration:"none"}} _focus={{border:"none",textDecoration:"none"}} >
              Buy NFTs
            </Link>
          </Button>
        </Flex>
      </Box>
    </Link>
  );
};

export default FeaturedInfluencersCard;
