import React, { useState } from "react";
import {
    Box,
    Select
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const PriceFilter = ({ priceData, nftPriceSorting }) => {
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
                    <option key={index} value={price.toLowerCase()}>{price}</option>
                ))}
            </Select>
        </Box>
    );
};
export default PriceFilter;
