import { useContext, useEffect, useState } from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { AppContext } from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";
import LeaderboardTable from "./LeaderboardTable";

const LeaderboardTab = ({ lbRecords, lbMetas, loading,currentUser,user, nextPage, currentPage, previousPage }) => {
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });
    console.log(lbRecords);
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
                                lbMetas={lbMetas}
                                nextPage={nextPage}
                                currentPage={currentPage}
                                previousPage={previousPage}
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
                            lbMetas={lbMetas}
                            nextPage={nextPage}
                            currentPage={currentPage}
                            previousPage={previousPage}
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
