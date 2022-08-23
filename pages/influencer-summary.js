import {Box, Text, Flex, Heading} from "@chakra-ui/react";
import {useState,useEffect, useContext} from "react";
import strapi from "../src/utils/strapi";
import { AppContext } from "../src/utils/AppContext/index";


const InfluencerSummary = () => {
    const [data, setData] = useState(null);
    const {user} =useContext(AppContext);
    useEffect(async ()=>{
        
        const resp = await strapi.request(
            "get",
            "influencersummarries/getSummary",
            {}
        );
        setData(resp)
        
    },[user])
    
 
    return  <Box width="100%" m="auto" textAlign={"center"}>
    {
      data  && data.length !==0 &&<><Heading color="primary"my="2%"> Influencer Summary</Heading>
    {Object.keys(data).map((key, i) => (
          <Flex p={["3px","10px"]} w = {["90%","50%"]} m="auto" justifyContent="space-between"textAlign="center" color ="white" key={i}>
            <Text>{key.toUpperCase()}</Text>
            <Text>{data[key]}</Text>
          </Flex>
        ))}
        </> } 
        {!data || data.length ===0  && <Heading color="primary"my="2%"> Please Login or Check for relating your account with influencer</Heading>}

    </Box>
    
};

export default InfluencerSummary;