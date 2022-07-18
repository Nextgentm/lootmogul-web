import React from 'react'
import YouTube from 'react-youtube';
import { Flex } from "@chakra-ui/react";
{/* <Flex ml="10%" background={"#000000"}>
</Flex> */}
const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        showinfo: 0,
        controls: 0,
        rel: 0
    },
};

const mobileOpts = {
    height: '500px',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        showinfo: 0,
        controls: 0,
        rel: 0
    },
};

const LMMediaPlayer = ({ url = "fu6QDHOp_rY", title = "", isNotMobile = isNotMobile }) => {

    return <YouTube title={title} videoId={url} opts={isNotMobile ? opts : mobileOpts} />

}

export default LMMediaPlayer;