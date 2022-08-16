/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/jsx-key */
import { Flex, Box, Text, Link, Divider } from "@chakra-ui/react";
import Image from "next/image";
import { Grid, GridItem } from "@chakra-ui/react";
import { logoStyle } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useRouter } from "next/router";

const socialLinks = [{
  Image: 'twitter.png',
  link: 'https://twitter.com/LootMogul',
},
{
  Image: 'facebook.png',
  link: 'https://www.facebook.com/LootMogul/',
},
{
  Image: 'youtube.png',
  link: 'https://www.youtube.com/channel/UCsooAZi-4pYR7MXTJMVRFPg/videos',
},
{
  Image: 'instagram.png',
  link: 'https://www.instagram.com/lootmogul/?hl=en',
},

{
  Image: 'discord.png',
  link: 'https://discord.gg/mHUqAm8fsh',
},
{
  Image: 'telegram.png',
  link: 'https://t.me/lootmogulchat',
},
{
  Image: 'twitch.png',
  link: 'https://www.twitch.tv/lootmogul',
}];

const certs = [
  {icon:"foot1.png",label:"Instant Bonus on Signup"},
  {icon: "foot2.png",label:"Play & Win"},
  {icon:"foot3.png",label:"Engage with Influencers"},
  {icon:"foot4.png",label:"Safe & Secure"}];


const payments = ["paypal2.png", "stripe.png"];


const Footer = () => {
  const { isMobileDevice } = useContext(AppContext);
  const { isHideFooter} = useContext(AppContext);
  const router = useRouter();
  return (
    <>
    { !isHideFooter && (
    <Flex 
    bg={[ "linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/assets/footer_bg_mobile.jpg)",
    "linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/assets/footer_bg.jpg)"]}
    backgroundRepeat="no-repeat!important"
    backgroundSize={"cover!important"} pt="24px" p="20px"  align="center" direction="column">
      <Image layout='fill' alt="logo"  width={154} height={35}onClick={()=>router.push("/")} {...logoStyle} />
      {/* <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/89785bea13d15b98be39d37751f44893.html" scrolling="no" allowtransparency="true" className="lightwidget-widget" style={{width:"100%",border:0,overflow:"hidden"}}></iframe> */}
      <Grid
        ml="10px"
        gridRowGap={5}
        mt="30px"
        w="100%"
        templateRows={`repeat(${isMobileDevice ? "2" : "1"}, 1fr)`}
        templateColumns={`repeat(${isMobileDevice ? "2" : "5"}, 1fr)`}
      >
        <GridItem colSpan={1}>
          <Text color="white" fontFamily="Sora" fontSize="16px" fontWeight={700}>
            IMPORTANT
          </Text>
          <Link  _focus={{border:"none", boxShadow:"none"}} href='https://lootmogul.wpengine.com/about-us/' isExternal>
          <Text  mt="12px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
            ABOUT US
          </Text>
          </Link>
          <Link  _focus={{border:"none", boxShadow:"none"}}href = "/promotions">
          <Text  mt="12px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
            PROMOTION
          </Text>
          </Link>
          <Link  _focus={{border:"none", boxShadow:"none"}}href = "/faq">
          <Text mt="6px"  color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
            FAQ
          </Text>
          </Link>
          <Link  _focus={{border:"none", boxShadow:"none"}}href = "https://lootmogul.wpengine.com/privacy-policy/" isExternal>
          <Text mt="6px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
            PRIVACY POLICY
          </Text>
          </Link>
          <Link  _focus={{border:"none", boxShadow:"none"}}href = "https://lootmogul.wpengine.com/terms-conditions/" isExternal>
          <Text mt="6px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
            TERMS OF SERVICES
          </Text>
          </Link>
        </GridItem>

        <GridItem colSpan={1}>
          <Box>
            <Text color="white" fontFamily="Sora" fontSize="16px" fontWeight={700}>
              INFLUENCER
            </Text>
            <Link  _focus={{border:"none", boxShadow:"none"}}href = "/influencers/signup">
            <Text mt="12px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
              INFLUENCER SIGNUP
            </Text>
            </Link>
            <Link  _focus={{border:"none", boxShadow:"none"}}href = "/influencers/earning">
            <Text mt="6px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
              INFLUENCER EARNING
            </Text>
            </Link>
           
          </Box>
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Box>
            <Text color="white" fontFamily="Sora" fontSize="16px" fontWeight={700}>
            JOIN OUR COMMUNITY
            </Text>
            <Flex mt="6px" justify="flex-start" width={["90%","100%"]} flexWrap={"wrap"}>
              {socialLinks.map((img, index) => (
                <Box key={`cimg-${index}`} mt={["5px",0,0,0]}mr={["10px", "10px"]}>
                  <Link   _focus={{border:"none", boxShadow:"none"}}href={img.link} target="_blank">
                  <Image alt={img.Image} width="22px" height="22px" src={`/assets/${img.Image}`} />
                  </Link>
                </Box>
              ))}
            </Flex>
          </Box>
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Box>
            <Text color="white" fontFamily="Sora" fontSize="16px" fontWeight={700}>
              CONTACT US
            </Text>
            <Link  _focus={{border:"none", boxShadow:"none"}}href="mailto:support@lootmogul.com">
            <Text mt="6px" color="#9E9E9E" fontFamily="Sora" fontSize="14px" fontWeight={400}>
              support@lootmogul.com
            </Text>
            </Link>
          </Box>
        </GridItem>

        <GridItem colSpan={isMobileDevice ? 2 : 1} mt={["-30px", 0]}>
          <Box>
            <Text color="white" fontFamily="Sora" fontSize="16px" mb="6px" fontWeight={700}>
              WHY US
            </Text>
            <Flex direction={"column"}>
              {certs.map((cert, index) => (
                <Flex  ml={["6px", 0]} key={`cert-${index}`} mt="6px">
                  <Image alt={cert.label} width="20px" height="20px" src={`/assets/${cert.icon}`} />
                  <Text
                    ml="10px"
                    color="#9E9E9E"
                    fontFamily="Sora"
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {cert.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </GridItem>
      </Grid>

      {/* {isMobileDevice ? ( */}
        <Box m="auto" textAlign={["left","center"]} w="100%" mt="20px">
          <Text color="white" fontFamily="Sora" fontSize="16px" mb="6px" fontWeight={700}>
            Our Payment Partners
          </Text>
          <Flex justify={["flex-start","center"]}wrap="wrap" mt="20px">
            {payments.map((img, index) => (
              <Box key={`pay-${index}`} m="10px" width={"140px"} height={"35px"}  position="relative">
                <Image alt={img} objectFit="contain" layout="fill" src={`/assets/${img}`} />
              </Box>
            ))}
          </Flex>
        </Box>
    
      <Text mt ="35px" variant="footerText">© 2022 LootMogul. All Rights Reserved.  HQ: 3301 Ocean Park Blvd, Unit 205, Santa Monica, CA 90405</Text>
      <Text mt="16px" variant="footerText">LootMogul is NOT AFFILIATED, AUTHORIZED, LICENSED OR ENDORSED by NBA (National Basketball Association), NFL (National Football League), MLB (Major League Baseball), NHL (National Hockey League), MLS (Major League Soccer),  NCAA (National College Athletic Association) or any other professional and amateur organization.</Text>
    </Flex>
    )}
    </>
  );
};

export default Footer;
