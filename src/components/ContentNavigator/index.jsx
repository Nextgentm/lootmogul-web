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
                    color="white"
                    fontFamily="Sora"
                    fontSize="14px"
                    cursor="pointer"
                >
                   {allClicked?" VIEW LESS": "VIEW ALL"}
                </Text>
            )}

            
        </Flex>
    );
};

export default ContentNavigator;
