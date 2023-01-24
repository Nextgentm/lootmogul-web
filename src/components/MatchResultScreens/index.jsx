/* eslint-disable react/jsx-key */
import React, { useContext, useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { AppContext } from "../../utils/AppContext/index";
import {
    getMatchCount,
    setMatchCount,
    getCountForCaptcha,
    setCountForCaptcha
} from "../../services/dataService";
import strapi from "../../utils/strapi";

import dynamic from "next/dynamic";

const AutoPlay = dynamic(() => import("./components/Autoplay"));
const UserAvatar = dynamic(() => import("./components/UserAvatar"));
const CaptchaPopup = dynamic(() => import("../LMModal/CaptchaPopup"));
const Lottie = dynamic(() => import("react-lottie"));

const MatchResultScreens = (props) => {
    const router = useRouter();
    const {
        user,
        matchResult,
        setUser,
        updateUser,
        setCurrentContest,
        setIsHideHeader,
        onPlayAgain,
        setIsHideFooter
    } = useContext(AppContext);
    const [userResult, setUserResult] = useState();
    const [userStats, setUserStats] = useState();
    const [otherResults, setOtherResults] = useState();
    const [matchJoinCount, setMatchJoinCount] = useState(getMatchCount());
    const [matchCaptchCount, setMatchCaptchaCount] = useState(
        getCountForCaptcha()
    );
    const [showPlayAgain, setShowPlayAgain] = useState(false);
    const [defaultOptions, setDefaultOptions] = useState(null);

    const [ani, setAni] = useState(false);

    useEffect(() => {
        if (ani) {
            const animationData = dynamic(() =>
                import("../../lotties/spinWin.json")
            );
            setDefaultOptions({
                loop: false,
                autoplay: true,

                animationData: animationData,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            });
        }
    }, [ani]);
    const handlePlayAgain = () => {
        onPlayAgain();
    };

    const handleCancel = () => {
        setCurrentContest(null);
        router.push("/games");
    };

    async function fetchData() {
        if (user?.id) {
            const data = await strapi.findOne("users", user.id, {
                populate: ["user_stat", "wallets.currency"]
            });
            if (data?.data?.user_stat) {
                setUserStats(data.data.user_stat);
            }
            if (data?.data) {
                setUser(data.data);
            }
        }
    }

    useEffect(() => {
        props.setLoading(true);

        return () => {
            updateUser();
            setIsHideHeader(false);
            setIsHideFooter(false);
        };
    }, []);

    useEffect(() => {
        if (matchResult && user) {
            props.setLoading(false);
            if (matchResult) {
                let tr = [];
                let usr = [];
                matchResult.map((pl) => {
                    if (pl.id == user.id) {
                        if (pl.rank == 1) setAni(true);
                        usr.push({
                            name: pl.username,
                            score: pl.score,
                            rank: pl.rank,
                            reward:
                                pl.rank == 1 && pl.reward
                                    ? "Congratulations You Won $ " + pl.reward
                                    : pl.rank == 1
                                        ? "Congratulations! You won!"
                                        : "Better luck next time!",
                            profilePic: pl.profile_pic
                        });
                        setUserResult(usr);
                    } else {
                        tr.push({
                            name: pl.username,
                            score: pl.score,
                            rank: pl.rank,
                            reward: "",
                            profilePic: pl.profile_pic
                        });
                    }
                });
                setOtherResults(tr);
            } else {
                // show error alert
            }
        }

        fetchData();
    }, [matchResult, props, user]);

    return (
        <>
            {userResult && (
                <Box
                    background="transparent radial-gradient(closest-side at 0% 0%, #481A7F 0%, #180529 70%) 0% 0% no-repeat padding-box;"
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

                    <Flex
                        p={["20px", "40px"]}
                        pb="5px!important"
                        width={["auto", "auto"]}
                        justifyContent={["space-between", "flex-start"]}
                        margin="auto"
                        textAlign="center"
                        direction="column"
                    >
                        <Text
                            color="#FFFFFF"
                            fontFamily="Blanch"
                            fontSize="54px"
                            lineHeight={"59px"}
                        >
                            MATCH RESULT
                        </Text>
                        <Flex flexWrap="wrap" justifyContent={"center"}>
                            {userResult?.map((player, index) => (
                                <Box width="100%">
                                    <UserAvatar
                                        key={"avatar" + index}
                                        userResult={player}
                                    />
                                </Box>
                            ))}
                        </Flex>

                        <Text
                            mt={userResult[0]?.rank === 1 ? "2%" : "1%"}
                            variant="winText"
                            color={
                                userResult[0]?.rank === 1 ? "#E90A63" : "#E90A63"
                            }
                            style={
                                userResult[0]?.rank === 1
                                    ? {
                                        background:
                                            "#E90A63",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color":
                                            "transparent"
                                    }
                                    : {
                                        background:
                                            "#E90A63",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color":
                                            "transparent"
                                    }
                            }
                            fontSize={{
                                base: "36px",
                                sm: "36px",
                                md: "54px",
                                lg: "54px"
                            }}
                        >
                            {userResult[0].reward}
                        </Text>
                        <Flex flexWrap="wrap" justifyContent={"center"}>
                            {otherResults?.map((player, index) => (
                                <Box
                                    width={
                                        otherResults?.length === 4
                                            ? "23%"
                                            : otherResults?.length === 3
                                                ? "30%"
                                                : otherResults?.length === 2
                                                    ? "45%"
                                                    : "100%"
                                    }
                                >
                                    <UserAvatar
                                        key={"avatar" + index}
                                        userResult={player}
                                    />
                                </Box>
                            ))}
                        </Flex>

                        <Flex
                            zIndex={11}
                            width={["100%", "60%"]}
                            direction={["column"]}
                            m="auto"
                            pt="2%"
                        >
                            {matchJoinCount >= 5 ? (
                                showPlayAgain ? (
                                    <Button
                                        onClick={() => handlePlayAgain()}
                                        width={["auto", "auto"]}
                                        height="46px"
                                        marginTop={["30%", "4%"]}
                                        fontSize={"18px"}
                                    >
                                        PLAY AGAIN
                                    </Button>
                                ) : (
                                    <CaptchaPopup
                                        onChange={() => {
                                            setShowPlayAgain(true);
                                        }}
                                    />
                                )
                            ) : (
                                <AutoPlay
                                    startNextGame={() => handlePlayAgain()}
                                />
                            )}
                            <Button
                                onClick={() => handleCancel()}
                                width={["auto", "auto"]}
                                height="46px"
                                variant="outline"
                                fontSize={"18px"}
                                flex="none"
                                order={"0"}
                                marginTop={"3%"}
                                flex-grow="0"
                            >
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            )}
        </>
    );
};
export default MatchResultScreens;
