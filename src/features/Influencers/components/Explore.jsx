import { Box, Button, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Search from "./search";

const Explore = ({
    data,
    defaultCategoryName,
    handleCategoryChange,
    activeCategory,
    searchText
}) => {
    return (
        <Box mt={5} mx={[10, 10, 16]}>
            <SimpleGrid columns={3} spacing={100}>
                <box height='80px'>
                    <Heading variant="sectionTitle">EXPLORE</Heading>
                </box>
                <box></box>
                <box height='80px'>
                    <Search searchText={searchText}></Search>
                </box>
            </SimpleGrid>
            <Flex mt={10} mx="auto" flexWrap="wrap" alignContent={"center"}>
                <Button
                    w={["95vw", "95vw", "auto"]}
                    mr={["0px", "0px", "15px"]}
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
                    _focus={{
                        bgImage:
                            "linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                    }}
                    bgImage={
                        activeCategory == defaultCategoryName &&
                        "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                    }
                >
                    <Text fontWeight={500}>{defaultCategoryName} </Text>
                </Button>
                {data?.map((influencerCat, index) => (
                    <Button
                        w={["90vw", "90vw", "auto"]}
                        mr={["0px", "0px", "15px"]}
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
                        _focus={{
                            bgImage:
                                "linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        }}
                        bgImage={
                            activeCategory ==
                                influencerCat.name.toLowerCase() &&
                            "linear-gradient(90deg, #E90A63 0%, #481A7F 100%);"
                        }
                    >
                        <Text>{influencerCat.name}</Text>
                    </Button>
                ))}
            </Flex>
        </Box>
    );
};

export default Explore;
