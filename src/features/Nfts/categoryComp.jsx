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

const CategoryComponent = ({ displayData,nftSelectCategory,defaultCategory, setTempFilterValue,selectedCategory }) => {
    const router = useRouter();
    const [ activeCategory, setActiveCategory] = useState(selectedCategory);

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
                        pl={3} pr={6}noOfLines={1}>{activeCategory}</Text>

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
                         <MenuItem
                                color="#C7C7C7"
                                _hover={{ bg: "#E90A63" }}
                                
                                fontFamily="Sora"
                                _focus={{bg:"transparent"}}
                                fontSize={"22px"}
                               
                                onClick={()=>{
                                    setActiveCategory(defaultCategory);
                                    setTempFilterValue(defaultCategory.toLowerCase());
                                    nftSelectCategory(defaultCategory.toLowerCase());
                                }}
                              
                            >
                                <Flex
                                    ml={["6px", 0]}
                                 
                                    my="6px"
                                >
                                   
                                    <Text
                                        // ml="10px"
                                        color="#FFF"
                                        fontFamily="Sora"
                                        fontSize={"20px"}
                                        fontWeight={200}
                                       
                                    >
                                       {defaultCategory}
                                    </Text>
                                </Flex>
                            </MenuItem>
                       
                        {displayData.map((cate, index) => (
                            <MenuItem
                            color="#C7C7C7"
                            _hover={{ bg: "#E90A63" }}
                            
                            fontFamily="Sora"
                            _focus={{bg:"transparent"}}
                            fontSize={"22px"}
                                onClick={()=>{
                                    setActiveCategory(cate.name);
                                    setTempFilterValue(cate.name.toLowerCase());
                                    nftSelectCategory(cate.name.toLowerCase());
                                }}
                               
                            >
                                <Flex
                                    ml={["6px", 0]}
                                    key={`cate-${index}`}
                                    my="6px"
                                >
                                    
                                    <Text
                                        
                                        color="#FFF"
                                        fontFamily="Sora"
                                        fontSize={"20px"}
                                        fontWeight={200}
                                       
                                    >
                                        {cate.name}
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
export default CategoryComponent;
