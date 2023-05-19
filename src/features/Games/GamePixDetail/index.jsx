import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import GameOverPopup, { GameBody } from "../../../components/LMModal/GameOverPopup";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";
import { getGameRoomOrCreateRoom } from "../../../services/gameSevice";
import AppContext from "../../../utils/AppContext";
import strapi from "../../../utils/strapi";
import PaidGameConfirmation from "../PaidGameConfirmation";

export const GamePixDetail = ({ gameSlug, gameid }) => {

    const {
        setIsHideHeader,
        setIsHideFooter,
        joiningData, user,
        setShowLoading,
        setShowPaidGameConfirmation,
        showPaidGameConfirmation,
        showLoading,
        currentContest,
        isPayIsStarted

    } = useContext(AppContext);
    const router = useRouter();

    var globalIframe, globalUrl;

    const [gameUrl, setGameUrl] = useState()
    const [isOpen, setOpen] = useState(false);
    const [retryCount, setRetryCount] = useState();
    const [shouldShowCancel, setShouldShowCancel] = useState(false)
    console.log("joiningData------detail", joiningData)
    useEffect(() => {

        if (gameUrl)
            init()
        return () => {
            window.removeEventListener('message', (e) => {
                console.log("Removed Listner")
            })
        }
    }, [gameUrl]);

    useEffect(() => {
        console.log("game login", showLoading)
    }, [showLoading])
    useEffect(() => {
        if (isPayIsStarted == "ended") {
            console.log("pay dended")
            setShowPaidGameConfirmation({})
            setShowLoading(false)
            setIsHideHeader(true);
            setIsHideFooter(true);
            setOpen(false)
        }
        else if (isPayIsStarted == "started") {
            setShowLoading(true)
        }
    }, [isPayIsStarted])

    useEffect(() => {
        console.log("joiningData", joiningData)
        if (!joiningData) {
            router.push("/games");
        }
        if (gameSlug && gameid && joiningData?.contestmaster?.data?.game?.data?.config?.url && user?.id) {
            console.log("Valid Data found")
            setGameUrl(joiningData?.contestmaster?.data?.game?.data?.config?.url + "&tournament_id=" + gameid + "&user_id=" + user?.id + "&game_id=" + joiningData?.id)

        }

    }, [gameSlug, gameid, joiningData, user?.id])

    const init = () => {
        setShowLoading(false)
        setIsHideHeader(true);
        setIsHideFooter(true);
        setOpen(false)
        //////// 1) Create the iframe that will contains the game ////////
        const iframe = document.createElement('iframe');
        iframe.id = 'game-frame';
        iframe.src = gameUrl;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('name', window.location.href);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('style', { height: '100vh' });
        iframe.style.top = '0%';
        iframe.style.left = '0%';
        const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        const eventer = window[eventMethod];
        const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
        eventer(messageEvent, async function (e) {
            if (e && typeof e?.data == 'string' && e.data.includes("name")) {
                let data = JSON.parse(e.data)
                console.log("Data-=-=-=-=-", data)
                if (data?.name == 'GameEnd') {
                    console.log("Game over", joiningData)
                    if (joiningData?.contestmaster?.data?.entryFee > 0) {
                        setShowLoading(true)
                        retryConst()
                    }
                    else {
                        setShouldShowCancel(true)
                    }
                }
            }

        }, false);
        document.getElementById('idDiv').appendChild(iframe);
        globalIframe = iframe;
    }
    const soundOff = () => {
        globalIframe.contentWindow.postMessage({
            message: 'soundOn'
        }, globalUrl);
    }
    const handleClose = async () => {
        setIsHideHeader(false);
        setIsHideFooter(false);
        router.push("/games/" + joiningData?.contestmaster?.data?.slug + "#leaderboard");

    }
    const retryConst = async () => {
        try {

            const isRetry = await strapi.request(
                "post",
                "contest/custom-contest/checkifretry?contest=" +
                joiningData?.id +
                "&userId=" +
                user?.id,
                {}
            );
            setShowLoading(false)
            if (isRetry?.playCount % isRetry?.retries == 0) {
                // setRetryCount(isRetry?.retries)
                getScore()

            }
        }
        catch (e) {
            console.log(e)
            setTimeout(() => {
                retryConst()
            }, 1000);
        }
    }
    const getScore = async () => {
        const score = await strapi.find(
            "scores",
            {
                filters: { contest: joiningData?.id, user: user?.id },
                sort: "createdAt:DESC"
            }
        );
        console.log("score", score)
        setRetryCount(score?.data[0]?.score)
        setOpen(true)
    }
    const handleJoin = () => {
        setShowLoading(false)
        setShowPaidGameConfirmation({
            cm: joiningData?.contestmaster.id,
            callerKey: `GameInfo-${joiningData?.id}`,
            retry: "exceeded"
        });
    }

    const playGame = (url) => {
        console.log("-=-=-=-=-=-=-=-=-= Play game")
        globalUrl = url;
        globalIframe.contentWindow.postMessage({
            message: 'callbackExecuted'
        }, url);
    }

    return (
        <div id="idDiv" style={{ height: '100dvh' }}>
            {/* <MultipleLoggedInUser /> */}
            <AlertDialog
                motionPreset="slideInBottom"
                onClose={handleClose}
                isOpen={isOpen}
                onClick={handleClose}
                isCentered
                size={"xl"}
                bg="background"
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <AlertDialogOverlay />

                <AlertDialogContent p="10px" bg="background">
                    <GameOverPopup onJoin={handleJoin} onCancel={handleClose} score={retryCount} />
                </AlertDialogContent>
            </AlertDialog>
            {joiningData &&
                showPaidGameConfirmation?.callerKey == `GameInfo-${joiningData?.id}` && (
                    <PaidGameConfirmation contestmaster={currentContest} retry={showPaidGameConfirmation?.retry} />
                )}
            {showLoading ?
                <LMNonCloseALert
                    header={"Please Wait....."}
                    canClose={false}
                    isOpen={
                        showLoading == true
                    }
                ></LMNonCloseALert>
                : <></>}
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}>
                {shouldShowCancel ?
                    <Button
                        fontSize={['20px', '20px']}
                        p={['5px 30px', '5px 20px']}
                        m={["5px auto", "5px auto", "5px auto"]}
                        size='lg'
                        textAlign={'center'}
                        display="flex"
                        boxShadow={0}
                        height="50px"
                        backgroundImage="linear-gradient(90deg, #672099 0%, #481A7F 100%)"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button> : <></>}
            </div>
        </div >
    )
}