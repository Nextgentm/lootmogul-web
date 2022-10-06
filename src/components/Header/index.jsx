import { useContext } from "react";
import {
    Link,
    Box,
    Button,
    Text,
    Flex,
    useDisclosure,
    Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AppContext } from "../../utils/AppContext";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";
import {
    loginBtnStyle,
    loginStyle,
    navLinksStyle
} from "./styles";
import { HamburgerIcon } from "@chakra-ui/icons";
const Login = dynamic(() => import("../../features/Login"));
import NavDrawer from "./NavDrawer/index";
const routes = [
    {
        label: "Home",
        path: "https://metaverse.lootmogul.com/"
    },

    {
        label: "Metaverse",
        path: "https://metaverse.lootmogul.com/metaverse/"
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
    },
    
    {
        label: "Explore",
        path: "https://metaverse.lootmogul.com/meta-map/"
    }
];

const Header = () => {
    const { user, isMobileDevice, isLoginModalActive } = useContext(AppContext);
    const { isHideHeader } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    const isActiveLink = (path, queryPath) => {
        if (queryPath)
            return path === router.pathname || queryPath === router.pathname;
        return path == router.pathname.split("/[id]")[0];
    };

    const { toggleLoginModal } = useContext(AppContext);

    const renderMobileRoutes = () => (
        <Flex direction="column" mt="50">
            {routes.map(({ label, path, queryPath }, index) => (
                <Link
                    href={path}
                    passHref={true}
                    _focus={{ border: "none" }}
                    key={`route-${index}`}
                >
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
            <Button
                mt={"10%"}
                ml={["7%", "25%"]}
                w="100px"
                h="35px"
                fontSize={["12px"]}
                onClick={() =>
                    window.open("https://discord.gg/mHUqAm8fsh", "_blank")
                }
            >
                Join Discord
            </Button>
        </Flex>
    );

    const OnLoginClose = async () => {
        toggleLoginModal();
    };

    return (
        <>
            {!isHideHeader && (
                <Box
                    bg="#100526"
                    w="100%"
                    h={isMobileDevice ? "70px" : "100px" }
                    display="flex"
                    pl={["16px", "5%"]}
                    pr={["16px", "5%"]}
                    py="2.5em"
                    alignItems="center"
                    top="0"
                    justify="space-between"
                    as="nav"
                >
                    {isMobileDevice && (
                        <Flex w="10%">
                            <HamburgerIcon
                                color="white"
                                h="32px"
                                w="32px"
                                mr={["16px", "26px", "36px"]}
                                onClick={onOpen}
                            />
                        </Flex>
                    )}
                    
                    <Flex w={isMobileDevice ? "55%" : "20%" } justify={isMobileDevice ? "center" : "unset" }>
                        <Image
                            style={{ cursor: "pointer" }}
                            width={["250px", "auto", "255px"]}
                            height={["80px", "80px"]}
                            objectFit="contain"
                            onClick={() => router.push("/")}
                            alt="logo"
                            src="/assets/lm_logo.png"
                        />
                    </Flex>

                    {isMobileDevice ? (
                        <NavDrawer
                            isOpen={isOpen}
                            onClose={onClose}
                            renderMobileRoutes={renderMobileRoutes()}
                        />
                    ) : (
                        <Flex direction="row" justifyContent="center" w="50%">
                            {routes.map(({ label, path, queryPath }, index) => (
                                <Link
                                    _focus={{ border: "none", textDecor:"none" }}
                                    _hover={{ border: "none", textDecor:"none" }}
                                    href={path}
                                    passHref={true}
                                    key={`route-${index}`}
                                >
                                    <Text
                                        cursor="pointer"
                                        {...navLinksStyle(
                                            isActiveLink(path, queryPath)
                                        )}
                                    >
                                        {label}
                                    </Text>
                                </Link>
                            ))}
                        </Flex>
                    )}

                    <Flex
                        {...loginStyle(isMobileDevice, user)}
                        alignItems="center"
                        justifyContent="flex-end"
                        w={isMobileDevice ? "35%" : "30%" }
                    >
                        {!isMobileDevice && (
                            <>
                                <Link
                                    _focus={{
                                        border: "none",
                                        boxShadow: "none"
                                    }}
                                    href="https://discord.gg/mHUqAm8fsh"
                                    target="_blank"
                                >
                                    <Image
                                        className="stickyIcon"
                                        // m="5%"
                                        marginRight="20px"
                                        alt="social"
                                        boxSize={["30px", "38px"]}
                                        src="/assets/designupdate1/discordicon.png"
                                    />
                                </Link>
                                <Link
                                    _focus={{
                                        border: "none",
                                        boxShadow: "none"
                                    }}
                                    href="https://t.me/LootMogulcommunitychat"
                                    target="_blank"
                                >
                                    <Image
                                        className="telegram"
                                        // m="5%"
                                        marginRight="20px"
                                        alt="social"
                                        boxSize={["25px", "30px"]}
                                        src="/assets/telegram.svg"
                                    />
                                </Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <Button
                                    {...loginBtnStyle}
                                    fontFamily="Sora !important "
                                    fontWeight="500"
                                    onClick={() => toggleLoginModal()}
                                    padding={[
                                        "0px 30px",
                                        "0px 36px",
                                        "20px 50px"
                                    ]}
                                    boxShadow="0px 0px 30px 10px #e90a6355"
                                    fontSize={["0.7rem", "0.8rem", "15px"]}
                                    height="35px"
                                >
                                    LOGIN
                                </Button>
                                {/* )} */}
                            </>
                        )}

                        {user && (
                            <UserInfo user={user} isMobileDevice={isMobileDevice} />
                        )}
                    </Flex>

                    {/* {user && (
                        <UserInfo user={user} isMobileDevice={isMobileDevice} />
                    )} */}
                </Box>
            )}

            <Box>
                <Login
                    isOpen={isLoginModalActive}
                    OnLoginClose={OnLoginClose}
                />
            </Box>
        </>
    );
};

export default Header;
