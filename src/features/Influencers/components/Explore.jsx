import { Box, Button, Flex, Heading, Text, Select } from "@chakra-ui/react";
import React from "react";
import Search from "./search";

const Explore = ({
    data,
    defaultCategoryName,
    handleCategoryChange,
    activeCategory,
    searchText,
    isMobile
}) => {
    return (
        <Box mt={5} mx={[10, 10, 16]}>
            {isMobile && (
                <Flex
                    mt={10}
                    mx="auto"
                    flexWrap="wrap"
                    alignContent={"center"}
                    justify={"space-between"}
                >
                    <Box height="80px" width={"100%"} textAlign={"center"}>
                        <Heading variant="sectionTitle">EXPLORE</Heading>
                    </Box>
                    <Box height="80px" width={"100%"}>
                        <Search searchText={searchText}></Search>
                    </Box>

                    <Box height="80px" width={"100%"}>
                        <Select
                            placeholder={defaultCategoryName}
                            color="lightGrey"
                            onChange={(e) => {
                                handleCategoryChange(e.target.value);
                            }}
                        >
                            {data?.map((influencerCat, index) => (
                                <option
                                    value={influencerCat.name.toLowerCase()}
                                >
                                    {influencerCat.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Flex>
            )}
            {!isMobile && (
                <Box>
                    <Flex
                        mt={10}
                        mx="auto"
                        flexWrap="wrap"
                        alignContent={"center"}
                        justify={"space-between"}
                    >
                        <Box height="80px">
                            <Heading variant="sectionTitle">EXPLORE</Heading>
                        </Box>
                        <Box height="80px" maxW={"md"}>
                            <Search searchText={searchText}></Search>
                        </Box>
                    </Flex>

                    <Flex
                        mt={10}
                        mx="auto"
                        flexWrap="wrap"
                        alignContent={"center"}
                    >
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
                                handleCategoryChange(
                                    defaultCategoryName.toLowerCase()
                                );
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
            )}
        </Box>
    );
};

export default Explore;
