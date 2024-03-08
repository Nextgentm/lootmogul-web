import React from "react";
import { Box, Text, Link, Image, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../../../src/utils/AppContext";

const InfluencerPaymentPartner = () => {
    const { isMobileDevice } = useContext(AppContext);

    //const payments = ["stripe.webp", "bitpay-logo.png", "paypal.webp", "MoonPay-logo.png"];
    const payments = ["logo-payment.png"];
    return (
        <Box width={["50%", "50%", "100%", "100%"]}>
            <Text
                variant="BoldWhiteText"
                fontSize={["30px", "30px", "35px", "35px"]}
                mt="10px"
                mb="20px"
                lineHeight="1"
            >
                Ambassador
            </Text>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href={process.env.NEXT_PUBLIC_WORDPRESS_URL + "/ambassador-onboarding-form/"}
            >
                <Text variant="LightWhiteText" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>Ambassador Onboarding Form</Text>
            </Link>
            <Link
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                href={process.env.NEXT_PUBLIC_WORDPRESS_URL + "/influencer-earnings/"}
            >
                <Text variant="LightWhiteText" py="10px" mb="0" lineHeight="1.2" fontSize={["15px", "15px", "16px", "16px"]}>Ambassador Earning</Text>
            </Link>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={2}>
                <GridItem>
                    <Link
                        _focus={{ border: "none", boxShadow: "none" }}
                        _hover={{ textDecoration: "none" }}
                        href="https://marketplace.lootmogul.com/"
                        isExternal
                        mt={['10px','10px','30px']}
                        mb={['5px','5px','20px']}
                        display="flex"
                        alignItems="center"
                    >
                        <Image
                            alt='Icon'
                            objectFit="contain"
                            layout="fill"
                            src={`/assets/marketplace-icon.svg`}
                            width={"auto"}
                            height={"25px"}
                        />
                        <Text variant="LightWhiteText" pl="10px" mb="0" lineHeight="1.2" fontSize="16px">Marketplace</Text>
                    </Link>
                </GridItem>
               
            </Grid>
            <Box  mt={['0px','0px','30px']}>
                <Box
                    justify={["center"]}
                    wrap="wrap"
                    mt={['0px','0px','20px']}
                    alignItems="center"
                >
                    <Text
                        color="white"
                        variant="BoldWhiteText"
                        fontFamily="Blanch"
                        fontSize={["30px", "30px", "35px", "35px"]}
                        lineHeight="35px"
                        mb="25px"
                    >
                        Our Payment Partners
                    </Text>
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']} gap={2}>
                    {payments.map((img, index) => (
                        <GridItem w='100%' h='45px' >
                        <Box
                            key={`pay-${index}`}
                            // m="10px"
                            width={["80%", "80%","100%"]}
                            height={"auto"}
                            position="relative"
                        >
                            {isMobileDevice ? <Image
                                alt={"paymrnt-logo-vertical.png"}
                                objectFit="contain"
                                layout="fill"
                                src={[`/assets/paymrnt-logo-vertical.png`]}
                                mt="0px"
                                mb="20px"
                                width={"100%"}
                                height={["auto","auto","auto"]}
                            />
                            : <Image
                                alt={img}
                                objectFit="contain"
                                layout="fill"
                                src={[`/assets/${img}`]}
                                mt="0px"
                                mb="20px"
                                width={"100%"}
                                height={["40px","40px","auto"]}
                            />}
                        </Box>
                        </GridItem>
                    ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default InfluencerPaymentPartner;
