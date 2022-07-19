/* eslint-disable react/jsx-key */
import React, { useContext, useState, useEffect } from "react";
import { Box, Text, Border } from "@chakra-ui/layout";
import { Flex, Button, useConst } from "@chakra-ui/react";
import ScoreDisplay from "./components/ScoreDisplay";
import Back from "./components/backIcon";
import ResultDisplayTitle from "./components/resultDisplayTitle";
import PaidGameConfirmation from "../../features/Games/PaidGameConfirmation";
import { useRouter } from "next/router";
import { AppContext } from "../../utils/AppContext/index";
import strapi from "../../utils/strapi";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"));
const animationData = dynamic(() => import("../../lotties/spinWin.json"));

const MatchLBResultScreen = (props) => {
    const router = useRouter();
    const { user, matchResult, setUser, updateUser ,currentContest, showPaidGameConfirmation,setCurrentContest,setIsHideHeader, 
        setIsHideFooter,onPlayAgain
    } = useContext(AppContext);
    const [userResult, setUserResult] = useState();
    const [userStats, setUserStats] = useState();
    const [lbResult,setLbResult] = useState();

    const defaultOptions = {
        loop: false,
        autoplay: true,

        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [ani, setAni] = useState(false);

    const handlePlayAgain = () => {
        // router.push("/joining");
        
        onPlayAgain();
    };

    const handleLBClicked = () => {
        if(currentContest?.slug)
            router.push("/games/"+ currentContest?.slug+"#leaderboard");
        else 
        router.push("/");
        setCurrentContest(null);
    };

    useEffect(() => {
        props.setLoading(false);
        if (matchResult) {
            
            strapi.find("user-stats",{filters:{user: user.id}}).then((response)=>{
               if(response && response.data)
                setUserStats(response.data[0]);

            })
            //console.log(currentContest);
            if(currentContest && currentContest.contest){
                strapi.find("contests/"+currentContest.contest.id+"?populate=*").then((data)=>{
                    if(data?.data?.leaderboard?.data)
                    strapi.find("custom-leaderboard/getuserscoreboard/"+data?.data?.leaderboard?.data?.id).then((response)=>{
                        setLbResult(response); 
                       })

                })
          
            }
            matchResult.map((pl) => {
                if (pl.id == user.id) {
                    setUserResult({
                        points: pl.points,
                        score: pl.score,
                        rank: pl.rank,
                        reward: "Match Over",
                        profilePic: user.profilePic
                    });
                }
            });
        } else {
            // show error alert
        }
    }, [matchResult, user]);



    useEffect(() => {
        // fetch user stats
     //   props.setLoading(true);
        return () => {
            props.setLoading(false);

            updateUser();
            setIsHideHeader(false);
            setIsHideFooter(false);
          }
    }, []);

    return (
        <>
            {userResult && (
                <Box
                    
                bgImage="url('/assets/image 132.jpg')"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                >
                    <Box pos="absolute" zIndex={10}>
                        {ani && (
                            <Lottie
                                options={defaultOptions}
                                isClickToPauseDisabled={true}
                                height="100%"
                                width="100%"
                                background="transparent"
                            />
                        )}
                    </Box>
                    <Box pt="28px" pl="30px">
                    {/* <Back /> */}
                    </Box>
                    
                    <Flex
                        m={["10px", "60px"]}
                        width={["auto", "auto"]}
                        justifyContent={["space-between", "flex-start"]}
                        direction="column"
                    >
                        <Box>
                            <ResultDisplayTitle name="MATCH RESULT" />

                            <ScoreDisplay
                            user={user}
                                userResult={userResult}
                                userStats={userStats}
                                lbResult={lbResult}
                            />
                        </Box>

                        <Flex
                            zIndex={11}
                            width={["100%", "60%"]}
                            direction={["column"]}
                            m="auto"
                            padding={"6%"}
                        >
                            <Button
                                onClick={() => handlePlayAgain()}
                                width={["auto", "auto"]}
                                height="46px"
                                marginTop={["30%", "4%"]}
                                fontSize={"18px"}
                            >
                                PLAY AGAIN
                            </Button>
                            <Button
                                onClick={() => handleLBClicked()}

                                width={["auto", "auto"]}
                                height="46px"
                                variant="outline"
                                fontSize={"18px"}
                                flex="none"
                                order={"0"}
                                marginTop={"3%"}
                                flex-grow="0"
                            >
                                VIEW LEADERBOARD
                            </Button>
                        </Flex>
                    </Flex>
                    { currentContest && showPaidGameConfirmation?.callerKey == `CheckRetry-${currentContest?.id}`  &&  <PaidGameConfirmation retry={showPaidGameConfirmation.retry}contestmaster={currentContest}/>}
                </Box>
            )}
        </>
    );
};
export default MatchLBResultScreen;
