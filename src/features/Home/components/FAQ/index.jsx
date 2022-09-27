import { Box, Text } from "@chakra-ui/layout";
import {  useState } from "react";

import FAQRow from "../FAQ/FAQRow";

const FAQ = ({title, style = {} , data=[] }) => {
  const [currentOpen, setCurrentOpen] = useState(-1);

  return (
    <Box {...style}>
      <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px", "58px"]} mb="12px" >
        {title}
      </Text>

     {data && data.map((faq, index) => (
        <FAQRow key={`faq-${index}`} row={faq} index={index + 1} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} />
      ))}
     
    </Box>
  );
};

export default FAQ;
