import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AppContext } from "../../../utils/AppContext";

const Login = dynamic(() => import("../../../features/Login"));

const Banner = ({ getBannerImage }) => {
    const [isLoginModalActive, setLoginModalActive] = useState(true);
    const { user } = useContext(AppContext);
    
    const toggleLoginModal = () => {
        setLoginModalActive(!isLoginModalActive);
    };

    const OnLoginClose = async () => {
        toggleLoginModal();
    };
    
    useEffect(() => {
        if(user?.id){
            setLoginModalActive(false);
        }
    },[user]);

    return (
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            backgroundImage="/assets/web-3Desktopbanner.jpg"
            height="620px"
            p="2% 5%"
        >
            <Box
                px={10}
                width={["100%", "100%", "100%", "55%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "70px",
                        "70px",
                        "80px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="65px"
                >
                    Join LootMogul Web3 <br/>Sports Gaming
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "28px"]}
                    width={["100%", "100%", "80%"]}
                >
                    Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!
                </Text>
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["120%", "120%", "120%", "50%"]}
            >
                <Box>                 
                    {!user?.id && <Login
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                    />
                    }
                </Box>
            </Box>
        </Flex>
    )
}

export default Banner