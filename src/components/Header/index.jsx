import { useContext } from "react";
import { Link, Box, Button, Text, Flex, useDisclosure, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { AppContext } from "../../utils/AppContext";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import dynamic from 'next/dynamic';
import { logoStyle, rootStyle, loginBtnStyle, loginStyle, navLinksStyle } from "./styles";
import { HamburgerIcon } from "@chakra-ui/icons";
// const NavDrawer = dynamic(() => import("./NavDrawer/index"));
const Login = dynamic(() => import("../../features/Login"));
import NavDrawer from './NavDrawer/index';
const routes = [
    {
        label: "Home",
        path: "/"
    },

    {
        label: "Metaverse",
        path: "/metaverse"
    },
    {
        label: "INFLUENCER",
        path: "/influencers",
        queryPath: "/influencer/[id]"
    },
    {
        label: "NFT",
        path: "/nfts"
    },
    {
        label: "Games",
        path: "/games"
    }
    // {
    //     label: "Founder's NFT",
    //     path: "/founder-nfts"
    // }
    // {
    //     label: "Promotion",
    //     path: "/promotions"
    // }
];

const Header = () => {
    const { user, isMobileDevice, isLoginModalActive } = useContext(AppContext);
    const { isHideHeader } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    // check router path
    const isActiveLink = (path, queryPath) => {
        if (queryPath)
            return path === router.pathname || queryPath === router.pathname;
        return path == router.pathname.split("/[id]")[0];
    };

    const { toggleLoginModal } = useContext(AppContext);


    const renderMobileRoutes = (user) => (
        <Flex direction="column" mt="50">
            {routes.map(({ label, path, queryPath }, index) => (
                <Link href={path} passHref={true} _focus={{ border: "none" }} key={`route-${index}`}>
                    <a onClick={onClose}>
                        <Text
                            cursor="pointer"
                            {...navLinksStyle(isActiveLink(path, queryPath))}
                        >
                            {label}
                        </Text>
                    </a>
                </Link>
            ))}
            <Button mt={"10%"} ml={["7%", "25%"]} w="100px" h="35px"
                onClick={() => window.open(
                    "https://discord.gg/mHUqAm8fsh",
                    "_blank"
                )} >
                Join Discord
            </Button>


        </Flex>
    );

    const OnLoginClose = async () => {
        toggleLoginModal();


    }

    return (
        <>
            {!isHideHeader && (
                <Box bg="background" w="100%" h="65px" display="flex" pl={["16px", "60px"]} pr={["16px", "20px"]} alignItems="center" pos="sticky" top="0" justify="space-between" as="nav">
                    {isMobileDevice && (
                        <HamburgerIcon
                            color="white"
                            h="22px"
                            w="22px"
                            mr={["16px", "26px", "36px"]}
                            onClick={onOpen}
                        />
                    )}


                    <img style={{ cursor: "pointer" }} width="130px" onClick={() => router.push("/")} alt="logo" src="/assets/lm_logo.png" />
                    <SearchBar />

                    {isMobileDevice ? (
                        <NavDrawer
                            isOpen={isOpen}
                            onClose={onClose}
                            renderMobileRoutes={renderMobileRoutes}
                        />
                    ) : (
                        <Flex>
                            {routes.map(({ label, path, queryPath }, index) => (
                                <Link _focus={{ border: "none" }} href={path} passHref={true} key={`route-${index}`}>
                                    <Text
                                        cursor="pointer"
                                        {...navLinksStyle(isActiveLink(path, queryPath))}
                                    >
                                        {label}
                                    </Text>
                                </Link>
                            ))}

                        </Flex>
                    )}


                    <Flex {...loginStyle(isMobileDevice, user)}>
                        {!isMobileDevice &&<Button
                        w="100px"
                        h="35px"
                        onClick={() => window.open(
                            "https://discord.gg/mHUqAm8fsh",
                            "_blank"
                        )}

                    >
                        Join Discord
                    </Button>
                        }
                        {!user && (<>
                            {isMobileDevice ? (
                                <Text
                                    cursor="pointer"
                                    color="primary"
                                    fontFamily="Blanch"
                                    ml="auto"
                                    fontSize="26px"
                                    onClick={() => toggleLoginModal()}
                                >
                                    Login
                                </Text>
                            ) : (
                                <Button
                                    {...loginBtnStyle}
                                    onClick={() => toggleLoginModal()}
                                >
                                    Login
                                </Button>
                            )}
                        </>)}
                    </Flex>


                    {user && <UserInfo user={user} isMobileDevice={isMobileDevice} />}

                </Box>
            )}

            <Box >
                <Login isOpen={isLoginModalActive} OnLoginClose={OnLoginClose} />
            </Box>

        </>

    );
};

export default Header;