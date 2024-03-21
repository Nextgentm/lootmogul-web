import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Pauseicon } from "../../Icons";

const WalletHeader = ({score}) => {
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
                            paddingTop="5%"
                            borderTopLeftRadius="8px"
                            paddingBottom="0%"
                            bg="#672099"
                            textAlign="center"
                        >
                            <Heading
                                mt="10px"
                                variant="modalHeader"
                                fontSize={["34px", "36px", "52px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                                lineHeight={"0px"}
                            >
                                Alert! insufficient Chips
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                        width="100%"
                        borderTopLeftRadius="8px"
                        paddingBottom="0%"
                        bg="#672099"
                        textAlign="center"
                    >
                        <Heading
                            mt="10px"
                            variant="modalHeader"
                            fontSize={["34px", "36px", "52px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                            lineHeight={"0px"}
                        >
                            Alert! insufficient Chips
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

export const GameBody = () => {
    return (
        <Box m="auto" bg="#fff" pb="10px" width="100%" borderRadius="12px" justifyContent="center">
            <Heading
                fontSize={[, "14px", "14px", "16px"]}
                p={"10px"}
                pt={"25px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="400"
                fontFamily="Open Sans"
            >
                It seems you don't have enough chips to continue playing. 
                Would you like to purchase more chips & play paid games or explore our Free games and enjoy.
            </Heading>
            <Heading
                fontSize={[, "20px", "20px", "24px"]}
                padding={"10px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="700"
                fontFamily="Open Sans"
            >
                Do you want to add chip?
            </Heading>
            <Button
                fontSize={['16px', '18px', '22px']}
                p={['20px 30px', '20px 30px', '25px 40px']}
                m={["2% auto", "1% auto", "1% auto", "1% auto", "3% auto", "5% auto"]}
                textAlign={'center'}
                display="flex"
                boxShadow={0}
                //onClick={onJoin}
            >
                Deposit Now
            </Button>

            
        </Box>
    );
};

export const InsufficientFunds = ({ totalAmount }) => {
    return (
        <Box width="100%" bg="#672099" borderRadius="12px" border="20px solid #672099" boxShadow="0px 6px 40px #090014">
            <WalletHeader score={totalAmount} />
            <GameBody />
            <WalletFooter />
        </Box>
    );
};
export default InsufficientFunds;
