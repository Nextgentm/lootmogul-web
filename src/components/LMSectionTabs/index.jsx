/* eslint-disable react/jsx-key */
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Button} from '@chakra-ui/react'

const LMSectionTabs = ( {data,defaultTab,  variant})=>{
return <><Tabs width="100%" variant={variant} defaultIndex={defaultTab?defaultTab:0} orientation= "horizontal">
  <Center>
    <TabList m="auto" borderBottom={"0px"}>
      {data && data.map((item, index)=>{
           return <Tab 
          //  variant="TabBtn"
          //  _selected={{ color: 'white', bg: '#d63065' ,borderRadius:"10px" }} 
           whiteSpace="nowrap" textAlign={"center"} w={["120px","150px","300px"]} h="60px" borderBottom="none"
            bg={'#2a1f3c'} fontSize={["1rem","1rem","1.5rem"]} fontWeight={"600"} mr="0px" color={"white"} key={"sectionTab"+index} ><Button variant="TabBtn">{item.tab}</Button></Tab>
      })}
  </TabList>
  </Center>
  <TabPanels >
   {data &&   data.map ((item, index)=>{
     return <TabPanel  _selected={{ color: 'white', bg: '#d63065' }}  color={"white"} key={"sectionTabPanel" + index}>
     {item.tabPanel}
     </TabPanel>
   })} 

  
  </TabPanels>
</Tabs>
{/* <Button variant="TabBtn">
  tab
</Button> */}
</>

}
export default LMSectionTabs;