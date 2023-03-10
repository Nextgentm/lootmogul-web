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
            getGameRoomOrCreateRoom(joiningData?.id, user?.id).then((roomData) => {
                console.log("roomData", roomData)
                setGameUrl(joiningData?.contestmaster?.data?.game?.data?.config?.url + "?env=stg&tournament_id=" + joiningData.id + "&user_id=" + user?.id + "&game_id=" + joiningData?.id)
            }).catch((e) => {
                console.log("erro", e)
            })

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
            console.log("e", e.data)
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
            {/* <MultipleLoggedInUser /> */}
        </div>
    )
}