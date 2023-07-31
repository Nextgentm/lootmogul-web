import { Box, Flex, Button, Text, FormControl, FormLabel, Input, useToast, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton } from '@chakra-ui/react'
import { AppContext } from "../src/utils/AppContext";
import { useState, useContext, useEffect, useRef} from "react";
import moment from "moment";
import axios from "axios";
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
    console.log(user);
    const [showIFrame, setShowIFrame] = useState(true)
    const subdomain = 'lootmogul';
    const iFrameRef = useRef(null)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);

    useEffect(() => {
        let iFrame = iFrameRef.current
        if(iFrame) {
           iFrame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`
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
          console.log(`Avatar URL: ${json.data.url}`);
          let text = json.data.url
          let result = text.replace("glb", "png");
          localStorage.setItem('image3dAvtar', result);
          try {
            const response = axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/`+user.id,
                {
                    body: JSON.stringify({ photoURL: result,ready_player_me_url:text }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + router.query.jwt
                    }
                }
            );
            console.log(response);    
        } catch (error) {}
          //setAvatarUrl(result)
          setShowIFrame(false);
          setIsShareModalOpen(false);
          setIsShareModalOpen(false);
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
        <Box color='white' w="90%" m="auto">
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
            <Flex direction={"row"} w="100%" mt="30px">
                <Box width="34%" flex='1'mr="1%" border="2px solid #481A7F" borderRadius="8px" backgroundColor="#481A7F5C" p="30px">
                    <Flex>
                        <Text fontSize="34px" fontFamily={"Blanch"}>Hello {user?.email}</Text>
                        <Box>
                            <Text fontSize="14px" fontFamily={"Sora"} fontWeight={"600"}>LootMogul ID {user?.email}</Text>
                            <Text fontWeight={"600"} pt="10px">Member Since {moment(user?.createdAt).format("YYYY, MMMM")}</Text>
                            {user?.email && (
                            <Button onClick={imageChange} fontSize={"14px"} p="20px" mt="15px" backgroundImage={"none"} backgroundColor={"#E90A63"}>Update Avatar</Button>
                            )}
                        </Box>    
                    </Flex>
                </Box>
                <Box width="65%" border="2px solid #481A7F" borderRadius="8px" backgroundColor="#481A7F5C" p="30px">
                    
                    <Text fontSize="24px" fontFamily={"Sora"} fontWeight={"600"} textTransform={"uppercase"}>USER INFORMATION</Text>
                    <Flex w={"100%"} mt="20px">
                        <Box mr="20px" w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={"21px"}>Username</FormLabel>
                                <Input isReadOnly value={user?.username} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Username' backgroundColor="#fff" />
                            </FormControl>
                        </Box> 
                        <Box w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={"21px"}>Email address</FormLabel>
                                <Input isReadOnly value={user?.email} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Email address' backgroundColor="#fff" />
                            </FormControl>
                        </Box>    
                    </Flex>
                    <Flex w={"100%"} mt="20px">
                        <Box mr="20px" w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={"21px"}>Full name</FormLabel>
                                <Input isReadOnly value={user?.fullName} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Full name' backgroundColor="#fff" />
                            </FormControl>
                        </Box> 
                        <Box w={"100%"}>
                            <FormControl>
                                <FormLabel fontSize={"21px"}>Referral Code</FormLabel>
                                <Input isReadOnly value={user?.referral_code.code} w="100%" h="45px" color={"#111"} fontFamily="Sora" fontSize={"16px"} placeholder='Referral Code' backgroundColor="#fff" />
                            </FormControl>
                        </Box>    
                    </Flex> 
                </Box>
            </Flex>
            <Box mt={["15px", "15px"]} width="100%">
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
                                    width={["100%", "80%", "80%", "35%"]}
                                    
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

                                    <FacebookMessengerShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <FacebookMessengerIcon
                                            size={40}
                                            round
                                        />
                                    </FacebookMessengerShareButton>
                                    
                                    
                                </Flex>
                            </>
                        )}
                    </Box>
                </Box>
            </Flex>
        </Box>
        </Box>
    );
};
export default Profile;