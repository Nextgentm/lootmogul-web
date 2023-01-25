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
    Box
} from "@chakra-ui/react";

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
            <Box bg="#39106A" p="20px" borderRadius="15px">
            <Flex
                w="100%"
                justifyContent={isDeposit ? "space-between" : "space-evenly"}
                bg="#1D052B"
                p="4%"
                borderTopRadius="15px"
            >
                <InputGroup>
                    <InputLeftAddon
                        w={["48%", "40%"]}
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
                        defaultValue={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        placeholder="Amount"
                    ></Input>
                </InputGroup>

                <Select
                    w={currentSize === "base" ? "64%" : "80%"}
                    color="white"
                    bg="#1D052B"
                    onChange={(e) => {
                        setCryptoType(e.target.value);
                    }}
                >
                    {cashOption.map((type, index) => {
                        return (
                            <option
                                style={{ backgroundColor: "#3F3F3F" }}
                                key={"cash" + index}
                            >
                                {type}
                            </option>
                        );
                    })}
                </Select>
            </Flex>
            <Flex
                w="100%"
                direction="column"
                justifyContent={"space-between"}
                bg="#1D052B"
                p="4%"
                borderBottomRadius="15px"
            >
                <InputGroup>
                    <InputLeftAddon
                        fontSize={["13px", "17px"]}
                        fontWeight="600"
                        bg="#39106A"
                        color="#fff"
                    >
                        Email Id:
                    </InputLeftAddon>
                    <Input
                        color="white"
                        defaultValue={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email Id"
                    ></Input>
                </InputGroup>

                <Text m="auto" my="2%" textAlign={"center"} color="white">
                    {data.type === "cash" ? "OR" : "AND"}
                </Text>

                <InputGroup>
                    <InputLeftAddon
                        fontSize={["13px", "17px"]}
                        fontWeight="600"
                        bg="#39106A"
                        color="#fff"
                    >
                        Account Id:
                    </InputLeftAddon>
                    <Input
                        color="white"
                        defaultValue={account}
                        onChange={(e) => {
                            setAccount(e.target.value);
                        }}
                        placeholder="Account Id"
                    ></Input>
                </InputGroup>
            </Flex>
            <Flex mt="3%" w="100%">
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
