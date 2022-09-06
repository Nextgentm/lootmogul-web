/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/jsx-key */
import { Flex, Box, Text, Link, Divider, Input, Image, Button } from "@chakra-ui/react";
// import Image from "next/image";
import { Grid, GridItem } from "@chakra-ui/react";
import { logoStyle } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useRouter } from "next/router";

const socialLinks = [
    {
        Image: "twitter.png",
        link: "https://twitter.com/LootMogul"
    },
    {
        Image: "facebook.png",
        link: "https://www.facebook.com/LootMogul/"
    },
    {
        Image: "youtube.png",
        link: "https://www.youtube.com/channel/UCsooAZi-4pYR7MXTJMVRFPg/videos"
    },
    {
        Image: "instagram.png",
        link: "https://www.instagram.com/lootmogul/?hl=en"
    },

    {
        Image: "discord.png",
        link: "https://discord.gg/mHUqAm8fsh"
    },
    {
        Image: "telegram.png",
        link: "https://t.me/lootmogulchat"
    },
    {
        Image: "twitch.png",
        link: "https://www.twitch.tv/lootmogul"
    }
];

const certs = [
    { icon: "foot1.png", label: "Instant Bonus on Signup" },
    { icon: "foot2.png", label: "Play & Win" },
    { icon: "foot3.png", label: "Engage with Influencers" },
    { icon: "foot4.png", label: "Safe & Secure" }
];

const payments = ["paypal2.png", "stripe.png"];

