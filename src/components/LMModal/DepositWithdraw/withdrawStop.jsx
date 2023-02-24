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
                            paddingTop="5%"
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
                                fontSize={["22px","22px", "48px"]}
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
            <Text style={{color:'white', textAlign:'center', padding:'10%',paddingBottom:'23%',paddingTop:'23%',fontWeight:700,fontSize:'20px'}}>We have paused our withdrawal till 28th Feb 2023</Text> 
            <WalletFooter />
        </Box>
    );
};
export default DepostWithdrawstop;
