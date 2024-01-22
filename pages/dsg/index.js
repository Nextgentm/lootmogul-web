import SEOContainer from "../../src/features/SEOContainer";
import Banner from "../../src/components/Web3Games/Banner";
import { Box, Flex, Image, Text, Button, VStack, Link, useMediaQuery } from '@chakra-ui/react'
import React, { useRef, useContext, useState, useEffect } from "react";
import Community from "../../src/components/Footer/Community";
import { AppContext } from "../../src/utils/AppContext";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../../src/features/Login"));
import Head from 'next/head';

const defaultSEOData = {
    metaTitle: "Lootmogul | DSG Durban Cricket Stadium",
    metaDescription: "Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL: process.env.NEXT_PUBLIC_SITE_URL + "/games"
};

export default function GamesPage({campaignsSectionsResData}) {
    const [isLoginModalActive, setLoginModalActive] = useState(false);
    const {
        isMobileDevice,
        user
    } = useContext(AppContext);
    const toggleLoginModal = () => {
        setLoginModalActive(!isLoginModalActive);
    };
    const OnLoginClose = async () => {
        if(isMobileDevice){
            toggleLoginModal();
        }
        
    };
    const trending_subheader = campaignsSectionsResData?.data[3].trending_subheader;
    return (
        <>

            {process.env.NEXT_PUBLIC_SENTRY_ENV === 'production' &&
                <>
                    <Head>
                        {/* Google Analytics Global Site Tag (gtag.js) */}
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=G-D61VSCKP4X`}
                        ></script>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-D61VSCKP4X');
                    `,
                            }}
                        ></script>
                    </Head>
                </>
            }

            <SEOContainer seoData={defaultSEOData} />
            <Banner customClass="dsg_cricket" bannerData={campaignsSectionsResData?.data[3] || []}/>
            
            <Box>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p={["0% 0%", "10% 0%", "2% 5%"]}
                    //pb="0"
                >
                    <Box
                        px={[5, 5, 10]}
                        width={["100%", "100%", "100%", "100%", "93%"]}
                        margin={"auto"}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "42px",
                                "42px",
                                "62px",
                            ]}
                            textAlign={"center"}
                        >
                             {campaignsSectionsResData?.data[3].trending_header}
                        </Text>

                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "18",
                                "18"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["22px","22px","22px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"center"}
                        >
                             <p dangerouslySetInnerHTML={{ __html: trending_subheader }}></p>
                        </Text>  
                    </Box>
                </Flex>
            </Box>

            <Flex
                flexDir={["column", "column", "row", "row"]}
                w={["100%", "100%", "100%", "80%", "80%", "60%", "60%"]}
                alignItems={"left"}
                p={["0% 0%", "0% 0%", "0% 2%"]}
                margin={"auto"}
                mb="5%"
                
            >
                {!user?.id && 
                <><Box
                    px={[5, 5, 5]}
                    width={["100%", "100%", "100%", "100%"]}
                >
                    <Text
                        variant="headText"
                        fontSize={[
                            "32px",
                            "40px",
                            "46px",
                        ]}
                        textShadow="0px 0px 10px #00034E94;"
                        fontFamily="var(--chakra-fonts-Blanch)"
                        lineHeight={[
                            "28px",
                            "30px",
                            "37px",
                        ]}
                        textAlign={"left"}
                        pt="15px"
                    >
                        Signup for Free
                    </Text>
                    <Text
                        color="white"
                        fontSize={[
                            "14",
                            "14",
                            "14",
                            "18",
                            "18"
                        ]}
                        mt="20px"
                        fontFamily="Sora"
                        fontWeight="normal"
                        lineHeight={["22px","22px","22px", "28px", "28px"]}
                        width={["100%", "100%", "100%"]}
                        className="desc_subheader"
                        textAlign={"left"}
                    >
                            Get R100 worth of Bonus chips
                    </Text>  
                    <Link
                        href={!isMobileDevice ? '#login': '#'}
                        _hover={{ border: "none", textDecoration: "none" }}
                        _focus={{ border: "none", textDecoration: "none" }}
                        key={`igc-1`}
                        onClick={OnLoginClose}
                        
                    >
                        <Button
                            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            filter="drop-shadow(0 0 20px #FF0080)"
                            boxShadow="inset 0 0 0px 0px #481A7F"
                            width="180px"
                            fontSize="18px"
                            fontWeight="400"
                            p="28px"
                            mt="30px"
                            mb="30px"
                        >
                                Signup Now
                        </Button>
                    </Link>
                </Box>
                </>
                }
                
                <Box
                    px={[5, 5, 5]}
                    width={["100%", "100%", "100%", "100%"]}
                >
                    <Text
                        variant="headText"
                        fontSize={[
                            "32px",
                            "40px",
                            "46px",
                        ]}
                        textShadow="0px 0px 10px #00034E94;"
                        fontFamily="var(--chakra-fonts-Blanch)"
                        lineHeight={[
                            "28px",
                            "30px",
                            "37px",
                        ]}
                        textAlign={"left"}
                    
                        pt="15px"
                    >
                        100% BONUS on First DEPOSIT
                    </Text>
                    <Text
                        color="white"
                        fontSize={[
                            "14",
                            "14",
                            "14",
                            "18",
                            "18"
                        ]}
                        mt="20px"
                        fontFamily="Sora"
                        fontWeight="normal"
                        lineHeight={["22px","22px","22px", "28px", "28px"]}
                        width={["100%", "100%", "100%"]}
                        className="desc_subheader"
                        textAlign={"left"}
                    >
                            Minimum deposit - 100 Rands
                    </Text> 
                    <Link
                        href={'/wallet'}
                        _hover={{ border: "none", textDecoration: "none" }}
                        _focus={{ border: "none", textDecoration: "none" }}
                        key={`igc-1`}
                        
                    >
                        <Button
                            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            filter="drop-shadow(0 0 20px #FF0080)"
                            boxShadow="inset 0 0 0px 0px #481A7F"
                            width="180px"
                            fontSize="18px"
                            fontWeight="400"
                            p="28px"
                            mt="30px"
                            mb="30px"
                        >
                            Deposit Now
                        </Button>
                    </Link>
                </Box>
            </Flex>
                
            <Box>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p={["0% 0%", "0% 0%", "2% 5%"]}
                    pb="0"
                >
                    <Box
                        px={[5, 5, 10]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "42px",
                                "42px",
                                "62px",
                            ]}
                            textAlign={"center"}
                        >
                            BE PART OF GLOBAL SPORTS METAVERSE
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    flexDir={["column","column", "column", "row", "row"]}
                    w={["100%", "100%", "50%", "98%", "94%"]}
                    alignItems={"left"}
                    p={["10% 0%", "10% 0%", "0% 0%"]}
                    margin={"auto"}
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/04/19035332/game_section_thumbnail_2.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            GAMING ARCADE
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            {campaignsSectionsResData?.data[3]?.gameSection1_subheader}
                        </Text>
                        <Link
                            href={campaignsSectionsResData?.data[3]?.banner_subheader}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                                {campaignsSectionsResData?.data[3]?.banner_header}
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://metaverse.lootmogul.com/wp-content/uploads/2022/09/Hoopculture_outlet_2.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            STADIUM SHOPS
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            {campaignsSectionsResData?.data[3]?.gameSection1_gameType}
                        </Text>
                        <Link
                           href={campaignsSectionsResData?.data[3].othertrending_redirectionUrl}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                               Buy Now
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/12/11022506/Side_8-min-min-1.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            EXTERNAL BRAND SPACE
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            {campaignsSectionsResData?.data[3]?.gameSection2_header}
                        </Text>
                        <Link
                            href={campaignsSectionsResData?.data[3].othertrending_header}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                               Buy Now
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://metaverse.lootmogul.com/wp-content/uploads/2022/09/STADIUM-SEAT-NFTs.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                             {campaignsSectionsResData?.data[3]?.trending_contestHighlights}
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            {campaignsSectionsResData?.data[3]?.gameSection2_subheader}
                        </Text>
                        <Link
                            href={campaignsSectionsResData?.data[3]?.gameSection2_gameType}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                                Buy Now
                            </Button>
                        </Link>
                    </Box>
                </Flex>
                {campaignsSectionsResData?.data[3]?.gameSection1_header &&             
                <>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p="5% 0% 3% 0%"
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight="62px"
                            textAlign={"center"}
                        >
                            {campaignsSectionsResData?.data[3]?.gameSection1_header}
                        </Text>
                    </Box>
                </Flex>

                <Flex
                    flexDir={["column", "column", "row", "row"]}
                    w={["100%", "100%", "100%", "100%", "82%"]}
                    alignItems={"left"}
                    p={["10% 0%", "10% 0%", "0% 2%"]}
                    margin={"auto"}
                    mb="5%"
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src={campaignsSectionsResData?.data[3]?.mobile_banner_header}
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"20px 0 0 20px"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src={campaignsSectionsResData?.data[3]?.mobile_banner_subheader}
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"20px"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src={campaignsSectionsResData?.data[3]?.gameSectiontraiv_header}
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"0 20px 20px 0"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                </Flex>
                </>
                }
            </Box>

            <Box bg="#0f092d" pb="10px">
                <Flex
                    py="50px"
                    px="20px"
                    w="100%"
                    maxW="90%"
                    m="0 auto"
                    display={['block','block','flex','flex']}
                >
                    <Box w={["100%", "100%", "100%", "100%"]} mr={["20px", "20px", "20px", "20px"]}>
                        <Box mb={["0px","0px","30px"]} pt="10px">
                            <Text
                            textAlign={["center","center","left","left"]}
                                variant="BoldWhiteText"
                                mt="10px"
                                mb="15px"
                                lineHeight="1"
                                fontSize="40px"
                                fontWeight="600"
                            >
                                Contact Us
                            </Text>
                            <Link
                                _focus={{
                                    border: "none",
                                    boxShadow: "none"
                                }}
                                _hover={{ textDecoration: "none" }}
                                href="mailto:support@lootmogul.com"
                            >
                                <Text  textAlign={["center","center","left","left"]}  variant="LightWhiteText" fontSize="22px" mb="0">
                                    support@lootmogul.com
                                </Text>
                            </Link>
                        </Box>
                    </Box> 
                    <Box w={["100%", "100%", "100%", "100%"]} mr={["20px", "20px", "20px", "20px"]}>
                        <Community />
                    </Box> 
                </Flex>
                <Box w="100%" h="3px" bg="#FFF" my="20px" mt="0" />
                <Flex
                    py="40px"
                    px="40px"
                    w="100%"
                    maxW="95%"
                    m="0 auto"
                >
                    <Flex
                        w={["100%", "100%", "100%", "100%"]}
                        justify={["center", "center", "flex-start", "flex-start"]}
                    >

                        <Text
                            variant="footerText"
                            fontWeight="400"
                            fontSize={["12px", "12px", "18px"]}
                            w="100%"
                            mx="auto"
                        >
                            © 2024 LootMogul. All Rights Reserved. NextGenTM, Inc. 831 N Tatnall Street Suite M #275 Wilmington, DE 19801 United States <br/>
                            Office Address : C/105 Varsha Swapna Gawan Pada, Mulund East, Mumbai - 400081
                        </Text>
            </Flex>   
            {!user?.id && <Login
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                    />
                    }
        </Flex>
            </Box>                
        </>
    );
}

export async function getStaticProps() {
    try {
        const campaignsSectionsRes = await fetch(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
            "/api/game-campaigns?populate=*&sort=id"
        );
        
        const campaignsSectionsResData = await campaignsSectionsRes.json();

        return {
            props: { campaignsSectionsResData },
            revalidate: 300,
        };
    } catch (error) { }
    return {
        props: { campaignsSectionsResData },
        revalidate: 300, // In seconds
    };
}
