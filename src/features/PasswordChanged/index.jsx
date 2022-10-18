import { useState, useContext } from "react";
import {
    Flex,
    Text,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";

const PasswordChanged = ({ isOpen, OnPasswordChangedClose }) => {
    const { setPasswordChangedModalActive, toggleLoginModal } = useContext(AppContext);

    return (
        <Modal isOpen={isOpen} onClose={OnPasswordChangedClose} scrollBehavior="inside">
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
                                    lineHeight="30px"
                                    {...loginTitleStyle}
                                    textAlign="center"
                                >
                                    PASSWORD CHANGE SUCCESSFUL
                                </Text>

                                <Text
                                    color="#fff"
                                    fontFamily="Open Sans,Sans-serif"
                                    fontWeight="500"
                                    fontSize="14px"
                                    mb="20px"
                                    textAlign="center"
                                >
                                    Awesome! You've successfully updated your password
                                </Text>

                                <Box w="100%" mb="20px">
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
                                        onClick={()=> { setPasswordChangedModalActive(false); toggleLoginModal(); }}
                                    >
                                        GO BACK TO LOGIN
                                    </Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PasswordChanged;
