/* eslint-disable react/jsx-key */
import { Box, Text, Flex } from "@chakra-ui/layout";
import { ArrowLeftIcon } from '@chakra-ui/icons';

const Back = (props) => {
    return (
        // <Flex width={["100%", "100%"]} justifyContent={"flex-start"} direction={["row"]} display={["none", "block"]}>
        //     <ArrowLeftIcon color={"white"} height="11.24" ml={["auto", "5%", "7%"]} mt="2%" direction={"row"} />
        //      <Text color={"#FFFFFF"} fontFamily="Sora" fontSize={"16px"} m="auto" ml="9%" mt={["auto", "-1.9%", "-1.3%"]} height="20" direction="row"> Back</Text>
        // </Flex>
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