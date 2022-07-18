/* eslint-disable react/jsx-key */
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Button } from '@chakra-ui/react'
// import Back from "../MatchResultScreens/backIcon";
// import ResultDisplayTitle from "../MatchResultScreens/resultDisplayTitle";
// import ScoreDisplay from "../MatchResultScreens/ScoreDisplay";
const MatchlostDisplay = () => {
    return (

        <Box bgImage="url('/assets/image 132.jpg')"
            bgPosition={["3%", "70%"]}
            bgRepeat="no-repeat" width="100vw">
            {/* <Back /> */}
            <Flex m={["10px", "60px"]} width={["auto", "auto"]} justifyContent={["space-between", "flex-start"]} direction="column"  >

                <Box m={["0%", "-6%"]}>
                    {/* <ResultDisplayTitle name="MATCH RESULT" />
                    <ScoreDisplay text1="Your Rank" text2="Your Score" num1="19" num2="89" reward2="You Lost" reward3="Better luck next time!" /> */}
                </Box>
                <Flex width={["100%", "60%"]} direction={["column"]} m="auto" padding={"6%"}><Button width={["auto", "auto"]} height="46px" marginTop={["30%", "4%"]} fontSize={"18px"} >PLAY AGAIN</Button>
                    <Button width={["auto", "auto"]} height="46px" variant="outline" fontSize={"18px"} flex="none" order={"0"} marginTop={"3%"} flex-grow="0" >VIEW LEADERBOARD</Button>
                </Flex>
            </Flex>
        </Box>
    );
};
export default MatchlostDisplay;