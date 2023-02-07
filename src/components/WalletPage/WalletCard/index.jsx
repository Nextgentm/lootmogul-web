import {
    Box,
    Text,
    Button,
    InputGroup,
    useNumberInput,
    InputRightElement,
    InputLeftElement,
    Tooltip,
    Image
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
            width={["100%","100%", "31%"]}
            boxShadow="0px 50px 50px -30px rgba(187, 187, 187, 0.1)"
            bg="transparent linear-gradient(0deg, #481A7F00 0%, #481A7F 100%) 0% 0% no-repeat padding-box"
            minHeight="240px"
            pos="relative"
        >
            <Box
                key="box_1"
                bgPosition="center"
                bgRepeat="no-repeat"
                w="100%"
                p="25px"
                
            >
                <>
                    <Text variant="hint" color="white" fontSize={["22px","22px","31px"]}>{displayData.title}</Text>
                    {displayData.tooltip && (
                        <Tooltip
                            placement="top-end"
                            label={displayData.tooltip}
                            bg="#383838"
                            borderRadius="10px"
                            color="white"
                            fontSize="sm"
                            p="10px"
                        >
                            <Text>
                            
                                <InfoIcon
                                    color="white"
                                    float="right"
                                    mt="-20px!important"
                                    boxSize={"29px"}
                                />
                            </Text>
                        </Tooltip>
                    )}
                    <Text
                        variant="hint"
                        fontSize="14px"
                        lineHeight="24px"
                        mt="15px"
                        color="white"
                    >
                        {displayData.desc}
                    </Text>
                    <InputGroup mt="25px">
                        <Box
                            h="50px"
                            bg={displayData.inputColor}
                            borderRadius="21px"
                            width="100%"
                            lineHeight="50px"
                            px={3}
                        >
                            <InputLeftElement
                            pointerEvents='none'
                            children={
                                <Image
                                    alt="Calender"
                                    src="/assets/Icon.png"
                                    width={19}
                                    height={19}
                                    marginTop={2}
                                />
                            }
                            />
                            <Text color="white" pl="25px" fontSize={22}>{amount || 0}</Text>
                        </Box>
                    </InputGroup>

                    {displayData?.showMore && (
                        <Button
                            mt="27px"
                            mb="35px"
                            onClick={onClick}
                            variant={
                                displayData.iconName === "add"
                                    ? "solid"
                                    : "solid"
                            }
                            height="38px"
                            width="35%"
                            float="right"
                            fontSize="16px"
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
