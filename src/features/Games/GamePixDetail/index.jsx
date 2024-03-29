import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import GameOverPopup, { GameBody } from "../../../components/LMModal/GameOverPopup";
import AlertChipPopup from "../../../components/LMModal/AlertChipPopup";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";
import { getGameRoomOrCreateRoom } from "../../../services/gameSevice";
import AppContext from "../../../utils/AppContext";
import strapi from "../../../utils/strapi";
import PaidGameConfirmation from "../PaidGameConfirmation";
import * as ct from '../../../services/clevertapAnalytics';
import { mrnGamePlayService } from "../../../services/mrnCallService";
import { clearpierGamePlayService } from "../../../services/clearpierCallService";
import { appmonetizeGamePlayService } from "../../../services/appmonetizeCallService";
import { ventesGamePlayService } from "../../../services/ventesCallService";


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
    const [alertLostChip, setAlertLostChip] = useState(false)

    useEffect(() => {
        const disableBackButton = (e) => {
          e.preventDefault();
          window.history.forward();
        };

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', disableBackButton);

        return () => {
          window.removeEventListener('popstate', disableBackButton);
        };
      }, []);

    
    useEffect(() => {

        if (gameUrl)
            init()
        return () => {
            window.removeEventListener('message', (e) => {
                
            })
        }
    }, [gameUrl]);

    useEffect(() => {
        
    }, [showLoading])
    useEffect(() => {
        if (isPayIsStarted == "ended") {
            
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
        
        if (!joiningData) {
            router.push("/games");
        }
        if (gameSlug && gameid && joiningData?.contestmaster?.data?.game?.data?.config?.url && user?.id) {
            
            setGameUrl(joiningData?.contestmaster?.data?.game?.data?.config?.url + "&tournament_id=" + gameid + "&user_id=" + user?.id + "&game_id=" + joiningData?.id)
            //console.log('Skill Game start...',currentContest);
            ct.onGameplayStart({
                action:"Gameplay Start", 
                params: user,
                currentContest: currentContest
            }); 
            setShouldShowCancel(true)
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
                
                if (data?.name == 'GameStart') {
                    setShouldShowCancel(false);  
                }
                
                if (data?.name == 'GameEnd') {
                    
                    //console.log('Skill Game End...',data);
                    mrnGamePlayService();
                    clearpierGamePlayService(user);
                    appmonetizeGamePlayService(user);
                    clearpierGamePlayService(user);
                    ventesGamePlayService(user);
                    
                    ct.onGameplayStart({
                        action:"Gameplay Completed", 
                        params: user,
                        currentContest: currentContest                        
                    });

                    if (joiningData?.contestmaster?.data?.entryFee > 0) {
                        setShouldShowCancel(true)
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
        //console.log(joiningData?.contestmaster?.data?.entryFee);
        //setIsHideHeader(false);
        //setIsHideFooter(false);
        if(joiningData?.contestmaster?.data?.entryFee != 0){
            setAlertLostChip(true);
        }
        else{
            setShowLoading(true);
            router.push("/games/" + joiningData?.contestmaster?.data?.slug + "#leaderboard");
        }

    }
    const handleYes = async () => {
        setShowLoading(true);
        router.push("/games/" + joiningData?.contestmaster?.data?.slug + "#leaderboard");

    }
    const handleNo = async () => {
        setAlertLostChip(false);
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
                
                getScore()

            }
        }
        catch (e) {
            
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
        
        globalUrl = url;
        globalIframe.contentWindow.postMessage({
            message: 'callbackExecuted'
        }, url);
    }

    return (
        <div id="idDiv" style={{ height: '100dvh' }}>
            
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
                    <GameOverPopup  onJoin={handleJoin} onCancel={handleClose} score={retryCount} />
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
            {alertLostChip && <AlertDialog
                motionPreset="slideInBottom"
                onClose={handleNo}
                isOpen={alertLostChip}
                onClick={handleNo}
                isCentered
                size={"xl"}
                bg="background"
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <AlertDialogOverlay />

                <AlertDialogContent p="10px" bg="transparent">
                    <AlertChipPopup  onCancel={handleYes} onCancelNo={handleNo} />
                </AlertDialogContent>
            </AlertDialog>}    
            
            <div style={{
                position: "absolute",
                top: 10,
                right: 50,
            }}>
                {shouldShowCancel ?
                    <Button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        borderRadius={"50%"}
                        p={"10px"}
                        onClick={handleClose}
                        textAlign={"center"}
                    >
                         X
                    </Button> : <></>}
            </div>
        </div >
    )
}