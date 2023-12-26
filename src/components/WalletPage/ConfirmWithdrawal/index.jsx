import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    Textarea,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalCloseButton
} from "@chakra-ui/react";
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
                        <Box width="100%" textAlign="center">
                            <Heading
                                variant="modalHeader"
                                fontSize={["30px", "30px", "40px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                                p="0"
                            >
                                CONFIRMATION
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box width="100%" textAlign="center">
                        <Heading
                            variant="modalHeader"
                            fontSize={["80px", "80px", "98px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                        >
                            CONFIRMATION
                        </Heading>
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};

const WalletFooter = () => {
    return <Flex m="auto" width="100%" justifyContent="center"></Flex>;
};

export const CancelWithdrawBody = () => {
    return (
        <Box
            color="#fff"
            pb="10px"
            width="100%"
            borderRadius="12px"
            justifyContent="center"
        >
            <Image
                src="/assets/designupdate1/success.png"
                alt="Right"
                style={{ margin: "auto", width: "80px", padding: "10px" }}
                width={80}
                height={80}
            />
            <Text
                fontSize={[, "12px", "12px", "13px"]}
                textAlign={"center"}
                color="#fff"
            >
                Your withdraw request has been cancelled and processed
            </Text>
        </Box>
    );
};

export const ConfirmWithdrawal = ({
    isOpen,
    OnLoginClose,
    closeWithdrawaModal
}) => {
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
                <ModalCloseButton
                    color="#fff"
                    background="transparent linear-gradient(90deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box"
                    borderRadius="full"
                    outline="#303030"
                    boxShadow="inset 0px 3px 18px #481A7F73, 0px 0px 20px #FF0080CF"
                    onClick={closeWithdrawaModal}
                    sx={{
                        top: -6,
                        right: -4,
                        margin: 2,
                        position: "absolute"
                    }}
                />
                <ModalBody>
                    <Box
                        width="100%"
                        bg="#1D052B"
                        borderRadius="12px"
                        p={"30px"}
                        border="4px solid #672099"
                        boxShadow="0px 6px 40px #090014"
                    >
                        <WalletHeader />
                        <CancelWithdrawBody />
                        <WalletFooter />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ConfirmWithdrawal;
