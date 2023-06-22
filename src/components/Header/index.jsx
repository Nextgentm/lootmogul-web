import { useContext, useState } from "react";
import {
    Link,
    Box,
    Button,
    Text,
    Flex,
    useDisclosure,
    Image
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AppContext } from "../../utils/AppContext";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";
import SessionTimeout from "../../features/SessionTimeout/SessionTimeout";
import {
    loginBtnStyle,
    loginStyle,
    navLinksStyle,
    communityStyle,
    versionStyle
} from "./styles";
import { HamburgerIcon } from "@chakra-ui/icons";
const Login = dynamic(() => import("../../features/Login"));
const ForgotPassword = dynamic(() => import("../../features/ForgotPassword"));
const CheckYourMail = dynamic(() => import("../../features/CheckYourMail"));
const ChangePassword = dynamic(() => import("../../features/ChangePassword"));
const PasswordChanged = dynamic(() => import("../../features/PasswordChanged"));
import NavDrawer from "./NavDrawer/index";
import AutoLogout from "../AutoLogout";
import CountDown from "./Countdown/index";

import CookieConsent from "react-cookie-consent";

const routes = [
    {
        label: "Home",
        path: process.env.NEXT_PUBLIC_WORDPRESS_URL+"/home",
        isExternalLink: true,
        imageUrl: "/assets/MobileMenuIcons/Home-icon.png",
        activeImageUrl: "/assets/MobileMenuIcons/Home-icon-active.png"
    },

    {
        label: "Metaverse",
        path: process.env.NEXT_PUBLIC_WORDPRESS_URL+"/metaverse/",
        isExternalLink: true,
        imageUrl: "/assets/MobileMenuIcons/Metaverse-icon.png",
        activeImageUrl: "/assets/MobileMenuIcons/Metaverse-icon-active.png"
    },
    {
        label: "AMBASSADORS",
        path: "/influencers",
        queryPath: "/influencer/[id]",
        isExternalLink: false,
        imageUrl: "/assets/MobileMenuIcons/Ambassadors-icon.png",
        activeImageUrl: "/assets/MobileMenuIcons/Ambassadors-icon-active.png"
    },
    {
        label: "Collectibles",
        path: "/nfts",
        isExternalLink: false,
        imageUrl: "/assets/MobileMenuIcons/digitalcollectibles.png",
        activeImageUrl: "/assets/MobileMenuIcons/digitalcollectibles_active.png"
    },
    {
        label: "Games",
        path: "/games",
        isExternalLink: false,
        imageUrl: "/assets/MobileMenuIcons/Games-icon.png",
        activeImageUrl: "/assets/MobileMenuIcons/Games-icon-active.png"
    },
    {
        label: "Explore",
        path: process.env.NEXT_PUBLIC_WORDPRESS_URL+"/meta-map/",
        isExternalLink: true,
        imageUrl: "/assets/MobileMenuIcons/Explore-icon.png",
        activeImageUrl: "/assets/MobileMenuIcons/Explore-icon-active.png"
    }
];
let paramsLogin = "";

