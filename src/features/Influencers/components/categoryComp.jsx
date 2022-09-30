import React,{useState} from "react";
import {
    Text,
    Flex,
    Image,
    Menu,
    MenuButton,
    Divider,
    MenuList,
    MenuItem, Box
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillCaretDown } from "react-icons/ai";
import { setDefaultLocale } from "react-datepicker";
const CategoryComponent = ({ defaultCategoryName, selCategoriesData ,setFilterValue,category}) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(category);

    return (
        <Flex border="1px solid #FFFFFF" bg="#0f0625" h="55px">
            <Menu>
                <MenuButton
                    border="none"
                    color="#FFFFFF"
                    _focus={{ borderColor: "transparent", boxShadow: "none" }}
                    fontFamily="Sora"
                    fontSize={"20px"}
                   lineHeight="40px"
                   h="100%"
                
                  >
                 
                 <Flex
                        alignItems={"center"}
                        justifyContent={"space-around"}
                       h="100%" 
                        
                    >
                        <Text h="100%" borderRightWidth="1px" 
                        pl={3} pr={6}noOfLines={1}>{selectedCategory}</Text>

                        <Box h={"full"}   p={3}borderColor={"white"} >
                            <AiFillCaretDown
                           
                                bg="#FFFFFF"
                                m="auto"
                                w="40px"
                                h="40px"
                            /></Box>
                        
                    </Flex>
                          
                       
                           
                        
               
                </MenuButton>

                <MenuList my="11px" backgroundColor="#0f0625" >
                    <Flex
                        direction={"column"}   
                        alignItems={"center"}
                        justifyContent={"space-around"}
                        py="4"
                        px="3"
                        
                    >
                        <MenuItem
                            color="#C7C7C7"
                            _hover={{ bg: "#E90A63" }}
                            
                            fontFamily="Sora"
                            _focus={{bg:"transparent"}}
                    fontSize={"22px"}
                    onClick={() =>{
                        setSelectedCategory(defaultCategoryName);
                        setFilterValue(defaultCategoryName.toLowerCase())
                    }
                    }
                        >
                             <Flex
                                    ml={["6px", 0]}
                                    mt="6px"
                                > <Text
                                ml="10px"
                                color="#C7C7C7"
                                fontFamily="Sora"
                                fontSize={"22px"}
                                fontWeight={600}
                                lineHeight={"18px"}
                                textOverflow="ellipsis"
                            >
                               {defaultCategoryName}
                            </Text></Flex>
                           
                        </MenuItem>

                        {selCategoriesData.map((cate, index) => (
                            <MenuItem
                                color="#C7C7C7"
                            _hover={{ bg: "#E90A63" }}
                            _focus={{bg:"transparent"}}
                               
                                // _hover={{ bg: "black" }}
                                onClick={() =>{
                                    setSelectedCategory(cate.name);
                                    setFilterValue(cate.name.toLowerCase())
                                }
                                }
                            >
                                <Flex
                                    ml={["6px", 0]}
                                    key={`cate-${index}`}
                                    mt="6px"
                                >
                                    {/* <Image
                                        alt={cate.label}
                                        width="20px"
                                        height="20px"
                                        mr="10px"
                                        src={`/assets/nfts/${cate.icon}`|| ""}
                                    /> */}
                                    <Text
                                        ml="10px"
                                        color="#C7C7C7"
                                        fontFamily="Sora"
                                        fontSize={"22px"}
                                        fontWeight={600}
                                        lineHeight={"18px"}
                                        textOverflow="ellipsis"
                                    >
                                        {cate.name
                                        }
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
