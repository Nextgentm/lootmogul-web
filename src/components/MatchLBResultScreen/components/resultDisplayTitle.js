/* eslint-disable react/jsx-key */
import { Text, Flex } from "@chakra-ui/layout";

const ResultDisplayTitle = (props) => {
    return (
        <Flex
            justifyContent={"center"}
            direction={["row"]}
            m="auto"
            width={["35%", "100%"]}
            mt="-1%"
        >
            <Text
                color="#F8ED1D"
                fontFamily="Blanch"
                fontSize={["28px", "35px"]}
                mb="12px"
                textAlign={"center"}
                mt={["10%", "-3%"]}
            >
                {props.name}
            </Text>
        </Flex>
    );
};

export default ResultDisplayTitle;
