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
            bg="#1d052b"
            bgPosition={["right", "inherit"]}
            bgRepeat="no-repeat"
            bgSize="cover"
            height="100%"
            border="4px solid #672099;"
            borderRadius="12px"
        >
            
            {loading &&
                <LMNonCloseALert
                    header={"Please Wait....."}
                    canClose={false}
                    isOpen={loading}
                ></LMNonCloseALert>
            }
            {!loading &&
                <Box
                    w="100%"
                    m="auto"
                    p="15px"
                    textAlign="left"
                >
                    <Heading
                        fontWeight="500"
                        color="white"
                        fontSize={["40px", "44px"]}
                        textAlign={['center','center','left']}
                    >
                        CONFIRMATION
                    </Heading>
                    <Text
                        color="#fff"
                        fontSize={["16px", "16px"]}
                        textAlign={['center','center','left']}
                    >
                        Balance : Deposit + Winnings in Chips = <Text color="#E90A63" fontWeight="600" display="inline">{(data.balance).toFixed(2)}</Text>
                    </Text>
                    {retry && retry.retry === "exceeded" && <Text
                        color="primary"
                        fontSize={["12px", "16px"]}
                        variant="textualVal" my="5px"
                    >
                        You have exceeded the {retry.count} retry attempts.
                    </Text>}
                    <Box mt="20px">
                        <Flex mt="5%" justifyContent="space-between" bg="transparent linear-gradient(180deg, #481A7F 0%, #481A7F00 100%) 0% 0% no-repeat padding-box" p={"17px 12px"}>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px","16px", "20px"]}
                                pl={"10px"}
                            >
                                Entry
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px","16px", "20px"]}
                            >
                                {data.entryFee} CHIPS
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" bg="#341e41" p={"17px 12px"}>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px", "20px"]}
                                pl={"10px"}
                            >
                                Usable chip Bonus
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px", "20px"]}
                            >
                                {data.bonus} CHIPS
                            </Text>
                        </Flex>
                    </Box>
                 
                    <Box mt="20px">
                        <Flex mt="5%" justifyContent="space-between" bg="transparent linear-gradient(180deg, #481A7F 0%, #481A7F00 100%) 0% 0% no-repeat padding-box" p={"17px 12px"}>
                            <Text
                                fontWeight="600"
                                color="primary"
                                variant="hint"
                                fontSize={["14px", "16px", "20px"]}
                                pl={"10px"}
                            >
                                To Pay
                            </Text>
                            <Text
                                fontWeight="600"
                                color="white"
                                variant="hint"
                                fontSize={["14px", "16px", "20px"]}
                            >
                                {(data.deductBal -
                                    (couponAmount.amount + data.bonus)) > 0 ? (data.deductBal -
                                        (couponAmount.amount + data.bonus)) : 0} CHIPS
                            </Text>
                        </Flex>
                        <Text
                            mt="2%"
                            color="#fff"
                            variant="textualVal"
                            fontSize={["14px", "16px", "19px"]}
                        >
                           Chips will be deducted from your wallet when joining the game.
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
                        JOIN CONTEST
                    </Button>
                </Box>
            }
        </Box>
    );
};

export default JoiningPopup;
