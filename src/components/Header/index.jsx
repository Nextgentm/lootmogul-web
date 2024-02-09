import { useContext, useState, useEffect } from "react";
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
        path: process.env.NEXT_PUBLIC_WORDPRESS_URL+"/collectibles",
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

    const [email, setEmail] = useState('')

    /*useEffect(() => {    
        if(router.pathname){
            //console.log('Page ',router.pathname);
            clevertap.event.push("Page Request",{
                "Page":router.pathname,
            });
        }
    },[router]);*/

    const isActiveLink = (path, queryPath) => {
        //TODO: need to check what condition is this and remove the proper statements
        //if (queryPath)
            //console.log(path.split("/")[1], router.pathname.split("/")[1])
            return path.split("/")[1] === router.pathname.split("/")[1] || queryPath === router.pathname;
        /*return path == router.pathname.split("/")[1];*/
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
            <Flex display={"flex"} alignItems={"center"}>
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
                    boxSize={["18px", "18px"]}
                    src="/assets/CommunityIcons/twitter-white-new.svg"
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
                <Link href='https://www.threads.net/@lootmogul' isExternal _focus={{boxShadow:"none"}} marginRight="15px">
                <svg  className='twitter' height="20" display={"flex"} fill='#fff' width="20px" aria-label="Threads" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><path class="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>
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

    const OnForgotPasswordClose = async () => toggleForgotPasswordModal();
    

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
                  {!user && ( router.route != "/gamecampaign" && router.route !="/cricket" &&  router.route != "/dsg" && router.route !=  "/thanksgiving-campaign" && router.route != "/signupcampaign")  && (
                            <>
                                <Button
                                    {...loginBtnStyle}
                                    fontFamily="Sora !important "
                                    fontWeight="500"
                                    onClick={toggleLoginModal}
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

                        {!user && ( router.route == "/dsg" && isMobileDevice)  && (
                            <>
                                <Button
                                    {...loginBtnStyle}
                                    fontFamily="Sora !important "
                                    fontWeight="500"
                                    onClick={toggleLoginModal}
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
                    OnLoginClose={toggleLoginModal}
                />
            </Box>

            <Box>
                <ForgotPassword
                    isOpen={isForgotPasswordModalActive}
                    onClose={toggleForgotPasswordModal}
                    email={email}
                    setEmail={setEmail}
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
                    forgotEmail={email}
                    isOpen={isChangePasswordModalActive}
                    onClose={OnChangePasswordClose}
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

            {!isHideHeader &&  router.route !="/cricket" && router.route !="/dsg" && (
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
