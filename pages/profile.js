import { Box, Flex, Button, Text, FormControl, FormLabel, Input, useToast, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Link } from '@chakra-ui/react'
import { AppContext } from "../src/utils/AppContext";
import { useState, useContext, useEffect, useRef} from "react";
import moment from "moment";
import axios from "axios";
import React from 'react';
import { GridLoader } from "react-spinners";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon
} from "next-share";


const Profile = () => {
    const { user, toggleLoginModal } =
        useContext(AppContext);
    const toast = useToast();
    const referralMsg =
        "Join me on LootMogul Quiz and get a chance to win real money!";
    var jwt_token = '';
    if (typeof window !== 'undefined') {
        jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
    }
        
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
      // Display the loader when the component mounts
      const timer = setTimeout(() => {
        setShowLoader(false); // Hide the loader after 15 seconds
      }, 7000); // 7 seconds in milliseconds
  
      // Clean up the timer when the component unmounts
      return () => {
        clearTimeout(timer);
      };
    }, []); // Empty dependency array to run the effect only once
  
    
    //console.log(user);
    //console.log(jwt_token);
    const [showIFrame, setShowIFrame] = useState(true)
    const subdomain = 'lootmogul';
    const iFrameRef = useRef(null)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullName, setFullName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    var avatarRef = '';
    useEffect(() => {
        let iFrame = iFrameRef.current
        if(iFrame) {
           iFrame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`
        }
        if(user?.fullName){
            setFullName(user?.fullName);
        }
        if(user?.mobileNumber){
            setMobileNumber(user?.mobileNumber);
        }
        if(user?.ready_player_me_url){
            //setAvatarUrl(user?.photoURL)  
            setAvatarUrl(user?.ready_player_me_url);
        }
    })    

    useEffect(() => {
        window.addEventListener('message', subscribe)
        document.addEventListener('message', subscribe)
        return () => {
            window.removeEventListener('message', subscribe)
            document.removeEventListener('message', subscribe)
        }
    });
    
    function subscribe(event) {
        const json = parse(event)
        if (json?.source !== 'readyplayerme') {
          return;
        }
        // Subscribe to all events sent from Ready Player Me 
        // once frame is ready
        if (json.eventName === 'v1.frame.ready') {
          let iFrame = iFrameRef.current
          if(iFrame && iFrame.contentWindow) {
            iFrame.contentWindow.postMessage(
              JSON.stringify({
                target: 'readyplayerme',
                type: 'subscribe',
                eventName: 'v1.**'
              }),
              '*'
            );
          }
        }
        // Get avatar GLB URL
        if (json.eventName === 'v1.avatar.exported') {
          //console.log(`Avatar URL: ${json.data.url}`);
          let text = json.data.url
          //avatarRef.current.src = json.data.url
          let result = text.replace("glb", "png");
          localStorage.setItem('image3dAvtar', result);
          setAvatarUrl(text)  
          const response = axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/`+user.id,
                { photoURL: result,ready_player_me_url:text },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + jwt_token
                    }
                }
            );
              
          
          //setShowIFrame(false);
          setIsShareModalOpen(false);
          setIsShareModalOpen(false);
          window.location.reload();
        }
        // Get user id
        if (json.eventName === 'v1.user.set') {
          console.log(`User with id ${json.data.id} set:
            ${JSON.stringify(json)}`);
        }
    }

    function parse(event) {
        try {
          return JSON.parse(event.data);
        } catch (error) {
          return null;
        }
    }

    const imageChange = (e) => {        
        setIsShareModalOpen(true);
    };
    const updateProfile = () => {
        const response = axios.put(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/`+user.id,
            { 
                fullName: fullName,
                mobileNumber: mobileNumber 
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + jwt_token
                }
            }
        );
        toast({
            title: "Profile updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top-right',
            render: () => (
                <Box color='white' p={3} bg='#E90A63' borderRadius={"3px"}>
                Profile updated successfully
                </Box>
            ),
        });
    }

    const ShareModal = ({ show, handleModal }) => (
        
        <Modal
            className="rn-popup-modal share-modal-wrapper"
            isOpen={show}
            onClose={handleModal}
            centered
            dialogClassName="modal-800px"
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
            
            {show && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleModal}
                >
                    <i className="feather-x" />
                </button>
            )}
            <ModalBody>
                
                <iframe
                    allow="camera *; microphone *"
                    className="iFrame"
                    id="frame"
                    ref={iFrameRef}
                    src="https://lootmogul.readyplayer.me/avatar?frameApi"
                    style={{
                        display: `${showIFrame ? 'block': 'none'}`
                    }}
                    title={"Ready Player Me"}
                    width="100%"
                    height="600px"
                />
            </ModalBody>
            </ModalContent>
        </Modal>
    );

    return (
        <Box color='white' w="90%" m="auto" mb="5%">
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <Flex direction={"row"} w="100%">
                <Box flex='1'>
                    <Text fontSize="34px" fontFamily={"Blanch"}>Hello {user?.email}</Text>
                    <Text>This is your profile page</Text>
                </Box>
            </Flex>
            <Flex direction={["column","column","row"]} w="100%" mt="30px">
                <Box width={["100%","100%","34%"]} flex='1'mr="1%" border="2px solid #481A7F" borderRadius="8px" backgroundColor="#481A7F5C" p="30px" mt="10px">
                <Flex direction={["column","column","row"]}>    
                        {showLoader ? (   
                            <GridLoader
                                color={"#DDBF79"}
                                loading={true}
                                width={100}
                                size={30}
                            />
                        ) : (
                            <model-viewer exportparts="part_name" loading="eager" poster={avatarUrl}  id="modelviewer" alt="Ready Player Me Avatar"
                                src={avatarUrl}  shadow-intensity="1" camera-controls
                                touch-action="pan-y"
                                style={{"height":"300px"}}>
                            </model-viewer>     
                        )}                    
                        <Box mt="25px">
                            <Text fontSize="14px" fontFamily={"Sora"} fontWeight={"600"}>LootMogul ID {user?.email}</Text>
                            <Text fontWeight={"600"} pt="10px">Member Since {moment(user?.createdAt).format("YYYY, MMMM")}</Text>
                            {user?.email && (
                            <Button onClick={imageChange} fontSize={"14px"} p="20px" mt="45px" backgroundImage={"none"} backgroundColor={"#E90A63"}>Update Avatar</Button>
                            )}
                        </Box>    
                    </Flex>
                </Box>
                <Box width={["100%","100%","65%"]} border="2px solid #481A7F" borderRadius="8px" backgroundColor="#481A7F5C" p="30px" mt="10px">
                    
                    <Text fontSize="24px" fontFamily={"Sora"} fontWeight={"600"} textTransform={"uppercase"}>USER INFORMATION</Text>
                    <Flex w={"100%"} mt="20px" direction={["column","row"]}>
                        <Box mr="20px" w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={["16px","21px"]}>Username</FormLabel>
                                <Input isReadOnly value={user?.username} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Username' backgroundColor="#fff" />
                            </FormControl>
                        </Box> 
                        <Box w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={["16px","21px"]}>Email address</FormLabel>
                                <Input isReadOnly value={user?.email} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Email address' backgroundColor="#fff" />
                            </FormControl>
                        </Box>    
                    </Flex>
                    <Flex w={"100%"} mt={["0px","20px"]} direction={["column","row"]}>
                        <Box mr="20px" w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={["16px","21px"]}>Full name</FormLabel>
                                <Input 
                                value={fullName} 
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Full name' backgroundColor="#fff" />
                            </FormControl>
                        </Box> 
                        <Box w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={["16px","21px"]}>Mobile</FormLabel>
                                <Input 
                                value={mobileNumber}
                                onChange={(e) => {
                                    setMobileNumber(e.target.value);
                                }}
                                w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Mobile Number' backgroundColor="#fff" />
                            </FormControl>
                        </Box>   
                    </Flex> 
                    <Flex w={"100%"} mt={["0px","20px"]} direction={["column","column","row"]}> 
                        <Box mr="20px" w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={["16px","21px"]}>Referral Code</FormLabel>
                                <Box position={"relative"}>
                                    <Input isReadOnly value={user?.referral_code.code} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Referral Code' backgroundColor="#fff" />
                                    <Button
                                        borderRadius="4px"
                                        fontSize={["15px", "15px", "15px", "15px", "21px"]}
                                        onClick={() => {
                                            if (!user) toggleLoginModal();
                                            else {
                                                navigator.clipboard.writeText(
                                                    user.referral_code?.code
                                                );
                                                toast({
                                                    title: "Referral code Copied",
                                                    status: "success",
                                                    duration: 3000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                    render: () => (
                                                        <Box color='white' p={3} bg='#E90A63' borderRadius={"3px"}>
                                                        Referral code Copied
                                                        </Box>
                                                    ),
                                                });
                                            }
                                        }}
                                        position={"absolute"}
                                        top={"0"}
                                        right={"0"}
                                        margin={"0"}
                                        w={"35%"}
                                        h={"45px"}
                                        p="6px"
                                        border={"1px solid"}
                                        fontWeight={"400"}
                                        backgroundImage={"none"} backgroundColor={"#E90A63"}
                                    >
                                        {user ? "Copy Code" : "Login"}{" "}
                                    </Button>
                                </Box>
                                
                                {user && (
                            <>
                               
                                <Flex
                                    my="15px"
                                    justify={"flex-start"}
                                >
                                     <Text
                                    mt={["15px", "0px"]}
                                    textTransform="capitalize"
                                    variant="textualVal"
                                    color="white"
                                    fontSize={["14px", "17px"]}
                                    style={{"padding-right":"10px"}}
                                >
                                    Share Code
                                </Text>
                                    <Link
                                        borderRadius="4px"
                                        textTransform="uppercase"
                                        fontSize={["15px", "15px", "15px", "15px", "23px"]}
                                        onClick={() => {
                                            if (!user) toggleLoginModal();
                                            else {
                                                navigator.clipboard.writeText(
                                                    process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                    user.referral_code?.code
                                                );
                                                toast({
                                                    title: "Referral link Copied",
                                                    status: "success",
                                                    duration: 3000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                    render: () => (
                                                        <Box color='white' p={3} bg='#E90A63' borderRadius={"3px"}>
                                                        Referral link Copied
                                                        </Box>
                                                    ),
                                                });
                                            }
                                        }}
                                        style={{"padding-right":"10px"}}
                                    >
                                        <svg width="40" height="40" viewBox="-3.6 -3.6 31.20 31.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#E90A63"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-3.6" y="-3.6" width="31.20" height="31.20" rx="15.6" fill="#E90A63" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.50244 3.0025C4.56944 3.0025 3.00244 4.56951 3.00244 6.5025V12.5025C3.00244 14.4355 4.56944 16.0025 6.50244 16.0025H6.99853V14.0025H6.50244C5.67401 14.0025 5.00244 13.3309 5.00244 12.5025V6.5025C5.00244 5.67408 5.67401 5.0025 6.50244 5.0025H12.5024C13.3309 5.0025 14.0024 5.67408 14.0024 6.5025V12.5025C14.0024 13.3309 13.3309 14.0025 12.5024 14.0025H10.9957V16.0025H12.5024C14.4354 16.0025 16.0024 14.4355 16.0024 12.5025V6.5025C16.0024 4.56951 14.4354 3.0025 12.5024 3.0025H6.50244Z" fill="#fff"></path> <path d="M10 11.5C10 10.6716 10.6716 10 11.5 10H12.9988V8H11.5C9.567 8 8 9.567 8 11.5V17.5C8 19.433 9.567 21 11.5 21H17.5C19.433 21 21 19.433 21 17.5V11.5C21 9.567 19.433 8 17.5 8H17.0049V10H17.5C18.3284 10 19 10.6716 19 11.5V17.5C19 18.3284 18.3284 19 17.5 19H11.5C10.6716 19 10 18.3284 10 17.5V11.5Z" fill="#fff"></path> </g></svg>
                                    </Link>
                                    <TwitterShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                        style={{"padding-right":"10px"}}
                                    >
                                        <svg style={{ background: '#000', padding: '5px', borderRadius: '50%',color: '#fff' }} width="45" height="42" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" className="r-k200y r-18jsvk2 r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                        style={{"padding-right":"10px"}}
                                    >
                                        <WhatsappIcon size={40} round />
                                    </WhatsappShareButton>

                                    <FacebookShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        quote={referralMsg}
                                        style={{"padding-right":"10px"}}
                                    >
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>
                                </Flex>
                            </>
                        )}
                            </FormControl>
                        </Box>
                        <Box w={"100%"}>
                            <FormControl>
                            
                            <Button
                                borderRadius="4px"
                                fontSize={["15px", "15px", "15px", "15px", "21px"]}
                                w={"100%"}
                                h={"45px"}
                                p="6px"
                                fontWeight={"400"}
                                backgroundImage={"none"} backgroundColor={"#E90A63"}
                                onClick={() => {
                                    if (!user) toggleLoginModal();
                                    else {
                                     updateProfile()
                                    }
                                }}
                                mt={["20px","20px","40px"]}
                            >
                                {user ? "Update" : "Login"}{" "}
                            </Button>
                            </FormControl>
                        </Box>    
                    </Flex> 
                </Box>
            </Flex>
            {/*<Box mt={["15px", "15px"]} width="100%">
            <Flex
                direction={["column", "column", "column", "row", "row"]}
                width="100%"
                borderRadius={"md"}
                border="2px solid #481A7F"
                m="auto"
            >
                
                <Box
                    width={["100%","100%","100%","100%", "100%"]}
                    textAlign={["center", "left"]}
                    p={["20px", "20px", "20px", "25px"]}
                    background="#481A7F5C 0% 0% no-repeat padding-box;"
                >
                    <Text 
                        variant="referHead"
                        fontSize={["40px", "40px", "40px", "34px", "55px"]}
                        lineHeight={["40px", "40px", "40px", "30px","50px"]}
                        fontWeight="normal"
                        fontFamily="Blanch">
                         Make it more Exciting! Challenge <br/>your friends & family
                    </Text>
                    <Text mt="15px" variant="referDesc" fontSize={["15px", "17px"]} lineHeight={["18px","23px"]} w={["100%","100%","100%","100%","80%"]}>
                        Lootmogul.com brings you the best incentive that
                        friendship can offer. Bond over your love for Online
                        Sports Trivia along with your friends. Earn cash, Refer
                        your Friends NOW.
                    </Text>
                    <Box
                        pl={["15px", "25px"]}
                        pr={["15px", "25px"]}
                        mt={["30px", "10px"]}
                        border="2px dashed #E8E8E8"
                        borderRadius="4px"
                        
                    >
                        <Text
                            mt={["10px", "10px"]}
                            fontFamily="Sora"
                            fontSize={["14px", "17px"]}
                            color="#E8E8E8"
                            
                        >
                            {" "}
                            Your Referal Code
                        </Text>
                        <Flex
                            mt={"10px"}
                            mb={"20px"}
                            borderRadius="4px"
                            justifyContent={"space-between"}
                            backgroundColor="#fff"
                            width="100%"
                            direction={["column", "column", "row", "row", "row"]}
                        >
                            <Text
                                px={["15px", "15px", "15px", "15px", "50px"]}
                                py={"10px"}
                                color="#481A7F"
                                fontSize={["15px", "20px", "20px", "20px", "26px"]}
                                fontWeight="700"
                            >
                                {user
                                    ? user.referral_code?.code
                                    : "Log in for referal code"}
                            </Text>
                            <Button
                                borderRadius="4px"
                                textTransform="uppercase"
                                fontSize={["15px", "15px", "15px", "15px", "23px"]}
                                onClick={() => {
                                    if (!user) toggleLoginModal();
                                    else {
                                        navigator.clipboard.writeText(
                                            user.referral_code?.code
                                        );
                                        toast({
                                            title: "Copied to clipboard",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true
                                        });
                                    }
                                }}
                            >
                                {user ? "Copy your code" : "Login"}{" "}
                            </Button>
                        </Flex>
                        {user && (
                            <>
                                {" "}
                                <Text
                                    mt={["15px", "0px"]}
                                    textTransform="capitalize"
                                    variant="textualVal"
                                    color="white"
                                    fontSize={["14px", "17px"]}
                                >
                                    Share your link
                                </Text>
                                <Flex
                                    my="15px"
                                    justify={"space-evenly"}
                                    width={["100%", "80%", "80%", "15%"]}
                                    
                                >
                                    <RedditShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <RedditIcon size={40} round />
                                    </RedditShareButton>

                                    <TwitterShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <WhatsappIcon size={40} round />
                                    </WhatsappShareButton>

                                    <FacebookShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        quote={referralMsg}
                                    >
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>

                                    
                                    
                                    
                                </Flex>
                            </>
                        )}
                    </Box>
                </Box>
            </Flex>
                                </Box>*/}
        </Box>
    );
};
export default Profile;