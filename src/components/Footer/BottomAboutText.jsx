import React from 'react'
import {Box, Text, } from "@chakra-ui/react";

const BottomAboutText = () => {
  return (
    <Box>
    <Box w="100%" h="3px" bg="#FFF" my="20px" />

    <Text
        my="45px"
        variant="footerText"
        fontWeight="500"
        fontSize="18px"
        w="85%"
        mx="auto"
    >
        © 2023 LootMogul. All Rights Reserved. HQ: 3301 Ocean Park
        Blvd, Unit 205, Santa Monica, CA 90405
    </Text>
    <Text variant="footerText" w="85%" fontWeight="400" fontSize="14px" mx="auto">
        LootMogul venture is accelerated by National Basketball
        Player Association in collaboration with Andreessen Horowitz
        (a16z) cultural leadership fund and Patricof co.{" "}
    </Text>
    <Text mx="auto" w="85%" variant="footerText" my="40px" fontSize="14px">
        LootMogul is NOT AFFILIATED, AUTHORIZED, LICENSED OR
        ENDORSED by NBA (National Basketball Association), NFL
        (National Football League), MLB (Major League Baseball), NHL
        (National Hockey League), MLS (Major League Soccer), NCAA
        (National College Athletic Association) or any other
        professional and amateur organization.
    </Text>
</Box>
  )
}

export default BottomAboutText