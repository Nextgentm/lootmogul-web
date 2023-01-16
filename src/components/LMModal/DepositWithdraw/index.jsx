import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { WalletIcon } from "../../Icons";
import LMTabs from "../../LMTabs";
import { useBreakpointValue } from "@chakra-ui/react";

const WalletHeader = ({ totalAmount, isDeposit, winAmount }) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex width="100%" bg="#1d052b"  borderBottom="0">
            <Flex w="100%">
                {currentSize !== "base" && (
                    <Flex width={["50%", "58%"]}>
                        <Box
                            width="70%"
                            paddingTop="5%"
                            borderTopLeftRadius="8px"
                            paddingBottom="6%"
                            paddingLeft={"2%"}
                            bg="#1d052b"
                        >
                            <Heading
                                ml="10%"
                                mt="10px"
                                fontWeight="600"
                                variant="modalHeader"
                                fontSize={["12px","12px", "22px"]}
                            >
                                {isDeposit ? "DEPOSIT" : "WITHDRAW"}
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                    width="35%"
                     paddingTop={["15px","15px","10%"]}
                     marginRight="16px"
                     borderTopLeftRadius="8px"
                     paddingLeft="50%"
                     bg="#1d052b"
                     display="flex"
                     justifyContent="center"
                     >
                        <Heading
                            ml="10%"
                            fontWeight="600"
                            variant="modalHeader"
                            fontSize={["10px", "16px"]}
                        >
                            {isDeposit ? "DEPOSIT" : "WITHDRAW"}
                        </Heading>
                    </Box>
                )}
            
                {
                <Flex w="100%" justifyContent="flex-end" mr="3%">
                    <Flex m="auto 0px" justifyContent="flex-end">
                        

                        <Heading
                            fontWeight="400"
                            fontFamily="Blanch"
                            fontSize={["20px", "20px", "31px"]}
                            ml={["6px!important", "15px!important"]}
                            m="auto"
                            color="white"
                        >
                            {isDeposit ? "WALLET BALANCE IN CHIPS" : "WIN BALANCE"}
                        </Heading>

                        <Image
                            alt="tag"
                            boxSize={["25px","25px", "30px"]}
                            src="/assets/Icon.png"
                            ml="5px"
                        />
                    </Flex>

                    <Heading
                        fontSize={["24px", "28px", "38px"]}
                        mt="auto"
                        ml="10px"
                        mb="auto"
                        color="primary"
                    >
                        {isDeposit ? totalAmount : winAmount}
                    </Heading>
                </Flex> }
            </Flex>
        </Flex>
    );
};

const WalletFooter = () => {
    return (
        <Flex m="auto" width="100%" justifyContent="center">
            <Text
                textAlign="center"
                width="auto"
                variant="hint"
                fontWeight="600"
            ></Text>
        </Flex>
    );
};
const WalletBody = ({ isDeposit }) => {
    const data = [
        {
            url: "/assets/images/stripe.png",
            name: "Stripe"
        }
    ];
    const withDrawData = [
        {
            url: "/assets/images/Paypal.png",
            name: "Paypal",
            mode: "paypal",
            type: "cash"
        },
        {
            url: "/assets/images/metamask.png",
            name: "Metamask",
            mode: "metamask",
            type: "crypto"
        },
        {
            url: "/assets/images/Coinbase.png",
            name: "Coinbase wallet",
            mode: "coinbase",
            type: "crypto"
        }
    ];

    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex bg="#1d052b">
            <LMTabs
                data={isDeposit ? data : withDrawData}
                isDeposit={isDeposit}
                orientation={currentSize === "base" ? "horizontal" : "vertical"}
            />
        </Flex>
    );
};

const DepostWithdraw = ({ totalAmount, isDeposit, winAmount }) => {
    return (
        <Box width="100%" bg="#1d052b" borderRadius="12px" border="4px solid #672099" boxShadow="0px 6px 40px #090014">
            <WalletHeader
                isDeposit={isDeposit}
                totalAmount={totalAmount}
                winAmount={winAmount}
            />
            <WalletBody isDeposit={isDeposit} />
            <WalletFooter />
        </Box>
    );
};
export default DepostWithdraw;
