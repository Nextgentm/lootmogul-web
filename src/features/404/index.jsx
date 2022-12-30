import { Box, Text, Heading } from "@chakra-ui/layout";
import { Image,Button,Link } from '@chakra-ui/react';
import React, {  } from "react";

const NotFound = (isActivePage) => {
    console.log(isActivePage);
    let return_ur = '';
    let return_name = '';
    if(isActivePage.isNfts){
        return_ur = '/nfts';
        return_name = 'Back To NFTs';
    }
    else{
        return_ur = '/';
        return_name = 'Back To Home';
    }
    return (
        <Box width="99vw" pt={["5%", "2%"]} pl={["5%", "2%"]} height="auto" background={"transparent radial-gradient(closest-side at 70% 50%, #481A7F 0%, #180529 70%) 0% 0% no-repeat padding-box;"}>
            
            <Box  w={["100%","100%","100%","50%"]} p={4} color='white' display={"inline-block"} verticalAlign="top" pt={["5%","5%", "175px"]} pl={["5%", "2%"]}>
                <Heading variant="siteHeading" color="#fff" fontWeight={500} fontSize={["80","80","80","125"]} textAlign={['center','center','center','left']}>
                404 ERROR
                </Heading>
                <Text style={{ lineHeight: '25px' }} w={["100%","100%","100%", "85%"]} mt={["0%", "5%"]} ml={["0%", "0%"]} variant="hint" color={"#fff"} fontSize={18} textAlign={['center','center','center','left']} >
                The page you requested could not be found</Text>
                <Link href={return_ur} _hover={["textDecoration:none"]}>
                    <Button variant="solid" display={['flex','flex','flex','inline-flex']} margin={['auto']} mt={["30px", "30px"]}>
                       {return_name}
                    </Button>
                </Link>
            </Box>
            <Box  w={["100%","100%","100%", "50%"]} p={4} color='red' display={"inline-block"} backgroundImage="/assets/Background-400.png" backgroundSize={['80%']} backgroundRepeat={"no-repeat"}>
                <Image w="500px" margin={['auto','auto','auto','left']} textAlign="center" src="/assets/404.png" alt="Dan Abramov" />
            </Box>
            
        </Box>
    );
};
export default NotFound;