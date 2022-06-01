import {
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Text
  } from '@chakra-ui/react'
const  UnOrderedLMLists =({color, listItems})=>{
    return <Box>
<UnorderedList  textAlign={"left"}>
    {listItems && listItems.map ((item,index)=>{
        return <ListItem  mt="1%" mb="1%" color={color} key={"list"+index}>
            <Text  color={color} variant="textualVal">{item?item:"Lorem ipsum dolor sit amet"}</Text></ListItem>
    })}
  </UnorderedList>
    </Box>
}

export default UnOrderedLMLists;