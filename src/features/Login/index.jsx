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
    Image
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";

const Login = ({ isOpen, OnLoginClose }) => {
    const [selectedOption, setSelectedOption] = useState("signup");

    const { callAuthService } = useContext(AppContext);

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

        onSuccess: (data) => {
            callAuthService("google", data.accessToken);
        }
    });

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
                                    fontSize={["15px", "35px"]}
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

                                <Text
                                    color="primary"
                                    mt="17px"
                                    cursor="pointer"
                                    fontFamily="Sora"
                                    fontWeight="normal"
                                    fontSize={["12px", "14px"]}
                                    onClick={() =>
                                        setSelectedOption(
                                            selectedOption === "login"
                                                ? "signup"
                                                : "login"
                                        )
                                    }
                                >
                                    {selectedOption === "login"
                                        ? "New to LootMogul? Sign Up now"
                                        : "Already user? Login"}
                                </Text>
                                <Text
                                    my="12px"
                                    textAlign="center"
                                    fontFamily="Sora"
                                    color="white"
                                    fontWeight="normal"
                                    fontSize={["12px", "14px"]}
                                >
                                    By registering, you accept you are 18+ &
                                    agree to our{" "}
                                    <Link
                                        color="primary"
                                        fontFamily="Sora"
                                        fontWeight="normal"
                                        fontSize={["12px", "14px"]}
                                    >
                                        T&C
                                    </Link>{" "}
                                    &{" "}
                                    <Link
                                        href="/privacy-policy"
                                        isExternal
                                        color="primary"
                                        fontFamily="Sora"
                                        fontWeight="normal"
                                        fontSize={["12px", "14px"]}
                                    >
                                        Privacy Policy
                                    </Link>
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Login;
