import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AppContext } from "../../../utils/AppContext";
import { useRouter } from "next/router";
const Login = dynamic(() => import("../../../features/Login"));
const LoginForm = dynamic(() => import("../../../features/LoginForm"));

const Banner = ({ bannerData, customClass }) => {
    const router = useRouter();
    const [isLoginModalActive, setLoginModalActive] = useState(false);
    const { user } = useContext(AppContext);
    const { isMobileDevice } = useContext(AppContext);
    const toggleLoginModal = () => {
        setLoginModalActive(!isLoginModalActive);
    };

    const OnLoginClose = async () => {
        toggleLoginModal();
    };
    
    if (router.route === "/thanksgiving-campaign") {
        bannerData.trending_redirectionUrl = '/wallet';
    }

    if (router.route === "/dsg-durban-cricket-stadium") {
        bannerData.trending_redirectionUrl = '';
    }

    useEffect(() => {
        if(user?.id){
            router.push(bannerData.trending_redirectionUrl );
            setLoginModalActive(false);
        }
    },[user]);

    return (
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            backgroundImage={isMobileDevice ? bannerData.mobile_banner_image.data[0].url ||  "/assets/web-3Mobilebanner.jpg" : bannerData.banner_image.data[0].url || "/assets/web-3Desktopbanner.jpg" }
            height="700px"
            p="2% 5%"
            backgroundSize="cover"
            className={customClass || 'bannerImage'}
            onClick={(isMobileDevice && router.route =="/dsg-durban-cricket-stadium") ? OnLoginClose : console.log("")}
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "75%"]}
            >
                {router.route != "/dsg-durban-cricket-stadium" && 
                <>
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    width={["100%", "100%", "100%", "60%"]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "65px",
                    ]}
                >
                    {bannerData.banner_header}
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "15",
                        "15",
                        "15",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["20px", "20px", "28px"]}
                    width={["100%", "100%", "60%"]}
                >
                    {bannerData.banner_subheader}
                </Text>
                </>
                }

                {!user && isMobileDevice && router.route !="/dsg-durban-cricket-stadium" && (
                    <>
                        <Button
                            mt="18px"
                            fontFamily="Sora !important "
                            fontWeight="500"
                            onClick={() => toggleLoginModal()}
                            padding={[
                                "0px 30px",
                                "0px 36px",
                                "20px 50px"
                            ]}
                            boxShadow="inset 0 0 0px 0px #481A7F"
                            fontSize="15px"
                            height={["39px", "39px", "35px", "35px"]}
                            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            filter="drop-shadow(0 0 20px #FF0080)"
                            p="28px"
                            width="180px"
                        >
                            Signup
                        </Button>
                    </>
                )}
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["100%", "100%", "100%", "30%"]}
            >
                <Box> 
                    {!isMobileDevice ?
                    <>
                    {!user?.id && <LoginForm
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> :
                    <>
                    {!user?.id && <Login
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> }                
                    
                </Box>
            </Box>
        </Flex>
    )
}

export default Banner