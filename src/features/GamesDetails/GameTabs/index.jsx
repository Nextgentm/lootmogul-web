import { Box, Text } from "@chakra-ui/react";
import LMSectionTabs from "../../../components/LMSectionTabs";
import DetailsTab from "./DetailsTab";
import LeaderboardTab from "./LeaderboardTab";

const GameTabs = ({defaultTab,gameData}) => {
    const tabsData = [
        {
            tab: <Text>Details</Text>,
            tabPanel: <DetailsTab gameData={gameData}></DetailsTab>
        },
        {
            tab:<Text>Leaderboard</Text>,
            tabPanel: <LeaderboardTab gameData={gameData}></LeaderboardTab>
        },

    ];
    return <Box mt="3%" ml={["18px","0px","0px"]} mr="18px" textAlign={"left"}>
        {gameData && <LMSectionTabs defaultTab={defaultTab} variant={"categoryList"} data={tabsData} />}
    </Box>
}

export default GameTabs;