import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
    Tooltip
} from "@chakra-ui/react";
import React from "react";

const Explore = ({ data, defaultCategoryName, handleCategoryChange }) => {
    return (
        <Box
            mt={5}
            mx={[10,10,16]}
            
        >
            <Heading variant="sectionTitle">EXPLORE</Heading>
            <Flex
                mt={10}
                mx="auto"
                flexWrap="wrap"
                alignContent={"center"}
            >
                <Button
                    w={["95vw","95vw", "auto"]}
                    mr={["0px","0px", "15px"]}
                    mt="20px"
                    // p="0px"
                    fontSize={[
                        "20px !important",
                        "20px !important",
                        "16px !important"
                    ]}
                    fontWeight={500}
                    variant={"segment"}
                    onClick={() => {
                        handleCategoryChange(defaultCategoryName.toLowerCase());
                    }}
                >
                    <Text fontWeight={500}>{defaultCategoryName}</Text>
                </Button>
                {data?.map((influencerCat, index) => (
                    <Button
                    w={["90vw","90vw", "auto"]}
                        mr={["0px","0px", "15px"]}
                        mt="20px"
                        // p="0px"
                        fontSize={[
                            "20px !important",
                            "20px !important",
                            "16px !important"
                        ]}
                        fontWeight={500}
                        variant={"segment"}
                        onClick={() => {
                            handleCategoryChange(
                                influencerCat.name.toLowerCase()
                            );
                        }}
                    >
                        <Text>{influencerCat.name}</Text>
                    </Button>
                ))}
            </Flex>
        </Box>
    );
};

export default Explore;
