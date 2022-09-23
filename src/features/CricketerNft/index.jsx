import {
    Box,
    Flex,
    Text,
    Input,
    Button,
    Link,
    FormControl,
    FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import WhyBuyNft from "./WhyBuyNft";
import DroppingSoonNft from "./DroppingSoonNft";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import strapi from "../../utils/strapi";

const CricketerNft = () => {
    const [msg, setMessage] = useState(null);
    const EmailValidation = yup.object().shape({
        email: yup.string().email().required()
    });
    const createSubscription = async (email) => {
        let subscription = { email: email };
        strapi
            .create("subscriptions", subscription)
            .then((resp) => {
                if (resp.data) {
                    setMessage("Subscribed Successfully!!!");
                } else setMessage("Already Subscribed with this Email!!!");
            })
            .catch((err) => {
                setMessage("Already Subscribed with this Email!!!");
            });
    };
    return (
        <>
            <Link
                _hover={{ textDecoration: "none" }}
                _focus={{ border: "none", boxShadow: "none" }}
                href="https://bit.ly/3LQlaLV"
            >
                <Box
                    pos="relative"
                    w="100%"
                    h={["220px", "320px", "360px", "460px", "580px"]}
                >
                    <Image
                        alt={`cricket`}
                        layout="fill"
                        src="/assets/Cricket_Nft_Banner.jpg"
                    />
                </Box>
            </Link>
            <Box
                m="4%"
                mt="2%"
                paddingLeft={["2px", "20px"]}
                paddingRight={["2px", "20px"]}
                color="white"
                fontFamily={"Sora"}
                textAlign="justify"
            >
                <Text
                    color="white"
                    fontFamily="Blanch"
                    fontSize={["28px", "28px", "28px", "58px"]}
                >
                    WHAT IS NFT?
                </Text>
                <Text variant="hint" mt="10px" fontSize="14px">
                    An NFT is a non-fungibletoken that essentially allows its
                    buyer to own the original copy of digital art in the same
                    way you might own the original copy of a place of physical
                    art. Simply, these are digital assets that are rare, and
                    unique. Their value appreciates with time as you sell, trade
                    or auction.
                </Text>

                <WhyBuyNft />
                <DroppingSoonNft />
                <Flex
                    alignItems={"center"}
                    direction="column"
                    mt="20px"
                    mb="20px"
                    ml={["20px", "20px", "20px", "60px"]}
                    mr={["20px", "20px", "20px", "60px"]}
                >
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize={["28px", "38px", "38px", "58px"]}
                    >
                        STAY TUNED!
                    </Text>
                    <Text
                        color="white"
                        fontFamily="Sora"
                        fontSize={["14px", "16px", "16px", "20px"]}
                    >
                        Get Latest NFT Updates
                    </Text>
                    <Text variant="hint" mt="2px" fontSize="14px">
                        Subscribe Now!
                    </Text>
                    {msg ? (
                        <Text
                            color="white"
                            fontFamily="Sora"
                            mt="3%"
                            fontSize={["14px", "16px", "16px", "20px"]}
                        >
                            {msg}
                        </Text>
                    ) : (
                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={EmailValidation}
                            onSubmit={async (values, actions) => {
                                createSubscription(values.email);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Box mt="1%" m="auto" textAlign={"center"}>
                                        <Field name="email">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.email &&
                                                        form.touched.email
                                                    }
                                                >
                                                    <Input
                                                        mt="5%"
                                                        id="email"
                                                        {...field}
                                                        bgColor={"white"}
                                                        borderRadius={"1px"}
                                                        width="100%"
                                                        textAlign="center"
                                                        type="email"
                                                        placeholder="Enter your email Id"
                                                        textColor={"black"}
                                                    />
                                                    <FormErrorMessage color="primary_1">
                                                        {form.errors.email}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                            mt="5%!important"
                                            type="submit"
                                            borderRadius={"1px"}
                                            margin="auto"
                                            width="50%"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default CricketerNft;
