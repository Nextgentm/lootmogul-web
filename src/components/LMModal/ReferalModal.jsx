/* eslint-disable react/jsx-key */
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";
import Image from "next/image";

const ReferalModal = () => {
    return (
        <Box
            pos="relative"
            bgImage="url('/assets/login-bg.png')"
            bgPosition={["right", "inherit"]}
            bgRepeat="no-repeat"
            bgSize="cover"
            p="2%"
            height="100%"
        >
            <Box
                border="1px dashed #515151;"
                w="100%"
                m="auto"
                textAlign="center"
            >
                <Flex p="10px" justifyContent={"center"}>
                    <Heading mt="1%" variant="modalHeader">
                        REFER AND EARN
                    </Heading>
                </Flex>

                <Box p="10px">
                    <Box
                        pos="relative"
                        m="auto"
                        h={["150px", "250px", "250px", "310px"]}
                        width={["180px", "250px", "250px", "324px"]}
                    >
                        <Image
                            alt="refer"
                            src="/assets/referafriend.png"
                            layout="fill"
                        />
                    </Box>
                    <Input placeholder="Enter Referal Code" />
                </Box>

                <Button mt="15px!important" mb="20px!important" m="auto">
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default ReferalModal;
