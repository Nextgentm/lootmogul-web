/* eslint-disable react/jsx-key */
import { Box, Flex, Avatar, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";

import axios from "axios";
import strapi from "../../utils/strapi";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import AppContext from "../../utils/AppContext";
import { isEmpty } from "lodash";
const stripeJs = async () => await import("@stripe/stripe-js/pure");

const LinkWallet = () => {
    const [cryptoWallet, setCryptoWallet] = useState();
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AppContext);

    const payWithStripe = async () => {
        try {
            const user = await strapi.fetchUser();
            const { loadStripe } = await stripeJs();

            if (user) {
                const { id } = user;

                const resp = await axios.post(
                    `${
                        process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                        "https://gamification.tpix.in"
                    }/api/payment/stripe`,
                    {
                        user_id: id,
                        redirect_url: "https://lm.tpix.in",
                        type: "DEPOSIT",
                        value: 100
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
            //console.log(error);
        }
    };

   
    const connectMetamask = async () => {
        setLoading(true); 
        if (!window.web3?.currentProvider?.isMetaMask) {
            alert("Please install Metamask");
            setLoading(false); 
            return;
        }
        let wallet = await localStorage.getItem("selected-wallet", "");
        if (wallet?.length && cryptoWallet) {
            // const mw = cryptoWallets.find((wall) => wall.type == "metamask");
            await strapi.update("crypto-wallets", cryptoWallet.id, {
                data: {
                    isActive: false
                }
            });
            localStorage.setItem("selected-wallet", "");
            setCryptoWallet(null);
        } else {
            await window.ethereum?.enable();
            if (!isEmpty(window.ethereum?.selectedAddress)) {
                localStorage.setItem(
                    "selected-wallet",
                    window.ethereum?.selectedAddress
                );
                const cryptoAdd = {
                    user: user.id,
                    type: "metamask",
                    address: window.ethereum?.selectedAddress,
                    isActive:  true
                }
                const resp = await strapi.create("crypto-wallets", cryptoAdd
                );
                setCryptoWallet(resp);
            } else {
                localStorage.setItem("selected-wallet", "");
            }
            
        }
        setLoading(false); 
    };

    const defaultData = [
        {
            url: "/assets/images/portis.png",
            name: "Portis",
            disabled: true
        },
        {
            url: "/assets/images/metamask.png",
            name: "Metamask",
            type: "metamask",
            handler: connectMetamask,
            disabled: false
        },
        {
            url: "/assets/images/coinbase.png",
            name: "Coinbase wallet",
            disabled: true
        },
        {
            url: "/assets/images/stripe.png",
            name: "Stripe",
            handler: payWithStripe,
            disabled: false
        }
        // {
        //     url: "/assets/images/lmwallet.png",
        //     name: "Lootmogul Wallet",
        //     desc: "0xC398609A1fC813026E94F8fc03c30c162679640A",
        //     type: "Private Key:",
        //     disabled: true
        // }
    ];


    useEffect(async () => {
        setLoading(true); 
        if (!isEmpty(window.ethereum?.selectedAddress)) {
            localStorage.setItem(
                "selected-wallet",
                window.ethereum?.selectedAddress
            );
        } else {
            localStorage.setItem("selected-wallet", "");
        }
        const { data } = await strapi.find("crypto-wallets", {
            filters: { user: user.id }
        });

        if (data?.length) {
            const mw = data.find(
                (wall) => wall.type == "metamask" && wall.isActive === true
            );
            if (mw) setCryptoWallet(mw);
        }
        setLoading(false); 
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

           
             <Box
                border="1px dashed #515151;"
                w="100%"
                m="auto"
                textAlign="center"
            >
                <Flex p="10px">
                    <Avatar boxSize="24px" />
                    <Heading mt="1%" ml="3%" variant="modalHeader">
                        My Wallet
                    </Heading>
                </Flex>

                {!loading && <Box p="10px">
                    <Text mb="10px" variant="textualVal" fontWeight={600}>
                        Crypto Wallets
                    </Text>
                    {defaultData &&  
                        defaultData.map((wallet) => {
                            return (
                                <WalletBar
                                    key={wallet.name}
                                    item={wallet}
                                    cryptoWallet={cryptoWallet}
                                />
                            );
                        })}
                </Box>
            }
                {/* <Button mt="15px!important" mb="20px!important" m="auto">
                    Connect other Wallet
                </Button> */}
            </Box>
            
        </Box>
    );
};

export default LinkWallet;

const WalletBar = ({ item, cryptoWallet }) => {
    return (
        <Flex
            p="5px"
            border="1px solid #7C7C7C"
            justifyContent={"space-between"}
        >
            <Flex width="75%" justifyContent={"flex-start"}>
                <Image
                    alt="linkwallet"
                    src={item.url}
                    width="46px"
                    height="32px"
                />
                <Box ml="3%!important" width="70%" textAlign={"left"} m="auto">
                    <Text m="auto" w="100%" variant="hint" fontWeight={600}>
                        {item.name}
                    </Text>

                    {item.type == cryptoWallet?.type &&
                        cryptoWallet?.isActive &&
                        cryptoWallet?.address && (
                            <Text
                                variant="textualVal"
                                color="#7C7C7C"
                                fontSize="12px"
                                lineHeight="15px"
                                fontWeight={600}
                            >
                                {cryptoWallet.address}
                            </Text>
                        )}

                    
                </Box>
            </Flex>

            
                <Button
                    onClick={item?.handler}
                    width="25%"
                    variant="outline"
                    disabled={item.disabled}
                >
                    {item.type == cryptoWallet?.type && cryptoWallet?.isActive
                        ? "Disconnect"
                        : (item.disabled
                        ? "Coming Soon"
                        : "Connect")}
                </Button>
            
        </Flex>
    );
};
