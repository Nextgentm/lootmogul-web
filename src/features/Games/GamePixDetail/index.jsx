import { useEffect, useState } from "react"

export const GamePixDetail = ({ gameSlug, gameid }) => {

    const [gameUrl, setGameUrl] = useState()
    useEffect(() => {
        init()
    }, [])
    function init() {

        // Listen to message from child window
        window.addEventListener("message", function (e) {
            console.log("-=-=-=-=-=-=-=-=-=", e)
            switch (e.data.type) {
                case 'loading':
                    // this event may not arrives linear
                    // e.g. not all values from 0 to 100 may be sent
                    // loading(e.data.percentage);
                    console.log('-=-==-=', e.data.percentage)
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
        });

    }
    function soundOff() {
        globalIframe.contentWindow.postMessage({
            message: 'soundOn'
        }, globalUrl);
    }
    function sendScore(object) {
        // here you have access to type, level and score
        console.log("123456", object);
    }

    function playGame(url) {
        console.log("-=-=-=-=-=-=-=-=-= Play game")
        globalUrl = url;
        //here's the function that tell the game starts once loaded
        //you can fire this function, for istance, after you've verified that the user is logged.
        globalIframe.contentWindow.postMessage({
            message: 'callbackExecuted'
        }, url);
    }
    useEffect(() => {
        if (gameSlug && gameid)
            setGameUrl("https://play.gamepix.com/" + gameSlug + "/embed?sid=" + gameid)

    }, [gameSlug, gameid])
    return (
        <iframe src={gameUrl} width="100%" height="100vh" style={{ height: '100vh' }} frameborder="0" scrolling="no" />
    )
}