import React from 'react'
import {Box, Text, Flex, Image,GridItem } from "@chakra-ui/react";

const BottomAboutText = () => {
  return (
    <Box>
        <Box w="100%" h="3px" bg="#FFF" my="20px" />
        <Flex
            py="10px"
            px="20px"
            pb="0px"
            w="80%"
            maxW="90%"
            m="0 auto"
            display={['block','block','flex','flex']}
        >
             <GridItem  w={["100%", "100%", "31%", "31%"]} h={['150px','150px','150px','170px','150px']} >
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["center", "center", "flex-start", "flex-start"]}
                    display="block"
                    pt={["15px", "15px", "0px", "0px"]}
                    pb={["15px", "15px", "0px", "0px"]}
                >
                    <Image
                        w={'auto'}
                        h="70px"
                        alt=""
                        src="https://lootmogulstg.wpengine.com/wp-content/uploads/2023/09/Logo-1.png"
                        display={'block'}
                        margin={"auto"}
                    />
                </Flex>
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["flex-start", "flex-start", "flex-start", "flex-start"]}
                >
                    <Text pr={["0px", "0px", "10px", "10px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["10px","10px","8px", "12px"]} textAlign={["center","center","left"]}>
                    Official Metaverse and Gaming Partner: <br/>
Cricket South Africa and SA20 team - Durban Super Giants
                    </Text>
                
                </Flex>
             </GridItem>
             <GridItem w={["100%", "100%", "43%", "43%"]} h={['130px','130px','150px']} >
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["center", "center", "flex-start", "flex-start"]}
                    display="block"
                    pt={["15px", "15px", "0px", "0px"]}
                    pb={["15px", "15px", "0px", "0px"]}
                >
                    <Image
                        w={["100%", "100%", "80%", "80%"]}
                        h={["auto","auto","70px","70px"]}
                        alt=""
                        src="https://lootmogulstg.wpengine.com/wp-content/uploads/2023/09/Wide-Logo-1.png"
                        display={'block'}
                        margin={"auto"}
                    />
                </Flex>
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["flex-start", "flex-start", "flex-start", "flex-start"]}
                >
                    <Text pr={["0px", "0px", "10px", "10px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["10px","10px","8px", "12px"]} textAlign={["center","center","left"]}>
                    LootMogul venture is accelerated (1 of 5 ventures) by National Basketball Player Association in collaboration with Andreessen Horowitz (a16z)’s Cultural Leadership Fund and Patricof Co
                    </Text>
                
                </Flex>
             </GridItem>
             <GridItem w={["100%", "100%", "48%", "48%"]} h='150px' >
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["center", "center", "flex-start", "flex-start"]}
                    display="block"
                    pt={["0px", "0px", "0px", "0px"]}
                    pb={["0px", "0px", "0px", "0px"]}
                >
                    <Image
                        w={["50%", "50%", "50%", "auto"]}
                        h="70px"
                        alt=""
                        src="https://lootmogulstg.wpengine.com/wp-content/uploads/2023/09/NFLPA-Logo.png"
                        display={'block'}
                        margin={"auto"}
                        p="13px"
                    />
                </Flex>
                <Flex
                    w={["100%", "100%", "100%", "100%"]}
                    justify={["flex-start", "flex-start", "flex-start", "flex-start"]}
                >
                    <Text pr={["0px", "0px", "10px", "10px"]} variant="footerText" w="100%" fontWeight="400" fontSize={["10px","10px","8px", "12px"]} textAlign={["center","center","left"]}>
                    LootMogul is competitively selected (1 of 6 ventures) by National Football League Player Association (NFLPA)  to participate in their 2023 NFLPA Pitch Day Competition during the 2023 NFL Superbowl LVII Week.
                    </Text>  
                </Flex>
             </GridItem>      
        </Flex>
        
        
        <Flex
            py="0px"
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
                    fontSize={["8px", "8px","8px", "10px"]}
                    w="100%"
                    mx="auto"
                >
                    LootMogul is NOT AFFILIATED, AUTHORIZED, LICENSED OR ENDORSED by NBA (National Basketball Association), NFL (National Football League), MLB (Major League Baseball), NHL (National Hockey League), MLS (Major League Soccer), NCAA (National College Athletic Association) or any other professional and amateur organization.
                </Text>
            </Flex>
        </Flex>
        <Flex
            py="40px"
            px="20px"
            w="100%"
            maxW="95%"
            m="0 auto"
            pt="15px"
        >
            <Flex
                w={["100%", "100%", "100%", "100%"]}
                justify={["center", "center", "flex-start", "flex-start"]}
            >

                <Text
                    variant="footerText"
                    fontWeight="400"
                    fontSize={["8px", "8px","8px", "10px"]}
                    w="100%"
                    mx="auto"
                >
                    © 2024 LootMogul. All Rights Reserved. NextGenTM, Inc. 831 N Tatnall Street Suite M #275 Wilmington, DE 19801 United States <br/>
                    Office Address : C/105 Varsha Swapna Gawan Pada, Mulund East, Mumbai - 400081
                </Text>
            </Flex>   
        </Flex>
</Box>
  )
}

export default BottomAboutText