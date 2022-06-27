import { useContext, useEffect, useState } from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { AppContext } from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";
import LeaderboardTable from "./LeaderboardTable";

const LeaderboardTab = ({ gameData }) => {
    const { user } = useContext(AppContext);
    const [lbRecords, setLbRecords] = useState();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    useEffect(async () => {
        setLoading(true);

        if (gameData) {
            const contests = await strapi.find("contests", {
                filters: { contestmaster: gameData.id },
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
    }, [gameData]);

    return (
        <Box mt="2%" width="100%">
            {!lbRecords && loading && (
                <Text w="100%" color="primary">
                    Loading Leaderboard....
                </Text>
            )}
            {!lbRecords && !loading && (
                <Text w="100%" color="secondary">
                    No Leaderboard to display!
                </Text>
            )}
            {lbRecords && (
                <Box width="100%">
                    {currentSize === "base" ? (
                        lbRecords?.length > 0 ? (
                            <LeaderboardTable
                                isMobile={true}
                                tableData={lbRecords}
                                tableColumns={[
                                    "RANK",
                                    "PLAYERS",
                                    "PRIZE",
                                    "SCORE"
                                ]}
                                user={user}
                                currentUser={currentUser}
                            />
                        ) : (
                            <Box>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >
                                    {loading
                                        ? "loading.."
                                        : "There are no players!"}
                                </Text>
                            </Box>
                        )
                    ) : lbRecords?.length > 0 ? (
                        <LeaderboardTable
                            tableData={lbRecords}
                            tableColumns={["RANK", "PLAYERS", "PRIZE", "SCORE"]}
                            user={user}
                            currentUser={currentUser}
                        />
                    ) : (
                        <Box>
                            <Text
                                style={{ textAlign: "center", color: "white" }}
                            >
                                {loading
                                    ? "loading.."
                                    : "There are no players!"}
                            </Text>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};
export default LeaderboardTab;
