import { useEffect } from "react";
import { Button, Text, Flex, useOutsideClick, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    TriangleUpIcon
} from "@chakra-ui/icons";

import { useState, useContext, useRef } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DepostWithdrawstop from "../../LMModal/DepositWithdraw/withdrawStop";
const DepostWithdrawModal = dynamic(
    () => import("../../LMModal/DepositWithdraw"),
    {
        loading: () => <p>Loading...</p>
    }
);
const LMModalComponent = dynamic(() => import("../../LMModal"), {
    loading: () => <p>Loading...</p>
});
const UserInfo = ({ user, isMobileDevice }) => {
    const router = useRouter();
    const [isPopupMenuShowing, togglePopupMenu] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const [totalAmount, setTotalAmount] = useState();
    const { logout, isTabletOrDesktop, amounts, handlePermission } = useContext(AppContext);
    const ref = useRef();


    useOutsideClick({
        ref,
        handler: () => togglePopupMenu(false)
    });

    let paramsLogin = "";
    if (typeof window !== "undefined") {
        const jwt_token = window.localStorage?.getItem("strapi_jwt");
        if (jwt_token !== null) {
            paramsLogin = "?jwt=" + jwt_token;
        }
        else {
            paramsLogin = '';
        }

    }

    const popupMenuItems = [
        {
            label: "Profile",
            action: () => window.location.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL + "/profile/" + paramsLogin)
        },
        {
            label: "My Wallet",
            action: () => router.push("/wallet")
        },
        {
            label: "Deposit",
            action: () => setShowModal({ show: true, mode: "sub" })
        },
        {
            label: "Withdrawal",
            action: () => setShowModal({ show: true, mode: "add" })
        },
        {
            label: "My Report",
            action: () => router.push("/influencer-summary")
        },
        { label: "Logout", action: () => logout() }
    ];

    const ArrowIcon = isPopupMenuShowing ? ChevronUpIcon : ChevronDownIcon;

    const renderPopoverMenu = () => (
        <Flex
            ref={ref}
            onClick={() => togglePopupMenu(!isPopupMenuShowing)}
            position="absolute"
            top="65px"
            zIndex={999}
            right="5%"
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
            const totalAmount = user?.wallets
                ?.reduce((partialSum, a) => partialSum + a?.balance, 0)
                ?.toFixed(2);

            setTotalAmount(totalAmount);
        }
    }, [user, user?.wallets]);

    return (
        <Flex ml="0" align="center" h="100%" pl="20px">
            {isTabletOrDesktop && (
                <>
                    {user?.wallets?.length > 0 && (
                        <>
                            <Flex
                                zIndex={99}
                                ml="5px"
                                mr="5px"
                                align="center"
                                onClick={() => router.push("/wallet")}
                                border="1px solid #481A7F;"
                                p="8px 10px"
                                borderRadius="5px"
                                gap={1}
                                cursor="pointer"
                            >

                                <Tooltip
                                    placement="top-end"
                                    label={'wallet'}
                                    bg="#383838"
                                    borderRadius="10px"
                                    color="white"
                                    fontSize="sm"
                                    p="10px"
                                >
                                    <Text>
                                        <Image
                                            alt="wallet"
                                            src="/assets/Wallet_new.png"
                                            width={30}
                                            height={30}

                                        />
                                    </Text>
                                </Tooltip>
                                <Tooltip
                                    placement="top-end"
                                    label={'chips'}
                                    bg="#383838"
                                    borderRadius="10px"
                                    color="white"
                                    fontSize="sm"
                                    p="10px"
                                >
                                    <Text>
                                        <Image
                                            alt="wallet"
                                            src="/assets/Icon.png"
                                            width={25}
                                            height={25}
                                        />
                                    </Text>
                                </Tooltip>
                                <Text
                                    fontFamily="Sora"
                                    ml="5px"
                                    color="white"
                                    fontSize="16px"
                                >
                                    {`${Math.round(totalAmount)}`}
                                </Text>
                                <Text
                                    fontFamily="Sora"
                                    ml="5px"
                                    color="white"
                                    fontSize="14px"
                                    bg="transparent linear-gradient(142deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box;"
                                    p="0px 5px"
                                    borderRadius="50%"
                                    cursor="pointer"
                                    onClick={() => setShowModal({ show: true, mode: "sub" })}
                                >
                                    {`+`}
                                </Text>
                            </Flex>
                        </>
                    )}
                </>
            )}

            <Flex ml={[0, "20px"]}>
                <Flex
                    align="center"
                    cursor={"pointer"}
                    onClick={() => togglePopupMenu(!isPopupMenuShowing)}
                >
                    <img
                        alt="profile"
                        style={{ "border": "1px solid #df0b65", "border-radius": "50px", "width": "45px", "height": "45px" }}
                        borderRadius="50px"
                        src={user?.photoURL ? user?.photoURL : "/assets/Users.png"}
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
                {showModal.mode === "sub" && (
                    <DepostWithdrawModal
                        isDeposit={true}
                        totalAmount={totalAmount}
                        winAmount={amounts?.winnings}
                    />
                )}
                {showModal.mode === "add" && (
                    <DepostWithdrawModal
                        totalAmount={totalAmount}
                        winAmount={amounts?.winnings}
                    />
                    //  <DepostWithdrawstop/>
                )}

            </LMModalComponent>
        </Flex>
    );
};

export default UserInfo;
