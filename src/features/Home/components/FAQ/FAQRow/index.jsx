import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Collapsible from "react-collapsible";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";


const FAQRow = ({ row, index , currentOpen, setCurrentOpen}) => {
    const [isExpanded, setExpanded] = useState(false);

    const Icon = isExpanded ? AiFillCloseCircle : AiFillPlusCircle;

    return (
        <Box bg="#1c1c1c" 
        backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
        p="12px" pl="20px" mt="2px" width="" 
        >
            <Collapsible
                open={ currentOpen === index }
                transitionTime={200}
                onOpen={() => setExpanded(true) }
                handleTriggerClick={ () => { if(currentOpen===index)  setCurrentOpen(-1); else setCurrentOpen(index) }}
                
                onClose={() => setExpanded(false)}
                trigger={
                    <Flex align="center" w="100%">
                        <Text
                            fontFamily="Blanch"
                            color="#FFEAB5"
                            fontSize={["28px","28px" ,"28px" , "58px"]}
                            mt="-2%"
                        >
                            {index > 9 ? index : `0${index}`}
                        </Text>
                        <Text
                            fontSize={["14px", "14px","14px","18px"]}
                            ml="16px"
                            fontFamily="Sora"
                            color="#C7C7C7"
                            pt={["2%"]}
                            pr={["3%"]}
                            mt={["", "-2%"]}
                            textAlign="left"
                        >
                            {row.description}
                        </Text>

                        <Box ml="auto">
                            <Icon size={["25"]} style={{ fill: 'white' }} />

                        </Box>
                    </Flex>
                }
            >
                <Text
                    mt="4px"
                    pb="8px"
                    fontSize={["12px", "14px"]}
                    fontFamily="Sora"
                    color="#C7C7C7"
                    ml={["", "-5.5%"]}
                    pl={["10%"]}
                    pr={["9%"]}
                    textAlign="left"

                >
                    {row.content}
                </Text>
            </Collapsible>
        </Box >
    );
};

export default FAQRow;
