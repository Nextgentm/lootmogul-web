import React from 'react'
import {Box, Text, Flex, Image } from "@chakra-ui/react";

const BottomAboutText = () => {
  return (
    <Box>
        <Box w="100%" h="3px" bg="#FFF" my="20px" />
        <Flex
            py="50px"
            px="20px"
            pb="0px"
            w="80%"
            maxW="90%"
            m="0 auto"
            display={['block','block','flex','flex']}
        >
            <Flex
                w={["100%", "100%", "80%", "80%"]}
                justify={["flex-start", "flex-start", "flex-start", "flex-start"]}
            >
                <Text pr={["0px", "0px", "20px", "20px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["15px", "18px"]} textAlign="left">
                LootMogul venture is accelerated (1 of 5 ventures) by National Basketball Player Association in collaboration with 
                <a style={{color:'#e90a63'}}  href="#"> Andreessen Horowitz (a16z)’s Cultural Leadership Fund and Patricof Co</a>{" "}
                </Text>
               
            </Flex>
            <Flex
                w={["100%", "100%", "20%", "20%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
                display="block"
                pt={["15px", "15px", "0px", "0px"]}
                pb={["15px", "15px", "0px", "0px"]}
            >
                <Image
                    w={["70%", "70%", "100%", "100%"]}
                    h="auto"
                    alt=""
                    src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/07/22051935/NBPA.jpg"
                    display={'block'}
                />
                <Image
                    w={["70%", "70%", "100%", "100%"]}
                    h="auto"
                    mt="5px"
                    alt=""
                    src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/07/22052008/Andreessen-Horowitz-1.png"
                    display={'block'}
                />
            </Flex>
        </Flex>
        <Flex
            py="0px"
            px="20px"
            w="80%"
            maxW="90%"
            m="0 auto"
            display={['block','block','flex','flex']}
        >
            <Flex
                w={["100%", "100%", "100%", "100%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
            >
                <Text pt={["20px", "20px", "0px", "0px"]} pr={["0px", "0px", "20px", "20px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["15px", "18px"]} textAlign="left">
                Web3 Studios reports LootMogul as one of the top sports metaverse experience platforms
                </Text>
                
            </Flex>
        </Flex>
        <Flex
            py="20px"
            px="20px"
            w="80%"
            maxW="90%"
            m="0 auto"
            display={['block','block','flex','flex']}
        >
            <Flex
                w={["100%", "100%", "80%", "80%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
            >
                <Text pr={["0px", "0px", "20px", "20px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["15px", "18px"]} textAlign="left">
                LootMogul is competitively selected (1 of 6 ventures) by National Football League Player Association (NFLPA)  to participate in their <a style={{color:'#e90a63'}} href="#">2023 NFLPA Pitch Day</a> Competition during the 2023 NFL Superbowl LVII Week.
                </Text>
                
            </Flex>
            <Flex
                w={["100%", "100%", "20%", "20%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
                pt={["15px", "15px", "0px", "0px"]}
                pb={["15px", "15px", "0px", "0px"]}
                display="block"
            >
               <Image
                    w={["70%", "70%", "100%", "100%"]}
                    h="auto"
                    alt=""
                    src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/07/22051955/NFLPA-1.png"
                    display={'block'}
                />
                
            </Flex>
        </Flex>
        <Flex
            py="25px"
            px="20px"
            pb="0"
            w="100%"
            maxW="95%"
            m="0 auto"
        >
            <Flex
                w={["100%", "100%", "100%", "100%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
            >
                <Text
                    variant="footerText"
                    fontWeight="500"
                    fontSize={["15px", "18px"]}
                    w="100%"
                    mx="auto"
                >
                    LootMogul is NOT AFFILIATED, AUTHORIZED, LICENSED OR ENDORSED by NBA (National Basketball Association), NFL (National Football League), MLB (Major League Baseball), NHL (National Hockey League), MLS (Major League Soccer), NCAA (National College Athletic Association) or any other professional and amateur organization.
                </Text>
            </Flex>
        </Flex>
        <Flex
            py="40px"
            px="40px"
            w="100%"
            maxW="95%"
            m="0 auto"
        >
            <Flex
                w={["100%", "100%", "100%", "100%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
            >

                <Text
                    variant="footerText"
                    fontWeight="400"
                    fontSize={["15px", "18px"]}
                    w="100%"
                    mx="auto"
                >
                    © 2023 LootMogul. All Rights Reserved. NextGenTM, Inc. 831 N Tatnall Street Suite M #275 Wilmington, DE 19801 United States <br/>
                    Office Address : C/105 Varsha Swapna Gawan Pada, Mulund East, Mumbai - 400081
                </Text>
            </Flex>   
        </Flex>
</Box>
  )
}

export default BottomAboutText