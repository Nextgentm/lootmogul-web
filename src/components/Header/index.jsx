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
const ForgotPassword = dynamic(() => import("../../features/ForgotPassword"));
const CheckYourMail = dynamic(() => import("../../features/CheckYourMail"));
const ChangePassword = dynamic(() => import("../../features/ChangePassword"));
const PasswordChanged = dynamic(() => import("../../features/PasswordChanged"));
import NavDrawer from "./NavDrawer/index";
const routes = [
    {
        label: "Home",
        path: "https://metaverse.lootmogul.com/home",
        isExternalLink: true
    },

    {
        label: "Metaverse",
        path: "https://metaverse.lootmogul.com/metaverse/",
        isExternalLink: true
    },
    {
        label: "AMBASSADORS",
        path: "/influencers",
        queryPath: "/influencer/[id]",
        isExternalLink: false
    },
    {
        label: "NFT",
        path: "/nfts",
        isExternalLink: false
    },
    {
        label: "Games",
        path: "/games",
        isExternalLink: false
    },
    
    {
        label: "Explore",
        path: "https://metaverse.lootmogul.com/meta-map/",
        isExternalLink: true
    }
];
let paramsLogin = '';

const Header = () => {
    const { user, isMobileDevice, isLoginModalActive, isForgotPasswordModalActive, isCheckYourMailModalActive, isChangePasswordModalActive, isPasswordChangedModalActive, jwt } = useContext(AppContext);
    const { isHideHeader } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    const isActiveLink = (path, queryPath) => {
        if (queryPath)
            return path === router.pathname || queryPath === router.pathname;
        return path == router.pathname.split("/[id]")[0];
    };

    const { toggleLoginModal, toggleForgotPasswordModal, toggleCheckYourMailModal, toggleChangePasswordModal, togglePasswordChangedModal } = useContext(AppContext);

    if (typeof window !== 'undefined') {
        paramsLogin = '?jwt='+window.localStorage?.getItem("strapi_jwt");
    }

    const renderMobileRoutes = () => (
        <Flex direction="column" mt={["20px", "20px", "30px"]}>
            {routes.map(({ label, path, queryPath, isExternalLink }, index) => (
                <Link
                    href={isExternalLink===true ? path+paramsLogin : path}
                    passhref="true"
                    _focus={{ border: "none" }}
                    key={`route-${index}`}
                    _hover={{ textDecoration: "none" }}
                >
                    <a onClick={onClose}>
                        <Text
                            cursor="pointer"
                            {...navLinksStyle(isActiveLink(path, queryPath))}
                            p="10px 0"
                            lineHeight="1"
                            _hover={{ transform: "scale(1)", textDecoration: "none", color: "#e90a63" }}
                        >
                            {label}
                        </Text>
                    </a>
                </Link>
            ))}
            <Button
                mt={"30px"}
                w="220px"
                h="35px"
                fontSize={["12px"]}
                onClick={() =>
                    window.open("https://discord.gg/mHUqAm8fsh", "_blank")
                }
            >
                <Image
                    marginRight="20px"
                    alt="social"
                    boxSize={["30px", "38px"]}
                    src="/assets/designupdate1/discordicon.png"
                />
                <span>Join Discord</span>
            </Button>
        </Flex>
    );

    const OnLoginClose = async () => {
        toggleLoginModal();
    };

    const OnForgotPasswordClose = async () => {
        toggleForgotPasswordModal();
    };

    const OnCheckYourMailClose = async () => {
        toggleCheckYourMailModal();
    };

    const OnChangePasswordClose = async () => {
        toggleChangePasswordModal();
    };

    const OnPasswordChangedClose = async () => {
        togglePasswordChangedModal();
    };

    return (
        <>
            {!isHideHeader && (
                <Box
                    bg="#100526"
                    w="100%"
                    h={isMobileDevice ? "66px" : "90px" }
                    display="flex"
                    pl={["16px", "5%"]}
                    pr={["16px", "5%"]}
                    py={["0", "0", "2.5em"]}
                    alignItems="center"
                    top="0"
                    justify="space-between"
                    as="nav"
                    position="sticky"
                >
                    {isMobileDevice && (
                        <Flex w="20%" justifyContent="center">
                            <HamburgerIcon
                                color="white"
                                h="32px"
                                w="32px"
                                mr={["0", "0", "36px"]}
                                onClick={onOpen}
                            />
                        </Flex>
                    )}
                    
                    <Flex w={isMobileDevice ? "50%" : "20%" } justify={isMobileDevice ? "center" : "unset" }>
                        <Image
                            style={{ cursor: "pointer" }}
                            width={["250px", "auto", "270px", "270px", "460px"]}
                            padding={["0", "0", "10px"]}
                            height={["66px", "66px", "80px"]}
                            objectFit="contain"
                            onClick={() => router.push("/")}
                            alt="logo"
                            src="/assets/LootMogul-Logo-2.webp"
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
                            {routes.map(({ label, path, queryPath, isExternalLink }, index) => (
                                <Link
                                    _focus={{ border: "none", textDecor:"none" }}
                                    _hover={{ border: "none", textDecor:"none" }}
                                    href={isExternalLink===true ? path+paramsLogin : path}
                                    passhref="true"
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
                        justifyContent={["flex-end", "flex-end", "center"]}
                        w={isMobileDevice ? "30%" : "30%" }
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
                                        boxSize={["30px", "1.5em"]}
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
                                        boxSize={["25px", "1.3em"]}
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
                                    boxShadow="0px 0px 10px rgba(0,0,0,.3)"
                                    fontSize="15px"
                                    height={["39px", "39px", "35px", "35px"]}
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

            <Box>
                <ForgotPassword
                    isOpen={isForgotPasswordModalActive}
                    OnForgotPasswordClose={OnForgotPasswordClose}
                />
            </Box>

            <Box>
                <CheckYourMail
                    isOpen={isCheckYourMailModalActive}
                    OnCheckYourMailClose={OnCheckYourMailClose}
                />
            </Box>

            <Box>
                <ChangePassword
                    isOpen={isChangePasswordModalActive}
                    OnChangePasswordClose={OnChangePasswordClose}
                />
            </Box>

            <Box>
                <PasswordChanged
                    isOpen={isPasswordChangedModalActive}
                    OnPasswordChangedClose={OnPasswordChangedClose}
                />
            </Box>
        </>
    );
};

export default Header;
