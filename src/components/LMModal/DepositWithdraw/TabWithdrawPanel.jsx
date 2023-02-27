/* eslint-disable react/jsx-key */
import { useState, useEffect, useRef, useContext } from "react";
import {
    Flex,
    Input,
    Select,
    Text,
    InputGroup,
    InputLeftAddon,
    Checkbox,
    Button,
    Box,
    Heading,
    Tooltip,
    RadioGroup,
    Radio
} from "@chakra-ui/react";
import { InfoIcon } from "../../Icons";
import strapi from "../../../utils/strapi";
import AppContext from "../../../utils/AppContext";
import { useBreakpointValue } from "@chakra-ui/react";
import LMNonCloseALert from "../../../components/LMNonCloseALert";

const TabWithdrawPanel = ({ data, isDeposit }) => {
    const ref = useRef();
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState(null);
    const [cashOption, setCashOption] = useState([]);
    const [account, setAccount] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [alert, setAlertShow] = useState({ iOpen: false, msg: "" });
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const [cryptoType, setCryptoType] = useState("Bitcoin");

    const [userBal, setuserBal] = useState({});
    const { user, updateUser } = useContext(AppContext);
    const [currency, setCurrency] = useState('USD');
    const [minimumDeposit, setMinimumDeposit] = useState(5);
    const [numberOfChips, setNumberOfChips] = useState(35);
    const [numberOfAmount, setNumberOfAmount] = useState(0);

    const [withdrawalType, setWithdrawalType] = useState('paypal')

    useEffect(() => {
        if (user) {
            setuserBal({
                deposit: user?.wallets?.find(
                    (w) => w.currency?.type === "deposit"
                )?.balance,
                winnings: user?.wallets?.find(
                    (w) => w.currency?.type === "winning"
                )?.balance,
                bonus: user?.wallets?.find((w) => w.currency?.type === "bonus")
                    ?.balance
            });
        }
    }, [user]);
    useEffect(() => {
        if (data) {
            if (data.type === "cash") setCashOption(["USD"]);
            else setCashOption(["Bitcoin", "Ethereum", "Dogecoin"]);
        }
    }, [data]);

    const checkValidity = () => {
        if (!amount || amount === 0)
            setAlertShow({ isOpen: true, msg: "Enter Amount" });
        if (amount && amount >= userBal.winnings) {
            setAlertShow({ isOpen: true, msg: "Your wallet Balance is low" });
            return;
        }
        if (data.type === "cash") {
            if (amount) {
                if (amount >= 5) {
                    if (!email && !account)
                        setAlertShow({
                            isOpen: true,
                            msg: "Enter either Email Id or Account Id"
                        });
                    else withdraw();
                } else
                    setAlertShow({
                        isOpen: true,
                        msg: "Withdraw more than $5"
                    });
            } else setAlertShow({ isOpen: true, msg: "Withdraw more than $5" });
        } else {
            if (amount) {
                if (amount >= 100) {
                    if (!email || !account)
                        setAlertShow({
                            isOpen: true,
                            msg: "Enter both Email Id or Account Id"
                        });
                    else withdraw();
                } else
                    setAlertShow({
                        isOpen: true,
                        msg: "Withdraw more than $100"
                    });
            } else
                setAlertShow({ isOpen: true, msg: "Withdraw more than $100" });
        }
    };
    const withdraw = () => {
        let withDrawReqData = {
            email: email,
            amount: amount,
            mode: data.mode,
            user: user?.id,
            account: account,
            cryptoType: data.type !== "cash" ? cryptoType : null
        };
        strapi
            .create("withdrawals", withDrawReqData)
            .then((res) => {
                setAlertShow({ isOpen: true, msg: res.message });
                updateUser();
            })
            .catch((error) => {
                setAlertShow({ isOpen: true, msg: error.message });
            });
    };

    return (
        <Flex h="100%" w="100%" direction={"column"}>
             <Heading as='h5' size={['10px', '10px', 'sm']} variant="modalHeader" mt='15px' mb='5px' fontWeight="400">
             SELECT NUMBER OF CHIPS
            </Heading>
            <Flex direction={"column"} w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="2%" borderRadius="10px">
                <Flex>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["12px", "12px", "14px", "14px", "14px", "18px"]}
                        alignContent={"center"}
                        m="auto"
                    >
                        CHIP
                        <Tooltip
                            placement="top-start"
                            label="Enter number of chip, Based on total chip showing equivalent amount."
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
                                    mt="-13px!important"
                                    boxSize={"20px"}
                                />
                            </Text>
                        </Tooltip>
                    </Text>

                    <Input
                        w={currentSize === "base" ? "40%" : "40%"}
                        h="42px"
                        color="white"
                        defaultValue={amount}
                        value={amount}
                        placeholder="Amount"
                        fontSize={["12px", "12px", "14px", "14px", "14px", "18px"]}
                        fontWeight="400"
                        fontFamily="Sora"
                        backgroundColor="#1d052b"
                    ></Input>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["12px", "12px", "14px", "14px", "14px", "18px"]}
                        alignContent={"center"}
                        m="auto"
                    >
                        = {currency} {numberOfAmount}
                    </Text>
                </Flex>
            </Flex>
            <Heading as='h5' size={['10px', '10px', 'sm']} variant="modalHeader" mt='15px' mb='5px' fontWeight="400">
            SELECT PAYMENT METHOD
            </Heading>
            <Flex w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="2%" borderRadius="10px" display="block">
                <RadioGroup defaultValue='paypal' onChange={setWithdrawalType}>
                    <Box color='white' w="25%" display="inline-table" bg="#1D052B" mr="10px" p={["5px 10px", "5px 10px", "10px 25px"]} borderRadius="10px">
                        <Radio size='md' colorScheme='pink' defaultChecked="true" value='paypal' style={{ fontSize: "10px" }}>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["9px", "9px", "14px", "14px", "14px", "16px"]}
                                alignContent={"center"}
                                m="auto"
                            >
                                Paypal
                            </Text>
                        </Radio>
                    </Box>
                    <Box color='white' w="25%" display="inline-table" bg="#1D052B" mr="10px" p={["5px 10px", "5px 10px", "10px 25px"]} borderRadius="10px" >
                        <Radio size='md' colorScheme='pink' value='crypto'>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["9px", "9px", "14px", "14px", "14px", "16px"]}
                                alignContent={"center"}
                                m="auto"
                            >
                                Crypto
                            </Text>
                        </Radio>
                    </Box>
                    <Box color='white' w="45%" display="inline-table" bg="#1D052B" p={["5px 10px", "5px 10px", "10px 25px"]} borderRadius="10px" >
                        <Radio size='md' colorScheme='pink' value='bank'>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["9px", "9px", "14px", "14px", "14px", "16px"]}
                                alignContent={"center"}
                                m="auto"
                            >
                                Wire/bank transfer
                            </Text>
                        </Radio>
                    </Box>
                </RadioGroup>
            </Flex>
            {withdrawalType== 'paypal' ? (
                <Box>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" pt="4%" pb="2%" borderRadius="10px">
                        <Select
                            w={currentSize === "base" ? "40%" : "45%"}
                            h="42px"
                            color="white"
                            backgroundColor="#1d052b"
                            value={currency}
                        >
                            <option>USD</option>
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["48%", "50%"]}
                                fontSize={["13px", "17px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                            >
                                Amount
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "40%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                            ></Input>
                        </InputGroup>
                    </Flex>
               
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                >
                                    Paypal registered id
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    defaultValue={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Paypal registered id"
                                    borderLeft="0"
                                ></Input>
                        </InputGroup>
                    </Flex>
                </Box>
            ) : ( 
                <></>
            )}

            {withdrawalType== 'crypto' ? (
                <Box>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" pt="4%" pb="2%" borderRadius="10px">
                        <Select
                            w={currentSize === "base" ? "40%" : "45%"}
                            h="42px"
                            color="white"
                            backgroundColor="#1d052b"
                        >
                            <option style={{ "background": "#1d052b" }}>Select Crypto Tokens</option>
                            <option style={{ "background": "#1d052b" }} value="metamask">Metamask</option>
                            <option style={{ "background": "#1d052b" }} value="coinbase">Coinbase</option>
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["48%", "50%"]}
                                fontSize={["13px", "17px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                            >
                                Crypto Value:
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "40%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                            ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} p="2%"pb="0" bg="#1d052b" borderRadius="10px">
                        <Select
                            w={currentSize === "base" ? "100%" : "100%"}
                            h="42px"
                            color="white"
                            backgroundColor="#1d052b"
                        >
                            <option style={{ "background": "#1d052b" }}>Select Crypto Wallet Type</option>
                            <option style={{ "background": "#1d052b" }} value="metamask">USD</option>
                        </Select>
                    </Flex>
                    <Heading pl="2%" as='h5' size={['10px', '10px', 'sm']} variant="modalHeader" mt='20px' mb='5px' fontWeight="400">
                    CRYPTO WALLET ADDRESS
                    </Heading>
                    <Flex w="100%" justifyContent={"space-evenly"} p="2%" pt="0%" pb="0" bg="#1d052b" borderRadius="10px">
                        <InputGroup w={currentSize === "base" ? "100%" : "100%"}>
                                <Input
                                    w={currentSize === "base" ? "100%" : "100%"}
                                    color="white"
                                    bg="#1d052b"
                                    defaultValue={amount}
                                    placeholder="Crypto Wallet Address"
                                ></Input>
                            </InputGroup>
                    </Flex>
                </Box>
            ) : ( 
            <></>
            )}
            
            {withdrawalType== 'bank' ? (
                <Box>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" pt="10px" pb="5px" borderRadius="10px">
                        <Select
                            w={currentSize === "base" ? "40%" : "45%"}
                            h="42px"
                            color="white"
                            backgroundColor="#1d052b"
                            value={currency}
                        >
                            <option>USD</option>
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["48%", "50%"]}
                                fontSize={["13px", "17px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                            >
                                Amount
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "40%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                            ></Input>
                        </InputGroup>
                    </Flex>
               
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%"  borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                >
                                    Beneficiary name
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="Beneficiary name"
                                    borderLeft="0"
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                >
                                    IBN or Account number
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="IBN or Account number"
                                    borderLeft="0"
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                >
                                    BIC or SWIFT Code
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="BIC or SWIFT Code"
                                    borderLeft="0"
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                >
                                    Bank name
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="Bank name"
                                    borderLeft="0"
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Heading pl="2%" as='h5' size={['10px', '10px', 'sm']} variant="modalHeader" mt='5px' mb='5px' fontWeight="400">
                    Bank Address
                    </Heading>
                    <Flex w="100%" justifyContent={"space-evenly"} p="2%" pt="0%" pb="0" bg="#1d052b" borderRadius="10px">
                        <InputGroup w={currentSize === "base" ? "100%" : "100%"}>
                                <Input
                                    w={currentSize === "base" ? "100%" : "100%"}
                                    color="white"
                                    bg="#1d052b"
                                    placeholder="Bank Address"
                                ></Input>
                            </InputGroup>
                    </Flex>
                </Box>
            ) : ( 
                <></>
            )}
            <Box bg="#1d052b">
                <Flex mt="3%" w="100%" textAlign="center">
                    <Checkbox
                        w="100%"
                        onChange={(e) => setAccepted(e.target.checked)}
                        textAlign="center"
                        display="block"
                        mt="15px"
                    >
                        <Text
                            display="inline-flex"
                            color="white"
                            fontFamily={"Sora"}
                            fontSize={["12px","12px", "16px"]}
                        >
                            I hereby accept the{" "}
                            <Text
                                color="primary"
                                fontFamily={"Sora"}
                                fontSize={["12px","12px", "16px"]}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(
                                        process.env.NEXT_PUBLIC_WORDPRESS_URL+"/terms-conditions#payment",
                                        "_blank"
                                    );
                                }}
                            >
                                {" "}
                                &nbsp; Terms and Condition
                            </Text>
                        </Text>
                    </Checkbox>
                </Flex>
                <Button
                    w="100%"
                    mt="3%"
                    disabled={!accepted}
                    onClick={() => {
                        checkValidity();
                    }}
                >
                    {isDeposit ? "Deposit" : "Withdraw"}
                </Button>   
            </Box>
            

            

           
            <LMNonCloseALert
                header={"Transaction!!!"}
                canClose={true}
                data={alert.msg}
                isOpen={alert.isOpen}
                onClose={() => {
                    setAlertShow({ isOpen: false });
                }}
            />
        </Flex>
    );
};

export default TabWithdrawPanel;
