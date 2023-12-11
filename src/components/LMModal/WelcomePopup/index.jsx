import {
    Box,
    Flex,
    Heading,
    Text,    
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalCloseButton
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";

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
                                fontSize={["40px", "42px", "52px"]}
                                lineHeight={["30px", "32px", "42px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                                pb="25px"
                            >
                               Welcome to LootMogul!
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box width="100%" textAlign="center">
                        <Heading
                            variant="modalHeader"
                            fontSize={["40px", "42px", "52px"]}
                            lineHeight={["30px", "32px", "42px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                            pb="25px"
                        >
                            Welcome to LootMogul!
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

export const WelcomeBody = ({
    minChip,
    minOffer,
    currency
}) => {
    return (
        <Box
            color="#fff"
            pb="10px"
            width="100%"
            borderRadius="12px"
            justifyContent="center"
        >
            <Flex w={"100%"} direction={"row"}>
                <Box
                    fontSize={["10px", "10px", "13px"]}
                    textAlign={"center"}
                    lineHeight={["18px", "18px", "20px"]}
                    w={"100%"}
                    m="auto"
                >
                    <Image
                        alt="wallet"
                        src="/assets/welcomepopupicon.png"
                        width={100}
                        height={100}
                    />
                    
                </Box>                
            </Flex>
            <Text
                fontSize={[, "14px", "14px", "17px"]}
                lineHeight={[, "20px", "20px", "22px"]}
                p={"10px"}
                pt={"15px"}
                pl={"3px"}
                textAlign={"center"}
                color="#fff"
            >
                You have received {minChip} chips (worth {currency}{minOffer}) in your LootMogul wallet.
            </Text>
            <Text
                 variant="modalHeader"
                 fontSize={["22px", "22px", "32px"]}
                 lineHeight={["22px", "23px", "33px"]}
                 fontFamily={"blanch"}
                 paddingBottom={12}
                 fontWeight="400"
                 textAlign={"center"}
                 pb="0px"
            >
                Enjoy Playing Games
            </Text>
        </Box>
    );
};

export const WelcomePopup = ({
    isOpen,
    OnLoginClose,
    user
}) => {
    
    var lm_user_location = window.localStorage?.getItem("lm_user_location") ?  window.localStorage?.getItem("lm_user_location") : '';
    var minChip = "";
    var minOffer = "";
    var currency = '';
   
    if(lm_user_location == 'IN') {
        minChip = "14";
        currency = "₹";
        minOffer = "50";
    }
    else if(lm_user_location == 'ZA'){
        minChip = "36";
        currency = "R";
        minOffer = "100";    
    }
    else{
        minChip = "35";
        currency = "$";
        minOffer = "5";
    } 

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
                    onClick={OnLoginClose}
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
                        p={"20px 15px"}
                        border="4px solid #672099"
                        boxShadow="0px 6px 40px #090014"
                    >
                        <WalletHeader />
                        <WelcomeBody
                            minChip={minChip}
                            currency={currency}
                            minOffer={minOffer}
                        />
                        <WalletFooter />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default WelcomePopup;
