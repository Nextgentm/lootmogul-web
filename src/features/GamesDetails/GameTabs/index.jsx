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
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const tabsData = [
        {
            tab: <Text>Details</Text>,
            tabPanel: <DetailsTab gameData={gameData}></DetailsTab>
        },

    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true);
        if (gameData) {

            getLeaderBoard()

        }
    }, [gameData, defaultTab, user]);

    const getLeaderBoard = async () => {
        try {
            if (gameData) {
                const contests = await strapi.find("contests", {
                    filters: {
                        contestmaster: gameData.id,
                        id: gameData.contest.id
                    },
                    populate: ["leaderboard"]
                });

                if (contests?.data?.length && contests.data[0].leaderboard?.data) {
                    let lbs = await strapi.find("lbrecords", {
                        sort: "score:DESC",
                        filters: {
                            leaderboard: contests.data[0].leaderboard?.data?.id
                        },
                        populate: [
                            "user",
                            "leaderboard.contest.contestmaster.reward.rewardrange",
                            "leaderboard.lbrecords"
                        ]
                    });
                    const finalLBData = []
                    for (let i = 0; i < lbs.data?.length; i++) {
                        const e = lbs.data[i]
                        console.log("E*-*-*-*-", e)
                        console.log("finalLBData", finalLBData)
                        if (!finalLBData?.find(s => s.user?.data?.id == e.user?.data?.id)) {
                            let tempData = lbs.data?.filter(s => s?.user?.data?.id == e.user?.data?.id)
                            if (tempData[0])
                                finalLBData.push(tempData[0])
                        }
                    };
                    if (finalLBData?.length > 0) {
                        lbs.data = finalLBData
                            ?.filter(
                                (rec) =>
                                    rec.user?.data?.fullName?.length > 0 ||
                                    rec.user?.data?.username?.length > 0
                            )
                            ?.map((rec, recIndex) => {
                                const prizes =
                                    rec?.leaderboard?.data?.contest?.data
                                        ?.contestmaster?.data?.reward?.data
                                        ?.rewardrange;
                                const ranksList =
                                    rec?.leaderboard?.data?.lbrecords?.data?.sort(
                                        (a, b) => (a.score < b.score ? 1 : -1)
                                    );

                                let playerRank = ranksList?.findIndex(
                                    (item) => item.id === rec.id
                                );

                                if (playerRank > -1) {
                                    playerRank += 1;
                                }

                                const playerPrize =
                                    prizes?.find(
                                        (item) =>
                                            item?.rankFrom <= playerRank &&
                                            item?.rankTo >= playerRank
                                    )?.name || "----";

                                if (user?.id === rec?.user?.data?.id) {
                                    setCurrentUser({
                                        ...rec,
                                        rank: recIndex + 1,
                                        isActive: true,
                                        prize: playerPrize
                                    });
                                }

                                return {
                                    ...rec,
                                    rank: recIndex + 1,
                                    isActive: user?.id === rec?.user?.data?.id,
                                    prize: playerPrize
                                };
                            });
                    }
                    console.log("lbs.data*-*-*-*-*-*-*-*", lbs.data)

                    console.log("finalLBData", lbs.data)
                    setLbRecords(lbs.data);


                }
                setLoading(false);
            }
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                getLeaderBoard()
            }, 1000);
        }
    }
    console.log("lbRecords*-", lbRecords)
    // if (lbRecords && lbRecords.length) {
    tabsData.push({
        tab: <Text>Leaderboard</Text>,
        tabPanel: <LeaderboardTab gameData={gameData} lbRecords={lbRecords} loading={loading} currentUser={currentUser} user={user} />

    })
    // }
    if ((defaultTab == 1 && tabsData?.length == 2) || defaultTab == 0)
        return <Box mt="3%" ml={["18px", "0px", "0px"]} mr="18px" textAlign={"left"}>
            {gameData && <LMSectionTabs defaultTab={defaultTab} variant={"unstyled"} data={tabsData} />}
        </Box>
    else
        return <></>
}

export default GameTabs;