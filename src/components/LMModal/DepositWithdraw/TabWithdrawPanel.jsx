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
import axios from "axios";
import jsondata from "../../../../public/assets/paypal-currency.json";


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
    const [currencyoptions, setCurrencyOptions] = useState([]);
    const [withdrawalType, setWithdrawalType] = useState('paypal')
    const [bitpaycurrencyoptions, setBitpayCurrencyOptions] = useState([]);

    const [cryptotokens, setCryptoTokens] = useState([]);
    const [cryptocurrency, setCryptoCurrency] = useState([]);
    const [cryptoaddress, setCryptoAddress] = useState([]);
    
    const [beneficiaryname, setBeneficiaryName] = useState([]);
    const [accountnumber, setAccountNumber] = useState([]);
    const [swiftcode, setSwiftCode] = useState([]);
    const [bankname, setBankName] = useState([]);
    const [bankaddress, setBankAddress] = useState([]);
    

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
        console.log(Math.ceil(numberOfAmount));
        if (!numberOfAmount || numberOfAmount === 0)
            setAlertShow({ isOpen: true, msg: "Enter Amount" });
        if (numberOfAmount && numberOfAmount >= userBal.winnings) {
            setAlertShow({ isOpen: true, msg: "Your wallet Balance is low" });
            return;
        }
        if (withdrawalType === 'paypal') {
            if (numberOfAmount) {
                if (numberOfAmount >= 5) {
                    if (!email)
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
        } 
        if(withdrawalType === 'crypto')
        {
            if (numberOfAmount) {
                if (numberOfAmount >= 100) {
                    if (!email)
                        setAlertShow({
                            isOpen: true,
                            msg: "Enter valid Email Id"
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
            email: email ? email : null,
            chips: amount,
            amount: numberOfAmount,
            mode: withdrawalType,
            currency: currency ? currency : null,
            cryptoToken: cryptotokens ? cryptotokens : null,
            walletType: cryptocurrency ? cryptocurrency : null,
            walletAddress: cryptoaddress ? cryptoaddress : null,
            beneficiary: beneficiaryname ? beneficiaryname : null,
            siftCode : swiftcode ? swiftcode : null,
            bankName : bankname ? bankname : null,
            account : accountnumber ? accountnumber : null,
            bankAddress : bankaddress ? bankaddress : null,
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

    useEffect(() => {
        async function fetchData() {
            // Fetch data   
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips`);
            const results = []
                        // Store results in the results array
            var defaultCurrencyValue;
            data.data.forEach((value) => {
                if (value.currency === "USD") {
                    defaultCurrencyValue = {
                        currency: value.currency,
                        minimumDeposit: value.minimumDeposit,
                        numberOfChips: value.numberOfChips,
                    }
                }
                results.push({
                    currency: value.currency,
                    minimumDeposit: value.minimumDeposit,
                    numberOfChips: value.numberOfChips,
                });
            });
            jsondata.forEach((jsonValue) => {
                results.push({
                    currency: jsonValue,
                    minimumDeposit: defaultCurrencyValue.minimumDeposit,
                    numberOfChips: defaultCurrencyValue.numberOfChips,
                });
            })

            setCurrencyOptions(results);
        }
        // Trigger the fetch
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips`);
            const results_bitpay = []
            // Store results in the results array

            var defaultCurrencyValue;
            data.data.forEach((value) => {
                if (value.currency === "USD") {
                    defaultCurrencyValue = {
                        currency: value.currency,
                        minimumDeposit: value.minimumDeposit,
                        numberOfChips: value.numberOfChips,
                    }
                }
                results_bitpay.push({
                    currency: value.currency,
                    minimumDeposit: value.minimumDeposit,
                    numberOfChips: value.numberOfChips,
                });
            });
            await fetch('https://test.bitpay.com/currencies')
                .then(response => response.json())
                .then(additionalCurrencies => {
                    additionalCurrencies.data.forEach((jsonValue) => {
                        results_bitpay.push({
                            currency: jsonValue.code,
                            minimumDeposit: defaultCurrencyValue.minimumDeposit,
                            numberOfChips: defaultCurrencyValue.numberOfChips,
                        });
                    })
                })

            setBitpayCurrencyOptions(results_bitpay);
        }
        // Trigger the fetch
        fetchData();
    }, []);

    const handleChange = (e) => {
        if (withdrawalType === 'paypal') {
            setCurrency(e.target.value);
        }
        else{
            setCryptoCurrency(e.target.value);
        }
        setMinimumDeposit(e.target.selectedOptions[0].getAttribute('minimumDeposit'));
        setNumberOfChips(e.target.selectedOptions[0].getAttribute('numberOfChips'));
        //setTotalAmount(amount);
        let numberOfAmount = Number(e.target.selectedOptions[0].getAttribute('numberOfChips')) / Number(e.target.selectedOptions[0].getAttribute('minimumDeposit'));
        setNumberOfAmount((amount / numberOfAmount).toFixed(2));

    };
    const setTotalAmount = (addedAmount) => {
        let numberOfAmount = Number(numberOfChips) / Number(minimumDeposit);
        setNumberOfAmount((addedAmount / numberOfAmount).toFixed(2));
        setAmount(addedAmount);
    };

    return (
        <Flex h="100%" w="100%" direction={"column"}>
             <Heading as='h5' fontSize={['13px', '13px', '16px']} variant="modalHeader" mt='{["0px","px","5px","15px"]}' mb='5px' fontWeight="400">
             SELECT NUMBER OF CHIPS
            </Heading>
            <Flex direction={"column"} w="100%" justifyContent={"space-evenly"} bg="#481A7F" p={["5px","5px","2%","2%"]} borderRadius="10px">
                <Flex>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["12px", "12px", "13px", "13px", "14px", "18px"]}
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
                        h={["30px","30px","42px"]}
                        color="white"
                        defaultValue={amount}
                        value={amount}
                        onChange={(e) => {
                            setTotalAmount(Number(e.target.value));
                        }}
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
            <Heading as='h5' fontSize={['13px', '13px', '16px']}     variant="modalHeader" mt={['5px', '5px', '15px']} mb='5px' fontWeight="400">
            SELECT PAYMENT METHOD
            </Heading>
            <Flex w="100%" justifyContent={"space-evenly"} bg="#481A7F" p={["2px","2px","2%","2%"]} borderRadius="10px" display="block">
                <RadioGroup defaultValue='paypal' onChange={setWithdrawalType}>
                    <Box color='white' w={["20%","20%","25%"]} display="inline-table" bg="#1D052B" mr={["2px","2px","10px","10px"]} p={["5px 5px", "5px 10px", "10px 25px"]} borderRadius="10px">
                        <Radio size='md' colorScheme='pink' defaultChecked="true" value='paypal' style={{ fontSize: "10px" }}>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["10px", "12px", "14px", "14px", "14px", "16px"]}
                                alignContent={"center"}
                                m="auto"
                            >
                                Paypal
                            </Text>
                        </Radio>
                    </Box>
                    <Box color='white' w={["20%","20%","25%"]} display="inline-table" bg="#1D052B" mr={["2px","2px","10px","10px"]} p={["5px 5px", "5px 10px", "10px 25px"]} borderRadius="10px" >
                        <Radio size='md' colorScheme='pink' value='crypto'>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["10px", "12px", "14px", "14px", "14px", "16px"]}
                                alignContent={"center"}
                                m="auto"
                            >
                                Crypto
                            </Text>
                        </Radio>
                    </Box>
                    <Box color='white' w={["47%","47%","45%"]} display="inline-table" bg="#1D052B" p={["5px 5px", "5px 10px", "10px 25px"]} borderRadius="10px" >
                        <Radio size='md' colorScheme='pink' value='bank'>
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={["10px", "12px", "14px", "14px", "14px", "16px"]}
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
                            w={currentSize === "base" ? "45%" : "45%"}
                            h={["30px","30px","42px"]}
                            color="white"
                            backgroundColor="#1d052b"
                            value={currency}
                            onChange={handleChange} 
                        >
                        {currencyoptions.map((option) => {
                            return (
                                <option minimumDeposit={option.minimumDeposit} numberOfChips={option.numberOfChips} value={option.currency} style={{ "background": "#1d052b" }}>
                                    {option.currency}
                                </option>
                            );
                        })}
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["50%", "50%"]}
                                fontSize={["13px", "17px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                                h={["30px","30px","42px"]}
                            >
                                Amount
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "50%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={numberOfAmount}
                                value={numberOfAmount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                                h={["30px","30px","42px"]}
                            ></Input>
                        </InputGroup>
                    </Flex>
               
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["11px","13px", "17px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    h={["30px","30px","42px"]}
                                    color="#fff"
                                >
                                    Paypal registered id
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    fontSize={["11px","13px", "17px"]}
                                    defaultValue={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Paypal registered id"
                                    borderLeft="0"
                                    h={["30px","30px","42px"]}
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
                            w={currentSize === "base" ? "47%" : "45%"}
                            h={["30px","30px","42px"]}
                            color="white"
                            fontSize={["11px","13px", "18px"]}
                            backgroundColor="#1d052b"
                            onChange={(e) => {
                                setCryptoTokens(e.target.value);
                            }}
                        >
                            <option style={{ "background": "#1d052b" }}>Select Crypto Tokens</option>
                            <option style={{ "background": "#1d052b" }} value="metamask">Metamask</option>
                            <option style={{ "background": "#1d052b" }} value="coinbase">Coinbase</option>
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["60%", "50%"]}
                                fontSize={["11px","13px", "18px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                                h={["30px","30px","42px"]}
                            >
                                Crypto Value:
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "50%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={numberOfAmount}
                                value={numberOfAmount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                                h={["30px","30px","42px"]}
                            ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} p={["1%","1%","2%"]} pb="0" bg="#1d052b" borderRadius="10px">
                        <Select
                            w={currentSize === "base" ? "100%" : "100%"}
                            h={["30px","30px","42px"]}
                            color="white"
                            backgroundColor="#1d052b"
                            fontSize={["11px","13px", "18px"]}
                            onChange={handleChange}
                        >
                        {bitpaycurrencyoptions.map((option) => {
                            return (
                                <option minimumDeposit={option.minimumDeposit} numberOfChips={option.numberOfChips} value={option.currency} style={{ "background": "#1d052b" }}>
                                    {option.currency}
                                </option>
                            );
                        })}
                        </Select>
                    </Flex>
                    <Heading pl="2%" as='h5' fontSize={['13px', '13px', '16px']} variant="modalHeader" mt={['5px','10px','10px']} mb='5px' fontWeight="400">
                    CRYPTO WALLET ADDRESS
                    </Heading>
                    <Flex w="100%" justifyContent={"space-evenly"} p={["1%","1%","2%"]} pt="0%" pb="0" bg="#1d052b" borderRadius="10px">
                        <InputGroup w={currentSize === "base" ? "100%" : "100%"}>
                                <Input
                                    w={currentSize === "base" ? "100%" : "100%"}
                                    color="white"
                                    bg="#1d052b"
                                    placeholder="Crypto Wallet Address"
                                    h={["30px","30px","42px"]}
                                    fontSize={["11px","13px", "18px"]}
                                    onChange={(e) => {
                                        setCryptoAddress(e.target.value);
                                    }}
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
                            w={currentSize === "base" ? "47%" : "45%"}
                            h={["30px","30px","42px"]}
                            color="white"
                            backgroundColor="#1d052b"
                            value={currency}
                            onChange={handleChange} 
                            >
                            {currencyoptions.map((option) => {
                                return (
                                    <option minimumDeposit={option.minimumDeposit} numberOfChips={option.numberOfChips} value={option.currency} style={{ "background": "#1d052b" }}>
                                        {option.currency}
                                    </option>
                                );
                            })}
                        </Select>
                        <InputGroup w={currentSize === "base" ? "50%" : "50%"}>
                            <InputLeftAddon
                                w={["48%", "50%"]}
                                fontSize={["13px", "17px"]}
                                fontWeight="600"
                                bg="#39106A"
                                color="#fff"
                                pr="15px"
                                h={["30px","30px","42px"]}
                            >
                                Amount
                            </InputLeftAddon>
                            <Input
                                w={currentSize === "base" ? "50%" : "50%"}
                                color="white"
                                bg="#39106A"
                                defaultValue={numberOfAmount}
                                value={numberOfAmount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                placeholder="Amount"
                                borderLeft="0"
                                h={["30px","30px","42px"]}
                            ></Input>
                        </InputGroup>
                    </Flex>
               
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%"  borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["10px","13px", "18px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                    h={["30px","30px","42px"]}
                                >
                                    Beneficiary name
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="Beneficiary name"
                                    borderLeft="0"
                                    h={["30px","30px","42px"]}
                                    fontSize={["10px","13px", "18px"]}
                                    onChange={(e) => {
                                        setBeneficiaryName(e.target.value);
                                    }}
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["10px","13px", "18px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                    h={["30px","30px","42px"]}
                                >
                                    IBN or Account number
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="IBN or Account number"
                                    borderLeft="0"
                                    h={["30px","30px","42px"]}
                                    fontSize={["10px","13px", "18px"]}
                                    onChange={(e) => {
                                        setAccountNumber(e.target.value);
                                    }}
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["10px","13px", "18px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                    h={["30px","30px","42px"]}   
                                >
                                    BIC or SWIFT Code
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="BIC or SWIFT Code"
                                    borderLeft="0"
                                    h={["30px","30px","42px"]}
                                    fontSize={["10px","13px", "18px"]}
                                    onChange={(e) => {
                                        setSwiftCode(e.target.value);
                                    }}
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Flex w="100%" justifyContent={"space-evenly"} bg="#1d052b" p="2px 2%" borderRadius="10px">
                        <InputGroup>
                                <InputLeftAddon
                                    fontSize={["10px","13px", "18px"]}
                                    fontWeight="600"
                                    bg="#39106A"
                                    color="#fff"
                                    w={["48%", "50%"]}
                                    h={["30px","30px","42px"]}
                                >
                                    Bank name
                                </InputLeftAddon>
                                <Input
                                    color="white"
                                    placeholder="Bank name"
                                    borderLeft="0"
                                    h={["30px","30px","42px"]}
                                    fontSize={["10px","13px", "18px"]}
                                    onChange={(e) => {
                                        setBankName(e.target.value);
                                    }}
                                ></Input>
                        </InputGroup>
                    </Flex>
                    <Heading pl="2%" as='h5' fontSize={['13px', '13px', '16px']} variant="modalHeader" mt='5px' mb='5px' fontWeight="400">
                    Bank Address
                    </Heading>
                    <Flex w="100%" justifyContent={"space-evenly"} p="2%" pt="0%" pb="0" bg="#1d052b" borderRadius="10px">
                        <InputGroup w={currentSize === "base" ? "100%" : "100%"}>
                                <Input
                                    w={currentSize === "base" ? "100%" : "100%"}
                                    color="white"
                                    bg="#1d052b"
                                    placeholder="Bank Address"
                                    fontSize={["13px", "18px"]}
                                    h={["30px","30px","42px"]}
                                    onChange={(e) => {
                                        setBankAddress(e.target.value);
                                    }}
                                ></Input>
                            </InputGroup>
                    </Flex>
                </Box>
            ) : ( 
                <></>
            )}
            <Box bg="#1d052b">
                <Flex mt={["1%","1%", "3%"]} w="100%" textAlign="center">
                    <Checkbox
                        w="100%"
                        onChange={(e) => setAccepted(e.target.checked)}
                        textAlign="center"
                        display="block"
                        mt={["5px","5px", "15px"]}
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
                    fontSize={['16px', '22px']}
                    p={['20px 30px', '25px 40px']}
                    mt={["2%", "1%", "1%", "1%", "1%", "3%"]}
                    disabled={!accepted}
                    onClick={() => {
                        checkValidity();
                    }}
                >
                    {isDeposit ? "PROCEED" : "PROCEED"}
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
