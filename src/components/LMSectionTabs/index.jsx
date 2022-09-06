/* eslint-disable react/jsx-key */
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center} from '@chakra-ui/react'

const LMSectionTabs = ( {data,defaultTab,  variant})=>{
return <Tabs width="100%" variant={variant} defaultIndex={defaultTab?defaultTab:0} orientation= "horizontal">
  <Center><TabList m="auto">
      {data && data.map((item, index)=>{
           return <Tab _selected={{ color: 'white', bg: '#d63065' }} padding={"10px"} bg={'#2a1f3c'} fontSize="1.5rem" fontWeight={"600"}  color={"white"} key={"sectionTab"+index} >{item.tab}</Tab>
      })}
  </TabList>
  </Center>
  <TabPanels >
   {data &&   data.map ((item, index)=>{
     return <TabPanel _selected={{ color: 'white', bg: '#d63065' }}  color={"white"} key={"sectionTabPanel" + index}>
     {item.tabPanel}
     </TabPanel>
   })} 

  
  </TabPanels>
</Tabs>
}
export default LMSectionTabs;