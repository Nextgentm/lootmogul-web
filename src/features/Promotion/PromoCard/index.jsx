import React from "react";
import {
    Text,
    Box,
    Button
    // Link
} from "@chakra-ui/react";
import Image from "next/image";

import { HorizontalLine } from "../../../components/Icons";
import { useRouter } from "next/router";
const PromoCard = ({ promotion, isDetailed }) => {
    const router = useRouter();

    const deposit = (data) => {
        router.push("/promotions/" + data);
    };
    return (
        <Box
            h={"auto"}
            w="100%"
            rounded="lg"
            bg="#202020"
            shadow="md"
            cursor="pointer"
            onClick={() => {
                deposit(promotion?.slug);
            }}
        >
            <Box
                h={["170px", "191px"]}
                margin={["12px", "15px"]}
                pos="relative"
                roundedTop="lg"
            >
                <Image
                    layout="fill"
                    src={promotion?.bannerImage?.data[0]?.url}
                    alt="Article"
                />
                {promotion?.overlay === "live" && (
                    <Image
                        pos="absolute"
                        alt={`action`}
                        layout="fill"
                        src={"/assets/livebanner.webp"}
                    />
                )}
                {promotion?.overlay === "expired" && (
                    <Image
                        pos="absolute"
                        alt={`action`}
                        layout="fill"
                        src={"/assets/completedbanner.webp"}
                    />
                )}
            </Box>
            <Box w="100%">
                <HorizontalLine boxSize="100%" color="black" />
            </Box>

            <Box p={["12px", "15px"]}>
                <Box>
                    <Text
                        fontSize={["sm", "md"]}
                        fontWeight={"600"}
                        color={"white"}
                        fontFamily={"Sora"}
                    >
                        {promotion?.name}
                    </Text>

                    <Text
                        mt={2}
                        fontSize={["xs", "sm"]}
                        noOfLines={4}
                        fontWeight="normal"
                        fontFamily={"Sora"}
                        textOverflow="ellipsis"
                        color={"#C7C7C7"}
                        minHeight="75px"
                    >
                        {promotion?.description}
                    </Text>
                </Box>

                <Box mt={4}>
                {promotion.status === "active" ? (       <Button
                        w="30%"
                        h="38px"
                        mt="1%"
                        size={["lg", "xl"]}
                        onClick={() => {
                            if (
                                promotion.callToAction &&
                                promotion.callToAction !== ""
                            )
                                router.push(promotion.callToAction);
                        }}
                    >
                        {promotion?.ctaButtonTitle}
                    </Button>):(<Button
                w="30%"
                h="38px"
                mt="1%"
                size={["lg","xl"]}
               disabled
            >
                  
                {promotion?.status}
            
            </Button>)}
                </Box>
            </Box>
        </Box>
    );
};

export default PromoCard;
