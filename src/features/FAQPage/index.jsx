import { Box, Text, Heading } from "@chakra-ui/layout";
import ScrollToTop from "react-scroll-to-top";
import {ChevronUpIcon} from "@chakra-ui/icons"

import { useFAQPage } from "../Home/api";
import FAQ from "../Home/components/FAQ/";

const FAQPage = () => {
  const { data = [] } = useFAQPage();

  return (
    <>
         <ScrollToTop smooth viewBox="20px" style={{backgroundColor:"black" }}component={<ChevronUpIcon  boxSize="20px" color="primary" />} />
        <Box
            m="4%"
            mt="2%"
            paddingLeft={["4%", "6%"]}
            paddingRight={["4%", "6%"]}

            color="white"
            background={"#1c1c1c"}
            fontFamily={"Sora"}
            textAlign="justify"
            pb="4%"
        >
            <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px", "58px"]} mb="12px" ml={["0px", "3%"]} >FREQUENTLY ASKED QUESTION</Text>
            {data && data.map((category,index)=>{
               return  <FAQ key={"faq"+index} title= {category.name} data={category.blog_articles.data}/>
            })}
            </Box>
            </>
  );
};

export default FAQPage;
