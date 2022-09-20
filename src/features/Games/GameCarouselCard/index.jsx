import React from "react";
import {
    Text,
    Box} from "@chakra-ui/react";
import Image from "next/image";
const GameCarouselCard = ({ contestmaster, sectionName }) => {
    const imgUrl = contestmaster?.icon?.data?.url;

    return (
        <Box m="auto"  mb={["8%","5%"]} textAlign={"center"}>
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
                                    mb={6}
                                    lineHeight="16px"
                                >
                                {sectionName}
                                </Text> */}

                   {imgUrl &&     <Image m="auto" width="280px" height="280px" alt="bg" src = {imgUrl}></Image>}
                 
                   </Box>    );
};

export default GameCarouselCard;
