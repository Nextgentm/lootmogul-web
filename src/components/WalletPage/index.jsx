/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { WalletIcon } from "../Icons";
import WalletCard from "./WalletCard";
import TransactionHistory from "./TransactionHistory";

import LMModal from "../LMModal";
import LinkWallet from "../LMModal/LinkWallet";
import DepostWithdraw from "../LMModal/DepositWithdraw";
import AppContext from "../../utils/AppContext";
import { useRouter } from "next/router";
import DepostWithdrawstop from "../LMModal/DepositWithdraw/withdrawStop";
import { InfoIcon } from "../Icons";

const WalletPage = ({ totalAmount }) => {
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const router = useRouter();
    const {
        amounts,
        getCurrencyToChip,
        jwt,
        showModalwithdrawalpopup,
        setShowModalwithdrawalpopup
    } = useContext(AppContext);

    useEffect(() => {
        if (showModalwithdrawalpopup == false) {
            setShowModal(false);
        }
        setShowModalwithdrawalpopup(true);
    }, [showModalwithdrawalpopup]);
    const depositData = {
        title: "Deposit",
        desc: "Total chips you have available to play with",
        inputColor: "#432864",
        icon: true,
        iconName: "add",
        btnText: "Deposit",
        showMore: true,
        tooltip:
            "Your deposits that can be used to play paid games. Can't be withdrawn."
    };
    const withdrawData = {
        title: "Winnings",
        desc: "Total chips you are able to withdraw",
        inputColor: "#432864",
        icon: true,
        iconName: "sub",
        btnText: "Withdraw",
        showMore: true,
        tooltip:
            "Chips available to withdraw subjected to min. balance eligibility. You may also re-use it to play more games."
    };
    const bonusData = {
        title: "Bonus",
        desc: "Total chips got as a bonus/reward",
        inputColor: "#432864",
        icon: false,
        btnText: "Learn more",
        showMore: false,
        tooltip:
            "Use bonus chips to cover 10% of the paid contest's cost and pay the rest from your deposits or winnings."
    };

    const onChangeAmount = (type, amount) => {
        setAmountData({
            ...amountData,
            [type]: amount
        });
    };

    useEffect(() => {
        if (jwt) {
            getCurrencyToChip();
        }
    }, [jwt]);
    return (
        <Box
            p={["10px", "20px"]}
            m={["10px", "60px"]}
            bg="transparent linear-gradient(90deg, #070623 0%, #1F052C 100%) 0% 0% no-repeat padding-box"
            width={["auto", "auto"]}
        >
            <Flex justifyContent={"flex-start"} direction={["column", "row"]}>
                <Flex width={["100%"]} justifyContent={"flex-start"}>
                    <Flex mt="auto" mb={"auto"}>
                        <Heading
                            ml="15px"
                            mr="15px"
                            color="white"
                            fontSize={["36px", "36px", "62px"]}
                        >
                            WALLET BALANCE IN CHIPS
                        </Heading>
                        <Image
                            ml="20px"
                            mt="5px"
                            width="35px"
                            height="35px"
                            objectFit="contain"
                            src="/assets/Icon.png"
                            alt="bonus"
                        />
                        <Heading
                            ml="10px"
                            color="primary"
                            fontSize={["36px", "36px", "62px"]}
                        >
                            {totalAmount}
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
            <Text
                fontSize={["12px", "17px"]}
                ml="15px"
                mt="10px"
                variant="hint"
                color="white"
            >
                Balance : Deposit + Winnings + Bonus = {totalAmount} Chips
            </Text>
            <Flex
                mt="30px"
                direction={["column", "row"]}
                width="100%"
                justifyContent={"space-between"}
            >
                <WalletCard
                    displayData={depositData}
                    amount={parseFloat(amounts?.deposit || 0).toFixed(
                        amounts?.deposit % 1 != 0 ? 2 : 0
                    )}
                    onClick={() => setShowModal({ show: true, mode: "add" })}
                    onChange={onChangeAmount}
                />

                <WalletCard
                    displayData={withdrawData}
                    amount={parseFloat(amounts?.winnings || 0).toFixed(
                        amounts?.winnings % 1 != 0 ? 2 : 0
                    )}
                    onClick={() => setShowModal({ show: true, mode: "sub" })}
                    onChange={onChangeAmount}
                />

                <WalletCard
                    displayData={bonusData}
                    amount={parseFloat(amounts?.bonus || 0).toFixed(
                        amounts?.bonus % 1 != 0 ? 2 : 0
                    )}
                    onClick={() => setShowModal({ show: true, mode: "add" })}
                    onChange={onChangeAmount}
                />
            </Flex>

            <Flex
                mt="40px!important"
                m="auto"
                bg="transparent linear-gradient(180deg, #481A7F 0%, #481A7F00 100%) 0% 0% no-repeat padding-box"
                justifyContent="center"
                pt="15px"
                pb="15px"
                boxShadow="0px 50px 50px -30px rgba(187, 187, 187, 0.1)"
                borderRadius="20px"
                border="1px solid #3C3C3C"
            >
                <Image
                    mr="7px"
                    width="35px"
                    height="35px"
                    objectFit="contain"
                    src="/assets/Doller.png"
                    alt="bonus"
                />
                <Flex
                    justify="flex-start"
                    width={["75%", "75%", "75%", "60%"]}
                    direction={["column", "column", "column", "row"]}
                >
                    <Text
                        variant="hint"
                        fontSize={["10px", "12px", "16px"]}
                        lineHeight={["13px", "19px", "35px"]}
                        ml={["5%", "5%", "2%"]}
                        color="#fff"
                    >
                        Maximum usable Bonus per match is 10% of the contest
                        entry fee
                        <Tooltip
                            placement="top-end"
                            label="Use bonus chips to cover 10% of the paid contest's cost and pay the rest from your deposits or winnings."
                            bg="#383838"
                            borderRadius="10px"
                            color="white"
                            fontSize="sm"
                            p="10px"
                        >
                            <Text
                                float="right"
                                marginLeft="10px"
                            >
                                <InfoIcon
                                    color="white"
                                    boxSize={"29px"}
                                />
                            </Text>
                        </Tooltip>
                        {/**<Text
                            variant="hint"
                            fontSize={["10px", "12px", "16px"]}
                            lineHeight={["13px", "19px", "35px"]}
                            ml={["0%", "2%"]}
                            cursor="pointer"
                            color="primary"
                            onClick={() => {
                                router.push(
                                    process.env.NEXT_PUBLIC_WORDPRESS_URL +
                                        "/terms-conditions"
                                );
                            }}
                        >
                            Know more....
                        </Text>/ */}
                    </Text>
                </Flex>
            </Flex>

            <TransactionHistory />
            <LMModal
                isShow={showModal.show}
                scrollBehavior="outside"
                mode={showModal.mode}
                style={{ padding: "2%" }}
                handleClose={() => setShowModal(false)}
            >
                {showModal.mode === "linkwallet" && <LinkWallet />}
                {showModal.mode === "add" && (
                    <DepostWithdraw
                        isDeposit={true}
                        totalAmount={totalAmount}
                    />
                )}
                {showModal.mode === "sub" && (
                    <DepostWithdraw
                        totalAmount={totalAmount}
                        winAmount={amounts?.winnings}
                    />
                    // <DepostWithdrawstop/>
                )}
            </LMModal>
        </Box>
    );
};
export default WalletPage;
