import { Box, Text, Heading } from "@chakra-ui/layout";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../utils/AppContext/index";
import {IoMdWarning} from "react-icons/io";



const MaintenancePage = () => {
    const { setIsHideHeader,setIsHideFooter} = useContext(AppContext);
    useEffect(() => {

              
            setIsHideHeader(true);
            setIsHideFooter(true);
           
      }, []);

  return (
    <Box width="100vw" pt={["5%","5%"]} height="100vh">
<Box m="auto" pos="relative" textAlign="center" w="90%" h="90%"         
            border="2.7033px dashed #515151">
<IoMdWarning size="lg"/>
<Box pos="absolute" m="auto"  left={0} right={0} top={["30%","40%"]} bottom={0}width="100%">
<Heading variant="siteHeading" color="primary">SITE UNDER MAINTENANCE</Heading>
<Text m="5%" variant="hint">We will be back Soon!!!</Text>
</Box>

            </Box>
    </Box>
  );
}
  export default MaintenancePage;
