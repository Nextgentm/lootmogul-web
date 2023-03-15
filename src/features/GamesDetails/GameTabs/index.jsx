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
            setTimeout(() => {
                getLeaderBoard()
            }, [1000])
        }
    }, [gameData, defaultTab,user]);

    const getLeaderBoard = async () => {
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

                if (lbs?.data?.length > 0) {
                    lbs.data = lbs.data
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

                setLbRecords(lbs.data);


            }
            setLoading(false);
        }
    }
    console.log("lbRecords*-", lbRecords)
    if (lbRecords && lbRecords.length) {
        tabsData.push({
            tab: <Text>Leaderboard</Text>,
            tabPanel: <LeaderboardTab gameData={gameData} lbRecords={lbRecords} loading={loading} currentUser={currentUser} user={user} />

        })
    }

    return <Box mt="3%" ml={["18px", "0px", "0px"]} mr="18px" textAlign={"left"}>
        {gameData && <LMSectionTabs defaultTab={defaultTab} variant={"unstyled"} data={tabsData} />}
    </Box>
}

export default GameTabs;