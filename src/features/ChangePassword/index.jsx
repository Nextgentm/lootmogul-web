import { useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import { useRouter } from "next/router";
import {
    useToast,
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
    AlertDialogOverlay
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import moment from 'moment';

import { root, loginTitleStyle } from "./styles";
import strapi from "../../utils/strapi";
import axios from "axios";

const RESEND_OTP_WAIT_TIME = 120 * 1000 + 1000 //in mili sec (1 sec is added to fix timing issue)

const ChangePassword = ({ isOpen, onClose, forgotEmail, setEmail }) => {
    const { setChangePasswordModalActive, /* togglePasswordChangedModal, toggleChangePasswordModal */ } = useContext(AppContext);
    const toast = useToast();
    const router = useRouter();

    const secCode = router.query.code || "";
    const queryEmail = decodeURIComponent(router.query.email)

    const [inputNewPwd, setInputNewPwd] = useState("");
    const [inputConfirmPwd, setInputConfirmPwd] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [alertMsg, setAlertMsg] = useState({});


    const lastResentLocalStorage = typeof window !== 'undefined' ? window?.localStorage?.getItem('lastResent') : 0
    const [state, setState] = useState({
        // reSending: false,
        lastResent: lastResentLocalStorage || 0,
        waitTime: 0,
    })
    const { /* reSending, */ lastResent, waitTime } = state

    // Effect to set the code from the query string
    useEffect(() => {
        if (secCode) {
            setInputCode(secCode);
        }
    }, [secCode]);



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!inputNewPwd || !inputConfirmPwd) {
            setAlertMsg({
                isOpen: true,
                title: "Error",
                message: "Password and Confirm password is required"
            });
            return
        }
        if (inputNewPwd !== inputConfirmPwd) {
            setAlertMsg({
                isOpen: true,
                title: "Error",
                message: "New password and Confirm password is not matching"
            });
            return
        }
        try {
            const { jwt, user } = await strapi.resetPassword({
                otp: Number(inputCode),
                email: forgotEmail || queryEmail,
                password: inputNewPwd,
                confirmPassword: inputConfirmPwd,
            });

            setInputNewPwd("");
            setInputConfirmPwd("");
            if (setEmail) setEmail("")
            setChangePasswordModalActive(false);
            onClose()
            router.push('/games')
        } catch (error) {
            toast({
                title: error?.message || error?.error?.message,
                status: "error",
                duration: 5000,
                position: "top-right",
                isClosable: true
            });
        }


    };

    useEffect(() => {
        let intervalId;
        if (lastResent) {
            intervalId = setInterval(() => {
                setState(prev => {
                    const nextWaitTime = RESEND_OTP_WAIT_TIME - (Date.now() - prev.lastResent)
                    if (nextWaitTime > 0) return { ...prev, waitTime: nextWaitTime }

                    clearInterval(intervalId);
                    localStorage.removeItem('lastResent')
                    return { ...prev, waitTime: 0, lastResent: 0 }
                })
            }, 1000);
        }
        return () => clearInterval(intervalId)
    }, [lastResent])

    const resendOTP = async () => {
        if (lastResent > 0 && (Date.now() - lastResent) < RESEND_OTP_WAIT_TIME) return
        localStorage.setItem('lastResent', Date.now())
        setState(prev => ({ ...prev, lastResent: Date.now() }))

        axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/user-otps/resend`,
            { email: forgotEmail || queryEmail }
        )
            .then((res) => {
                toast({
                    title: res?.data?.message,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((error) => {
                toast({
                    title: error?.response?.data?.message || error?.error?.message || error?.message,
                    status: "error",
                    duration: 4000,
                    position: "top-right",
                    isClosable: true
                });
            });
    }

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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
        >
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
                                px="20px"
                                py="30px"
                                direction={"column"}
                                zIndex={999}
                                align="center"
                            >
                                <Text
                                    fontSize={["38px", "38px"]}
                                    fontWeight="var(--chakra-fontWeights-normal)"
                                    mb="10px"
                                    lineHeight="1"
                                    {...loginTitleStyle}
                                >
                                    NEW PASSWORD
                                </Text>

                                <Text
                                    color="#fff"
                                    fontFamily="Open Sans,Sans-serif"
                                    fontWeight="500"
                                    fontSize="14px"
                                    mb="20px"
                                    textAlign="center"
                                >
                                    {'OTP has been sent to your email. Please check your inbox & spam folder'}
                                </Text>

                                <Text
                                    color="#fff"
                                    fontFamily="Open Sans,Sans-serif"
                                    fontWeight="500"
                                    fontSize="14px"
                                    mb="20px"
                                    textAlign="center"
                                >
                                    {'Please Note:'} <br />
                                    OTP is valid for 15 min <br />
                                    Maximum 3 attempts is allowed <br />
                                </Text>

                                <Box w="100%">
                                    <form onSubmit={handleSubmit}>
                                        <FormControl mb="15px">
                                            <Input
                                                name="code"
                                                type="text"
                                                placeholder="Please Enter OTP"
                                                bgColor="#fff"
                                                color="#707070"
                                                _placeholder={{ color: "#707070" }}
                                                required
                                                boxShadow="unset"
                                                p="6px 10px"
                                                border="1px solid #707070 !important"
                                                height="35px"
                                                _focus={{ outline: "0" }}
                                                value={inputCode}
                                                onChange={(e) =>
                                                    setInputCode(e.target.value)
                                                }
                                            />
                                        </FormControl>

                                        <FormControl mb="15px">
                                            <Input
                                                name="new_password"
                                                type="password"
                                                placeholder="Create new password"
                                                bgColor="#fff"
                                                color="#707070"
                                                _placeholder={{ color: "#707070" }}
                                                required
                                                boxShadow="unset"
                                                p="6px 10px"
                                                border="1px solid #707070 !important"
                                                height="35px"
                                                _focus={{ outline: "0" }}
                                                value={inputNewPwd}
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setInputNewPwd(e.target.value)
                                                }
                                            />
                                        </FormControl>

                                        <FormControl mb="15px">
                                            <Input
                                                id="confirm_password"
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm your password"
                                                bgColor="#fff"
                                                color="#707070"
                                                _placeholder={{ color: "#707070" }}
                                                required
                                                boxShadow="unset"
                                                p="6px 10px"
                                                border="1px solid #707070 !important"
                                                height="35px"
                                                _focus={{ outline: "0" }}
                                                value={inputConfirmPwd}
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setInputConfirmPwd(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <Button
                                            width="100%"
                                            h="30px"
                                            bgImage="linear-gradient(90deg,#e90a63 0%,#481a7f 100%)"
                                            boxShadow="0px 0px 20px 0px #481a7f"
                                            fontSize="12px"
                                            p="10px"
                                            lineHeight="1"
                                            fontWeight="600"
                                            textTransform="uppercase"
                                            outline="0"
                                            fontFamily="Open Sans,Sans-serif !important"
                                            // onClick={handleSubmit}
                                            type="submit"
                                        >
                                            CHANGE PASSWORD
                                        </Button>
                                    </form>
                                </Box>
                                <Text
                                    color={waitTime ? '#79848e' : "#3182ce"}
                                    cursor={waitTime ? "progress" : 'pointer'}
                                    fontFamily="Open Sans,Sans-serif"
                                    fontWeight="500"
                                    fontSize="14px"
                                    mb="20px"
                                    textAlign="center"
                                    marginTop={5}
                                    marginBottom={-3}
                                    onClick={resendOTP}
                                >
                                    {/* {waitTime > 0 ?
                                        `${moment.duration(waitTime).minutes()}: ${moment.duration(waitTime).seconds()}`
                                        : `Resend OTP`} */}
                                    {waitTime > 0 ? `${moment.utc(waitTime).format("mm:ss")}` : `Resend OTP`}

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

export default ChangePassword;
