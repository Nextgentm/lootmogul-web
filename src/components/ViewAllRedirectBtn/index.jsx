import { Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ViewAllRedirectBtn = ({slug}) => {
    const router = useRouter();

    return (
        <Flex
            alignItems="center"
            cursor="pointer"
            w="100%"
            justifyContent="right"
        >
            <Text
                onClick={() => {
                    router.push("/contest-section/"+slug);
                }}
                color="white"
                fontFamily="Blanch"
                fontSize={["1.3em", "1.3em", "1.5em", "2em", "2em"]}
            >
                VIEW ALL
            </Text>
            <Image
                alt=""
                src="/assets/rightArrow.png"
                ml="0.5em"
                boxSize={["10px", "15px"]}
            />
        </Flex>
    );
};

export default ViewAllRedirectBtn;
