/* eslint-disable react/jsx-key */
import { Box, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useRef, useState } from "react";
import strapi from "../../../utils/strapi";
import { useRouter } from "next/router";

const SearchBar = () => {

  const [influencers, setInfluencers] = useState([]);
  const [getData, setGetData]=useState(null);
  const router = useRouter();

  useEffect(async () => {
    const { data } = await strapi.find("influencers", {
      sort:"name",
      pagination: {
        page: 1,
        pageSize: 60,
      },
    });
    setInfluencers(data);
    
  }, [getData]);


  const onClick = (e) => {
    
    router.push("/influencer/"+e.item.value);
};
const ref = useRef();


  return (
   <Box  width={["120px", "150px"]} ml={["10px", "20px"]} bg="#222222" borderRadius={"20px"} 
    
   >
    <AutoComplete rollNavigation 
    onSelectOption={onClick}
    
    bg="#222222" ref={ref}>
        <InputGroup  _focus={{border:"none", boxShadow:"none"}}     color="lightGrey"  >
        <InputLeftElement  
            fontSize="1.0em">
                <SearchIcon color="lightGrey" />
         </InputLeftElement>
        
          <AutoCompleteInput onClick={(e)=>{if(!getData) setGetData(true);
        if(e?.item?.value)  onClick(e);}}variant="filled" placeholder="Search..." bg="#222222" _focus={{border:"none", bg:"#222222", boxShadow:"none"}} />
        </InputGroup>
        <AutoCompleteList style={{
                                    backgroundColor: "#222222",
                                    color:"lightGrey"
                                }}>
            {influencers?.map((influencer, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={influencer.slug}
                textTransform="capitalize"
                selected={{ bg: "whiteAlpha.50" }}
                _focus={{ bg: "whiteAlpha.100" }}
                style={{
                  bg: "#222222",
              }}
              >
                {influencer.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
      
      </AutoComplete>
      </Box>

  );
};

export default SearchBar;
