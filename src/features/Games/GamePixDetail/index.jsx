import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";

export const GamePixDetail = ({ gameSlug, gameid }) => {

    var globalIframe, globalUrl;

    const [gameUrl, setGameUrl] = useState()
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
        if (gameSlug && gameid)
            setGameUrl("https://play.gamepix.com/" + gameSlug + "/embed?sid=" + gameid)

    }, [gameSlug, gameid])

    const init = () => {
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
        eventer(messageEvent, function (e) {
            switch (e.data.type) {
                case 'loading':
                    loading(e.data.percentage);
                    break;
                case 'loaded':
                    playGame(e.data.url);
                    break;
                case 'send':
                    sendScore({
                        type: e.data.label,
                        level: e.data.level,
                        score: e.data.score
                    });
                    break;
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
    const sendScore = (object) => {
        // here you have access to type, level and score
        console.log("123456", object);
    }

    const playGame = (url) => {
        console.log("-=-=-=-=-=-=-=-=-= Play game")
        globalUrl = url;
        globalIframe.contentWindow.postMessage({
            message: 'callbackExecuted'
        }, url);
    }

    return (
        <div id="idDiv" style={{ height: '100vh' }}>
            <MultipleLoggedInUser />
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
                    <Box border="2.7033px dashed #515151">
                        <AlertDialogHeader>
                            <Heading color="white">
                                Game Over
                            </Heading>
                        </AlertDialogHeader>
                        <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
                        <AlertDialogBody>
                            <Text variant="hint">
                                Your score is updated. Please check leaderboard.
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleClose}>Close</Button>
                        </AlertDialogFooter>
                    </Box>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}