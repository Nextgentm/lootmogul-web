import ReactPlayer from 'react-player'
import {Box} from "@chakra-ui/react";
const LMVideoPlayer = ({mute, url ,loop,play,height}) => {

    return  <Box pos="absolute"  top={0} left={0} right={0}  height="100%" ><ReactPlayer className="react-player" muted={mute} width="100%" height="100%"url={url} loop={loop} playing={play} playsinline /></Box>

}

export default LMVideoPlayer;