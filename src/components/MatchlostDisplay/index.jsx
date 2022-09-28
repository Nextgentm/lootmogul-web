/* eslint-disable react/jsx-key */
import { Box} from "@chakra-ui/layout";
import { Flex, Button } from "@chakra-ui/react";

const MatchlostDisplay = () => {
    return (
        <Box
            bgImage="url('/assets/image 132.jpg')"
            bgPosition={["3%", "70%"]}
            bgRepeat="no-repeat"
            width="100vw"
        >
            <Flex
                m={["10px", "60px"]}
                width={["auto", "auto"]}
                justifyContent={["space-between", "flex-start"]}
                direction="column"
            >
                <Flex
                    width={["100%", "60%"]}
                    direction={["column"]}
                    m="auto"
                    padding={"6%"}
                >
                    <Button
                        width={["auto", "auto"]}
                        height="46px"
                        marginTop={["30%", "4%"]}
                        fontSize={"18px"}
                    >
                        PLAY AGAIN
                    </Button>
                    <Button
                        width={["auto", "auto"]}
                        height="46px"
                        variant="outline"
                        fontSize={"18px"}
                        flex="none"
                        order={"0"}
                        marginTop={"3%"}
                        flex-grow="0"
                    >
                        VIEW LEADERBOARD
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};
export default MatchlostDisplay;
