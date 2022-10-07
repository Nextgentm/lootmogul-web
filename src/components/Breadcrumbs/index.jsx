
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, Text, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const Breadcrumbs = ({ routes, style = {} }) => {
    return (
        <Flex {...style}>
            {routes.map(({ path, label }, index) => (
                <Box key={`breadcrumbs-${index}`}>
                    {index < routes.length - 1 ? (
                        <Flex align="center">
                            <NextLink href={path} passhref="true">
                                <Link>
                                    <Text
                                        fontSize="12px"
                                        cursor="pointer"
                                        color="white"
                                    >
                                        {label}
                                    </Text>
                                </Link>
                            </NextLink>

                            <ArrowRightIcon
                                color="white"
                                ml="12px"
                                mr="12px"
                                boxSize="8px"
                            />
                        </Flex>
                    ) : (
                        <Text fontSize="12px" color="#929292">
                            {label}
                        </Text>
                    )}
                </Box>
            ))}
        </Flex>
    );
};

export default Breadcrumbs;
