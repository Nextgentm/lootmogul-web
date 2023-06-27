import React, { useState, useEffect } from "react";
import {
    Text,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Select
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillCaretDown } from "react-icons/ai";

const CategoryPriceComponent = ({ priceData, nftPriceSorting }) => {
    const router = useRouter();
    const defaultPrice = "Price Low To High";
    const [priceCategory, setPriceCategory] = useState(defaultPrice);

    return (
        <Box height="80px" width={"100%"} mt={"40px"}>
            <Select
                color="lightGrey"
                onChange={(e) => {
                    setPriceCategory(e.target.value);
                    nftPriceSorting(e.target.value);
                }}
            >
                {priceData?.map((price, index) => (
                    <option value={price.toLowerCase()}>{price}</option>
                ))}
            </Select>
        </Box>
    );
};
export default CategoryPriceComponent;
