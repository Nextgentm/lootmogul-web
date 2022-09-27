import { Box, Text } from "@chakra-ui/react";

const CountDownTimer = ({ value, width, height }) => {
    return (
        <Box
            w={width}
            h={height}
            bgImage="url('/assets/images/countdown.png')"
            bgPosition="center"
            pos="relative"
            bgRepeat="no-repeat"
            objectFit="contain"
            backgroundSize={{
                base: "60px",
                sm: "60px",
                md: "77px",
                lg: "77px"
            }}
        >
            <Text lineHeight={"85px"} m={0} p={0} textAlign="center">
                {value}
            </Text>
        </Box>
    );
};

export default CountDownTimer;
