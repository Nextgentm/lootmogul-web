/* eslint-disable react/jsx-key */
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const TabLabel = ({ data }) => {
    return (
        <Flex width="100%" >
           {data.url && ( <Image
                alt={data.name}
                src={data.url}
                width="20px"
                height="20px"
              
            />
            )}
            <Text  m="auto" color="white" fontSize={["10px","10px","18px"]}>
                {data.name}
            </Text>
        </Flex>
    );
};
export default TabLabel;
