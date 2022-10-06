import React from 'react'
import { Flex, Box, Text, Link, Input, Button } from "@chakra-ui/react";

const ContactUsSubmit = () => {
  return (
    <Box w={["100%", "100%", "60%", "auto"]} mr={["20px", "20px", "20px", "unset"]}>
    <Box mb="30px">
        <Text
        textAlign={["center","center","left","left"]}
            variant="BoldWhiteText"
            fontWeight="400 !important"
            mt="0"
            mb="20px"
            lineHeight="1"
            fontSize="35px"
            // fontSize={[
            //     "18px",
            //     "25px",
            //     "30px",
            //     "35px",
            //     "35px"
            // ]}
        >
            Contact Us
        </Text>
        <Link
            _focus={{
                border: "none",
                boxShadow: "none"
            }}
            _hover={{ textDecoration: "none" }}
            href="mailto:support@lootmogul.com"
        >
            <Text  textAlign={["center","center","left","left"]}  variant="LightWhiteText" fontSize="17px" mb="0">
                support@lootmogul.com
            </Text>
        </Link>
    </Box>
    <Text
     textAlign={["center","center","left","left"]}
        fontWeight="400 !important"
        variant="BoldWhiteText"
        mt="50px"
        mb="20px"
        lineHeight="1"
        fontSize={["30px", "30px", "30px", "30px"]}
    >
        Subscribe to get the updates
    </Text>
    <Flex ml={["0","0","0","0px"]} >
        <Input
            bg="#FFF"
            w={[
                "70%",
                "70%",
                "235px",
                "200px",
                "235px",

                
            ]}
            padding="6px 16px"
            height="47px"
            borderRadius="10px 0 0 10px"
            fontWeight="400"
        />
        <Button
            className="influencer-card-btn"
            // width="20%"
            fontSize={"15px"}
            pos="relative"
            right="0"
            padding="20px 20px"
            height="47px"
            fontWeight="400"
            bg="#e90a63 !important"
            borderRadius="0 10px 10px 0"
            boxShadow="unset"
            w={[
                "30%",
                "30%",
                "auto",
                "auto",
                "auto",
            ]}
        >
            Submit
        </Button>
    </Flex>
</Box>
  )
}

export default ContactUsSubmit