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

    const { isTabletOrDesktop, isHideFooter } = useContext(AppContext);

    return (
        !isHideFooter ?
            <Box bg="#0f092d" pb="10px">
                {isTabletOrDesktop && (
                    <Flex
                        py="50px"
                        px="20px"
                        w="100%"
                        maxW="90%"
                        m="0 auto"
                    /*direction={[
                        "column-reverse",
                        "column-reverse",
                        "column-reverse",
                        "row"
                    ]}*/
                    >
                        <Flex
                            w={["100%", "100%", "50%", "54%"]}
                            justify={["center", "center", "flex-start", "flex-start"]}
                        >
                            <ContactUsSubmit />
                            <Box display={["block", "block", "block", "block"]} w={["100%", "100%", "40%", "40%"]}>
                                <SiteMap />
                            </Box>
                        </Flex>
                        <Box
                            w="5px"
                            bg="#FFF"
                            ml={["1rem", "1rem", "2em", "2rem", "15px"]}
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
                            <Flex justifyContent="space-around" width={["50%", "50%", "55%", "50%"]} pl={["0", "20px", "30px", "30px", "40px"]} pr="20px" my={["40px", "40px", "0", "0px"]}>
                                <InfluencerPaymentPartner />
                                <Box display={["none", "none", "none", "none"]}>
                                    <SiteMap />
                                </Box>
                            </Flex>

                            <Flex direction="column" alignItems="flex-start" width={["50%", "50%", "45%", "60%"]}>
                                <Link
                                    _focus={{ border: "none", boxShadow: "none" }}
                                    _hover={{ textDecoration: "none" }}
                                    href={process.env.NEXT_PUBLIC_SITE_URL}
                                >
                                    <Image
                                        alt=""
                                        src="/assets/Final-Logo-Full.png"
                                        width={["95%"]}
                                        height="auto"
                                        onClick={() => router.push("/")}
                                        // {...logoStyle}
                                        alignItem="left"
                                        mb="10px"
                                        mt="10px"
                                    />
                                </Link>

                                <Text
                                    variant="BoldWhiteText"
                                    // fontSize={["18px", "25px", "30px", "20px", "35px"]}
                                    lineHeight="1"
                                    mb="20px"
                                >
                                    Try our App
                                </Text>
                                <Link
                                    _focus={{ border: "none", boxShadow: "none" }}
                                    _hover={{ textDecoration: "none" }}
                                    href="https://apps.apple.com/in/app/lootmogul/id1619785065"
                                    isExternal
                                >
                                    <Image
                                        alt=""
                                        src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_414/https://metaverse.lootmogul.com/wp-content/uploads/2022/07/1_V9-OPWpauGEi-JMp05RC_A.png"
                                        w="50%"
                                        border="3px solid #FFF"
                                    />
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                )}

                {!isTabletOrDesktop && (
                    <Flex
                        py="40px"
                        w="100%"
                        maxW="90%"
                        m="0 auto"
                        px="10px"
                        direction="column"
                        pb={["0px","0px","40px"]}
                    >
                        <Flex direction="column" alignItems="flex-start" width="100%" mb="20px">
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                _hover={{ textDecoration: "none" }}
                                href={process.env.NEXT_PUBLIC_SITE_URL}
                            >
                                <Image
                                    alt=""
                                    src="/assets/Final-Logo-Full.png"
                                    width={["100%"]}
                                    height="auto"
                                    onClick={() => router.push("/")}
                                    // {...logoStyle}
                                    alignItems="center"
                                    m="10px auto"
                                />
                            </Link>

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
                            <Link
                                _focus={{ border: "none", boxShadow: "none" }}
                                _hover={{ textDecoration: "none" }}
                                href="https://apps.apple.com/in/app/lootmogul/id1619785065"
                                isExternal
                            >
                                <Image
                                    alt=""
                                    src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_414/https://metaverse.lootmogul.com/wp-content/uploads/2022/07/1_V9-OPWpauGEi-JMp05RC_A.png"
                                    w="50%"
                                    m="0 auto"
                                    border="3px solid #FFF"
                                />
                            </Link>
                        </Flex>

                        <Flex direction="row" alignItems="flex-start" width="100%" my="20px" mb={["0px","0px","20px"]}>
                            <InfluencerPaymentPartner />
                            <Box
                                w="5px"
                            />
                            <SiteMap />
                        </Flex>

                        <Flex
                            w="100%"
                            justify="center"
                            mt={["0px","0px","20px"]}
                        >
                            <ContactUsSubmit />
                        </Flex>
                    </Flex>
                )}

                <Community />
                <BottomAboutText />
            </Box>
            : <></>
    );
};

export default Footer;
