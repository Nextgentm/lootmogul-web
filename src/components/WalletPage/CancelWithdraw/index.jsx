import { Box, Flex, Heading, Text, Image, Button, Textarea,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay, } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pauseicon } from "../../Icons";

const WalletHeader = () => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex width="100%" borderBottom="0">
            <Flex w="100%">
                {currentSize !== "base" && (
                    <Flex width={["100%", "100%"]}>
                        <Box
                            width="100%"
                            textAlign="center"
                        >   
                            <Heading
                                
                                variant="modalHeader"
                                fontSize={["30px", "30px", "40px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                            >
                                CANCEL WITHDRAW
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                        width="100%"
                        textAlign="center"
                    >
                        <Heading
                            variant="modalHeader"
                            fontSize={["80px", "80px", "98px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                        >
                            CANCEL WITHDRAW
                        </Heading>
                    </Box>
                )}

            </Flex>
        </Flex>
    );
};

const WalletFooter = () => {
    return (
        <Flex m="auto" width="100%" justifyContent="center">

        </Flex>
    );
};

export const CancelWithdrawBody = () => {
    return (
        <Box  color="#fff" pb="10px" width="100%" borderRadius="12px" justifyContent="center">
            <Flex w={"100%"} direction={"row"}>
                <Box 
                    fontSize={["10px", "10px", "13px"]}
                    textAlign={'center'}
                    lineHeight={[ "18px", "18px", "20px"]}
                    w={"39.3333%"}
                >
                    TRANSACTION ID: <br/>#4428
                </Box>
                <Box 
                    fontSize={["10px", "10px", "13px"]}
                    textAlign={'center'}
                    lineHeight={[ "18px", "18px", "20px"]}
                    w={"30.3333%"}
                >
                    CHIPS <br/>-4.25 CHIPS
                </Box>
                <Box 
                    fontSize={["10px", "10px", "13px"]}
                    textAlign={'center'}
                    lineHeight={[ "18px", "18px", "20px"]}
                    w={"30.3333%"}
                >
                    DATE <br/>26-05-2023
                </Box>
            </Flex>
            <Text
                fontSize={[, "12px", "12px", "13px"]}
                p={"10px"}
                pt={"25px"}
                textAlign={'left'}
                color="#fff"
            >
                Are you sure you want to cancel your withdraw?
            </Text>
            <Text
                fontSize={[, "12px", "12px", "13px"]}
                p={"10px"}
                textAlign={'left'}
                color="#fff"
            >
                Reason of cancellation*
            </Text>
            <Textarea
                placeholder='Type reason of cancellation'
                size='sm'
                bg={"#fff"}
                border="1px solid #707070"
                borderRadius="5px"
                color="#9B9999"
                minHeight="50px"
            />
            <Button
                fontSize={['16px', '18px', '22px']}
                p={['20px 30px', '20px 30px', '15px 25px']}
                w={"100%"}
                textAlign={'center'}
                display="flex"
                boxShadow={0}
                fontWeight="400"
                mt="15px"
                h="35px"
            >
                Yes
            </Button>

            <Button
                fontSize={['16px', '18px', '22px']}
                p={['20px 30px', '20px 30px', '15px 25px']}
                w={"100%"}
                textAlign={'center'}
                display="flex"
                boxShadow={0}
                backgroundImage="linear-gradient(90deg, #672099 0%, #481A7F 100%)"
                fontWeight="400"
                mt="5px"
                h="35px"
            >
                No
            </Button>
        </Box>
    );
};

export const CancelWithdraw = ({ isOpen, OnLoginClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={OnLoginClose} scrollBehavior="inside">
        <ModalOverlay />

        <ModalContent
            rounded={5}
            mt={["100px", "100px"]}
            marginTop={["90px", "60px", "70px", "25vh"]}
            width={["440px"]}
            bg={"#4C69BA"}
            borderRadius="14"
            background="transparent"
            
        >
            <ModalBody>
                <Box width="100%" bg="#1D052B" borderRadius="12px" p={"30px"} border="4px solid #672099" boxShadow="0px 6px 40px #090014">
                    <WalletHeader />
                    <CancelWithdrawBody/>
                    <WalletFooter />
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
    );
};
export default CancelWithdraw;
