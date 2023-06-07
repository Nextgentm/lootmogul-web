/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import React from "react";
import {
    Box,
    Text,
    Flex,
    Table,
    Tr,
    Td,
    Tbody,
    Avatar
} from "@chakra-ui/react";
import Image from "next/image";

const ScoreDisplay = ({ user, userResult, userStats, lbResult }) => {
    return (
        <Box
            className="abc"
            width={["90%","90%", "44%"]}
            height={["350px","300px", "390px"]}
            border={"1px solid #E90A63"}
            margin={"auto"}
            borderRadius="10px"
            direction={["column", "row"]}
            p="15px"
        >
            <Flex
                m="auto"
                direction={"row"}
                width="97%"
                justifyContent={"space-around"}
                alignItems="center"
                className="abc1"
            >
                <Flex
                    width={["30%", "38%"]}
                    height={["87px", "110px"]}
                    borderRadius="10px"
                    mt="40px"
                    direction={["column"]}
                    textAlign="center"
                    padding="2%"
                >
                    <Text
                        width={["100%", "100%"]}
                        height={["25%", "18%"]}
                        fontFamily={"Sora"}
                        fontWeight="700"
                        fontSize={["9px","12px" , "18px"]}
                        textColor="#FFFFFF"
                        direction="row"
                        lineHeight={["22px", "30px"]}
                    >
                        Your Rank
                    </Text>
                    <Box
                        width={["80%", "60%"]}
                        height={["43px", "50px"]}
                        background="linear-gradient(90deg, #E90A63 0%, rgba(69, 228, 118, 0) 100%)"
                        m="auto"
                        borderRadius="5px 0px 0px 5px"
                        alignContent={"center"}
                        mt={["20px","35px", "20px"]}
                    >
                        <Text
                            width={["80%", "100%"]}
                            height={["100%", "50%"]}
                            justifyContent={"center"}
                            m="auto"
                            fontSize={"30px"}
                            fontweight="410"
                            letter-spacing="0.04em"
                            fontFamily={"Blanch"}
                            textColor="#FFFFFF"
                        >
                            {lbResult
                                ? lbResult?.currentRank
                                : userResult?.rank}
                        </Text>
                    </Box>
                </Flex>
                <Box
                    pos="relative"
                    m="auto"
                    textAlign={"center"}
                    width={["150px","220px","220px"]}
                    height={["140px","160px","160px"]}
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    bgSize="contain"
                    backgroundImage={"/assets/not_win_user_bg.png"}
                >
                    <Avatar
                        name={user.fullName}
                        src={user.profilePic}
                        boxSize={{
                            base: "60px",
                            sm: "60px",
                            md: "80px",
                            lg: "80px"
                        }}
                        showBorder={true}
                        mt="40px"
                    ></Avatar>
                </Box>                
                

                <Flex
                    width={["30%", "38%"]}
                    height={["87px", "110px"]}
                    borderRadius="10px"
                    textAlign="center"
                    mt="40px"
                    direction={["column"]}
                    padding="2%"
                >
                    <Text
                        width={["100%", "100%"]}
                        height={["25%", "18%"]}
                        fontFamily={"Sora"}
                        fontWeight="700"
                        fontSize={["9px","12px", "18px"]}
                        textColor="#FFFFFF"
                        direction="row"
                        lineHeight={["22px", "30px"]}
                    >
                        Your Points
                    </Text>
                    <Box
                        width={["80%", "60%"]}
                        height={["43px", "43px"]}
                        background="linear-gradient(90deg, #E90A63 0%, rgba(69, 228, 118, 0) 100%)"
                        m="auto"
                        borderRadius="5px 0px 0px 5px"
                        alignContent={"center"}
                        mt={["20px","35px", "20px"]}
                    >
                        <Text
                            color="white"
                            width={["80%", "100%"]}
                            height={["100%", "50%"]}
                            justifyContent={"center"}
                            m="auto"
                            fontSize={"30px"}
                            fontweight="410"
                            letter-spacing="0.04em"
                            fontFamily={"Blanch"}
                            textColor="#FFFFFF"
                        >
                            {userResult?.points}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Flex
                justifyContent={"center"}
                direction={["row"]}
                className="abc2"
            >
                {userResult?.reward && (
                    <Text
                        fontFamily="Blanch"
                        width={["100%", "100%"]}
                        height={["0px", "15px", "33px"]}
                        fontSize={["25px","40px", "50px"]}
                        color="#E90A63"
                        textAlign={"center"}
                    >
                        {userResult?.reward}{" "}
                    </Text>
                )}
                {userResult?.waitingMessage || (
                    <Text
                        textAlign={"center"}
                        width="473px"
                        height={["18px","18px","18px"]}
                        ml="-60%"
                        mt="1%"
                        fontSize={"14px"}
                        textColor={"#C4C4C4"}
                    >
                        {userResult?.waitingMessage}{" "}
                    </Text>
                )}
                {userResult?.lostTitle && (
                    <Flex
                        ml={["-66%", "-55%", "-40%"]}
                        mt={["-13%", "-9%", "-5%"]}
                    >
                        <Text
                            width={["", "62px"]}
                            height={["", "18px"]}
                            fontSize={["10px", "14px"]}
                            textColor={"#FFFFFF"}
                            fontWeight="bold"
                        >
                            {userResult?.lostTitle}{" "}
                        </Text>
                    </Flex>
                )}
                {userResult?.lostMessage && (
                    <Flex
                        ml={["-17%", "-19%", "-20%"]}
                        mt={["-5%", "-3%", "-2%"]}
                    >
                        <Text
                            fontFamily="Blanch"
                            text
                            align={"center"}
                            width={["", "167px"]}
                            height={["", "33px"]}
                            fontSize={["15px", "30px"]}
                            text-shadow="0px 4px 10px rgba(0, 0, 0, 0.55)"
                            bgGradient="linear(to-l, #43C8FF, #45E470)"
                            bgClip="text"
                        >
                            {userResult?.lostMessage}{" "}
                        </Text>
                    </Flex>
                )}
            </Flex>
            <Flex
                width={["97%", "100%"]}
                justifyContent={"center"}
                direction={["row"]}
                m="auto"
                className="abc3"
            >
                <Box
                    width={["200px","250px","100px"]}
                    height="1px"
                    background="linear-gradient(90deg, #E90A63 0%, rgba(69, 228, 118, 0) 100%)"
                    mt={["15px","35px","35px"]}
                    direction="row"
                ></Box>
            </Flex>
            <Table size="sm" variant="unstyled" mt="5">
                <Tbody>
                    <Tr>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "16px", "19px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {" "}
                            Average Score
                        </Td>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px","16px", "19px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {" "}
                            {lbResult
                                ? lbResult?.averageScore
                                : userStats?.averageScore}
                        </Td>
                    </Tr>

                    <Tr>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "16px", "19px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            All-time high Score
                        </Td>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "16px", "19px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {lbResult
                                ? lbResult?.bestScore
                                : userStats?.allTimeHigh}
                        </Td>
                    </Tr>
                    {lbResult && (
                        <Tr>
                            <Td
                                textColor={"#FFFFFF"}
                                fontSize={["14px", "16px", "19px"]}
                                textAlign={"justify"}
                                fontWeight={"700"}
                            >
                                Rank 1 Score
                            </Td>
                            <Td
                                textColor={"#FFFFFF"}
                                fontSize={["14px", "16px", "19px"]}
                                textAlign={"justify"}
                                fontWeight={"700"}
                            >
                                {lbResult?.rank1Score}
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default ScoreDisplay;
