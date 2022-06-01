import { useContext, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import LMStripedTable from "../../../../components/LMStripedTable";
import { AppContext } from "../../../../utils/AppContext";
import RegisteredUsers from "./RegisteredUsers";
import strapi from "../../../../utils/strapi";

const LeaderboardTab = ({gameData}) => {
    const { isMobileDevice } = useContext(AppContext);
    const [lbRecords, setLbRecords] = useState();
    const [loading, setLoading] = useState(true);

    const headerDataDesktop = [
        "Players",
        "Scores"
    ];
    // const headerDataMobile = [
    //     "registered users"
    // ]
    // const tableData = [{
    //     col1: "Abhishek Kumar",
    //     col2: "09:27 am"
    // },
    // {
    //     col1: "Abhishek Kumar",
    //     col2: "09:27 am"
    // },
    // {
    //     col1: "Abhishek Kumar",
    //     col2: "09:27 am"
    // },
    // {
    //     col1: "Abhishek Kumar",
    //     col2: "09:27 am"
    // },
    // {
    //     col1: "Abhishek Kumar",
    //     col2: "09:27 am"
    // }
    // ];
    useEffect(async()=>{
        setLoading(true);
        if(gameData){
        
            const contests  = await strapi.find("contests", {
                filters: { contestmaster: gameData.id , status:"active"},
                populate:["leaderboard"]
              });

              if(contests?.data?.length && contests.data[0].leaderboard?.data){
                let lbs = await strapi.find("lbrecords", {
                    sort:"score:DESC",
                    filters: { leaderboard: contests.data[0].leaderboard?.data?.id },
                    populate:["user"]
                  });
                  if(lbs?.data?.length)
                        lbs.data= lbs.data?.filter(rec => rec.user?.data?.fullName?.length>0|| rec.user?.data?.username?.length>0);
                setLbRecords(lbs.data); 
              }
              setLoading(false);
        }
    },[gameData]);
    
    const prepareColumnData= (tableData)=>{
        let formattedData = [];
        tableData.map((item)=>{
            let cellData = [
                
      <RegisteredUsers user= {item.user?.data}/>,
       <Text variant="textualVal" fontWeight={700} textAlign="right">{item.score}</Text>
            ]
         formattedData.push(cellData);
        })
        return formattedData;
    }
    return <Box mt="2%" width="100%">
        {!lbRecords && loading && <Text w="100%" color="primary">Loading Leaderboard....</Text>}
        {!lbRecords && !loading && <Text w="100%" color="secondary">No Leaderboard to display!</Text>}
        {lbRecords && <LMStripedTable tableHeader={headerDataDesktop} tableData = {prepareColumnData(lbRecords)} />
        
}
    </Box>
}
export default LeaderboardTab;