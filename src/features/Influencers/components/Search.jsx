import {
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";

const Search = ({ searchText }) => {
    return (
        <InputGroup
            _focus={{ border: "none", boxShadow: "none" }}
            color="lightGrey"
            marginTop={'20px'}
        >
            <InputLeftElement fontSize="1.0em">
                <SearchIcon color="lightGrey" />
            </InputLeftElement>

            <Input
                placeholder="Search by name..."
                onChange={(e) => searchText(e.target.value)}
            />
        </InputGroup>
    );
};

export default Search;
