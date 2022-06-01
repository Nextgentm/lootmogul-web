import {
    Box,
    Text,
    Input,
    Button,
    InputGroup,
    useNumberInput,
    InputRightElement,
    Tooltip 
} from "@chakra-ui/react";
import { InfoIcon } from "../../Icons";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const WalletCard = ({ displayData, amount, onClick, onChange }) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 5,
            defaultValue:
                displayData.iconName === "add"
                    ? 5
                    : displayData.iconName === "sub"
                    ? 50
                    : 75,
            min: 5,
            max: 100,
            precision: 0
        });
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps({ isReadOnly: false });
    return (
        <Box
            width={["100%", "31%"]}
            boxShadow="0px 50px 50px -30px rgba(187, 187, 187, 0.1)"
            bg="linear-gradient(180deg, #383838 0%, rgba(57, 57, 57, 0) 100%)"
            minHeight="240px"
            borderRadius="20px"
            pos="relative"
        >
            <Box
                key="box_1"
                bgImage="url('/assets/cardbg.png')"
                bgPosition="center"
                bgRepeat="no-repeat"
                w="100%"
                p="20px"
                pt="15px"
            >
                <>
                    <Text variant="walletCardHeader">{displayData.title}</Text>
                   {displayData.tooltip && ( <Tooltip placement="top-end" label={displayData.tooltip} bg="#383838" borderRadius="10px" color="white" fontSize='sm'>
                       <Text>
                    <InfoIcon
                        color="white"
                        float="right"
                        mt="-20px!important"
                        boxSize={"24px"}
                    /></Text>
                    </Tooltip>)}
                    <Text
                        variant="hint"
                        fontSize="14px"
                        lineHeight="16px"
                        mt="15px"
                    >
                        {displayData.desc}
                    </Text>
                    <InputGroup mt="25px">
                        <Box
                            h="40px"
                            bg={displayData.inputColor}
                            borderRadius="30px"
                            width="100%"
                            lineHeight="40px"
                            px={3}
                        >
                            <Text color="white">{amount || 0}</Text>
                        </Box>

                        {displayData.icon && (
                            <InputRightElement
                                w={8}
                                h={8}
                                right="4px"
                                top="4px"
                                bg="white"
                                borderRadius="full"
                            >
                                {displayData.iconName === "add" && (
                                    <AddIcon
                                        bg="white"
                                        {...inc}
                                        borderRadius="full"
                                        color={displayData.inputColor}
                                        w={5}
                                        h={5}
                                        onClick={() => {}}
                                    />
                                )}
                                {displayData.iconName === "sub" && (
                                    <MinusIcon
                                        bg="white"
                                        {...dec}
                                        borderRadius="full"
                                        color={displayData.inputColor}
                                        w={5}
                                        h={5}
                                        onClick={() => {}}
                                    />
                                )}
                            </InputRightElement>
                        )}
                    </InputGroup>

                    {displayData?.showMore && (
                        <Button
                            mt="27px"
                            onClick={onClick}
                            variant={
                                displayData.iconName === "add"
                                    ? "solid"
                                    : "outline"
                            }
                            height="19%"
                            width="35%"
                            float="right"
                        >
                            {displayData.btnText}
                        </Button>
                    )}
                </>
            </Box>
        </Box>
    );
};
export default WalletCard;
