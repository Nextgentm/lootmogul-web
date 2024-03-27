import { Box, Flex, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pauseicon } from "../../Icons";

const WalletHeader = ({ totalAmount, isDeposit, score }) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex width="100%" bg="#672099" borderBottom="0">
            <Flex w="100%">
                {currentSize !== "base" && (
                    <Flex width={["100%", "100%"]}>
                        <Box
                            width="100%"
                            paddingTop="0%"
                            borderTopLeftRadius="8px"
                            paddingBottom="0%"
                            paddingLeft={"0%"}
                            bg="#672099"
                            textAlign="center"
                        >
                            <Heading
                                mt="10px"
                                variant="modalHeader"
                                fontSize={["60px", "60px", "60px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                            >
                                Wait!!
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                        width="100%"
                        paddingTop="0%"
                        borderTopLeftRadius="8px"
                        paddingBottom="0%"
                        paddingLeft={"0%"}
                        bg="#672099"
                        textAlign="center"
                    >
                        <Heading
                            mt="10px"
                            variant="modalHeader"
                            fontSize={["60px", "60px", "72px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                        >
                            Wait!!
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

export const GameBody = ({ onCancel, onCancelNo }) => {
    return (
        <Box m="auto" bg="#fff" pb="10px" width="100%" borderRadius="12px" justifyContent="center">
            <Heading
                fontSize={[, "24px", "24px", "26px"]}
                p={"10px"}
                pt={"25px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="400"
                fontFamily="Open Sans"
            >
                Contest Fee is already deducted, if you exit chips will not be credited.
            </Heading>
            <Heading
                fontSize={[, "24px", "24px", "24px"]}
                padding={"10px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="600"
                fontFamily="Open Sans"
            >
                Are you sure you want <br/> to close? 
            </Heading>
            <Box w={["70%","60%","50%"]} margin={"auto"}>
                <SimpleGrid
                    columns={[2, 2, 2]}
                    w="100%"
                    px={["0%"]}
                    mt={["0px", 0]}
                    flexWrap="wrap"
                >
            
                    <Button
                        fontSize={['14px', '18px']}
                        p={['20px 30px', '20px 30px']}
                        m={["5px auto", "5px auto", "5px auto"]}
                        textAlign={'center'}
                        display="flex"
                        boxShadow={0}
                        height="30px"
                        backgroundImage="linear-gradient(90deg, #672099 0%, #481A7F 100%)"
                        borderRadius="6px"  
                        mt="20px"
                        mr={["0em", "0em", "1.5em", "1em", "1.5em"]}
                        flexDir={"column"}
                        variant={"trivia"}
                        onClick={onCancel}
                    >
                        Yes
                    </Button>
                    <Button
                        fontSize={['14px', '18px']}
                        p={['20px 30px', '20px 30px']}
                        m={["5px auto", "5px auto", "5px auto"]}
                        textAlign={'center'}
                        display="flex"
                        boxShadow={0}
                        height="30px"
                        backgroundImage="linear-gradient(90deg, #672099 0%, #481A7F 100%)"                        
                        borderRadius="6px"  
                        mt="20px"
                        mr={["0em", "0em", "1.5em", "1em", "1.5em"]}
                        flexDir={"column"}
                        variant={"trivia"}
                        onClick={onCancelNo}
                    >
                        No
                    </Button>
                </SimpleGrid>
            </Box>
            
        </Box>
    );
};

export const AlertChipPopup = ({ onCancel,onCancelNo }) => {
    console.log('Inside AlertChipPopup');
    return (
        <Box width="100%" bg="#672099" borderRadius="12px" border="20px solid #672099" boxShadow="0px 6px 40px #090014">
            <WalletHeader />
            <GameBody onCancel={onCancel} onCancelNo={onCancelNo} />
            <WalletFooter />
        </Box>
    );
};
export default AlertChipPopup;
