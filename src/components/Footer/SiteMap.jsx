import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const SiteMap = () => {
    return (
        <Box>
            <Text
                variant="BoldWhiteText"
                fontSize={["30px", "30px", "35px", "35px"]}
                mt="10px"
                mb="20px"
                lineHeight="1.2"
            >
                SiteMap
            </Text>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href="https://metaverse.lootmogul.com/what-is-metaverse/"
            >
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>What is Metaverse ?</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href="https://metaverse.lootmogul.com/what-is-nft/"
            >
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>What is NFT ?</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href="https://lootmogul.wpengine.com/about-us/"
            >
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>About us</Text>
            </Link>
            <Link _focus={{ border: "none", boxShadow: "none" }} _hover={{ textDecoration: "none" }} href="/faq">
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>FAQ</Text>
            </Link>
            <Link _focus={{ border: "none", boxShadow: "none" }} _hover={{ textDecoration: "none" }} href="https://lootmogul.wpengine.com/news/">
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>News</Text>
            </Link>
            <Link _focus={{ border: "none", boxShadow: "none" }} _hover={{ textDecoration: "none" }} isExternal href="https://metaverse.lootmogul.com/wp-content/uploads/2022/10/Litepaper.pdf">
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2"  fontSize={["15px", "15px", "16px", "16px"]}>Litepaper</Text>
            </Link>
            <Link
                _focus={{ boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href="https://lootmogul.wpengine.com/privacy-policy/"
                
            >
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>Privacy Policy</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href="https://lootmogul.wpengine.com/terms-conditions/"
                
            >
                <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>Terms of Services</Text>
            </Link>
            {/* <Text variant="LightWhiteText" textTransform="capitalize" py="10px" mb="0" lineHeight="1.2">Blog</Text> */}
        </Box>
    );
};

export default SiteMap;
