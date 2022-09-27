import {
    Box,
    Heading,
    Text,
    Flex,
    Button,
    Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import strapi from "../../../utils/strapi";
import axios from "axios";
import LMNonCloseALert from "../../LMNonCloseALert";

const JoiningPopup = ({ retry, data }) => {
    const router = useRouter();
    const {
        setShowPaidGameConfirmation,
        user,
        fetchGameJoiningData,
        setCoupon
    } = useContext(AppContext);
    const [couponAmount, setCouponAmount] = useState({
        show: false,
        amount: 0
    });
    const [couponList, setCouponList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user) {
            strapi
                .find("coupon", {
                    filters: {
                        redeemedBy: user?.id,
                        redeemed: false
                    }
                })
                .then((response) => {
                    if (response?.data?.items) {
                        setCouponList(
                            response?.data?.items.filter(
                                (coupon) =>
                                    coupon.type !== "coupon-deposit-cashback"
                            )
                        );
                    } else setCouponList([]);
                });
        }
    }, []);

 

    return (
        <Box
            pos="relative"
            bgImage="url('/assets/login-bg.png')"
            bgPosition={["right", "inherit"]}
            bgRepeat="no-repeat"
            bgSize="cover"
            p="2%"
            height="100%"
        >
            <Box
                w="40px"
                h="40px"
                position="absolute"
                top={"0px"}
                right={"0px"}
            >
                <Image layout="fill" alt="cut" src="/assets/login-cut.png" />
            </Box>
            {loading &&
                <LMNonCloseALert
                    header={"Please Wait....."}
                    canClose={false}
                    isOpen={loading}
                ></LMNonCloseALert>
            }
            {!loading &&
                <Box
                    border="1px dashed #515151;"
                    w="100%"
                    m="auto"
                    p="18px"
                    textAlign="left"
                >
                    <Heading
                        fontWeight="600"
                        color="white"
                        fontSize={["40px", "44px"]}
                    >
                        CONFIRMATION
                    </Heading>
                    <Text
                        color="#C7C7C7"
                        fontSize={["12px", "16px"]}
                        variant="textualVal"
                    >
                        Balance : Deposit + Winnings = {data.balance}
                    </Text>
                    {retry && retry.retry === "exceeded" && <Text
                        color="primary"
                        fontSize={["12px", "16px"]}
                        variant="textualVal" my="5px"
                    >
                        You have exceeded the {retry.count} retry attempts.
                    </Text>}
                    <Box mt="20px">
                        <Flex mt="5%" justifyContent="space-between">
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                Entry
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                {data.entryFee}$
                            </Text>
                        </Flex>
                        <Flex mt="5%" justifyContent="space-between">
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                Usable Cash Bonus
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                {data.bonus}$
                            </Text>
                        </Flex>
                    </Box>
                 
                    <Divider mt="5%"></Divider>
                    <Box mt="20px">
                        <Flex mt="5%" justifyContent="space-between">
                            <Text
                                fontWeight="600"
                                color="primary"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                To Pay
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px"]}
                            >
                                {(data.deductBal -
                                    (couponAmount.amount + data.bonus)) > 0 ? (data.deductBal -
                                        (couponAmount.amount + data.bonus)) : 0}
                                $
                            </Text>
                        </Flex>
                        <Text
                            mt="2%"
                            color="#C7C7C7"
                            variant="textualVal"
                            fontSize={["14px", "16px"]}
                        >
                            Amount will be deducted from your wallet when joining
                            the game.
                        </Text>
                    </Box>
                    <Button
                        width="100%"
                        my="5%"
                        onClick={() => {
                            setLoading(true);
                            fetchGameJoiningData();
                            // setShowPaidGameConfirmation({});

                        }}
                    >
                        Join Contest
                    </Button>
                </Box>
            }
        </Box>
    );
};

export default JoiningPopup;
