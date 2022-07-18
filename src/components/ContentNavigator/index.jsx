/* eslint-disable react/jsx-key */
import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const ContentNavigator = ({
    handleLeftArrowClick,
    handleRightArrowClick,
    showViewAll = true,
    showArrows = true,
    onViewAllClicked
}) => {
    const [allClicked, setAllClicked] =useState(false);
    return (
        <Flex>
            {showViewAll && (
                <Text
                    onClick={()=>{
                        setAllClicked(!allClicked);
                        onViewAllClicked();}}
                    color="#43CCE9"
                    fontFamily="Sora"
                    fontSize="14px"
                    cursor="pointer"
                >
                   {allClicked?" View Less": "View All"}
                </Text>
            )}

            {showArrows && !allClicked && (
                <>
                    <Box
                        ml="20px"
                        cursor="pointer"
                        onClick={handleLeftArrowClick}
                    >
                        <Image
                            alt="left"
                            width={"16px"}
                            height={"16px"}
                            src={`/assets/arrow-left.png`}
                        />
                    </Box>
                    <Box
                        ml="20px"
                        cursor="pointer"
                        onClick={handleRightArrowClick}
                    >
                        <Image
                            alt="right"
                            width={"16px"}
                            height={"16px"}
                            src={`/assets/arrow-right.png`}
                        />
                    </Box>
                </>
            )}
        </Flex>
    );
};

export default ContentNavigator;