const Footer = () => {
    const { isMobileDevice } = useContext(AppContext);
    const { isHideFooter } = useContext(AppContext);
    const router = useRouter();


    return (
        <>
            <Flex >
                <Flex justifyContent="space-around" w={["80%","80%","80%","100%","100%"]} m="auto" flexDirection={["column","column","column","row","row"]}>
                    <Box>
                        <Box mb="30px">
                            <Text style={BoldWhiteText} fontSize={["15px","20px","25px","20px","20px"]}>Contact Us</Text>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="mailto:support@lootmogul.com"
                            >
                                <Text style={LightWhiteText}>
                                    support@lootmogul.com
                                </Text>
                            </Link>
                        </Box>
                        <Text style={BoldWhiteText} fontSize={["15px","20px","25px","20px","20px"]}>Get The latest</Text>
                        <Flex>
                        <Input bg="#FFF" w={["300px","200px","300px","300px","300px"]} />
                        <Button
                            className="influencer-card-btn"
                            width="20%"
                            fontSize={"1rem"}
                            pos="relative"
                             right="1rem"
                            padding="10px 10px"
                        >
                            Go
                        </Button>
                        </Flex>
                    </Box>
                   
                    <Flex flexDirection={["column","column","row","row","row"]} my="3em" >
                        <Box>
                            
                            <Text style={BoldWhiteText} fontSize={["15px","15px","25px","20px","20px"]}>Site Map</Text>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="https://metaverse.lootmogul.com/what-is-metaverse/"
                            >
                            <Text style={LightWhiteText}>
                                What is Metaverse
                            </Text>
                            </Link>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="https://metaverse.lootmogul.com/what-is-nft/"
                            >
                            <Text style={LightWhiteText}>What is NFT</Text>
                            </Link>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="https://lootmogul.wpengine.com/about-us/"
                                isExternal
                            >
                                <Text style={LightWhiteText}>About us</Text>
                            </Link>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="/faq"
                            >
                                <Text style={LightWhiteText}>FAQ</Text>
                            </Link>
                            <Link
                                _focus={{ boxShadow: "none" }}
                                href="https://lootmogul.wpengine.com/privacy-policy/"
                                isExternal
                            >
                                <Text style={LightWhiteText}>
                                    Privacy Policy
                                </Text>
                            </Link>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="https://lootmogul.wpengine.com/terms-conditions/"
                                isExternal
                            >
                                <Text style={LightWhiteText}>
                                    Terms & Services
                                </Text>
                            </Link>
                            <Text style={LightWhiteText}>Blog</Text>
                        </Box>
                        <Box
                            w="2px"
                            bg="#FFF"
                            mx={["1rem", "1rem", "6em", "2rem", "5rem"]}
                        />
                        <Box>
                            <Text style={BoldWhiteText} fontSize={["15px","15px","25px","20px","20px"]}>Influencer</Text>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="/influencers/signup"
                            >
                                <Text style={LightWhiteText}>
                                    Influencer Signup
                                </Text>
                            </Link>
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                href="/influencers/earning"
                            >
                                <Text style={LightWhiteText}>
                                    Influencer Earning
                                </Text>
                            </Link>
                        </Box>
                    </Flex>
                    <Box>
                        <Image
                            alt=""
                            src="/assets/lm_logo.png"
                            width={["154px"]}
                            height={35}
                            onClick={() => router.push("/")}
                            {...logoStyle}
                        />
                        <Text style={BoldWhiteText} fontSize={["15px","15px","25px","20px","20px"]}>Community</Text>
                        <Flex
                            mt="6px"
                            justify="flex-start"
                            width={["90%", "100%"]}
                            flexWrap={"wrap"}
                            py="1rem"
                        >
                            {socialLinks.map((img, index) => (
                                <Box
                                    key={`cimg-${index}`}
                                    mt={["5px", 0, 0, 0]}
                                    mr={["5px","5px","15px","5px", "10px"]}
                                >
                                    <Link
                                        _focus={{
                                            border: "none",
                                            boxShadow: "none"
                                        }}
                                        href={img.link}
                                        target="_blank"
                                    >
                                        <Image
                                            alt={img.Image}
                                            width={["20px","18px","25px","22px","22px"]}
                                            height={["20px","18px","25px","22px","22px"]}
                                            src={`/assets/${img.Image}`}
                                            color="#FFF"
                                        />
                                    </Link>
                                </Box>
                            ))}
                        </Flex>
                        <Text style={BoldWhiteText} fontSize={["15px","15px","25px","20px","20px"]}>Try our App</Text>
                        <Image alt="" src="https://metaverse.lootmogul.com/wp-content/uploads/2022/07/1_V9-OPWpauGEi-JMp05RC_A.png" w="170px"/>
                    </Box>
                </Flex>
            </Flex>
            <Box m="auto" textAlign={["left", "center"]} w="100%" mt="25px">
                <Flex
                    justify={[ "center"]}
                    wrap="wrap"
                    mt="20px"
                    alignItems="center"
                >
                    <Text
                        color="white"
                        fontFamily="Sora"
                        fontSize="16px"
                        fontWeight={700}
                    >
                        Our Payment Partners
                    </Text>
                    {payments.map((img, index) => (
                        <Box
                            key={`pay-${index}`}
                            m="10px"
                            width={"140px"}
                            height={"35px"}
                            position="relative"
                        >
                            <Image
                                alt={img}
                                objectFit="contain"
                                layout="fill"
                                src={`/assets/${img}`}
                            />
                        </Box>
                    ))}
                </Flex>
            </Box>
            <Box w="100%" h="2px" bg="#FFF" my="10px" />
            <Text mt="35px" variant="footerText" color="#FFF !important">
                © 2022 LootMogul. All Rights Reserved. HQ: 3301 Ocean Park Blvd,
                Unit 205, Santa Monica, CA 90405
            </Text>
            <Text
                mt="16px"
                m="auto"
                w="80%"
                variant="footerText"
                my="15px !important"
            >
                LootMogul is NOT AFFILIATED, AUTHORIZED, LICENSED OR ENDORSED by
                NBA (National Basketball Association), NFL (National Football
                League), MLB (Major League Baseball), NHL (National Hockey
                League), MLS (Major League Soccer), NCAA (National College
                Athletic Association) or any other professional and amateur
                organization.
            </Text>
        </>
    );
};

const BoldWhiteText = {
    fontFamily: "Sora",
    fontWeight: "600",
   marginTop:"10px",
    marginBottom: "0.5rem",
    color: "#FFF"
};
const LightWhiteText = {
    fontFamily: "Sora",
    color: "lightgray",
    fontSize: "15px",
    marginBottom: "0.5rem"
};
export default Footer;
