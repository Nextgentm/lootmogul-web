import { Flex, Box, Text, Link, Input, Image, Button } from "@chakra-ui/react";
import { logoStyle } from "./styles";
import { useRouter } from "next/router";
import SiteMap from "./SiteMap";
import ContactUsSubmit from "./ContactUsSubmit";
import InfluencerPaymentPartner from "./InfluencerPaymentPartner";
import BottomAboutText from "./BottomAboutText";
import Community from "./Community";
import { useState, useContext } from "react";
import { AppContext } from "../../utils/AppContext/index";

const Footer = () => {
    const router = useRouter();

    const { isTabletOrDesktop } = useContext(AppContext);

    return (
        <Box bg="#0f092d" pb="10px">
            {isTabletOrDesktop && (
                <Flex
                    py="50px"
                    w="100%"
                    px="2rem"
                /*direction={[
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "row"
                ]}*/
                >
                    <Flex
                        w={["100%", "100%", "50%", "50%"]}
                        justify={["center", "center", "space-around", "space-around"]}
                    >
                        <ContactUsSubmit />
                        <Box display={["block", "block", "block", "block"]} w={["100%", "100%", "40%", "auto"]}>
                            <SiteMap />
                        </Box>
                    </Flex>
                    <Box
                        w="4px"
                        bg="#FFF"
                        ml={["1rem", "1rem", "2em", "2rem", "4rem"]}
                        display={["none", "none", "block", "block"]}
                    />
                    <Flex
                        w={["100%", "100%", "100%", "50%"]}
                        justifyContent="flex-start"
                        direction={[
                            "row",
                            "row",
                            "row",
                            "row"
                        ]}
                    >
                        <Flex justifyContent="space-around" width={["50%", "50%", "55%", "40%"]} pl={["0", "20px", "30px", "30px", "40px"]} pr="20px" my={["40px", "40px", "0", "0px"]}>
                            <InfluencerPaymentPartner />
                            <Box display={["none", "none", "none", "none"]}>
                                <SiteMap />
                            </Box>
                        </Flex>

                        <Flex direction="column" alignItems="flex-start" width={["50%", "50%", "45%", "60%"]}>
                            <Image
                                alt=""
                                src="/assets/lm_logo.png"
                                width={["90%"]}
                                height="auto"
                                onClick={() => router.push("/")}
                                // {...logoStyle}
                                alignItem="left"
                            />

                            <Text
                                variant="BoldWhiteText"
                                // fontSize={["18px", "25px", "30px", "20px", "35px"]}
                                lineHeight="1"
                                mb="20px"
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
            )}

            {!isTabletOrDesktop && (
                <Flex
                    py="50px"
                    w="100%"
                    px="2rem"
                    direction="column"
                >
                    <Flex direction="column" alignItems="flex-start" width="100%" mb="20px">
                        <Image
                            alt=""
                            src="/assets/lm_logo.png"
                            width={["90%"]}
                            height="auto"
                            onClick={() => router.push("/")}
                            // {...logoStyle}
                            alignItem="center"
                            m="0 auto"
                        />

                        <Text
                            variant="BoldWhiteText"
                            lineHeight="1"
                            mb="20px"
                            mt={["0", "0", "10px", "10px"]}
                            textAlign="center"
                            w="100%"
                            fontSize="30px"
                        >
                            Try our App
                        </Text>
                        <Image
                            alt=""
                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_414/https://metaverse.lootmogul.com/wp-content/uploads/2022/07/1_V9-OPWpauGEi-JMp05RC_A.png"
                            w="50%"
                            border="1px solid #FFF"
                        />
                    </Flex>

                    <Flex direction="row" alignItems="flex-start" width="100%" my="20px">
                        <InfluencerPaymentPartner />
                        <Box
                            w="25px"
                        />
                        <SiteMap />
                    </Flex>

                    <Flex
                        w="100%"
                        justify="center"
                        mt="20px"
                    >
                        <ContactUsSubmit />
                    </Flex>
                </Flex>
            )}

            <Community />
            <BottomAboutText />
        </Box>
    );
};

export default Footer;
