/* eslint-disable react/jsx-key */
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Button } from '@chakra-ui/react'

const LMSectionTabs = ({ data, defaultTab, variant }) => {
  console.log("Leaderboarerd defaultTab", defaultTab)
  console.log("Leaderboarerd data", data)
  return <Tabs align='center' width="100%" variant={variant} defaultIndex={defaultTab ? defaultTab : 0} orientation="horizontal">
    <TabList m="auto" align='center' borderBottom={"0px"}>
      {data && data.map((item, index) => {
        return <Tab
          //  variant="TabBtn"
          _selected={{ textDecoration: "none!important", border: "none", bgGradient: "linear(90deg, #E90A63 0%, #481A7F 100%)" }}
          whiteSpace="nowrap" textAlign={"center"} w={["120px", "150px", "300px"]} h="60px" borderBottom="none"
          bg={'#2a1f3c'}
          fontSize={["1rem", "1rem", "1.5rem"]} fontWeight={"600"} mr="0px" color={"white"} key={"sectionTab" + index}
          _hover={{ textDecoration: "none!important", border: "none", bgGradient: "linear(90deg, #E90A63 0%, #481A7F 100%)" }}
          borderRadius="5px"
          border={"0"}
          fontFamily="Sora"
          padding="30px 40px"
          _focus={{ boxShadow: "none", }}
          textDecor="none"
        >

          {/* <Button variant="TabBtn"> */}
          {item.tab}
          {/* </Button> */}
        </Tab>
      })}
    </TabList>

    <TabPanels >
      {data && data.map((item, index) => {
        return <TabPanel _selected={{ color: 'white', bg: '#d63065' }} color={"white"} key={"sectionTabPanel" + index}>
          {item.tabPanel}
        </TabPanel>
      })}


    </TabPanels>
  </Tabs>

}
export default LMSectionTabs;