import { Box, Heading, Text, Input, Flex,Button, Divider } from "@chakra-ui/react"
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../../../utils/AppContext";

const JoiningPopup = ({data}) => {
    const router = useRouter();
    const { setShowPaidGameConfirmation} = useContext(AppContext);

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
                <Image
                    
                    layout="fill"
                    alt="cut"
                    src="/assets/login-cut.png"
                />
            </Box>

            <Box
                border="1px dashed #515151;"
                w="100%"
                m="auto"
                p="18px"
                textAlign="left"
            >
                 <Heading fontWeight="600" color="white">CONFIRMATION</Heading>
                 <Text color= "#C7C7C7" variant="textualVal">Balance : Deposit + Winnings = {data.balance}</Text>
                 <Box mt="20px" >
                     <Flex mt="5%" justifyContent="space-between">
                         <Text fontWeight="600" color="white"variant="hint">Entry</Text>
                         <Text fontWeight="600" color="white" variant="hint">${data.entryFee}</Text>
                     </Flex>
                     <Flex mt="5%" justifyContent="space-between">
                         <Text fontWeight="600" color="white" variant="hint">Usable Cash Bonus</Text>
                         <Text fontWeight="600" color="white" variant="hint">${data.bonus}</Text>
                     </Flex>
                 </Box>
                 {/* <Box mt="20px">
                 <Text fontWeight="600" color="primary" variant="hint">Apply an offer</Text>
                 <Input mt ="2%" placeholder="Enter offer code"></Input>
                 <Flex mt="5%" justifyContent="space-between">
                         <Text fontWeight="600" color="white" variant="hint">Applied Offer</Text>
                         <Text fontWeight="600" color="white" variant="hint">-$0.5</Text>
                     </Flex>
                 </Box> */}
                 <Divider mt="5%"></Divider>
                 <Box mt="20px" >
                     <Flex mt="5%" justifyContent="space-between">
                         <Text fontWeight="600" color="primary" variant="hint">To Pay</Text>
                         <Text fontWeight="600" color="white" variant="hint">${data.deductBal}</Text>
                     </Flex>
                     <Text mt="2%" color="#C7C7C7" variant="textualVal">Amount will be deducted from your wallet when joining the game.</Text>

                    
                 </Box>
                 <Button width="100%" my="5%"
                                     onClick={() =>{
                                        router.push("/joining")
                                        setShowPaidGameConfirmation({});
                                    }
                                     } 
                                     >Join Contest</Button>
            </Box>
           </Box>);
}

export default JoiningPopup;