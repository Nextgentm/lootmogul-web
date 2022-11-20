/* eslint-disable react/jsx-key */
import { useContext, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { WalletIcon } from "../Icons";
import WalletCard from "./WalletCard";
import TransactionHistory from "./TransactionHistory";

import LMModal from "../LMModal";
import LinkWallet from "../LMModal/LinkWallet";
import DepostWithdraw from "../LMModal/DepositWithdraw";
import AppContext from "../../utils/AppContext";
import { useRouter } from "next/router";

const WalletPage = ({ totalAmount }) => {
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const router = useRouter();
    const { amounts } = useContext(AppContext);
    const depositData = {
        title: "Deposit",
        desc: "Total amount you have available to play with",
        inputColor: "#51E36E",
        icon: true,
        iconName: "add",
        btnText: "Deposit",
        showMore: true,
        tooltip:
            "Your deposits that can be used to play paid games. Can't be withdrawn."
    };
    const withdrawData = {
        title: "Winnings",
        desc: "Total amount you are able to withdraw",
        inputColor: "#43C8FF",
        icon: true,
        iconName: "sub",
        btnText: "Withdraw",
        showMore: true,
        tooltip:
            "Cash available to withdraw subjected to min. balance eligibility. You may also re-use it to play more games."
    };
    const bonusData = {
        title: "Bonus",
        desc: "Total amount got as a bonus/reward",
        inputColor: "#3A3A3A",
        icon: false,
        btnText: "Learn more",
        showMore: false,
        tooltip:
            "Amount accumulated through promotions. Part of it can be used to play cash games. Can't be withdrawn."
    };

    const onChangeAmount = (type, amount) => {
        setAmountData({
            ...amountData,
            [type]: amount
        });
    };

    return (
        <Box m={["10px", "60px"]} bg="black" width={["auto", "auto"]}>
            <Flex justifyContent={"flex-start"} direction={["column", "row"]}>
                <Flex width={["100%"]} justifyContent={"flex-start"}>
                    <WalletIcon mt="2%" boxSize={"40px"} color="primary" />
                    <Flex mt="auto" mb={"auto"}>
                        <Heading ml="15px" color="white">
                            WALLET BALANCE
                        </Heading>
                        <Heading ml="10px" color="primary">
                            ${totalAmount}
                        </Heading>
                    </Flex>
                </Flex>
            </Flex>
            <Text fontSize={["12px", "16px"]} mt="10px" variant="hint">
                Balance : Deposit + Winnings + Bonus = ${totalAmount}
            </Text>
            <Flex
                mt="30px"
                direction={["column", "row"]}
                width="100%"
                justifyContent={"space-between"}
            >
                <WalletCard
                    displayData={depositData}
                    amount={amounts?.deposit}
                    onClick={() => setShowModal({ show: true, mode: "add" })}
                    onChange={onChangeAmount}
                />

                <WalletCard
                    displayData={withdrawData}
                    amount={amounts?.winnings}
                    onClick={() => setShowModal({ show: true, mode: "sub" })}
                    onChange={onChangeAmount}
                />

                <WalletCard
                    displayData={bonusData}
                    amount={amounts?.bonus}
                    onClick={() => setShowModal({ show: true, mode: "add" })}
                    onChange={onChangeAmount}
                />
            </Flex>

            <Flex
                mt="40px!important"
                m="auto"
                bg="linear-gradient(180deg, #383838 0%, rgba(57, 57, 57, 0) 100%)"
                justifyContent="center"
                pt="15px"
                pb="15px"
                boxShadow="0px 50px 50px -30px rgba(187, 187, 187, 0.1)"
                borderRadius="20px"
                border="1px solid #3C3C3C"
            >
                <Image
                    mr="10px"
                    width="35px"
                    height="35px"
                    objectFit="contain"
                    src="/assets/bonus1.png"
                    alt="bonus"
                />
                <Flex
                    justify="flex-start"
                    width={["75%", "75%", "75%", "55%"]}
                    direction={["column", "column", "column", "row"]}
                >
                    <Text
                        variant="hint"
                        fontSize={["10px", "14px"]}
                        lineHeight={["13px", "35px"]}
                        ml={["0%", "2%"]}
                    >
                        Maximum usable Bonus per match is 10% of the contest
                        entry fee
                    </Text>
                    <Text
                        variant="hint"
                        fontSize={["10px", "14px"]}
                        lineHeight={["13px", "35px"]}
                        ml={["0%", "2%"]}
                        cursor="pointer"
                        color="primary"
                        onClick={() => {
                            router.push("/terms-of-services");
                        }}
                    >
                        Know more....
                    </Text>
                </Flex>
            </Flex>

            {/* <TransactionHistory /> */}

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
                )}
            </LMModal>
        </Box>
    );
};
export default WalletPage;
