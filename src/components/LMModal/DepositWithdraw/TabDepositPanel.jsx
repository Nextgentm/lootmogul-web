/* eslint-disable react/jsx-key */
import { useState, useRef , useEffect, useContext} from "react";
import {
    Flex,
    Input,
    Select,
    Text,
    InputGroup,
    InputLeftElement,
    Checkbox,
    Button,
    Box
} from "@chakra-ui/react";
import AppContext from "../../../utils/AppContext";
import { CouponIcon } from "../../Icons";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import strapi from "../../../utils/strapi";
import { useBreakpointValue } from "@chakra-ui/react";

// import { useAlert } from "react-alert";
import { useRouter } from "next/router";

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList
} from "@choc-ui/chakra-autocomplete";
const stripeJs = async () => await import("@stripe/stripe-js/pure");
const TabDepositPanel = ({ isDeposit }) => {
    const { asPath } = useRouter();
    const router = useRouter();
    const { amounts,user } = useContext(AppContext);

    const ref = useRef();
    const [amount, setAmount] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    const [couponCode, setCouponCode] = useState("");
    const [ couponList, setCouponList] =useState([]);
    const [previousAmount, setPreviousAmount] = useState(0);
    const [showCoupon, setShowCoupon] = useState(false);

    const handleIncrease = (addedAmount) => {
        const newAmount = amount + addedAmount;

        setAmount(newAmount);
    };
    const couponSamples = [
        {
            slug: "DEAL50"
        },
        {
            slug: "DEAL50"
        },
        {
            slug: "DEAL50"
        },
        {
            slug: "DEAL50"
        }
    ];

    useEffect(()=>{
        if(user){
            strapi.find("coupon",{filters:{user:user.id}}).then((response)=>{
                if(response?.data?.items){
                    
                    setCouponList(response?.data?.items.filter((coupon) => coupon.type === "coupon-deposit-cashback"));
                }else setCouponList([]);
            })
        }
    },[])
    const deposit = async () => {
        try {
            const user = await strapi.fetchUser();
            const { loadStripe } = await stripeJs();

            if (user) {
                const { id } = user;
                const resp = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                    "https://gamification.tpix.in"
                    }/api/payment/stripe`,

                    {
                        user_id: id,
                        redirect_url:
                            process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL +
                            asPath,
                        type: "DEPOSIT",
                        value: amount,
                        couponCode:couponCode?couponCode:""
                    },
                    {
                        headers: {

                            Authorization: `Bearer ${strapi.getToken()}`

                        }
                    },
                );

                // Add coupon redemption item
                // await axios.post(
                //     `${process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                //     "https://gamification.tpix.in"
                //     }/api/contest/custom-contest/join?couponCode=${couponCode}&userId=${user.id}`
                // );

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
            console.log(error);
        }
    };

    const applyCouponCode = async (couponCode) => {
        const validityResp = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL ||
            "https://gamification.tpix.in"
            }/api/coupon/checkValidity/${couponCode}`
        );
        const {
            success,
            message,
            data: { isVariable, multiplier, amount: promotionAmount }
        } = validityResp.data;

        if (success) {
            let newAmount = 0;

            if (isVariable) {
                newAmount = amount * multiplier;
            } else {
                newAmount = amount - promotionAmount;
            }

            setPreviousAmount(amount);
            setAmount(newAmount);
        }
    };

    const removeCouponCode = () => {
        setAmount(previousAmount);
        setCouponCode("");
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
                {/* <Select bg="#505050" w={currentSize === "base" ? "30%" : "35%"} onChange = {(e)=>{
if(e.target.value.toString() !== "Apply Coupon"){
    setCouponCode(e.target.value);
    }else   setCouponCode("");

                }} color="white" >
                    <option style={{ background: '#505050' }}>Apply Coupon</option>
                    {couponList && couponList.map((item,index)=>{
                        return  <option key={"coupon"+index} value={item.code} style={{ background: '#505050' }} >{item.code}</option>
                    })}
                    
                </Select> */}
                {/* {currentSize !== "base" && isDeposit && (
                    <Box w="30%!important" >
                {showCoupon && <AutoComplete rollNavigation onSelectOption={(e) => {
                            setCouponCode(e.item.value);
                            //  applyCouponCode();
                        }}


                            bg="#222222" ref={ref}>
                <InputGroup w="100%" _focus={{ border: "none", boxShadow: "none" }} color="lightGrey"  >

                                <AutoCompleteInput variant="filled" placeholder="Coupon" bg="#222222" _focus={{ border: "none", bg: "#222222", boxShadow: "none" }} />
                            </InputGroup>
                            <AutoCompleteList style={{
                                backgroundColor: "#222222",
                                color: "lightGrey"
                            }}>
                                {couponSamples.map((code, cid) => (
                                    <AutoCompleteItem
                                        key={`option-${cid}`}
                                        value={code.slug}
                                        textTransform="capitalize"
                                        selected={{ bg: "whiteAlpha.50" }}
                                        _focus={{ bg: "whiteAlpha.100" }}
                                        style={{
                                            bg: "#222222",
                                        }}
                                    >
                                        {code.slug}
                                    </AutoCompleteItem>
                                ))}
                            </AutoCompleteList>

                        </AutoComplete>}
                {!showCoupon && (<Flex onClick={() => { setShowCoupon(!showCoupon) }}>
                <CouponIcon
                            mt="8%!important"
                            m="auto"
                            mr="0px!important"
                            boxSize="24px"
                            color="white"
                        />

                <Text ml="1%!important" m="auto" color="white">
                                APPLY OFFER
                                </Text>


                </Flex>)}
                </Box>
                )} */}
            </Flex>

            {
                isDeposit && (
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
                )
            }

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

            {/* <CouponBanner /> */}
        </Flex >
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

// const CouponBanner = () => {
//     const currentSize = useBreakpointValue({
//         base: "base",
//         sm: "sm",
//         md: "md"
//     });

//     // return (
//     //     <Flex
//     //         mt="3%"
//     //         bgImage="url('/assets/images/coupon_bg.png')"
//     //         bgPosition="center"
//     //         justifyContent={"space-between"}
//     //         bgRepeat="no-repeat"
//     //         w="100%"
//     //         h="100%"
//     //         pl="25px"
//     //         pr="25px"
//     //         pt="2%"
//     //         pb="2%"
//     //     >
//     //         <Box>
//     //             <Text
//     //                 variant="couponHead"
//     //                 style={{
//     //                     fontSize: currentSize === "base" ? "11px" : "18px"
//     //                 }}
//     //             >
//     //                 2 Special Deposit offer for you
//     //             </Text>

//     //             <Text mt="3%" variant="couponDesc" color={["#232323", "#F1A959"]} fontSize={["9px", "14px"]}>
//     //                 Apply an offer &amp; get extra cashback
//     //             </Text>
//     //         </Box>

//     //         <Button mt={["10px", "15px"]} width={["50px", "118px"]} height={["25px", "38px"]} disabled>Apply</Button>
//     //     </Flex>
//     // );
// };
