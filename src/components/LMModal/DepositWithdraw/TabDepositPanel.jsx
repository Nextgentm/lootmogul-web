import { useState, useRef, useEffect, useContext } from "react";
import {
    Flex,
    Input,
    Select,
    Text,
    Checkbox,
    Button,
    Tooltip,
    Box
} from "@chakra-ui/react";
import { InfoIcon } from "../../Icons";
import AppContext from "../../../utils/AppContext";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import strapi from "../../../utils/strapi";
import {
    useBreakpointValue,
    Heading,
    Radio,
    RadioGroup,
    Stack
} from "@chakra-ui/react";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import { useRouter } from "next/router";
const stripeJs = async () => await import("@stripe/stripe-js/pure");
import jsondata from "../../../../public/assets/currency.json";

import * as ct from "../../../services/clevertapAnalytics";

const TabDepositPanel = ({ isDeposit }) => {
    const { asPath } = useRouter();
    const router = useRouter();
    const { amounts, user } = useContext(AppContext);

    const ref = useRef();
    const [amount, setAmount] = useState(0);
    const [depositType, setDepositType] = useState(1);
    const [accepted, setAccepted] = useState(false);
    const [alert, setAlertShow] = useState({ iOpen: false, msg: "" });
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const [showCouponCode, setShowCouponCode] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponList, setCouponList] = useState([]);

    const handleIncrease = (addedAmount) => {
        /*const newAmount = amount + addedAmount;*/
        let numberOfAmount = Number(numberOfChips) / Number(minimumDeposit);
        if (currency == "BTC" || currency == "ETH") {
            setNumberOfAmount((addedAmount / numberOfAmount).toFixed(6));
        } else {
            setNumberOfAmount((addedAmount / numberOfAmount).toFixed(2));
        }
        setAmount(addedAmount);
    };

    const getInitialState = () => {
        const value = "ZAR";
        return value;
    };

    const [currency, setCurrency] = useState(getInitialState);
    const [minimumDeposit, setMinimumDeposit] = useState(0);
    const [numberOfChips, setNumberOfChips] = useState(0);
    const [numberOfAmount, setNumberOfAmount] = useState(0);
    const [currencyoptions, setCurrencyOptions] = useState([]);
    const [bitpaycurrencyoptions, setBitpayCurrencyOptions] = useState([]);

    const [defaultFiatChip, SetDefaultFiatChip] = useState();
    const [defaultFiatAmount, SetDefaultFiatAmount] = useState();
    const [defaultCrytoChip, SetDefaultCrytoChip] = useState();
    const [defaultCrytoAmount, SetDefaultCrytoAmount] = useState();

    const [userLocation, setUserLocation] = useState();

    // var lm_user_location = window.localStorage?.getItem("lm_user_location")
    //     ? window.localStorage?.getItem("lm_user_location")
    //     : new Date().getTimezoneOffset() === -330
    //     ? "IN"
    //     : null;

    useEffect(() => {
        function setLocationTimezone() {
            new Date().getTimezoneOffset() === -330
                ? setUserLocation("IN")
                : setUserLocation(null);
        }

        async function locationSetter() {
            if (
                window.localStorage?.getItem("lm_user_location") &&
                window.localStorage?.getItem("lm_user_location") !== "null"
            ) {
                setUserLocation(
                    window.localStorage?.getItem("lm_user_location")
                );
            } else {
                try {
                    const { data } = await axios.get(
                        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/ip/location`,
                        {
                            headers: {
                                Authorization: `Bearer ${strapi.getToken()}`
                            }
                        }
                    );

                    if (data?.data?.ipCountry) {
                        setUserLocation(data?.data?.ipCountry);
                    } else {
                        setLocationTimezone();
                    }
                } catch (err) {
                    console.log(err);
                    setLocationTimezone();
                }
            }
        }

        locationSetter();
    }, []);

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips?populate=*&filters[isCrypto][$eq]=false&sort=order`
            );
            const results = [];
            // Store results in the results array
            var defaultCurrencyValue;
            data.data.forEach((value) => {
                
                if (value.currency == "ZAR" && userLocation != "IN") {
                    setNumberOfChips(value.numberOfChips);
                    setMinimumDeposit(value.minimumDeposit);

                    SetDefaultFiatChip(value.numberOfChips);
                    SetDefaultFiatAmount(value.minimumDeposit);
                    setAmount(100);
                }

                if (userLocation == "IN" && value.currency == "INR") {
                    SetDefaultFiatChip(value.numberOfChips);
                    SetDefaultFiatAmount(value.minimumDeposit);

                    setNumberOfChips(value.numberOfChips);
                    setMinimumDeposit(value.minimumDeposit);
                    setAmount(value.numberOfChips);
                }
                results.push({
                    currency: value.currency,
                    minimumDeposit: value.minimumDeposit,
                    numberOfChips: value.numberOfChips,
                    logo: value.logo,
                    currencyCode: value.currencyCode
                });
            });

            setCurrencyOptions(results);
        }
        // Trigger the fetch
        fetchData();
    }, [userLocation]);

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips?populate=*&filters[isCrypto][$eq]=true&sort=order`
            );
            const results_bitpay = [];
            // Store results in the results array

            var defaultCurrencyValue;
            data.data.forEach((value) => {
                if (value.currency == "Bitcoin") {
                    SetDefaultCrytoChip(value.numberOfChips);
                    SetDefaultCrytoAmount(value.cryptoMinimumDeposit);
                }
                results_bitpay.push({
                    currency: value.currency,
                    minimumDeposit: value.cryptoMinimumDeposit,
                    numberOfChips: value.numberOfChips,
                    logo: value.logo,
                    currencyCode: value.currencyCode
                });
            });

            setBitpayCurrencyOptions(results_bitpay);
        }
        // Trigger the fetch
        fetchData();
    }, []);

    const handleChange = (e) => {
        setCurrency(e.target.value);
        var amt = e.target.selectedOptions[0].getAttribute("numberOfChips");
         
        
        setMinimumDeposit(
            e.target.selectedOptions[0].getAttribute("minimumDeposit")
        );
        setNumberOfChips(
            amt
        );
        setAmount(Number(amt)); 
        SetDefaultFiatChip(0)
       
        
        //setTotalAmount(amount);
        let numberOfAmount =
            Number(e.target.selectedOptions[0].getAttribute("numberOfChips")) /
            Number(e.target.selectedOptions[0].getAttribute("minimumDeposit"));
        if (e.target.value == "BTC" || e.target.value == "ETH") {
            setNumberOfAmount((amt / numberOfAmount).toFixed(6));
        } else {
            setNumberOfAmount((amt / numberOfAmount).toFixed(2));
        }
        
          
    };
    const setTotalAmount = (addedAmount) => {
        let numberOfAmount = Number(numberOfChips) / Number(minimumDeposit);
        if (currency == "BTC" || currency == "ETH") {
            setNumberOfAmount((addedAmount / numberOfAmount).toFixed(6));
        } else {
            setNumberOfAmount((addedAmount / numberOfAmount).toFixed(2));
        }
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
        if (amount < numberOfChips) {
            setAlertShow({
                isOpen: true,
                msg: "Enter minimum " + numberOfChips + " chips for Deposit"
            });
        } else {
            const user = await strapi.fetchUser();
            if (depositType == 1) {
                if (process.env.NEXT_PUBLIC_SENTRY_ENV === "staging") {
                    try {
                        // Eazypay code
                        // if (currency === "INR") {
                        //     if (user) {
                        //         const { id } = user;

                        //         const resp = await axios.post(
                        //             `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/eazypay`,
                        //             {
                        //                 user_id: id,
                        //                 type: "DEPOSIT",
                        //                 value: +numberOfAmount,
                        //                 redirect_url:
                        //                     process.env
                        //                         .NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                        //                     asPath,
                        //                 couponCode: couponCode
                        //                     ? couponCode
                        //                     : "",
                        //                 currency: currency,
                        //                 calculated_chips: amount
                        //             },
                        //             {
                        //                 headers: {
                        //                     Authorization: `Bearer ${strapi.getToken()}`
                        //                 }
                        //             }
                        //         );
                        //         const { paymentUrl } = resp.data.data;

                        //         window.open(paymentUrl, "_self");
                        //     }
                        // } else {
                        console.log(couponCode);
                        const { loadStripe } = await stripeJs();

                        if (user) {
                            const { id } = user;

                            // if(currency == "INR" ){

                            // }
                            console.log(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/stripe`);
                            console.log({
                                user_id: id,
                                redirect_url:
                                    process.env
                                        .NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                                    asPath,
                                type: "DEPOSIT",
                                value: +numberOfAmount,
                                couponCode: couponCode
                                    ? couponCode
                                    : "",
                                currency: currency,
                                calculated_chips: amount
                            });
                            console.log({
                                headers: {
                                    Authorization: `Bearer ${strapi.getToken()}`
                                }
                            });

                            const resp = await axios.post(
                                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/stripe`,
                                {
                                    user_id: id,
                                    redirect_url:
                                        process.env
                                            .NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                                        asPath,
                                    type: "DEPOSIT",
                                    value: +numberOfAmount,
                                    couponCode: couponCode
                                        ? couponCode
                                        : "",
                                    currency: currency,
                                    calculated_chips: amount
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${strapi.getToken()}`
                                    }
                                }
                            );
                            const { stripe_session_id } = JSON.parse(
                                resp.data.data
                            );

                            const stripe = await loadStripe(
                                process.env.NEXT_PUBLIC_STRIPE_API_KEY
                            );
                            stripe.redirectToCheckout({
                                sessionId: stripe_session_id
                            });
                        }
                        // }
                    } catch (error) { }
                } else {
                    try {
                        const { loadStripe } = await stripeJs();

                        if (user) {
                            const { id } = user;

                            // if(currency == "INR" ){

                            // }

                            const resp = await axios.post(
                                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/stripe`,
                                {
                                    user_id: id,
                                    redirect_url:
                                        process.env
                                            .NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                                        asPath,
                                    type: "DEPOSIT",
                                    value: +numberOfAmount,
                                    couponCode: couponCode ? couponCode : "",
                                    currency: currency,
                                    calculated_chips: amount
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${strapi.getToken()}`
                                    }
                                }
                            );
                            const { stripe_session_id } = JSON.parse(
                                resp.data.data
                            );

                            const stripe = await loadStripe(
                                process.env.NEXT_PUBLIC_STRIPE_API_KEY
                            );
                            stripe.redirectToCheckout({
                                sessionId: stripe_session_id
                            });
                        }
                    } catch (error) { }
                }
            } else if (depositType == 2) {
                try {
                    if (user) {
                        const { id } = user;
                        const resp = await axios.post(
                            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/payment/bitpay`,
                            {
                                user_id: id,
                                redirect_url:
                                    process.env
                                        .NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                                    asPath,
                                type: "DEPOSIT",
                                value: +numberOfAmount,
                                couponCode: couponCode ? couponCode : "",
                                currency: currency,
                                calculated_chips: amount
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${strapi.getToken()}`
                                }
                            }
                        );

                        const {
                            data: { bitpay_url }
                        } = resp.data;
                        window.location.href = bitpay_url;
                    }
                } catch (error) { }
            }
            ct.onDepositInitiate({
                action: "Deposit Initiate",
                params: user,
                deposit:
                {
                    Amount: numberOfAmount,
                    Chip: amount,
                    PaymentGateway:
                        depositType == 1 ? "Stripe" : "Bitpay",
                    PaymentType:
                        depositType == 1 ? "Fiat Currency" : "Crypto Currency",
                    PaymentSubType: '',
                    currency: currency,
                },    
                pathname:router.pathname,
            });
        }
    };

    useEffect(() => {
        if (depositType == 2) {
            setCurrency("BTC");
            setMinimumDeposit(defaultCrytoAmount);
            setNumberOfChips(defaultCrytoChip);
            if (amount) {
                let numberOfAmount =
                    Number(defaultCrytoChip) / Number(defaultCrytoAmount);
                setNumberOfAmount((amount / numberOfAmount).toFixed(6));
            }
        }

        if (depositType == 1) {
            
            if (amount && defaultFiatChip && defaultFiatAmount) {    
                userLocation == "IN" ? setCurrency("INR") : setCurrency("ZAR");
                setMinimumDeposit(defaultFiatAmount);
                setNumberOfChips(defaultFiatChip);
                let numberOfAmount =
                    Number(defaultFiatChip) / Number(defaultFiatAmount);
                setNumberOfAmount((amount / numberOfAmount).toFixed(2));
            }
        }
    }, [depositType, userLocation, defaultFiatChip, defaultFiatAmount, amount]);

    return (
        <Flex
            h="100%"
            w="100%"
            bg="#1d052b"
            direction={"column"}
            pr={["5px", "5px", "30px"]}
            fontSize="5"
            marginBottom={"-1%"}
            marginTop="-4.4%"
        >
            <Heading
                as="h5"
                size={["10px", "10px", "sm"]}
                variant="modalHeader"
                mt="15px"
                mb="5px"
                fontWeight="400"
            >
                SELECT PAYMENT METHOD
            </Heading>
            <Flex
                w="100%"
                justifyContent={"space-evenly"}
                bg="#481A7F"
                p="2%"
                borderRadius="10px"
                display="block"
            >
                <RadioGroup defaultValue="1" onChange={setDepositType}>
                    <Box
                        color="white"
                        w="48%"
                        display="inline-table"
                        bg="#1D052B"
                        mr="10px"
                        p={["5px 10px", "5px 10px", "10px 25px"]}
                        borderRadius="10px"
                    >
                        <Radio
                            size="md"
                            colorScheme="pink"
                            defaultChecked="true"
                            value="1"
                            style={{ fontSize: "10px" }}
                        >
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={[
                                    "9px",
                                    "9px",
                                    "14px",
                                    "14px",
                                    "14px",
                                    "16px"
                                ]}
                                alignContent={"center"}
                                m="auto"
                            >
                                FIAT CURRENCY
                            </Text>
                        </Radio>
                    </Box>
                    <Box
                        color="white"
                        w="48%"
                        display="inline-table"
                        bg="#1D052B"
                        p={["5px 10px", "5px 10px", "10px 25px"]}
                        borderRadius="10px"
                    >
                        <Radio size="md" colorScheme="pink" value="2">
                            <Text
                                display="inline-flex"
                                color="white"
                                fontFamily={"Sora"}
                                fontSize={[
                                    "9px",
                                    "9px",
                                    "14px",
                                    "14px",
                                    "14px",
                                    "16px"
                                ]}
                                alignContent={"center"}
                                m="auto"
                            >
                                CRYPTO CURRENCY
                            </Text>
                        </Radio>
                    </Box>
                </RadioGroup>
            </Flex>
            <Heading
                as="h5"
                size="sm"
                variant="modalHeader"
                mt="15px"
                mb="5px"
                fontWeight="400"
            >
                SELECT CURRENCY
            </Heading>
            <Flex
                w="100%"
                justifyContent={"space-evenly"}
                bg="#481A7F"
                p="2%"
                borderRadius="10px"
            >
                {depositType == 1 ? (
                    <Select
                        w={currentSize === "base" ? "40%" : "40%"}
                        h="42px"
                        color="white"
                        backgroundColor="#1d052b"
                        value={currency}
                        onChange={handleChange}
                    >
                        {currencyoptions.map((option) => {
                            return (
                                // eslint-disable-next-line react/no-unknown-property
                                <option
                                    minimumDeposit={option.minimumDeposit}
                                    numberOfChips={option.numberOfChips}
                                    value={option.currency}
                                    style={{ background: "#1d052b" }}
                                >
                                    {option.currency} ({option.logo})
                                </option>
                            );
                        })}
                    </Select>
                ) : (
                    <Select
                        w={currentSize === "base" ? "40%" : "40%"}
                        h="42px"
                        color="white"
                        backgroundColor="#1d052b"
                        value={currency}
                        onChange={handleChange}
                    >
                        {bitpaycurrencyoptions.map((option) => {
                            return (
                                // eslint-disable-next-line react/no-unknown-property
                                <option
                                    minimumDeposit={option.minimumDeposit}
                                    numberOfChips={option.numberOfChips}
                                    value={option.currency}
                                    style={{ background: "#1d052b" }}
                                >
                                    {option.currency} ({option.logo})
                                </option>
                            );
                        })}
                    </Select>
                )}

                <Text
                    display="inline-flex"
                    color="white"
                    fontFamily={"Sora"}
                    fontSize={["12px", "12px", "14px", "14px", "14px", "18px"]}
                    alignContent={"center"}
                    m="auto"
                >
                    {minimumDeposit} {currency} = {numberOfChips} CHIPS
                </Text>
            </Flex>
            <Heading
                as="h5"
                size="sm"
                variant="modalHeader"
                mt="15px"
                mb="5px"
                fontWeight="400"
            >
                SELECT NUMBER OF CHIPS
                <Text
                    pl="4px"
                    fontSize="xs"
                    color="white"
                    fontFamily={"Sora"}
                    fontWeight="400"
                    display="inline-block"
                >
                    (Min Chips: {numberOfChips} CHIPS)
                </Text>
            </Heading>

            <Flex
                direction={"column"}
                w="100%"
                justifyContent={"space-evenly"}
                bg="#481A7F"
                p="2%"
                borderRadius="10px"
            >
                <Flex>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={[
                            "12px",
                            "12px",
                            "14px",
                            "14px",
                            "14px",
                            "18px"
                        ]}
                        alignContent={"center"}
                        m="auto"
                    >
                        CHIPS
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
                        onChange={(e) => {
                            setTotalAmount(Number(e.target.value));
                        }}
                        placeholder="Amount"
                        fontSize={[
                            "12px",
                            "12px",
                            "14px",
                            "14px",
                            "14px",
                            "18px"
                        ]}
                        fontWeight="400"
                        fontFamily="Sora"
                        backgroundColor="#1d052b"
                    ></Input>
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={[
                            "12px",
                            "12px",
                            "14px",
                            "14px",
                            "14px",
                            "18px"
                        ]}
                        alignContent={"center"}
                        m="auto"
                    >
                        = {currency} {numberOfAmount}
                    </Text>
                </Flex>
                {isDeposit && (
                    <Flex>
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
                        <AddInputBox
                            value={300}
                            onClick={() => handleIncrease(300)}
                        />
                    </Flex>
                )}
            </Flex>
            <Flex>
                <Text
                    fontSize={["12px", "12px", "16px", "16px", "16px", "lg"]}
                    pt="5px"
                    pl="4px"
                    textAlign="center"
                    color="white"
                    fontFamily={"Sora"}
                    fontWeight="300"
                    display="inline-block"
                >
                    Note - All the amount which you deposit will auto-convert
                    into chips
                </Text>
            </Flex>

            {/* coupon code input */}
            <Flex>
                <Checkbox
                    w="100%"
                    onChange={(e) => setShowCouponCode(e.target.checked)}
                >
                    <Text
                        fontSize={["12px", "12px", "16px", "16px", "16px", "lg"]}
                        pt="5px"
                        pl="4px"
                        textAlign="center"
                        color="white"
                        fontFamily={"Sora"}
                        fontWeight="300"
                        display="inline-block"
                    >

                        I have coupon code
                    </Text>
                </Checkbox>
            </Flex>
            {showCouponCode &&
                <Flex
                    w="100%"
                    justifyContent={"space-evenly"}
                    bg="#481A7F"
                    p="2%"
                    borderRadius="10px"
                    display="block"
                >
                    <Input
                        w={currentSize === "base" ? "100%" : "100%"}
                        h="42px"
                        color="white"
                        defaultValue={couponCode}
                        value={couponCode}
                        onChange={(e) => {
                            setCouponCode(e.target.value);
                        }}
                        placeholder="coupon code"
                        fontSize={[
                            "12px",
                            "12px",
                            "14px",
                            "14px",
                            "14px",
                            "18px"
                        ]}
                        fontWeight="400"
                        fontFamily="Sora"
                        backgroundColor="#1d052b"
                    ></Input>

                </Flex>
            }

            <Flex
                mt={["1%", "1%", "1%", "1%", "1%", "3%"]}
                ml={["10px", "10px", "15%"]}
                w="100%"
            >
                <Checkbox
                    w="100%"
                    onChange={(e) => setAccepted(e.target.checked)}
                >
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize={[
                            "12px",
                            "12px",
                            "16px",
                            "16px",
                            "16px",
                            "18px"
                        ]}
                    >
                        I hereby accept the{" "}
                        <Text
                            color="primary"
                            fontFamily={"Sora"}
                            fontSize={[
                                "12px",
                                "12px",
                                "16px",
                                "16px",
                                "16px",
                                "18px"
                            ]}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                    process.env.NEXT_PUBLIC_WORDPRESS_URL +
                                    "/terms-conditions#payment",
                                    "_blank"
                                );
                            }}
                        >
                            {" "}
                            &nbsp; Terms and Conditions
                        </Text>
                    </Text>
                </Checkbox>
            </Flex>

            <Button
                w="100%"
                fontSize={["16px", "22px"]}
                p={["20px 30px", "25px 40px"]}
                mt={["2%", "1%", "1%", "1%", "1%", "3%"]}
                onClick={deposit}
                disabled={!accepted || amount <= 0}
            >
                {isDeposit ? "PROCEED" : "Withdraw"}
            </Button>

            {/* <Button
                w="100%"
                fontSize={["16px", "22px"]}
                p={["20px 30px", "25px 40px"]}
                mt={["2%", "1%", "1%", "1%", "1%", "3%"]}
                onClick={(e) => {
                    window.open(
                        "https://eazypayuat.icicibank.com/EazyPG?merchantid=136272&mandatory fields=7YL3A5TI64io9Z/RPhz0ng==&optional fields=&returnurl=5XzuEe6B0vb7CwTIpNCqrcP3jSlDEbkAboaVLBrXSF26ohBN/1st6L7/Vkvew+z2kWRo/wPhlAoLVzCL9iibXQ==&Reference No=j4TSrH0GLRNqopM/R1IgGQ==&submerchantid=Ai7W17e/Rq6cO+3iQA1DTA==&transaction amount=Kn/0MRzWnmgPLU7bMckMiw==&paymode=Csg77fYyKS6EdfbgIIUcWw==",
                        "_blank"
                    );
                }}
                disabled={!accepted || amount <= 0}
            >
                {"PROCEED WITH ICICI (TEST)"}
            </Button> */}

            <LMNonCloseALert
                header={"Error!"}
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

export default TabDepositPanel;

const AddInputBox = ({ value, onClick }) => {
    return (
        <Button
            w={["25%", "25%", "21%"]}
            h={["8%", "15px", "45px", "45px", "45px", "50px"]}
            p={["0px 10px", "15px 30px", "auto"]}
            m="2px"
            mt="20px"
            ml="3%"
            onClick={onClick}
            style={{
                border: "1px solid #505050",
                background:
                    "transparent linear-gradient(90deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box",
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "Sora",
                boxShadow: "0px 0px 0px 0px #481A7F73, 0px 0px 5px #FF0080CF"
            }}
        >
            <Box
                border="none"
                ml="1px"
                color="white"
                fontFamily={"Sora"}
                fontSize={["8px", "8px", "14px", "14px", "14px", "16px"]}
            >
                {value}
            </Box>

            <Box pointerEvents="none">
                <Text
                    display="inline-flex"
                    color="white"
                    fontFamily={"Sora"}
                    fontSize={["8px", "8px", "14px", "14px", "14px", "16px"]}
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
