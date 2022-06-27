/* eslint-disable react/jsx-key */
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const LMSectionTabs = ( {data,defaultTab,  variant})=>{
return <Tabs width="100%" variant={variant} defaultIndex={defaultTab?defaultTab:0} orientation= "horizontal">
  <TabList>
      {data && data.map((item, index)=>{
           return <Tab key={"sectionTab"+index} >{item.tab}</Tab>
      })}
  </TabList>
  <TabPanels >
   {data &&   data.map ((item, index)=>{
     return <TabPanel key={"sectionTabPanel" + index}>
     {item.tabPanel}
     </TabPanel>
   })} 

  
  </TabPanels>
</Tabs>
}
export default LMSectionTabs;