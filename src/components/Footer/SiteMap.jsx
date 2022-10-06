import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const SiteMap = () => {
    return (
        <Box>
            <Text
                variant="BoldWhiteText"
                // fontSize={["18px", "25px", "30px", "35px", "35px"]}
            >
                Site Map
            </Text>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="https://metaverse.lootmogul.com/what-is-metaverse/"
            >
                <Text variant="LightWhiteText">What is Metaverse ?</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="https://metaverse.lootmogul.com/what-is-nft/"
            >
                <Text variant="LightWhiteText">What is NFT ?</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="https://lootmogul.wpengine.com/about-us/"
                isExternal
            >
                <Text variant="LightWhiteText">About us</Text>
            </Link>
            <Link _focus={{ border: "none", boxShadow: "none" }} href="/faq">
                <Text variant="LightWhiteText">FAQ</Text>
            </Link>
            <Link
                _focus={{ boxShadow: "none" }}
                href="https://lootmogul.wpengine.com/privacy-policy/"
                isExternal
            >
                <Text variant="LightWhiteText">Privacy Policy</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="https://lootmogul.wpengine.com/terms-conditions/"
                isExternal
            >
                <Text variant="LightWhiteText">Terms & Services</Text>
            </Link>
            <Text variant="LightWhiteText">Blog</Text>
        </Box>
    );
};

export default SiteMap;
