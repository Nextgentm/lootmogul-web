import React from "react";
import { Box, Text, Link, Image } from "@chakra-ui/react";

const InfluencerPaymentPartner = () => {
    const payments = ["stripe.webp", "paypal.webp"];
    return (
        <Box>
            <Text
                variant="BoldWhiteText"
                // fontSize={["18px", "25px", "30px", "35px", "35px"]}
            >
                Influencer
            </Text>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="/influencers/signup"
            >
                <Text variant="LightWhiteText">Influencer Signup</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                href="/influencers/earning"
            >
                <Text variant="LightWhiteText">Influencer Earning</Text>
            </Link>
            <Box mt="40px">
                <Box
                    justify={["center"]}
                    wrap="wrap"
                    mt="20px"
                    alignItems="center"
                >
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize="35px"
                        fontWeight={500}
                        lineHeight="35px"
                        // mb="35px"
                    >
                        Our Payment <br /> Partners
                    </Text>
                    {payments.map((img, index) => (
                        <Box
                            key={`pay-${index}`}
                            // m="10px"
                            width={"120px"}
                            height={"auto"}
                            position="relative"
                        >
                            <Image
                                alt={img}
                                objectFit="contain"
                                layout="fill"
                                src={`/assets/${img}`}
                                mt="30px"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default InfluencerPaymentPartner;
