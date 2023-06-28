/* eslint-disable react/jsx-key */
import React from "react";
import { Box, Text, Flex,Image } from "@chakra-ui/react";

import { useState } from "react";

const CardNavigator = ({
    handleLeftArrowClick,
    handleRightArrowClick,
    children
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Flex>
            <Box
                cursor="pointer"
                top="15em"
                pos="relative"
                onClick={() => {
                    handleLeftArrowClick();
                }}
            >
                <Image
                    alt="left"

                    transform=" scale(-1)"
                    onClick={toggleOpen}
                    src={
                        !isOpen
                            ? "/assets/nfts/RightArrow.svg"
                            :  "/assets/nfts/RightArrow.svg"
                    }
                />
            </Box>
            {children}
            <Box
                cursor="pointer"
                top="15em"
                pos="relative"
                onClick={handleRightArrowClick}
            >
                <Image
                    alt="right"
                    
                    src={
                        !isOpen
                            ? "/assets/nfts/RightArrow.svg"
                            : "/assets/nfts/RightArrow.svg"
                    }
                />
            </Box>
        </Flex>
    );
};

export default CardNavigator;
