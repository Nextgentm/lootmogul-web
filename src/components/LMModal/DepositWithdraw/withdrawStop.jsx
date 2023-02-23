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
                                fontWeight="600"
                                variant="modalHeader"
                                fontSize={["12px","12px", "36px"]}
                                fontFamily={"blanch"}
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
                            fontSize={["20px", "20px", "31px"]}
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

const DepostWithdrawstop = ({ totalAmount, isDeposit, winAmount }) => {
    return (
        <Box width="100%" bg="#1d052b" borderRadius="12px" border="4px solid #672099" boxShadow="0px 6px 40px #090014">
            <WalletHeader
                isDeposit={isDeposit}
                totalAmount={totalAmount}
                winAmount={winAmount}
            /> 
             {/* <WalletSubHeader 
                isDeposit={isDeposit}
                totalAmount={totalAmount}
                winAmount={winAmount}
            /> */}
            <Text style={{color:'white', textAlign:'center', padding:'10px',fontWeight:700}}>We have paused our withdrawal till 28th Feb 2023</Text> 
            <WalletFooter />
        </Box>
    );
};
export default DepostWithdrawstop;
