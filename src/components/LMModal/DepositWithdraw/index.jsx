/* eslint-disable react/jsx-key */
import {
    Box,
    Flex,
    Heading,
    Text,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    Checkbox,
    Button
} from "@chakra-ui/react";
import { WalletIcon } from "../../Icons";
import LMTabs from "../../LMTabs";
import TabLabel from "./TabLabel";
import TabDepositPanel from "./TabDepositPanel";
import { useBreakpointValue } from "@chakra-ui/react";




const WalletHeader = ({ totalAmount, isDeposit , winAmount }) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex width="100%" h={["50px", "65px"]}>
            

            <Flex w="100%">
            {currentSize !== "base" && (
                <Flex width="55%">
                    <Box
                         width="50%"
                        paddingTop="5%"
                        borderTopLeftRadius="8px"
                        paddingBottom="5%"
                        bg="#3F3F3F"
                    >
                        <Heading  ml="10%" fontWeight="600"  variant="modalHeader">
                        {isDeposit? "DEPOSIT":"WITHDRAW"}
                        </Heading>
                    </Box>

                   
                </Flex>
            )}

            {currentSize === "base" && (
                <Box
                    width="40%"
                    paddingTop="5%"
                    marginRight="16px"
                    borderTopLeftRadius="8px"
                    paddingBottom="5%"
                    bg="#3F3F3F"
                >
                    <Heading  ml="10%" fontWeight="600" variant="modalHeader" fontSize={["10px","16px"]}>
                    {isDeposit? "DEPOSIT":"WITHDRAW"}
                    </Heading>

                </Box>
            )}
                <Flex w="100%" justifyContent="flex-end" mr="3%">
                <Flex m="auto 0px" justifyContent="flex-end">
                <WalletIcon
                    mt="auto"
                    mb="auto"
                    boxSize={"35px"}
                    color="primary"
                />

                <Heading fontWeight="400" fontFamily="Blanch" fontSize={["24px","28px","38px"]} ml={["6px!important","15px!important"]} m="auto" color="white">
                {isDeposit? "WALLET BALANCE":"WIN BALANCE"} 
                </Heading>
                </Flex>

                <Heading fontSize={["24px","28px","38px"]}  mt="auto" ml="10px" mb="auto" color="primary">
                ${isDeposit? totalAmount:  winAmount}
                </Heading>
                </Flex>
            </Flex>
        </Flex>
    );
};

const WalletFooter = () => {
    return (
        <Flex m="auto" width="100%" p="2%" justifyContent="center">
            <Text
                textAlign="center"
                width="auto"
                variant="hint"
                fontWeight="600"
            ></Text>
        </Flex>
    );
};
const WalletBody = ({isDeposit}) => {
    const data = [
        {
            url: "/assets/images/stripe.png",
            name: "Stripe"
        }
        // {
        //     url: "/assets/images/portis.png",
        //     name: "Portis"
        // },
        // {
        //     url: "/assets/images/metamask.png",
        //     name: "Metamask"
        // },
        // {
        //     url: "/assets/images/coinbase.png",
        //     name: "Coinbase wallet"
        // },
    
        // {
        //     url: "/assets/images/lmwallet.png",
        //     name: "Lootmogul Wallet",
        //     desc: "0xC398609A1fC813026E94F8fc03c30c162679640A",
        //     type: "Private Key:"
        // }
    ];
    const withDrawData = [
        // {
        //    // url: "/assets/images/stripe.png",
        //     name: "Stripe",
        //     mode: "stripe",
        //     type:"cash"
        // },
        {
            //url: "/assets/images/lmwallet.png",
            name: "Paypal",
            mode: "paypal",
            type:"cash"

        },
        
        // {
        //     //url: "/assets/images/lmwallet.png",
        //     name: "Paytm",
        //     mode: "paytm",
        //     type:"cash"
            
        // },
       
        {
            //url: "/assets/images/metamask.png",
            name: "Metamask",
            mode: "metamask",
            type:"crypto"
        },
        {
            //url: "/assets/images/coinbase.png",
            name: "Coinbase wallet",
            mode: "coinbase",
            type:"crypto"
        },
    
       
        
        // {
        //   //  url: "/assets/images/lmwallet.png",
        //     name: "Bank",
        //     mode: "bank",
        //     type:"cash"
           
        // }
    ];
  
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    return (
        <Flex>
            <LMTabs
                data={isDeposit?data:withDrawData}
                isDeposit={isDeposit}                
                orientation={currentSize === "base" ? "horizontal" : "vertical"}
            />
        </Flex>
    );
};

const DepostWithdraw = ({ totalAmount,isDeposit, winAmount }) => {
    return (
        <Box width="100%" bg="#303030" borderRadius="8px">
            <WalletHeader isDeposit = {isDeposit} totalAmount={totalAmount} winAmount={winAmount} />
            <WalletBody isDeposit={isDeposit} />
            <WalletFooter />
        </Box>
    );
};
export default DepostWithdraw;
