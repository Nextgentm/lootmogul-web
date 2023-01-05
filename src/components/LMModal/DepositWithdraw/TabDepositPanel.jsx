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
import { useBreakpointValue } from "@chakra-ui/react";

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
        const newAmount = amount + addedAmount;

        setAmount(newAmount);
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
                        value: amount,
                        couponCode: couponCode ? couponCode : ""
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
        <Flex h="100%" w="100%" bg="#1d052b" direction={"column"} pr="30px">
            <Flex w="100%" justifyContent={"space-evenly"} bg="#481A7F" p="3%" borderRadius="10px">
                <Select
                    w={currentSize === "base" ? "40%" : "40%"}
                    h="42px"
                    color="white"
                    backgroundColor="#1d052b"
                >
                    <option default>USD</option>
                </Select>

                <Input
                    w={currentSize === "base" ? "40%" : "40%"}
                    h="42px"
                    color="white"
                    defaultValue={amount}
                    value={amount}
                    onChange={(e) => {
                        setAmount(Number(e.target.value));
                    }}
                    placeholder="Amount"
                    fontSize={["12px", "18px"]}
                    fontWeight="400"
                    fontFamily="Sora"
                    backgroundColor="#1d052b"
                ></Input>
            </Flex>
            
            <Flex>
                <Text
                 display="inline-flex"
                 color="white"
                 fontFamily={"Sora"}
                 fontSize={["12px","12px", "18px"]}
                 alignContent={"center"}
                 m="auto"
                 mt="15px"
            >
                    USD 100.00 = 1000.00
                </Text>
            </Flex>
            {isDeposit && (
                <Flex w="100%" mt="3%" justifyContent={"space-between"}>
                    <AddInputBox value={5} onClick={() => handleIncrease(5)} />
                    <AddInputBox
                        value={10}
                        onClick={() => handleIncrease(10)}
                    />
                    <AddInputBox
                        value={50}
                        onClick={() => handleIncrease(50)}
                    />
                    <AddInputBox
                        value={100}
                        onClick={() => handleIncrease(100)}
                    />
                </Flex>
            )}

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
                {isDeposit ? "Deposit" : "Withdraw"}
            </Button>
        </Flex>
    );
};

export default TabDepositPanel;

const AddInputBox = ({ value, onClick }) => {
    return (
        <Button
            w={["20%", "23%"]}
            h={["10%","20px", "50px"]}
            p={["20px 30px","20px 30px","auto"]}
            onClick={onClick}
            style={{
                border: "1px solid #505050",
                background: "#481A7F",
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "Sora",
                boxShadow:"none",
            }}
        >
            <Box
                border="none"
                ml="3px"
                color="white"
                fontSize={["12px","12px", "20px"]}
            >
                {value}
            </Box>
            
            <Box pointerEvents="none">
                <AddIcon
                    color="#481A7F"
                    boxSize={["10px","15px", "25px"]}
                    backgroundColor="#fff"
                    borderRadius="50%"
                    p={"5px"}
                    ml={"5px"}
                />
            </Box>
        </Button>
    );
};
