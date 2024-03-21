import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
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
                            paddingTop="5%"
                            borderTopLeftRadius="8px"
                            paddingBottom="0%"
                            paddingLeft={"2%"}
                            bg="#672099"
                            textAlign="center"
                        >
                            <Heading
                                mt="10px"
                                variant="modalHeader"
                                fontSize={["80px", "80px", "98px"]}
                                fontFamily={"blanch"}
                                paddingBottom={12}
                                fontWeight="400"
                            >
                                Score {score}
                            </Heading>
                        </Box>
                    </Flex>
                )}

                {currentSize === "base" && (
                    <Box
                        width="100%"
                        paddingTop="5%"
                        borderTopLeftRadius="8px"
                        paddingBottom="0%"
                        paddingLeft={"2%"}
                        bg="#672099"
                        textAlign="center"
                    >
                        <Heading
                            mt="10px"
                            variant="modalHeader"
                            fontSize={["80px", "80px", "98px"]}
                            fontFamily={"blanch"}
                            paddingBottom={12}
                            fontWeight="400"
                        >
                            Score {score}
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

export const GameBody = ({ onJoin, onCancel }) => {
    return (
        <Box m="auto" bg="#fff" pb="10px" width="100%" borderRadius="12px" justifyContent="center">
            <Heading
                fontSize={[, "24px", "24px", "34px"]}
                p={"10px"}
                pt={"25px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="700"
                fontFamily="Open Sans"
            >
                Your free retry are over
            </Heading>
            <Heading
                fontSize={[, "24px", "24px", "34px"]}
                padding={"10px"}
                textAlign={'center'}
                color="#000000"
                fontWeight="700"
                fontFamily="Open Sans"
            >
                Do you want to <br /> continue?
            </Heading>
            <Button
                fontSize={['16px', '18px', '22px']}
                p={['20px 30px', '20px 30px', '25px 40px']}
                m={["2% auto", "1% auto", "1% auto", "1% auto", "3% auto", "5% auto"]}
                textAlign={'center'}
                display="flex"
                boxShadow={0}
                onClick={onJoin}
            >
                Retry
            </Button>

            <Button
                fontSize={['10px', '10px']}
                p={['5px 30px', '5px 20px']}
                m={["5px auto", "5px auto", "5px auto"]}
                textAlign={'center'}
                display="flex"
                boxShadow={0}
                height="30px"
                backgroundImage="linear-gradient(90deg, #672099 0%, #481A7F 100%)"
                onClick={onCancel}
            >
                Cancel
            </Button>
        </Box>
    );
};

export const InsufficientFunds = ({ totalAmount, isDeposit, score, onJoin, onCancel }) => {
    return (
        <Box width="100%" bg="#672099" borderRadius="12px" border="20px solid #672099" boxShadow="0px 6px 40px #090014">
            <WalletHeader score={score} />
            <GameBody onCancel={onCancel} onJoin={onJoin} />
            <WalletFooter />
        </Box>
    );
};
export default InsufficientFunds;
