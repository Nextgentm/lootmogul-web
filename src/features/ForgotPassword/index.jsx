import { useState, useContext } from "react";
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
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";
import strapi from "../../../src/utils/strapi";

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const ForgotPassword = ({ isOpen, onClose , setEmail, email }) => {
    const toast = useToast();

    const { setForgotPasswordModalActive, /* toggleCheckYourMailModal, */ toggleChangePasswordModal } = useContext(AppContext);

    const  handleSubmit = async (e) => {
        e.preventDefault()
        if(!email) {
            setAlertMsg({ isOpen: true, title: "Error", message: "Email address is required",});
            return
        }
        if( !isValidEmail(email) ){
            setAlertMsg({ isOpen: true, title: "Error", message: "Email address is invalid" })
            return
        } 
        
        try {
            const res = await strapi.forgotPassword({ email:email });
            setForgotPasswordModalActive(false);
            // toggleCheckYourMailModal();
            toggleChangePasswordModal()
            toast({
                title: res.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            if(error?.message || error?.error?.message){
                toast({
                    title: error.message || error?.error?.message,
                    status: "error",
                    duration: 5000,
                    position: "top-right",
                    isClosable: true
                });
            }
        }
        
    }

    /* const handleChange = (e) => {
        const {value} = e.target
        setEmail(value)
    } */

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
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
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
                                    FORGOT PASSWORD
                                </Text>

                                <Text
                                    color="#fff"
                                    fontFamily="Open Sans,Sans-serif"
                                    fontWeight="500"
                                    fontSize="14px"
                                    mb="30px"
                                    textAlign="center"
                                >
                                    Enter the email associated with account and we'll send you a link to reset your password 
                                </Text>

                                <Box w="100%">
                                    <form onSubmit={handleSubmit}>
                                    <FormControl mb="15px">
                                        <Input
                                            id="emailid"
                                            name="emailid"
                                            type="email"
                                            placeholder="Enter email address"
                                            bgColor="#fff"
                                            color="#707070"
                                            _placeholder={{ color: "#707070" }}
                                            required
                                            boxShadow="unset"
                                            p="6px 10px"
                                            border="1px solid #707070 !important"
                                            height="35px"
                                            _focus={{ outline: "0" }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            // onChange={handleChange}
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
                                        type="submit"
                                    >
                                        RESET PASSWORD
                                    </Button>
                                    </form>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>

                    {ShowAlert()}

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ForgotPassword;
