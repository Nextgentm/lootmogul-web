import React from 'react'
import { Flex, Box, Text, Link, Input, Button } from "@chakra-ui/react";

const ContactUsSubmit = () => {
  return (
    <Box>
    <Box mb="30px">
        <Text
        textAlign={["center","center","center","left"]}
            variant="BoldWhiteText"
            fontWeight="500 !important"
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
            href="mailto:support@lootmogul.com"
        >
            <Text  textAlign={["center","center","center","left"]}  variant="LightWhiteText">
                support@lootmogul.com
            </Text>
        </Link>
    </Box>
    <Text
     textAlign={["center","center","center","left"]}
        fontWeight="500 !important"
        variant="BoldWhiteText"
        fontSize={["18px", "25px", "30px", "35px"]}
    >
        Get The latest Updates
    </Text>
    <Flex ml={["15px","15px","15px","0px"]} >
        <Input
            bg="#FFF"
            w={[
                "200px",
                "250px",
                "250px",
                "200px",
                "250px",

                
            ]}
            padding="24px 0px"
        />
        <Button
            className="influencer-card-btn"
            // width="20%"
            fontSize={"15px"}
            pos="relative"
            right="1rem"
            padding="25px 20px"
            fontWeight="200"
            bg="#e90a63 !important"
            borderRadius="0px 5px 5px 0px"
        >
            Submit
        </Button>
    </Flex>
</Box>
  )
}

export default ContactUsSubmit