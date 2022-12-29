import { Box, Text, Heading } from "@chakra-ui/layout";
import { Grid, GridItem , Image,Button,Link, textDecoration } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../utils/AppContext/index";
import { IoMdWarning } from "react-icons/io";

const NotFoundPage = () => {
    const { setIsHideHeader, setIsHideFooter } = useContext(AppContext);
    useEffect(() => {
        setIsHideHeader(true);
        setIsHideFooter(true);
    }, []);

    return (
       
        <Box width="99vw" pt={["5%", "2%"]} pl={["5%", "2%"]} height="auto" background={"transparent radial-gradient(closest-side at 70% 50%, #481A7F 0%, #180529 70%) 0% 0% no-repeat padding-box;"}>
            
            <Box w={["200px","300px","350px", "350px"]} mt={["5%", "5%","1%","1%"]} ml={["15%", "15%","1%","1%"]}>
                <Link href='/' _hover={["textDecoration:none"]}>
                    <Image src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2022/12/20034811/LootMogul-Logo-2.png" alt="Dan Abramov" />
                </Link>
            </Box>
            <Box  w={["100%","100%","100%","50%"]} p={4} color='white' display={"inline-block"} verticalAlign="top" pt={["5%","5%", "175px"]} pl={["5%", "2%"]}>
                <Heading variant="siteHeading" color="#fff" fontWeight={500} fontSize={["80","80","80","125"]} textAlign={['center','center','center','left']}>
                404 ERROR
                </Heading>
                <Text style={{ lineHeight: '25px' }} w={["100%","100%","100%", "85%"]} mt={["0%", "5%"]} ml={["0%", "0%"]} variant="hint" color={"#fff"} fontSize={18} textAlign={['center','center','center','left']} >
                The page you requested could not be found</Text>
                <Link href='/nfts' _hover={["textDecoration:none"]}>
                    <Button variant="solid" display={['flex','flex','flex','inline-flex']} margin={['auto']} mt={["30px", "30px"]}>
                        Back To Home
                    </Button>
                </Link>
            </Box>
            <Box  w={["100%","100%","100%", "50%"]} p={4} color='red' display={"inline-block"} backgroundImage="/assets/Background-400.png" backgroundSize={['80%']} backgroundRepeat={"no-repeat"}>
                <Image w="500px" margin={['auto','auto','auto','left']} textAlign="center" src="/assets/404.png" alt="Dan Abramov" />
            </Box>
            
        </Box>
    );
};
export default NotFoundPage;