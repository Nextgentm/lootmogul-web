import React , {useState, useEffect} from "react";
import {
    Text,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem, Box
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { AiFillCaretDown } from "react-icons/ai";

const CategoryPriceComponent = ({ priceData,nftPriceSorting }) => {
    const router = useRouter();
    const defaultPrice = "Price Low To High"
    const [ priceCategory, setPriceCategory] = useState(defaultPrice);
    

    return (
        <Flex border="1px solid #C7C7C7" bg="#0f0625" h="55px">
            <Menu>
                <MenuButton
                    border="none"
                    color="#FFFFFF"
                    _focus={{ borderColor: "transparent", boxShadow: "none" }}
                    fontFamily="Sora"
                    fontSize={"20px"}
                    position={"relative"}
                   lineHeight="45px"
                   h="100%"
                
                >
                     <Flex
                        alignItems={"center"}
                        justifyContent={"space-around"}
                       h="100%" 
                        
                    >
                   <Text h="100%" w="100%" borderRightWidth="1px" 
                        pl={3} pr={6}noOfLines={1}>{priceCategory}</Text>

                        <Box h={"full"}   p={3}borderColor={"white"} >
                            <AiFillCaretDown
                           
                                bg="#FFFFFF"
                                m="auto"
                                w="40px"
                                h="40px"
                            /></Box>
                            </Flex>
                </MenuButton>

                <MenuList zIndex={99} style={{minWidth:"min-content"}}  mt="11px" backgroundColor="#0f0625">
                    <Flex
                        direction={"column"}   
                        alignItems={"center"}
                        justifyContent={"space-around"}
                        py="4"
                        px="3"
                        // onClick={() => router.push("/influencers/")}
                        // {...selectedCategory.path}
                    >
                       
                        {priceData.map((price, index) => (
                            <MenuItem
                            color="#C7C7C7"
                            _hover={{ bg: "#E90A63" }}
                            
                            fontFamily="Sora"
                            _focus={{bg:"transparent"}}
                            fontSize={"22px"}
                                onClick={()=>{
                                    setPriceCategory(price)
                                    nftPriceSorting(price);
                                }}
                               
                            >
                                <Flex
                                    ml={["6px", 0]}
                                    key={`cate-${index}`}
                                    my="6px"
                                >
                                    {/* <Image
                                        alt={cate.label}
                                        width="20px"
                                        height="20px"
                                        mr="10px"
                                        src={`/assets/nfts/${cate.icon}` || ""}
                                    /> */}
                                    <Text
                                        // ml="10px"
                                        color="#FFF"
                                        fontFamily="Sora"
                                        fontSize={"20px"}
                                        fontWeight={200}
                                       
                                    >
                                        {price}
                                    </Text>
                                </Flex>
                            </MenuItem>
                        ))}
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
};
export default CategoryPriceComponent;
