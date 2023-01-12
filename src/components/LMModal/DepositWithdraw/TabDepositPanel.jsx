import { useState, useRef, useEffect, useContext } from "react";
import {
    Flex,
    Input,
    Select,
    Text,
    Checkbox,
    Button,
    Box
} from "@chakra-ui/react";
import AppContext from "../../../utils/AppContext";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import strapi from "../../../utils/strapi";
import { useBreakpointValue, Heading,Radio, RadioGroup,Stack } from "@chakra-ui/react";

import { useRouter } from "next/router";

const stripeJs = async () => await import("@stripe/stripe-js/pure");
const TabDepositPanel = ({ isDeposit }) => {
    const { asPath } = useRouter();
    const router = useRouter();
    const { amounts, user } = useContext(AppContext);

    const ref = useRef();
    const [amount, setAmount] = useState(0);
   
    const [accepted, setAccepted] = useState(false);
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const [couponCode, setCouponCode] = useState("");
    const [couponList, setCouponList] = useState([]);
    
    const handleIncrease = (addedAmount) => {
        /*const newAmount = amount + addedAmount;*/
        let numberOfAmount = Number(numberOfChips) / Number(minimumDeposit);
        setNumberOfAmount((addedAmount/numberOfAmount).toFixed(2));
        setAmount(addedAmount);
    };
    
    const getInitialState = () => {
        const value = "USD";
        return value;
    };
    
    const [currency, setCurrency] = useState(getInitialState);
    const [minimumDeposit, setMinimumDeposit] = useState(5);
    const [numberOfChips, setNumberOfChips] = useState(35);
    const [numberOfAmount, setNumberOfAmount] = useState(0);
    const [currencyoptions, setCurrencyOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
          // Fetch data
          const { data } = await axios.get(`${
            process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips`);
          const results = []
          // Store results in the results array
          data.data.forEach((value) => {
            results.push({
                currency: value.currency,
                minimumDeposit: value.minimumDeposit,
                numberOfChips: value.numberOfChips,
            });
          });
          setCurrencyOptions(results);
        }
        // Trigger the fetch
        fetchData();
      }, []);

    const handleChange = (e) => {
        setCurrency(e.target.value);
        setMinimumDeposit(e.target.selectedOptions[0].getAttribute('minimumDeposit'));
        setNumberOfChips(e.target.selectedOptions[0].getAttribute('numberOfChips'));
        setTotalAmount(amount);
    };
    const setTotalAmount = (addedAmount) =>{
        let numberOfAmount = Number(numberOfChips) / Number(minimumDeposit);
        setNumberOfAmount((addedAmount/numberOfAmount).toFixed(2));
        setAmount(addedAmount);
    };

    useEffect(() => {
        if (user) {
            strapi
                .find("coupon", { filters: { user: user.id } })
                .then((response) => {
                    if (response?.data?.items) {
                        setCouponList(
                            response?.data?.items.filter(
                                (coupon) =>
                                    coupon.type === "coupon-deposit-cashback"
                            )
                        );
                    } else setCouponList([]);
                });
        }
    }, []);
    const deposit = async () => {
        try {
            const user = await strapi.fetchUser();
            const { loadStripe } = await stripeJs();

            if (user) {
                const { id } = user;
                const resp = await axios.post(
                    `${
                        process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/stripe`,
                    {
                        user_id: id,
                        redirect_url:
                            process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                            asPath,
                        type: "DEPOSIT",
                        value: numberOfAmount,
                        couponCode: couponCode ? couponCode : "",
                        currency:currency,
                        calculated_chips:amount
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${strapi.getToken()}`
                        }
                    }
                );

                const {
                    data: { stripe_session_id }
                } = resp.data;

                const stripe = await loadStripe(
                    process.env.NEXT_PUBLIC_STRIPE_API_KEY
                );

                stripe.redirectToCheckout({
                    sessionId: stripe_session_id
                });
            }
        } catch (error) {
            
        }
    };

    return (
        
        <Flex h="100%" w="100%" bg="#1d052b" direction={"column"} pr={['5px','5px','30px']}>
            <Heading as='h5' size={['10px', '10px','sm']} variant="modalHeader" mt='15px' mb='5px' fontWeight="400">
            SELECT PAYMENT METHOD
            </Heading>
            <Flex w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="3%" borderRadius="10px">
            <RadioGroup defaultValue='1'>
            <Stack spacing={[2,2,20]}  direction={['row','row','row']} color='white' bg="#1D052B" p={["5px 10px","5px 10px","10px 25px"]} borderRadius="10px">
                <Radio size='md' colorScheme='pink' defaultChecked="true" value='1' style={{fontSize:"10px"}}>
                    <Text
                    display="inline-flex"
                    color="white"
                    fontFamily={"Sora"}
                    fontSize={["9px","9px", "18px"]}
                    alignContent={"center"}
                    m="auto"
                    >
                        FIAT CURRENCY
                    </Text>
                </Radio>
                <Radio size='md' colorScheme='pink' value='2'>
                    <Text
                    display="inline-flex"
                    color="white"
                    fontFamily={"Sora"}
                    fontSize={["10px","10px", "18px"]}
                    alignContent={"center"}
                    m="auto"
                    >
                    CRYPTO CURRENCY
                    </Text>
                </Radio>
            </Stack>
            </RadioGroup>
            </Flex>
            <Heading as='h5' size='sm' variant="modalHeader" mt='15px' mb='5px' fontWeight="400">
            SELECT CURRENCY
            </Heading>
            <Flex w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="3%" borderRadius="10px">
                <Select
                    w={currentSize === "base" ? "40%" : "40%"}
                    h="42px"
                    color="white"
                    backgroundColor="#1d052b"
                    value={currency} onChange={handleChange}
                >
                    {currencyoptions.map((option) => {
                    return (
                        <option minimumDeposit={option.minimumDeposit} numberOfChips={option.numberOfChips} value={option.currency}>
                        {option.currency}
                        </option>
                    );
                    })}
                </Select>

                <Text
                 display="inline-flex"
                 color="white"
                 fontFamily={"Sora"}
                 fontSize={["12px","12px", "18px"]}
                 alignContent={"center"}
                 m="auto"
                >
                    {minimumDeposit} {currency} = {numberOfChips} CHIPS
                </Text>
                
            </Flex>
            <Heading as='h5' size='sm' variant="modalHeader" mt='15px' mb='5px' fontWeight="400">
            SELECT NUMBER OF CHIPS 
            <Text pl="4px" fontSize='xs'  color="white" fontFamily={"Sora"} fontWeight="400" display="inline-block">
                 (Min Amount: {numberOfChips} CHIPS)
            </Text>
            </Heading>
            
            <Flex direction={"column"} w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="3%" borderRadius="10px">
                <Flex>
                    <Text
                    display="inline-flex"
                    color="white"
                    fontFamily={"Sora"}
                    fontSize={["12px","12px", "18px"]}
                    alignContent={"center"}
                    m="auto"
                    >
                        CHIP
                    </Text>
                    <Input
                        w={currentSize === "base" ? "40%" : "40%"}
                        h="42px"
                        color="white"
                        defaultValue={amount}
                        value={amount}
                        onChange={(e) => {
                            setTotalAmount(Number(e.target.value));
                        }}
                        placeholder="Amount"
                        fontSize={["12px", "18px"]}
                        fontWeight="400"
                        fontFamily="Sora"
                        backgroundColor="#1d052b"
                    ></Input>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["12px","12px", "18px"]}
                        alignContent={"center"}
                        m="auto"
                    >
                        = {currency} {numberOfAmount}
                    </Text>
                </Flex>
                {isDeposit && (
                    <Flex>
                        <AddInputBox value={10} onClick={() => handleIncrease(10)} />
                        <AddInputBox
                            value={50}
                            onClick={() => handleIncrease(50)}
                        />
                        <AddInputBox
                            value={100}
                            onClick={() => handleIncrease(100)}
                        />
                        <AddInputBox
                            value={200}
                            onClick={() => handleIncrease(200)}
                        />
                    </Flex>
                )}
            </Flex>
            <Flex>
            <Text fontSize={["12px","12px", "lg"]} pt="5px" pl="4px" textAlign="center"  color="white" fontFamily={"Sora"} fontWeight="300" display="inline-block">
            Note - All the amount which you deposit will auto-convert into chips
            </Text>
            </Flex>
            <Flex mt="3%" ml={["10px","10px", "15%"]} w="100%">
                <Checkbox
                    w="100%"
                    onChange={(e) => setAccepted(e.target.checked)}
                >
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["12px","12px", "18px"]}
                    >
                        I hereby accept the{" "}
                        <Text
                            color="primary"
                            fontFamily={"Sora"}
                            fontSize={["12px","12px", "18px"]}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                    "http://lootmogul.com/terms-of-services#payment",
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
                onClick={deposit}
                disabled={!accepted || amount <= 0}
            >
                {isDeposit ? "PROCEED" : "Withdraw"}
            </Button>
        </Flex>
    );
};

export default TabDepositPanel;

const AddInputBox = ({ value, onClick }) => {
    return (
        <Button
            w={["25%","25%", "23%"]}
            h={["8%","15px", "50px"]}
            p={["0px 10px","15px 30px","auto"]}
            m="2px"
            mt="20px"
            onClick={onClick}
            style={{
                border: "1px solid #505050",
                background: "transparent linear-gradient(90deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box",
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "Sora",
                boxShadow:"0px 0px 0px 0px #481A7F73, 0px 0px 5px #FF0080CF",
            }}
        >
            <Box
                border="none"
                ml="1px"
                color="white"
                fontFamily={"Sora"}
                fontSize={["8px","8px", "16px"]}
            >
                {value}
            </Box>
            
            <Box pointerEvents="none">
                <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={["8px","8px", "16px"]}
                        alignContent={"center"}
                        m="auto"
                        ml="2px"
                        mb="4px"
                    >
                        CHIPS
                </Text>
            </Box>
        </Button>
    );
};
