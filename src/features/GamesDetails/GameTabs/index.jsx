import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import LMSectionTabs from "../../../components/LMSectionTabs";
import AppContext from "../../../utils/AppContext";
import strapi from "../../../utils/strapi";
import DetailsTab from "./DetailsTab";
import LeaderboardTab from "./LeaderboardTab";

const GameTabs = ({ defaultTab, gameData }) => {
    const { user } = useContext(AppContext);
    const [lbRecords, setLbRecords] = useState();
    const [lbMetas, setLbMetas] = useState();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const tabsData = [
        {
            tab: <Text>Details</Text>,
            tabPanel: <DetailsTab gameData={gameData}></DetailsTab>
        },

    ];

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        //setPageLoader(true);
       // console.log("nextPage",currentPage);
      } 
      const previousPage = () => {
        setCurrentPage(currentPage - 1);
        //setPageLoader(true);
      } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true);
        if (gameData || currentPage) {

            getLeaderBoard(currentPage)

        }
    }, [gameData, defaultTab, user, currentPage]);

    const getLeaderBoard = async (currentPage = 1) => {
        try {
            if (gameData) {
                const contests = await strapi.find("contests", {
                    fields:["id"],
                    filters: {
                        contestmaster: gameData.id,
                        id: gameData.contest.id
                    },
                    populate: {
                        leaderboard:{
                            fields:["id"]
                        },
                        contestmaster:{
                            populate:['reward.rewardrange']
                        }
                    }
                });
                // get only top score of unique user
                if (contests?.data?.length && contests.data[0].leaderboard?.data) {
                    let pageSize=10;
                    let res = await strapi.request("get",
                    `lbrecord/get-leaderboard-details?leaderboardId=${contests.data[0].leaderboard?.data?.id}&page=${currentPage}&pageSize=${pageSize}`);
                    // console.log("res ",res);
                    const finalLBData = [];
                    if (res?.data?.length > 0) {
                        const prizes = contests.data[0]
                                ?.contestmaster?.data?.reward?.data
                                ?.rewardrange;
                        res?.data.map((rec, recIndex) => {
                            const currentRank=(pageSize*(currentPage-1))+recIndex+1;
                                const playerPrize =
                                    prizes?.find(
                                        (item) =>
                                            item?.rankFrom <= currentRank &&
                                            item?.rankTo >= currentRank
                                    )?.name || "----";

                                if (user?.id === rec?.UserId) {
                                    setCurrentUser({
                                        createdAt: rec.createdAt,
                                        id: rec.id,
                                        leaderboard:{data: {id:rec.leaderboardId}},
                                        user:{data:{id:rec.userId,
                                            fullName: rec.fullName,
                                            username:rec.username,
                                            photoURL:rec.photoUrl}},
                                        score: rec.score,
                                        rank: currentRank,
                                        isActive: user?.id === rec.userId,
                                        prize: playerPrize
                                    });
                                }

                                finalLBData.push({
                                    createdAt: rec.createdAt,
                                    id: rec.id,
                                    leaderboard:{data: {id:rec.leaderboardId}},
                                    user:{data:{id:rec.userId,
                                        fullName: rec.fullName,
                                        username:rec.username,
                                        photoURL:rec.photoUrl}},
                                    score: rec.score,
                                    rank: currentRank,
                                    isActive: user?.id === rec.userId,
                                    prize: playerPrize
                                });
                            });
                    }
                    setLbRecords(finalLBData);
                    setLbMetas(res.meta)

                }
                setLoading(false);
            }
        } catch (e) {
            
            setTimeout(() => {
                getLeaderBoard()
            }, 1000);
        }
    }
    
    if(gameData.type != 'battle'){
        tabsData.push({
            tab: <Text>Leaderboard</Text>,
            tabPanel: <LeaderboardTab nextPage={nextPage} previousPage={previousPage} currentPage={currentPage} lbMetas={lbMetas} gameData={gameData} lbRecords={lbRecords} loading={loading} currentUser={currentUser} user={user} />
        })
    }
    if ((defaultTab == 1 && tabsData?.length == 2) || defaultTab == 0)
        return <Box mt="3%" ml={["18px", "0px", "0px"]} mr="18px" textAlign={"left"}>
            {gameData && <LMSectionTabs defaultTab={defaultTab} variant={"unstyled"} data={tabsData} />}
        </Box>
    else
        return <></>
}

export default GameTabs;