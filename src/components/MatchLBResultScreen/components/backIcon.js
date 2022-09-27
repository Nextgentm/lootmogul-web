
import { Text, Flex } from "@chakra-ui/layout";
import { ArrowLeftIcon } from '@chakra-ui/icons';

const Back = (props) => {
    return (
      
        <Flex
        width="6%"
        height="10px"
        justifyContent={"space-between"}
        alignItems="center"
        display={["none", "block"]}
      >
        <ArrowLeftIcon
          color="white"
          fontSize={{
            base: "17px",
            sm: "17px",
            md: "30px",
            lg: "30px",
          }}
        />
        <Text
          color="white"
          variant="hint"
          ml="2"
          fontSize={{
            base: "17px",
            sm: "17px",
            md: "30px",
            lg: "30px",
          }}
        >
          {" "}
          Back
        </Text>
      </Flex>

    );
};

export default Back;