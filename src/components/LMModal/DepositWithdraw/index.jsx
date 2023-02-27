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
                    <Flex width={["100%", "100%"]}>
                        <Box
                            width="100%"
                            paddingTop="1%"
                            borderTopLeftRadius="8px"
                            paddingBottom="0%"
                            paddingLeft={"2%"}
                            bg="#1d052b"
                            textAlign="center"
                        >
                            <Heading
                                mt="10px"
                                fontWeight="500"
                                variant="modalHeader"
                                fontSize={["12px","12px", "22px"]}
                                fontFamily={"Open Sans"}
                            >
                                {isDeposit ? "DEPOSIT" : "WITHDRAW"}
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                        width="100%"
                        paddingTop={["15px","15px","10%"]}
                        marginRight="16px"
                        borderTopLeftRadius="8px"
                        bg="#1d052b"
                        display="flex"
                        justifyContent="center"
                        fontFamily={"Open Sans"}
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

            </Flex>
        </Flex>  
    );
};

const WalletSubHeader = ({ totalAmount, isDeposit, winAmount }) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex width="100%" bg="#1d052b"  borderBottom="0">
            <Flex w="100%">
                    <Box m="auto" justifyContent="center">                        
                        <Heading
                            fontWeight="400"
                            fontFamily="Blanch"
                            fontSize={["20px", "20px", "38px"]}
                            ml={["6px!important", "15px!important"]}
                            m="auto"
                            color="white"
                            textAlign="center"
                            display="inline-flex"
                        >
                            {isDeposit ? "WALLET BALANCE IN CHIPS" : "WIN BALANCE IN CHIPS"}
                        </Heading>
                        <Image
                            alt="tag"
                            boxSize={["15px","20px","25px"]}
                            src="/assets/Icon.png"
                            ml="5px"
                            display="inline-flex"
                            verticalAlign="sub"
                        />
                        <Heading
                        fontSize={["24px", "28px", "38px"]}
                        mt="auto"
                        ml="10px"
                        mb="auto"
                        color="primary"
                        display="inline-flex"
                    >
                        {isDeposit ? totalAmount : winAmount}
                    </Heading>
                    </Box>

                    
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
            name: "Crypto",
            mode: "crypto",
            type: "crypto"
        },
        {
            url: "/assets/images/coinbase.png",
            name: "Wire/bank transfer",
            mode: "bank",
            type: "bank"
        }
    ];

    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex bg="#1d052b" margin-bottom={"9"} padding-right={"8"} padding-left={"12"} margin-left={"6"} font="icon">
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
            <WalletSubHeader 
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
