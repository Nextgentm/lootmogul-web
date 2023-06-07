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
                
                fontFamily="Blanch"
                fontSize={["38px", "54px"]}
                mb="12px"
                textAlign={"center"}
                mt={["10%", "-3%"]}
                color="#FFFFFF"
                lineHeight={["38px", "54px"]}
            >
                {props.name}
            </Text>
        </Flex>
    );
};

export default ResultDisplayTitle;
