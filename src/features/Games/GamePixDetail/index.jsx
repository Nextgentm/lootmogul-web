import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import MultipleLoggedInUser from "../../../components/MultipleLoggedInUser";
import { getGameRoomOrCreateRoom } from "../../../services/gameSevice";
import AppContext from "../../../utils/AppContext";

export const GamePixDetail = ({ gameSlug, gameid }) => {

    const {
        setIsHideHeader,
        setIsHideFooter,
        joiningData, user

    } = useContext(AppContext);
    const router = useRouter();

    var globalIframe, globalUrl;

    const [gameUrl, setGameUrl] = useState()
    const [isOpen, setOpen] = useState(false);
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
        console.log("joiningData", joiningData)
        if (!joiningData) {
            router.push("/games");
        }
        if (gameSlug && gameid && joiningData?.contestmaster?.data?.game?.data?.config?.url && user?.id) {
            console.log("Valid Data found")
            setGameUrl(joiningData?.contestmaster?.data?.game?.data?.config?.url + "?env=stg&tournament_id=" + gameid + "&user_id=" + user?.id + "&game_id=" + joiningData?.id)

        }

    }, [gameSlug, gameid, joiningData, user?.id])

    const init = () => {
        setIsHideHeader(true);
        setIsHideFooter(true);
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
            if (e && typeof e?.data == 'string' && e.data.includes("name")) {
                let data = JSON.parse(e.data)
                console.log("Data-=-=-=-=-", data)
                if (data?.name == 'GameEnd') {
                    setOpen(true)
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
    const sendScore = (object) => {
        // here you have access to type, level and score
        console.log("123456", object);
    }
    const handleClose = () => {
        console.log("Game over")
        setIsHideHeader(false);
        setIsHideFooter(false);
        router.push("/games");

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