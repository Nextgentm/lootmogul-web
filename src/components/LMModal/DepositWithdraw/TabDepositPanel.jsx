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
        <Flex h="100%" w="100%" bg="#3F3F3F" direction={"column"}>
            <Flex w="100%" justifyContent={"space-evenly"} bg="#505050" p="2%">
                <Input
                    w={currentSize === "base" ? "30%" : "30%"}
                    color="white"
                    defaultValue={amount}
                    value={amount}
                    onChange={(e) => {
                        setAmount(Number(e.target.value));
                    }}
                    placeholder="Amount"
                    fontSize={["12px", "14px"]}
                    fontWeight="400"
                    fontFamily="Sora"
                ></Input>

                <Select
                    w={currentSize === "base" ? "25%" : "25%"}
                    color="white"
                >
                    <option default>USD</option>
                </Select>
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

            <Flex mt="3%" w="100%">
                <Checkbox
                    w="100%"
                    onChange={(e) => setAccepted(e.target.checked)}
                >
                    <Text
                        display="inline-flex"
                        color="white"
                        fontFamily={"Sora"}
                        fontSize="12px"
                    >
                        I hereby accept the{" "}
                        <Text
                            color="primary"
                            fontFamily={"Sora"}
                            fontSize="12px"
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
            h={["10%", "50px"]}
            onClick={onClick}
            style={{
                border: "1px solid #505050",
                background: "transparent",
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "Sora"
            }}
        >
            <Box pointerEvents="none">
                <AddIcon
                    color="rgba(81, 227, 110, 1)"
                    boxSize={["10px", "20px"]}
                />
            </Box>

            <Box
                border="none"
                ml="3px"
                color="white"
                fontSize={["12px", "20px"]}
            >
                {value}
            </Box>
        </Button>
    );
};
