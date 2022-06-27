/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import {
    Box,
    Text,
    Flex,
    Button,
    Table,
    Tr,
    Td,
    Tbody,
    Avatar
} from "@chakra-ui/react";
import Image from "next/image";

const ScoreDisplay = ({ user,userResult, userStats, lbResult }) => {
    return (
        <Box
            className="abc"
            width={["auto", "44%"]}
            height={["300px", "330px"]}
            border={"1px solid #F8ED1D"}
            margin={"auto"}
            borderRadius="10px"
            direction={["column", "row"]}
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
                    background="#1C1C1C"
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
                        fontSize={["10px", "14px"]}
                        textColor="#FFFFFF"
                        direction="row"
                    >
                        Your Rank
                    </Text>
                    <Box
                        width={["70%", "60%"]}
                        height={["43px", "43px"]}
                        background="linear-gradient(90deg, #51E36E 0%, rgba(69, 228, 118, 0) 100%)"
                        m="auto"
                        borderRadius="5px 0px 0px 5px"
                        alignContent={"center"}
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
                            {lbResult?lbResult?.currentRank:userResult?.rank}
                        </Text>
                    </Box>
                </Flex>
                {/* <Box
                    width={["65px", "65px"]}
                    height={["65px", "65px"]}
                    margin="auto"
                    mt="7%"
                    ml="15%"
                    bgImage="url('/assets/Ellipse45.jpg')"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgGradient="(180deg, #FFFFFF 50%, rgba(55, 55, 55, 0.2) 100%)"
                >
                    {userResult?.profilePic && (
                        <Box
                            width={["100%", "65px"]}
                            height={["40%", "65px"]}
                            bgClip="image"
                            border="1px solid #9A9A9A"
                            mt={["250%", "7%"]}
                            ml={["-70%", "10%"]}
                        >
                            <Avatar
                                src={userResult?.profilePic}
                                boxSize={{
                                    base: "60px",
                                    sm: "70px",
                                    md: "100px",
                                    lg: "100px"
                                }}
                                showBorder={true}
                            ></Avatar>
                        </Box>
                    )}
                </Box> */}
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
                ></Avatar>

                <Flex
                    width={["30%", "38%"]}
                    height={["87px", "110px"]}
                    background="#1C1C1C"
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
                        fontSize={["10px", "14px"]}
                        textColor="#FFFFFF"
                        direction="row"
                    >
                        Your Points
                    </Text>
                    <Box
                        width={["70%", "60%"]}
                        height={["43px", "43px"]}
                        background="linear-gradient(90deg, #51E36E 0%, rgba(69, 228, 118, 0) 100%)"
                        m="auto"
                        borderRadius="5px 0px 0px 5px"
                        alignContent={"center"}
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
                        text
                        align={"center"}
                        width={["", "229px"]}
                        height={["", "33px"]}
                        fontSize={["18px", "25px"]}
                        textShadow={"0px 4px 10px rgba(0, 0, 0, 0.55)"}
                        bgGradient={"linear(to-l, #EBCE2C, #FF6E3B)"}
                        bgClip="text"
                        mt={["-1%", ""]}
                    >
                        {userResult?.reward}{" "}
                    </Text>
                )}
                {userResult?.waitingMessage && (
                    <Text
                        textAlign={"center"}
                        width="473px"
                        height={"18px"}
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
                    width="300px"
                    height="1px"
                    background="#C4C4C4"
                    mt="10px"
                    direction="row"
                ></Box>
            </Flex>
            <Table size="sm" variant='unstyled' mt="5">
                <Tbody>
                    <Tr>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {" "}
                            Average Score
                        </Td>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {" "}
                            {lbResult?lbResult?.averageScore:userStats?.averageScore} 
                        </Td>
                    </Tr>
                   
                    <Tr>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            All-time high Score
                        </Td>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {lbResult?lbResult?.bestScore:userStats?.allTimeHigh}
                        </Td>
                    </Tr>
                  {lbResult &&  <Tr>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            Rank 1 Score
                        </Td>
                        <Td
                            textColor={"#FFFFFF"}
                            fontSize={["14px", "17px"]}
                            textAlign={"justify"}
                            fontWeight={"700"}
                        >
                            {lbResult?.rank1Score}
                        </Td>
                    </Tr>}
                </Tbody>
            </Table>
           
        </Box>
    );
};

export default ScoreDisplay;
