import React from "react";
import { Text, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SortIcon } from "../../components/Icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const sorts = [
    { label: "Recently added", path: "/" },
    { label: "Price: Low to High", path: "/" },
    { label: "Price: High to Low", path: "/" },
    { label: "Numer of likes", path: "/" },
    { label: "Alphabetical", path: "/" }];

const SortComponent = () => {
    const router = useRouter();

    return (
        <Flex ml={"15px"} border="1px solid #FFFFFF" borderRadius={"30px"} width="170px" >
            <Menu>

                <MenuButton border="none" color="#FFFFFF" _focus={{ borderColor: "transparent", boxShadow: "none" }} fontFamily="Blanch" fontSize={"22px"} lineHeight="40px" > <SortIcon color="#FFFFFF" ml="30px" mr="15px" />Sort by
                    {<ChevronDownIcon color="#FFFFFF" ml="12px" />}
                </MenuButton>

                <MenuList mt="11px" backgroundColor="#1C1C1C">

                    <Flex direction={"column"} onClick={() => router.push("/influencers")} {...sorts.path}>
                        <MenuItem color="#C7C7C7"
                            fontSize={["12px", "14px"]} bg="#1C1C1C" _hover={{ bg: '#1C1C1C' }}>   Sort by </MenuItem>

                        {sorts.map((sort, index) => (
                            <MenuItem color="#C7C7C7"
                                fontSize={["12px", "14px"]} _hover={{ bg: '#413D40' }}>
                                <Flex ml={["6px", 0]} key={`sort-${index}`} mt="6px">

                                    <Text ml="10px" color="#C7C7C7" fontFamily="Sora" fontSize="14px"
                                        fontWeight={600} lineHeight={"18px"}>
                                        {sort.label}
                                    </Text>
                                </Flex>
                            </MenuItem>
                        ))}
                    </Flex>
                </MenuList>
            </Menu>
        </Flex >
    );
};
export default SortComponent;


