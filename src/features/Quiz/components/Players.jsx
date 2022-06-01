import {
    Box,
    Flex,
    Text,
    Avatar,
    useMediaQuery,
    Spacer
} from "@chakra-ui/react";
import { ScoreIcon } from "../../../components/Icons";
import React, { useState } from "react";
const Players = ({ users }) => {
    const colours = ["#161C3A", "#202847", "#2B3554", "#364261", "#161C3A"];
    const svg = ["#7C54DC", "#FF6E3B", "#E2D173", "#51E36E", "#FF2E00"];

    return (
        <>
            <Flex
                flexDirection={{
                    base: "row",
                    sm: "row",
                    md: "column",
                    lg: "column"
                }}
                className="test"
                mt={{ base: "0", sm: "0", md: "50", lg: "50" }}
                px={{ base: "0", sm: "0", md: "5", lg: "5" }}
                justifyContent="center"
            >
                {users?.map((user, index) => (
                    // <motion.Box  transition={{duration:1.5}} animate={useIsMedium ? { y:100} : { x:118}} >

                    <Box
                        h={{ base: "90px", sm: "90px", md: "66px", lg: "66px" }}
                        mb="2"
                        pb={{ base: "0", sm: "0", md: "3", lg: "3" }}
                        pt={{ base: "2", sm: "2", md: "3", lg: "3" }}
                        width={{
                            base: "20%",
                            sm: "20%",
                            md: "100%",
                            lg: "100%"
                        }}
                        d="flex"
                        flexDirection={{
                            base: "column",
                            sm: "column",
                            md: "row",
                            lg: "row"
                        }}
                        color="white"
                        backgroundColor={colours[index]}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            px="3"
                            py="4"
                            flexDirection={{
                                base: "column",
                                sm: "column",
                                md: "row",
                                lg: "row"
                            }}
                        >
                            <Avatar
                                boxSize="45px"
                                name={user.username}
                                src={user.profile_pic}
                                pos="relative"
                                border="4px solid  #FFFFFF"
                            backgroundImage="linear-gradient(20deg, #9A9A9A 10%, rgba(55, 55, 55, 0.5) 100%)"
                            >
                                <ScoreIcon
                                    mt="2px"
                                    score={user?.score}
                                    viewBox="0 0 48 48"
                                    boxSize={"45px"}
                                    color={svg[index]}
                                    pos="absolute"
                                    bottom={{
                                        base: "-21px",
                                        sm: "-18px",
                                        md: "1px",
                                        lg: "1px"
                                    }}
                                    left={{
                                        base: "-4px",
                                        sm: "-4px",
                                        md: "174px",
                                        lg: "174px"
                                    }}
                                />
                            </Avatar>

                            <Text
                                 fontFamily="Sora"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                // w={["51px","65px","","80px"]}
                                ml={ {base: "0px",
                                sm: "0px",
                                md: "2",
                                lg: "2"}}
                                w={{base: "51px",
                                sm: "50%",
                                md: "100px",
                                lg: "100px"}}
                                textOverflow="ellipsis"
                                pos="relative"
                                fontWeight="600"
                                bottom={["60px","60px","0px"]}
                                fontSize={["8px","11px"]}
                                textTransform="uppercase"

                            >
                                {user.username}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </>
    );
};
export default Players;
