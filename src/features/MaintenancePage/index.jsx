import { Box, Text, Heading } from "@chakra-ui/layout";
import { Grid, GridItem , Image } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../utils/AppContext/index";
import { IoMdWarning } from "react-icons/io";

const MaintenancePage = () => {
    const { setIsHideHeader, setIsHideFooter } = useContext(AppContext);
    useEffect(() => {
        setIsHideHeader(true);
        setIsHideFooter(true);
    }, []);

    return (
        
        <Box width="100vw" pt={["5%", "2%"]} pl={["5%", "2%"]} height="auto">
            
            <Box w={["200px","300px","350px", "350px"]} mt={["5%", "5%","1%","1%"]} ml={["15%", "15%","1%","1%"]}>
                <Image src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/12/20034811/LootMogul-Logo-2.png" alt="Dan Abramov" />
            </Box>
            <Box  w={["100%","100%","100%","50%"]} p={4} color='white' display={"inline-block"} verticalAlign="top" pt={["5%", "15%"]} pl={["5%", "2%"]}>
                <Heading variant="siteHeading" color="#fff" fontSize={["52","52","52","85"]} textAlign={['center','center','center','left']}>
                    UNDER MAINTENANCE
                </Heading>
                <Text style={{ lineHeight: '25px' }} w={["100%","100%","100%", "85%"]} mt={["0%", "5%"]} ml={["0%", "0%"]} variant="hint" color={"#fff"} fontSize={18} textAlign={['center','center','center','left']} >
                <Text color='#E90A63'  display={"inline-block"}>Lootmogul.com</Text> website will be not available on 20 December 2022 from 12:30 am to 01:00 am GMT for period of 30 minutes.
                </Text>
            </Box>
            <Box  w={["100%","100%","100%", "50%"]} p={4} color='red' display={"inline-block"}>
                <Image w="500px" textAlign="center" src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/12/20031601/Image01210.png" alt="Dan Abramov" />
            </Box>
            
        </Box>
    );
};
export default MaintenancePage;