import React, { useState } from "react";
import { Flex, Input, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { PriceRangeIcon } from "../../components/Icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Switches from "../Nfts/switch";

const PriceComponent = () => {

    return (
        <Flex ml={"15px"} border="1px solid #FFFFFF" borderRadius={"30px"} width="170px" >

            <Menu closeOnSelect={false}>

                <MenuButton border="none" color="#FFFFFF" _focus={{ borderColor: "transparent", boxShadow: "none" }} fontFamily="Blanch" fontSize={"22px"} lineHeight="40px" > <PriceRangeIcon color="#FFFFFF" ml="30px" mr="15px" />Price Range
                    {<ChevronDownIcon color="#FFFFFF" ml="12px" />}
                </MenuButton>

                <MenuList mt="11px" backgroundColor="#1C1C1C">

                    <Flex direction={"column"} width="315px">
                        <MenuItem color="#1C1C1C" fontSize={["12px", "14px"]} _hover={{ bg: '#1C1C1C' }} justifyContent="center">
                            <Switches />
                        </MenuItem>

                        <MenuItem color="#1C1C1C" fontSize={["12px", "14px"]} _hover={{ bg: '#1C1C1C' }}>
                            <Flex width="90%" mt="5%" ml="5%">
                                <Input fontWeight={"600"} fontFamily="Sora" fontColor="#C7C7C7" placeholder="From" />&nbsp;&nbsp;&nbsp;&nbsp;
                                <Input fontWeight={"600"} fontFamily="Sora" fontColor="#C7C7C7" placeholder="To" />
                            </Flex>
                        </MenuItem>

                        <MenuItem color="#1C1C1C" fontSize={["16px", "22px"]} _hover={{ bg: '#1C1C1C' }}>
                            <Flex width="90%" mt="5%" ml="5%">
                                <Button variant="outline" width={["50px", "125px"]} height={["25px", "38px"]}>Clear</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button width={["50px", "125px"]} height={["25px", "38px"]}>Apply</Button>
                            </Flex>
                        </MenuItem>

                    </Flex>
                </MenuList >
            </Menu >
        </Flex >
    );
};
export default PriceComponent;
