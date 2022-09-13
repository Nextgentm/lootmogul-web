import React from "react";
import {
    Text,
    Flex,
    Box} from "@chakra-ui/react";
import Image from "next/image";
const GameCarouselCard = ({ contestmaster, sectionName }) => {
    const imgUrl = contestmaster?.icon?.data?.url;

    return (
        <Flex   mb={["8%","5%"]} textAlign={"center"} >
                                {/* <Text
                                    fontWeight="bold"
                                    fontSize="30px"
                                    fontFamily="Sora"
                                    color="#FFC133"
                                    style={{
                                        background:
                                            "-webkit-linear-gradient(#FF703B, #FFC133)",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color": "transparent"
                                    }}
                                >
                                {contestmaster?.name}
                                </Text> */}
                                {/* <Text
                                    fontWeight="bold"
                                    fontSize="18px"
                                    color="#C7C7C7"
                                    
                                    
                                    lineHeight="16px"
                                >
                                {sectionName}
                                </Text> */}

                   {imgUrl &&     <Image m="auto" width="240px" height="240px" alt="bg" src = {imgUrl}></Image>}
                   </Flex>    );
};

export default GameCarouselCard;
