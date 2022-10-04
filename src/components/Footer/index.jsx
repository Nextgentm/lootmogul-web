import { Flex, Box, Text, Link, Input, Image, Button } from "@chakra-ui/react";
import { logoStyle } from "./styles";
import { useRouter } from "next/router";
import SiteMap from "./SiteMap";
import ContactUsSubmit from "./ContactUsSubmit";
import InfluencerPaymentPartner from "./InfluencerPaymentPartner";
import BottomAboutText from "./BottomAboutText";
import Community from "./Community";

const Footer = () => {
    const router = useRouter();

    return (
        <Box bg="#0f092d">
            <Flex
                py="2rem"
                w="100%"
                px="2rem"
                direction={[
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "row"
                ]}
            >
                <Flex
                    w={["100%", "100%", "100%", "50%"]}
                    justify={["center", "center", "center", "space-around"]}
                >
                    <ContactUsSubmit />
                    <Box display={["none", "none", "none", "block"]}>
                        <SiteMap />
                    </Box>
                </Flex>
                <Box
                    w="4px"
                    bg="#FFF"
                    ml={["1rem", "1rem", "6em", "2rem", "4rem"]}
                    display={["none", "none", "none", "block"]}
                />
                <Flex
                    w={["100%", "100%", "100%", "50%"]}
                    justifyContent="space-around"
                    direction={[
                        "column-reverse",
                        "column-reverse",
                        "column-reverse",
                        "row"
                    ]}
                >
                    <Flex justifyContent="space-around" my={["40px","40px","40px","0px"]}>
                        <InfluencerPaymentPartner />
                        <Box display={["block", "block", "block", "none"]}>
                            <SiteMap />
                        </Box>
                    </Flex>

                    <Flex direction="column" alignItems="center">
                        <Image
                            alt=""
                            src="/assets/lm_logo.png"
                            width={["290px", "100%"]}
                            onClick={() => router.push("/")}
                            {...logoStyle}
                            alignItem="left"
                        />

                        <Text
                            variant="BoldWhiteText"
                            // fontSize={["18px", "25px", "30px", "20px", "35px"]}
                        >
                            Try our App
                        </Text>
                        <Image
                            alt=""
                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_414/https://metaverse.lootmogul.com/wp-content/uploads/2022/07/1_V9-OPWpauGEi-JMp05RC_A.png"
                            w="170px"
                            border="1px solid #FFF"
                        />
                    </Flex>
                </Flex>
            </Flex>

            <Community />
            <BottomAboutText />
        </Box>
    );
};

export default Footer;
