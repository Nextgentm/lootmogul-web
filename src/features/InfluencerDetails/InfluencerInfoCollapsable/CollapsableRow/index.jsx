import Collapsible from "react-collapsible";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
const CollapsableRow = ({ title, children, icon, isOpen }) => {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <Box bg="#270e4699" p="10px" pl="20px" mt="2px">
            <Collapsible
                open={isOpen}
                transitionTime={200}
                onOpen={() => setExpanded(true)}
                onClose={() => setExpanded(false)}
                trigger={
                    <Flex align="center" w="100%">
                        <Image
                                w={["40px"]}
                                h={["32px"]}
                                ml={"10px"}
                                mt={"-8px"}
                                mr={"10px"}
                                src={[icon]}
                            />
                        <Text
                            fontSize="2rem"
                            fontFamily="Sora"
                            color="white"
                            fontWeight={"600"}
                        >
                            {title}
                        </Text>

                        <Box ml="auto" mr="12px">
                            <Image
                                alt="action"
                                src={`/assets/${
                                    isExpanded ? "up_arrow" : "down_arrow"
                                }.png`}
                                width="12px"
                                height="8px"
                            />
                        </Box>
                    </Flex>
                }
            >
                <Box mt="8px">{children}</Box>
            </Collapsible>
        </Box>
    );
};

export default CollapsableRow;
