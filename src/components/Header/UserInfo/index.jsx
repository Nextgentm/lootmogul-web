import { useEffect } from "react";
import { Button, Text, Flex, useOutsideClick } from "@chakra-ui/react";
import Image from "next/image";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    TriangleUpIcon
} from "@chakra-ui/icons";

import { useState, useContext, useRef } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
const DepostWithdrawModal = dynamic(() => import("../../LMModal/DepositWithdraw"), {
    loading: () => <p>Loading...</p>
});
const LMModalComponent = dynamic(() => import("../../LMModal"), {
    loading: () => <p>Loading...</p>
});
const UserInfo = ({ user, isMobileDevice }) => {
    const router = useRouter();
    const [isPopupMenuShowing, togglePopupMenu] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const [totalAmount, setTotalAmount] = useState();
    const { logout, isTabletOrDesktop, amounts } = useContext(AppContext);
    const ref = useRef();
    // console.log(amounts);

    useOutsideClick({
        ref,
        handler: () => togglePopupMenu(false)
    });

    const popupMenuItems = [
        {
            label: "My Wallet",
            action: () => router.push("/wallet")
        },
        // { label: "My NFTs" },
        // { label: "Last Played" },
        // { label: "Leaderboard" },
        // { label: "Refer & Earn" },
        {
            label: "Deposit",
            action: () => setShowModal({ show: true, mode: "sub" })
        },
        {
            label: "Withdrawal",
            action: () => setShowModal({ show: true, mode: "add" })
        },
        // { label: "Payment History" },
        { label: "Logout", action: () => logout() }
    ];

    const ArrowIcon = isPopupMenuShowing ? ChevronUpIcon : ChevronDownIcon;

    const renderPopoverMenu = () => (
        <Flex
            ref={ref}
            onClick={() => togglePopupMenu(!isPopupMenuShowing)}
            position="absolute"
            top="52px"
            zIndex={999}
            right="8px"
            bg="#303030"
            direction={"column"}
            boxShadow={"4px"}
            border={"1px"}
            borderColor="303030"
            borderRadius={"10px"}
        >
            <TriangleUpIcon
                boxSize="20px"
                color="#303030"
                mt="-15px"
                ml="auto"
                mr="12px"
            />

            <Flex direction={"column"} m="16px">
                <Text fontSize="16px" color="#C7C7C7" ml="8px">
                    Hi {user?.fullName || user?.username} !
                </Text>

                <div
                    style={{
                        width: "100%",
                        marginTop: "8px",
                        height: "1px",
                        background: "#212633"
                    }}
                />

                {popupMenuItems.map(({ label, action }, index) => (
                    <Text
                        cursor={"pointer"}
                        key={`${label}-${index}`}
                        color="white"
                        _hover={{
                            borderRadius: "5px",
                            background: "lightGrey"
                        }}
                        p="6px"
                        onClick={() => action && action()}
                        fontWeight={700}
                        fontSize="12px"
                    >
                        {label}
                    </Text>
                ))}
            </Flex>
        </Flex>
    );

    useEffect(() => {
        if (user?.wallets) {
            const totalAmount = user?.wallets?.reduce(
                (partialSum, a) => partialSum + a?.balance,
                0
            )?.toFixed(2);;

            setTotalAmount(totalAmount);
        }
    }, [user, user?.wallets]);


    return (
        <Flex ml="auto" align="center" h="100%" pl="20px">

            {isTabletOrDesktop && (
                <>

                    {user?.wallets?.length > 0 && (
                        <>
                            <Image
                                alt="vl"
                                width={1}
                                height={30}
                                src="/assets/vertical_line.png"
                            />
                            <Flex zIndex={99} ml="20px" mr="20px" align="center" onClick={() => router.push("/wallet")}>
                                <Image
                                    alt="wallet"
                                    src="/assets/wallet.svg"
                                    width={30}
                                    height={30}
                                />
                                <Text
                                    fontFamily="Sora"
                                    ml="8px"
                                    color="white"
                                    fontSize="16px"
                                >
                                    {`$${totalAmount}`}
                                </Text>

                                <ChevronDownIcon ml="4px" color="white" />
                            </Flex>
                        </>
                    )}
                    <Image
                        alt="vl"
                        width={1}
                        height={30}
                        src="/assets/vertical_line.png"
                    />
                </>
            )}

            <Flex ml={[0, "20px"]}>
                <Flex
                    align="center"
                    cursor={"pointer"}
                    onClick={() => togglePopupMenu(!isPopupMenuShowing)}
                >
                    <Image
                        alt="profile"
                        width={30}
                        height={30}
                        src="/assets/profile.png"
                    />

                    {isTabletOrDesktop && <ArrowIcon ml="4px" color="white" />}
                </Flex>
            </Flex>

            {isPopupMenuShowing && renderPopoverMenu()}
            <LMModalComponent
                isShow={showModal.show}
                scrollBehavior="outside"
                mode={showModal.mode}
                style={{ padding: "2%" }}
                handleClose={() => setShowModal(false)}
            >
                {showModal.mode === "sub" && <DepostWithdrawModal isDeposit={true} totalAmount={totalAmount}
                    winAmount={amounts?.winnings} />}
                {showModal.mode === "add" && (
                    <DepostWithdrawModal totalAmount={totalAmount} winAmount={amounts?.winnings} />
                )}
            </LMModalComponent>
        </Flex>
    );
};

export default UserInfo;