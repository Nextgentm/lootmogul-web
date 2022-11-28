import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Box
} from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { breabCrumbStyle } from "../../../components/Header/styles";

const Breadcumb = ({ data, mxValue }) => {
    return (
        <Box mt={5} mx={mxValue} fontWeight={"bold"}>
            <Flex mt={10}>
                <Breadcrumb
                    spacing="3px"
                    fontSize={"20px"}
                    color={"white"}
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    {data?.map((route) => (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={route.url}
                                {...breabCrumbStyle(route.isCurrentPage)}
                            >
                                {route.text}
                                {route.isCurrentPage}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </Breadcrumb>
            </Flex>
        </Box>
    );
};

export default Breadcumb;
