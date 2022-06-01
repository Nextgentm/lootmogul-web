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
import { CouponIcon } from "../../Icons";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import strapi from "../../../utils/strapi";
import AppContext from "../../../utils/AppContext";
import { useBreakpointValue } from "@chakra-ui/react";
// import { useAlert } from "react-alert";
import LMNonCloseALert from "../../../components/LMNonCloseALert";

// import {
//     AutoComplete,
//     AutoCompleteInput,
//     AutoCompleteItem,
//     AutoCompleteList
// } from "@choc-ui/chakra-autocomplete";
const TabWithdrawPanel = ({ data, isDeposit }) => {
    const ref = useRef();
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState(null);
    const [cashOption, setCashOption]= useState([]);
    const [account, setAccount] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [alert, setAlertShow] = useState({ iOpen: false, msg: "" });
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const [cryptoType,setCryptoType]=useState("Bitcoin");
    const [couponCode, setCouponCode] = useState("");
    const [previousAmount, setPreviousAmount] = useState(0);
    // const [showCoupon, setShowCoupon] = useState(false);

    // const handleIncrease = (addedAmount) => {
    //     const newAmount = amount + addedAmount;

    //     setAmount(newAmount);
    // };
    // const couponSamples = [
    //     {
    //         slug: "DEAL50"
    //     },
    //     {
    //         slug: "DEAL50"
    //     },
    //     {
    //         slug: "DEAL50"
    //     },
    //     {
    //         slug: "DEAL50"
    //     }
    // ];
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
                bonus: user?.wallets?.find(
                    (w) => w.currency?.type === "bonus"
                )?.balance
            });
        }
    }, [user]);
    useEffect (()=>{
        if(data){
        if(data.type === "cash")
        setCashOption(["USD"]);
        else 
        setCashOption(["Bitcoin","Ethereum","Dogecoin"]);
        }
    },[data])
  

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
            cryptoType:data.type !== "cash"?cryptoType:null
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
        <Flex h="100%" w="100%" bg="#3F3F3F" direction={"column"}>
            <Flex
                w="100%"
                justifyContent={isDeposit ? "space-between" : "space-evenly"}
                bg="#505050"
                p="2%"
            >
                <InputGroup>
                    <InputLeftAddon w={["48%","40%"]} fontSize={["13px","17px"]} fontWeight="600" >Amount:</InputLeftAddon>
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
                    bg="#3F3F3F"
                    onChange={(e)=>{setCryptoType(e.target.value);}}
                >
                    {cashOption.map((type,index)=>{
 return <option style={{backgroundColor:"#3F3F3F"}} key={"cash"+index}>{type}</option>
                    })}
                   
                </Select>
            </Flex>
            <Flex
                w="100%"
                direction="column"
                justifyContent={"space-between"}
                bg="#505050"
                p="2%"
            >
                <InputGroup>
                    <InputLeftAddon  fontSize={["13px","17px"]} fontWeight="600" >Email Id:</InputLeftAddon>
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
                    <InputLeftAddon fontSize={["13px","17px"]} fontWeight="600" >Account Id:</InputLeftAddon>
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
                        fontSize="12px"
                    >
                        I hereby accept the{" "}
                        <Text
                            color="primary"
                            fontFamily={"Sora"}
                            fontSize="12px"
                            onClick={(e)=>{
                                e.preventDefault();
                                window.open(
                                    "https://lootmogul.com/terms-of-services#payment",
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
