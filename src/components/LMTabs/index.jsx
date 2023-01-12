/* eslint-disable react/jsx-key */
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TabLabel from "../LMModal/DepositWithdraw/TabLabel";
import TabDepositPanel from "../LMModal/DepositWithdraw/TabDepositPanel";
import TabWithdrawPanel from "../LMModal/DepositWithdraw/TabWithdrawPanel";

const LMTabs = ({ orientation, data, isDeposit }) => {
    return (
        <Tabs width="100%" orientation={orientation} variant="unstyled">
            {isDeposit ? ' ' : <TabList
                width={orientation === "horizontal" ? "100%" : "30%"}
                overflowX="auto"
            >
                {data &&
                    data.map((item, index) => {
                        return (
                            <Tab
                                key={"tab1" + index}
                                _focus={{ border: "none", boxShadow: "none" }}
                                _selected={{ border: "3px solid #E90A63" }}
                                mb="10px"
                                pr="9px"
                                pl="9px"
                                ml="9px"
                            >
                                <TabLabel data={item} />
                            </Tab>
                        );
                    })}
            </TabList>
}
            <TabPanels bg="#3F3F3F">
                {data &&
                    data.map((item, index) => {
                        return (
                            <TabPanel pl={['10px','10px','30px']} bg="#1d052b" key={"tab2" + index}>
                                {isDeposit ? (
                                    <TabDepositPanel
                                        data={item}
                                        isDeposit={isDeposit}
                                    />
                                ) : (
                                    <TabWithdrawPanel
                                        data={item}
                                        isDeposit={isDeposit}
                                    />
                                )}
                            </TabPanel>
                        );
                    })}
            </TabPanels>
        </Tabs>
    );
};
export default LMTabs;
