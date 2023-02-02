import { useEffect, useState } from "react"

export const GamePixDetail = ({ gameSlug, gameid }) => {

    const [gameUrl, setGameUrl] = useState()

    useEffect(() => {
        if (gameSlug && gameid)
            setGameUrl("https://play.gamepix.com/" + gameSlug + "/embed?sid=" + gameid)
        
    }, [gameSlug, gameid])
    return (
        <iframe src={gameUrl} width="100%" height="100vh" frameborder="0"
            scrolling="no" />
    )
}