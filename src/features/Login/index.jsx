import { useState, useContext, useEffect } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useGoogleLogin } from "react-google-login";
import {
    Flex,
    Text,
    Box,
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Image,
    FormControl,
    Input,
    AlertDialog,
    AlertDialogBody,
    Heading,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    InputGroup,
    InputRightElement,
    ModalCloseButton
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";
import { TriangleDownIcon, TriangleUpIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router';
import axios from "axios";
import Loader from "../../components/Loader";

const Login = ({ isOpen, OnLoginClose, redirectUrl }) => {
    const { callAuthService, callCustomAuthService, setLoginModalActive, toggleForgotPasswordModal ,loggingIn, setLoggingIn } = useContext(AppContext);

    const [selectedOption, setSelectedOption] = useState("login");
    const [showPassword, setShowPassword] = useState(false)
    const [inputEmailId, setInputEmailId] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputReferalCode, setInputReferalCode] = useState('');
    const [validReferalCode, setValidReferalCode] = useState();

    const router = useRouter();
    const {referral_code } = router.query;
    const { isMobileDevice } = useContext(AppContext);
    var strapi_jwt = '';
    var referral_code_storage = '';
    if (typeof window !== 'undefined') {
        strapi_jwt = window.localStorage.getItem("strapi_jwt");
        referral_code_storage = window.localStorage.getItem("referral_code");
        
    }
    
    

    if(referral_code && strapi_jwt ===  null){
        isOpen = true;
    } 
    useEffect(() => {
        if(referral_code_storage){
            setInputReferalCode(referral_code_storage);
        }

        if(referral_code){
            setInputReferalCode(referral_code);
        }
        
    }, [referral_code, referral_code_storage]);

    useEffect(() => {
        const setValidReferalCodeAPI = async () => {
            try {
                const resp = await axios.get(
                    process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    `/api/referral-codes/referralCodeByCodeName/`+inputReferalCode,
                );
                const {data} = resp;
                setValidReferalCode(data);
                if(inputReferalCode == ''){
                    setValidReferalCode(null);
                }
            } catch (error) {
    
            }
          };
          if(inputReferalCode != ''){
            setValidReferalCodeAPI();
          }
          else{
            setValidReferalCode(null);
          }
          
    }, [inputReferalCode]);

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        onRequest: () => setLoggingIn(true),
        onFailure: () => setLoggingIn(false),
        onSuccess: (data) => {
            callAuthService("google", data.accessToken, inputReferalCode);
        }
    });

    const loginWidGoogle = (e) => {
        if (loggingIn) return
        signIn(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (loggingIn) return
        const formData = {
            username: inputEmailId,
            email: inputEmailId,
            password: inputPassword,
            referalcode: inputReferalCode
        }
        if (selectedOption == 'signup' && inputReferalCode != '') {
            if(validReferalCode == true){
                callCustomAuthService(formData, selectedOption, redirectUrl);
                if (selectedOption == 'signup' && inputEmailId && inputPassword) {
                    setSelectedOption('login');
                    setInputReferalCode('');
                }
            }
        }
        else{
            callCustomAuthService(formData, selectedOption, redirectUrl);
            setInputReferalCode('');
            if (selectedOption == 'signup' && inputEmailId && inputPassword) {
                setSelectedOption('login');
            }
        }
        
    }


    const [checked, setChecked] = useState(true);
    const [alertMsg, setAlertMsg] = useState({});
    const ShowAlert = () => {
        return (
            <AlertDialog
                isOpen={alertMsg?.isOpen}
                motionPreset="slideInBottom"
                isCentered
                size={"xl"}
                bg="background"
                closeOnOverlayClick={true}
                closeOnEsc={true}
                onClose={() => {
                    setAlertMsg({});
                }}
            >
                <AlertDialogOverlay />

                <AlertDialogContent p="10px" bg="background">
                    <Box border="2.7033px dashed #515151">
                        <AlertDialogHeader>
                            <Heading color="white">{alertMsg?.title}</Heading>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text variant="hint">{alertMsg?.message}</Text>
                        </AlertDialogBody>
                    </Box>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    const toggleReferral = () =>{
        setChecked(!checked)
    }
    
    return (
        <Modal isOpen={isOpen} onClose={OnLoginClose} scrollBehavior="inside">
            <ModalOverlay />

            <ModalContent
                rounded={5}
                mt={["100px", "100px"]}
                marginTop={["90px", "60px", "70px", "120px"]}
                marginLeft={["0%", "0%", "60%", "70%"]}
                width={["355px"]}
                bg={"#4C69BA"}
                borderRadius="14"
                background="transparent"
            >
                {isMobileDevice && !loggingIn && 
                <>
                    <ModalCloseButton
                        color="#fff"
                        background="transparent linear-gradient(90deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box"
                        borderRadius="full"
                        outline="#303030"
                        boxShadow="inset 0px 3px 18px #481A7F73, 0px 0px 20px #FF0080CF"
                        zIndex={"9999999"}
                    />
                </>
                }
                <ModalBody>
                    <Flex
                        zIndex={999999}
                        {...root}
                        pos="relative"
                        backgroundColor="#1a0629"
                        borderRadius="10px"
                    >
                        <Box
                            zIndex={999}
                            border="7px solid #5f2593"
                            borderRadius="10px"
                        >
                            <Flex
                                pt={["0px", "0px", "0px", "5px"]}
                                px="20px"
                                pb="20px"
                                direction={"column"}
                                zIndex={999}
                                align="center"
                            >
                                <Text
                                    fontSize={["38px", "38px"]}
                                    fontWeight="bold"
                                    my="5%"
                                    {...loginTitleStyle}
                                >
                                    {selectedOption === "login" ? "LOGIN" : "SIGNUP"}
                                </Text>

                                <Button
                                    mt="2%"
                                    mb="2%"
                                    leftIcon={
                                        <Image
                                            alt="google"
                                            width="20px"
                                            height="20px"
                                            src={"/assets/Google.svg"}
                                        />
                                    }
                                    backgroundColor="#FFF"
                                    color="black"
                                    variant="login"
                                    onClick={loginWidGoogle}
                                    onFailure={() => setLoggingIn(false)}
                                    isDisabled = {validReferalCode == false  ? true : false }
                                    _hover={{backgroundColor:"#fff"}}
                                >
                                    {selectedOption === "login" ? "Login" : "Signup"} with Google
                                </Button>

                                {<FacebookLogin
                                    appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
                                    callback={({ accessToken }) => {
                                        callAuthService( "facebook", accessToken, inputReferalCode );
                                    }}
                                    onFailure={() => setLoggingIn(false)}
                                    disableMobileRedirect={true}
                                    render={(renderProps) => (
                                        <Button
                                            mt="2%"
                                            mb="2%"
                                            leftIcon={
                                                <Image
                                                    alt="google"
                                                    width={"20px"}
                                                    height={"20px"}
                                                    src={"/assets/FB.svg"}
                                                />
                                            }
                                            onClick={(e) => {
                                                if (loggingIn) return
                                                setLoggingIn(true)
                                                renderProps.onClick(e)
                                            }}
                                            backgroundColor="#FFF"
                                            color="black"
                                            variant="login"
                                            isDisabled = {validReferalCode == false  ? true : false }
                                            _hover={{backgroundColor:"#fff"}}
                                        >
                                            {selectedOption === "login" ? "Login" : "Signup"} with Facebook
                                        </Button>
                                    )}
                                />
                                }
                                {selectedOption != "login" && (
                                <Box w="100%">
                                    <Text
                                        my="5px"
                                        textAlign="left"
                                        fontFamily="Open Sans,Sans-serif"
                                        color="white"
                                        fontWeight="500"
                                        fontSize={["12px", "13px"]}
                                    >
                                        Referral Code (Optional) 
                                        <IconButton
                                            backgroundImage="none"
                                            backgroundColor="transparent"
                                            boxShadow="none"
                                            aria-label='Search database'
                                            icon={checked ? <TriangleUpIcon boxSize={3.5} /> : <TriangleDownIcon boxSize={3.5} />}
                                            p="4px"
                                            _hover={{backgroundImage:"none",backgroundColor:"transparent"}}
                                            _active={{backgroundImage:"none",backgroundColor:"transparent"}}
                                            _focus={{backgroundImage:"none",backgroundColor:"transparent"}}
                                            onClick={toggleReferral}
                                        />

                                    </Text>
                                    {checked && ( <FormControl>
                                        <InputGroup>
                                            <Input
                                                id="referral_code"
                                                name="referral_code"
                                                type="text"
                                                placeholder="Referral Code"
                                                bgColor="#fff"
                                                color="#707070"
                                                _placeholder={{ color: "#707070" }}
                                                required
                                                boxShadow="unset"
                                                p="6px 10px"
                                                border="1px solid #707070 !important"
                                                height="35px"
                                                _focus={{ outline: "0" }}
                                                value={inputReferalCode}
                                                onChange={(e) => setInputReferalCode(e.target.value)}
                                                isReadOnly = {referral_code ? true : false }
                                            />
                                            { inputReferalCode != '' && 
                                            <>
                                                <InputRightElement 
                                                    height="36px"
                                                    borderTopRightRadius="5px"
                                                    borderBottomEndRadius="5px"
                                                >
                                                {validReferalCode ? <CheckIcon w={5} h={6} color='#23c212' /> : <CloseIcon color='#ff004e' />}
                                                </InputRightElement>
                                            </>
                                            }
                                        </InputGroup>

                                        
                                    </FormControl>)}
                                </Box>
                                )}
                                <Box>
                                    <Image
                                        alt="or"
                                        src="/assets/or-icon.webp"
                                        width={["100%"]}
                                        height="auto"
                                        alignItems="center"
                                        margin="20px 0"
                                    />
                                </Box>

                                <Box w="100%">
                                <form onSubmit={handleSubmit}>
                                    <FormControl mb="15px">
                                        <Input
                                            id="emailid"
                                            name="emailid"
                                            type="email"
                                            placeholder="Email ID"
                                            bgColor="#fff"
                                            color="#707070"
                                            _placeholder={{ color: "#707070" }}
                                            required
                                            boxShadow="unset"
                                            p="6px 10px"
                                            border="1px solid #707070 !important"
                                            height="35px"
                                            _focus={{ outline: "0" }}
                                            value={inputEmailId}
                                            onChange={(e) => setInputEmailId(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl mb="15px">
                                        <Box position="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text': 'password'}
                                                placeholder="Password"
                                                bgColor="#fff"
                                                color="#707070"
                                                _placeholder={{ color: "#707070" }}
                                                required
                                                boxShadow="unset"
                                                p="6px 10px"
                                                border="1px solid #707070 !important"
                                                height="35px"
                                                _focus={{ outline: "0" }}
                                                value={inputPassword}
                                                onChange={(e) => setInputPassword(e.target.value)}
                                                autoComplete="password"
                                            />
                                            <Text
                                                position="absolute"
                                                top="0"
                                                right="0"
                                                height="100%"
                                                cursor="pointer"
                                                p="7px 10px"
                                                display="flex"
                                                alignItems="center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <Image
                                                    alt="toggle password"
                                                    src="/assets/toggle-password.png"
                                                    width="13px"
                                                    height="auto"
                                                />
                                            </Text>
                                        </Box>
                                        {
                                            selectedOption === "login" &&
                                            <Text
                                                color="#fff"
                                                fontFamily="Open Sans,Sans-serif"
                                                fontWeight="500"
                                                fontSize={["10px"]}
                                                mt="5px"
                                                cursor="pointer"
                                                textDecoration="underline"
                                                textAlign="right"
                                                onClick={() => { setLoginModalActive(false); toggleForgotPasswordModal(); }}
                                            >
                                                Forgot Password?
                                            </Text>
                                        }
                                    </FormControl>
                                    {loggingIn && <Loader fullPage={true} />}
                                    <Button
                                        width="100%"
                                        h="30px"
                                        bgImage="linear-gradient(90deg,#e90a63 0%,#481a7f 100%)"
                                        boxShadow="0px 0px 20px 0px #481a7f"
                                        fontSize="12px"
                                        p="10px"
                                        lineHeight="1"
                                        fontWeight="500"
                                        textTransform="uppercase"
                                        outline="0"
                                        fontFamily="Open Sans,Sans-serif !important"
                                        type="submit"
                                        isDisabled = {selectedOption != "login" && validReferalCode == false  ? true : false }
                                    >
                                        {/* {loggingIn ? <Loader size={12} /> : selectedOption === "login" ? "Login" : "SignUp" } */}
                                        {selectedOption === "login" ? "Login" : "SignUp" }
                                    </Button>
                                </form>
                                </Box>

                                <Box
                                    color="#fff"
                                    mt="15px"
                                    cursor="pointer"
                                    fontFamily="var(--chakra-fonts-Blanch)"
                                    fontWeight="500"
                                    fontSize={["24px", "24px"]}
                                    onClick={() => setSelectedOption( selectedOption === "login" ? "signup" : "login" )}
                                >
                                    {selectedOption === "login"
                                        ? <Flex>New to LootMogul? <Text color="primary" ml="5px">Sign Up</Text></Flex>
                                        : <Flex>Already user? <Text color="primary" ml="5px">Login</Text></Flex>}
                                </Box>
                                {selectedOption != "login" && (
                                <Text
                                    my="12px"
                                    textAlign="center"
                                    fontFamily="Open Sans,Sans-serif"
                                    color="white"
                                    fontWeight="500"
                                    fontSize={["12px", "12px"]}
                                >
                                    By registering, you accept you are 18+ &
                                    agree to our{" "}
                                    <Link
                                        color="primary"
                                        fontFamily="Open Sans,Sans-serif"
                                        fontWeight="500"
                                        fontSize={["12px", "12px"]}
                                    >
                                        T&C
                                    </Link>{" "}
                                    &{" "}
                                    <Link
                                        href="/privacy-policy"
                                        isExternal
                                        color="primary"
                                        fontFamily="Open Sans,Sans-serif"
                                        fontWeight="500"
                                        fontSize={["12px", "12px"]}
                                    >
                                        Privacy Policy
                                    </Link>
                                </Text>
                                )}
                            </Flex>
                        </Box>
                    </Flex>

                    {ShowAlert()}

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Login;