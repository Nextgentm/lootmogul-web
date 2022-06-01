import {Box, Table, Thead, Th, Tbody, Tr, Td} from "@chakra-ui/react";
const LMStripedTable=({tableHeader, tableData})=>{
return <Box>
    <Table mt="2%" w = "100%" bg="#1C1C1C" variant="striped" color="#C7C7C7" colorScheme="stripedTable">
        <Thead key="thead_1">
        
            {tableHeader && tableHeader.map((header,index)=>{
 return <Th key = {"tableheader"+index} textAlign= {(index === tableHeader.length-1) && tableHeader.length !== 1 ?"right":"left"} color= "white"> {header}</Th>
            })}   
              
        </Thead>
        <Tbody key="tbody_1">
              {tableData && tableData.map((cell, index)=>{
                   return    <Tr key = {"row"+index}>         
                {cell.map((item,index)=>{
                              return (index <= tableHeader.length -1) && <Td p="10px" key={"cell"+index}>{item}</Td>
                        })}   
                 
                </Tr>

              })}
      
             
             
           
        </Tbody>
      </Table>
</Box>
}

export default LMStripedTable;