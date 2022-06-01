import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import Image from "next/image";

const Badge = (props) => {
    return (
<Box  width={["65px", ""]} height={["65px", ""]} mt={["-25%", "-5%"]} ml={["38%", "48%"]}>
        <Image  alt= "badge" objectFit="cover" layout="fill" src="/assets/badge.png" />
        </Box>

    );
};

export default Badge;