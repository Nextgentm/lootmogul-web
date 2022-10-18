import { useState, useContext } from "react";
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
    FormHelperText,
    AlertDialog,
    AlertDialogBody,
    Heading,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";
import strapi from "../../../src/utils/strapi";
import axios from 'axios';

const Login = ({ isOpen, OnLoginClose }) => {
    const [selectedOption, setSelectedOption] = useState("signup");
    const [passwordType, setPasswordType] = useState("password");
    const [inputEmailId, setInputEmailId] = useState();
    const [inputPassword, setInputPassword] = useState();

    const { callAuthService, msgSignupLogin, setLoginModalActive, toggleForgotPasswordModal } = useContext(AppContext);

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

        onSuccess: (data) => {
            callAuthService("google", data.accessToken);
        }
    });

    const togglePassword =()=>{
        if(passwordType==="password")
        {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    function handleSubmit() {
        // console.log(inputEmailId, inputPassword)
        if( inputEmailId && inputPassword )
        {
            callAuthService(inputEmailId, inputPassword, selectedOption);
            
            /*const apiValues = {
                username: inputEmailId,
                email: inputEmailId,
                password: inputPassword,
            }

            /*if( resp.data )
            {
                setAlertMsg({
                    isOpen: true,
                    title: "Success",
                    message: "Signup successfully!",
                });
            }
            else
            {
                setAlertMsg({
                    isOpen: true,
                    title: "Error",
                    message: "There is an error while signup!",
                });
            }*/
        }
        else
        {
            setAlertMsg({
                isOpen: true,
                title: "Error",
                message: "Email ID and password is required",
            });
        }
    }

    if( msgSignupLogin )
    {
        setAlertMsg({
            isOpen: true,
            title: "Error",
            message: msgSignupLogin,
        });
    }

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

    return (
        <Modal isOpen={isOpen} onClose={OnLoginClose} scrollBehavior="inside">
            <ModalOverlay />

            <ModalContent
                rounded={5}
                mt={["100px", "100px"]}
                marginTop={["90px", "60px", "70px", "120px"]}
                marginLeft={["0%", "50%", "60%", "70%"]}
                width={["375px"]}
                bg={"#4C69BA"}
                borderRadius="14"
                background="transparent"
            >
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
                                    {selectedOption === "login"
                                        ? "LOGIN"
                                        : "SIGNUP"}
                                </Text>

                                <Button
                                    mt="2%"
                                    mb="2%"
                                    leftIcon={
                                        <Image
                                            alt="google"
                                            width="20px"
                                            height="20px"
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20161129182045%21Google_%22G%22_Logo.svg"
                                            }
                                        />
                                    }
                                    backgroundColor="#FFF"
                                    color="black"
                                    variant="login"
                                    onClick={signIn}
                                >
                                    {selectedOption === "login"
                                        ? "Login"
                                        : "Signup"}{" "}
                                    with Google
                                </Button>

                                <FacebookLogin
                                    appId={
                                        process.env
                                            .NEXT_PUBLIC_FACEBOOK_CLIENT_ID
                                    }
                                    callback={({ accessToken }) => {
                                        callAuthService(
                                            "facebook",
                                            accessToken
                                        );
                                    }}
                                    render={(renderProps) => (
                                        <Button
                                            mt="2%"
                                            mb="2%"
                                            leftIcon={
                                                <Image
                                                    alt="google"
                                                    width={"20px"}
                                                    height={"20px"}
                                                    src={
                                                        "https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg"
                                                    }
                                                />
                                            }
                                            onClick={renderProps.onClick}
                                            backgroundColor="#FFF"
                                            color="black"
                                            variant="login"
                                        >
                                            {selectedOption === "login"
                                                ? "Login"
                                                : "Signup"}{" "}
                                            with Facebook
                                        </Button>
                                    )}
                                />
                                
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
                                                type={passwordType}
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
                                                onClick={togglePassword}
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
                                                    onClick={() => { setLoginModalActive(false); toggleForgotPasswordModal(); } }
                                                >
                                                    Forgot Password?
                                                </Text>
                                        }
                                    </FormControl>
                                     
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
                                        onClick={handleSubmit}
                                    >
                                        {
                                            selectedOption === "login"
                                                ? "Login"
                                                : "SignUp"
                                        }
                                    </Button>
                                </Box>

                                <Text
                                    color="#fff"
                                    mt="15px"
                                    cursor="pointer"
                                    fontFamily="var(--chakra-fonts-Blanch)"
                                    fontWeight="500"
                                    fontSize={["24px", "24px"]}
                                    onClick={() =>
                                        setSelectedOption(
                                            selectedOption === "login"
                                                ? "signup"
                                                : "login"
                                        )
                                    }
                                >
                                    {selectedOption === "login"
                                        ? <Flex>New to LootMogul? <Text color="primary" ml="5px">Sign Up</Text></Flex>
                                        : <Flex>Already user? <Text color="primary" ml="5px">Login</Text></Flex>}
                                </Text>
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
