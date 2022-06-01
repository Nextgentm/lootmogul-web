import {
    Flex,
    Box,
    Text,
    Progress,
    CircularProgress,
    CircularProgressLabel
} from "@chakra-ui/react";
import Icons from "./Icons";
const ProgressBars = ({
    currentQuestionNo,
    totalQuestions,
    timer,
    maxTime,
    onAudioClick,
    voiceOver,
    timerValue
}) => {
    return (
        <>
            <Box d="flex" justifyContent="space-between">
                <Flex alignItems="center">
                    <CircularProgress value={100} size="40px" color="#EBCE2C">
                        <CircularProgressLabel color="white">
                            {currentQuestionNo + 1}/{totalQuestions}
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text
                        color="white"
                        ml="2"
                        fontWeight="bold"
                        fontSize={{
                            base: "12px",
                            sm: "12px",
                            md: "16px",
                            lg: "16px"
                        }}
                    >
                        Question
                    </Text>
                </Flex>
                <Flex>
                    <Icons voiceOver={voiceOver} onAudioClick={onAudioClick} />
                </Flex>
            </Box>
            <Box mt="7px">
                {maxTime > 0 && (
                    <>
                        <Progress
                            colorScheme="red"
                            backgroundColor="rgba(108, 130, 164, 0.4)"
                            size="sm"
                            value={timerValue}
                            min={0}
                            max={maxTime * 1000}
                            borderRadius="5px"
                        />
                        <Text
                            fontSize={{
                                base: "11px",
                                sm: "11px",
                                md: "20px",
                                lg: "20px"
                            }}
                            fontWeight="600"
                            mt="8px"
                            backgroundColor="white"
                            color="#FF6E3B"
                            borderRadius="10px"
                            w={{
                                base: "65px",
                                sm: "95px",
                                md: "129px",
                                lg: "129px"
                            }}
                            p={{
                                base: "1px 0px",
                                sm: "3px 0px",
                                md: "10px 0px",
                                lg: "10px 0px"
                            }}
                            fontFamily="Sora"
                            fontStyle="normal"
                            lineHeight="25px"
                            letterSpacing="0px"
                            textAlign="center"
                        >
                            {timer} sec
                        </Text>
                    </>
                )}
            </Box>
        </>
    );
};
export default ProgressBars;