const Header = () => {
    const {
        user,
        isMobileDevice,
        isLoginModalActive,
        isForgotPasswordModalActive,
        isCheckYourMailModalActive,
        isChangePasswordModalActive,
        isPasswordChangedModalActive,
        jwt
    } = useContext(AppContext);
    const { isHideHeader } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    const isActiveLink = (path, queryPath) => {
        //TODO: need to check what condition is this and remove the proper statements
        if (queryPath)
            //console.log(path.split("/")[1], router.pathname.split("/")[1])
            return path.split("/")[1] === router.pathname.split("/")[1] || queryPath === router.pathname;
        return path == router.pathname.split("/")[1];
    };

    const {
        toggleLoginModal,
        toggleForgotPasswordModal,
        toggleCheckYourMailModal,
        toggleChangePasswordModal,
        togglePasswordChangedModal
    } = useContext(AppContext);

    if (typeof window !== "undefined") {
        const jwt_token = window.localStorage?.getItem("strapi_jwt");
        if(jwt_token !== null){
            paramsLogin = '';
            //paramsLogin = "?jwt=" +jwt_token;
        }
        else{
            paramsLogin = '';
        }
         
    }

    const setMobileIcons = (isActiveLink, imageUrl, activeImageUrl) => {
        return isActiveLink ? activeImageUrl : imageUrl;
    };

    const renderMobileRoutes = () => (
        <Flex direction="column" mt={["20px", "20px", "30px"]}>
            {routes.map(
                (
                    {
                        label,
                        path,
                        queryPath,
                        isExternalLink,
                        imageUrl,
                        activeImageUrl
                    },
                    index
                ) => (
                    <Link
                        href={
                            isExternalLink === true ? path + paramsLogin : path
                        }
                        passhref="true"
                        _focus={{ border: "none" }}
                        key={`route-${index}`}
                        _hover={{ textDecoration: "none" }}
                    >
                        <Flex>
                            <Image
                                marginRight="15px"
                                marginTop="18px"
                                alt="social"
                                width={["28px"]}
                                height={["23px"]}
                                src={setMobileIcons(
                                    isActiveLink(path, queryPath),
                                    imageUrl,
                                    activeImageUrl
                                )}
                            />
                            <a onClick={onClose}>
                                <Text
                                    cursor="pointer"
                                    {...navLinksStyle(
                                        isActiveLink(path, queryPath)
                                    )}
                                    p="5px 0"
                                    fontSize="42px"
                                    lineHeight="42px"
                                    _hover={{
                                        transform: "scale(1)",
                                        textDecoration: "none",
                                        color: "#e90a63"
                                    }}
                                >
                                    {label}
                                </Text>
                            </a>
                        </Flex>
                    </Link>
                )
            )}
            <Text
                {...communityStyle(false)}
                _hover={{
                    transform: "scale(1)",
                    textDecoration: "none",
                    color: "#e90a63"
                }}
                fontSize="42px"
                lineHeight="42px"
                marginBottom="10px"
            >
                COMMUNITY
            </Text>
            <Flex>
                <Link href='https://discord.gg/mHUqAm8fsh' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="discord"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/discord-white.svg"
                />
                </Link>
                <Link href='https://t.me/LootMogulcommunitychat' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="telegram"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/telegram-white.svg"
                />
                </Link>
                <Link href='https://twitter.com/LootMogul' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="twitter"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/twitter-white.svg"
                />
                </Link>
                <Link href='https://www.instagram.com/lootmogul/?hl=en' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="instagram"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/instagram-white.svg"
                />
                </Link>   
                <Link href='https://www.facebook.com/LootMogul/' isExternal _focus={{boxShadow:"none"}}>           
                <Image
                    marginRight="15px"
                    alt="facebook"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/facebook-white.svg"
                />
                </Link>
                <Link href='https://www.youtube.com/@lootmogul' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="youtube"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/youtube-white.svg"
                />
                </Link>
                <Link href='https://lootmogul.medium.com/' isExternal _focus={{boxShadow:"none"}}>
                <Image
                    marginRight="15px"
                    alt="youtube"
                    boxSize={["20px", "20px"]}
                    src="/assets/CommunityIcons/medium-icon-white.svg"
                />
                </Link>
            </Flex>
            <Text
            {...versionStyle(false)}
            _hover={{
                transform: "scale(1)",
                textDecoration: "none",
                color: "#e90a63"
            }}
            fontSize="32px"
            lineHeight="32px"
            marginTop="35px"
            >
                Version 2.0.6
            </Text>
            
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

    const [annoucementBar, setaAnnoucementBar] = useState(false);
    const onAnnoucementClick = () => setaAnnoucementBar(false)

    return (
        <>
            {!isHideHeader && (
                <Box
                    bg="#100526"
                    w="100%"
                    h={isMobileDevice ? "66px" : "90px"}
                    display="flex"
                    pl={["16px", "5%"]}
                    pr={["16px", "5%"]}
                    py={["0", "0", "2.5em"]}
                    alignItems="center"
                    top="0"
                    justify="space-between"
                    as="nav"
                    position="sticky"
                    zIndex={"101"}
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

                    <Flex
                        w={isMobileDevice ? "50%" : "20%"}
                        justify={isMobileDevice ? "center" : "unset"}
                    >
                        <Image
                            style={{ cursor: "pointer" }}
                            width={["250px", "auto", "270px", "270px", "460px"]}
                            padding={["0", "0", "10px"]}
                            height={["66px", "66px", "80px"]}
                            objectFit="contain"
                            onClick={() => router.push(process.env.NEXT_PUBLIC_WORDPRESS_URL)}
                            alt="logo"
                            src="/assets/Final-Logo-Full.png"
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
                            {routes.map(
                                (
                                    { label, path, queryPath, isExternalLink },
                                    index
                                ) => (
                                    <Link
                                        _focus={{
                                            border: "none",
                                            textDecor: "none"
                                        }}
                                        _hover={{
                                            border: "none",
                                            textDecor: "none"
                                        }}
                                        href={
                                            isExternalLink === true
                                                ? path + paramsLogin
                                                : path
                                        }
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
                                )
                            )}
                        </Flex>
                    )}

                    <Flex
                        {...loginStyle(isMobileDevice, user)}
                        alignItems="center"
                        justifyContent={["flex-end", "flex-end", "center"]}
                        w={isMobileDevice ? "30%" : "30%"}
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
                        {!user && router.route != "/gamecampaign"  && (
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
                            <UserInfo
                                user={user}
                                isMobileDevice={isMobileDevice}
                            />
                        )}
                    </Flex>

                    {/* {user && (
                        <UserInfo user={user} isMobileDevice={isMobileDevice} />
                    )} */}
                </Box>
                
            )}
            {!isHideHeader && annoucementBar && ( 
                <Box
                    bg="#1e052c"
                    w="100%"
                    h={isMobileDevice ? "auto" : "auto"}
                    display="flex"
                    pl={["16px", "5%"]}
                    pr={["16px", "0%"]}
                    alignItems="center"
                    top={["65px","60px","90px", "90px"]}
                    justify="space-between"
                    as="nav"
                    position="sticky"
                    zIndex={"9"}
                    backgroundImage="/assets/bg-bar.png"
                    backgroundSize="cover"
                    display={['block','block','flex','flex']}
                >
                    {!isMobileDevice ?
                         <>
                         <Flex
                            w={isMobileDevice ? "100%" : "20%"}
                            justify={isMobileDevice ? "left" : "unset"}
                            display={['inline-block','inline-block','flex','flex']}
                        >   <CountDown/>
                            
                        </Flex>
                        <Flex
                            w={isMobileDevice ? "100%" : "70%"}
                            justify={isMobileDevice ? "left" : "center"}
                            display={['inline-block','inline-block','flex','flex']}
                        >
                            <Text fontSize={["12px","12px","15px","15px"]} color="#fff" p={["5px","5px","15px","15px"]}><a target="_blank" href="https://lootmogul.me/republic_website">Become a Stakeholder in LootMogul! minimum investment $100.</a> <a style={{textDecoration:'underline'}} target="_blank" href="https://lootmogul.me/republic_website">Learn More</a></Text>
                        </Flex>
                        </>   
                    :
                    <>
                        <Flex
                            w={isMobileDevice ? "100%" : "70%"}
                            justify={isMobileDevice ? "left" : "center"}
                            display={['inline-block','inline-block','flex','flex']}
                        >
                                <Box pt="10px">
                                <CountDown/>
                                </Box>
                                
                            <Text fontSize={["12px","12px","15px","15px"]} color="#fff" p={["5px","5px","15px","15px"]}><a target="_blank" href="https://lootmogul.me/republic_website"> Become a Stakeholder in LootMogul! minimum investment $100.</a> <a style={{textDecoration:'underline'}} target="_blank" href="https://lootmogul.me/republic_website">Learn More</a></Text>
                        </Flex>
                    </>   
                    }
                    <Flex
                        w={isMobileDevice ? "100%" : "30%"}
                        justify={isMobileDevice ? "center" : "end"}
                    >
                        <Text fontSize={["12px","12px","15px","15px"]} color="#fff" mb="5px" p={["5px 10px","5px 10px","5px 20px","5px 20px"]} border="1px solid #fff" borderRadius="5px">
                        <a target="_blank" href="https://lootmogul.me/republic_website">Invest Now</a></Text>
                    </Flex>
                    
                    {!isMobileDevice ?
                         <>
                            <Flex
                                w={isMobileDevice ? "15%" : "5%"}
                                justify={isMobileDevice ? "center" : "center"}
                                bg="#977fa0"
                                ml="2%"
                                cursor="pointer"
                            >
                                <Text fontSize={["12px","12px","15px","15px"]} color="#000"  mb={["0px","0px","5px"]} p={["5px","5px","15px"]} textAlign="center" onClick={onAnnoucementClick}>
                                X</Text>
                            </Flex>
                        </>
                        : <></>
                    }
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
            {/* <SessionTimeout /> */}
            {/* <AutoLogout /> */}

            {!isHideHeader && (
                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    cookieName="CookieLawInfoConsent"
                    style={{ background: "#100026", fontSize: "45px",fontFamily:"Blanch",lineHeight:"50px" }}
                    buttonStyle={{ color:"#fff", background: "#e90a63", fontSize: "25px",lineHeight:"1", width:"100px" }}
                    expires={365}
                    >
                    We value your privacy
                    {" "}
                    <br/><span style={{ fontSize: "25px",width:"75%",display:"block",lineHeight:"25px" }}>We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept”, you consent to the use of ALL the cookies.</span>
                </CookieConsent>
            )}
            </>
    );
};

export default Header;
