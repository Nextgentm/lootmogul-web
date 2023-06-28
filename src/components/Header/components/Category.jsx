import React from "react";
import {
    Text,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";



const CategoryComponent = () => {
    const router = useRouter();

    return (
        <Flex ml={"15px"}>
            <Menu>
                <MenuButton
                    border="none"
                    color="#FFFFFF"
                    _focus={{ borderColor: "transparent", boxShadow: "none" }}
                    fontFamily="Blanch"
                    fontSize={"22px"}
                    lineHeight="40px"
                >
                    Category
                    {<ChevronDownIcon color="#FFFFFF" ml="12px" />}
                </MenuButton>

                <MenuList mt="11px" backgroundColor="#1C1C1C">
                    <Flex
                        direction={"column"}
                        onClick={() => router.push("/influencers")}
                        {...cates.path}
                    >
                        <MenuItem
                            color="#C7C7C7"
                            fontSize={["12px", "14px"]}
                            _hover={{ bg: "#413D40" }}
                        >
                            {" "}
                            All{" "}
                        </MenuItem>

                        {cates.map((cate, index) => (
                            <MenuItem
                                color="#C7C7C7"
                                fontSize={["12px", "14px"]}
                                _hover={{ bg: "black" }}
                            >
                                <Flex
                                    ml={["6px", 0]}
                                    key={`cate-${index}`}
                                    mt="6px"
                                >
                                    <Image
                                        alt={cate.label}
                                        width="20px"
                                        height="20px"
                                        mr="10px"
                                        src={`/assets/nfts/${cate.icon}`}
                                    />
                                    <Text
                                        ml="10px"
                                        color="#C7C7C7"
                                        fontFamily="Sora"
                                        fontSize="14px"
                                        fontWeight={600}
                                        lineHeight={"18px"}
                                    >
                                        {cate.label}
                                    </Text>
                                </Flex>
                            </MenuItem>
                        ))}
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
};
export default CategoryComponent;
