import ReactPlayer from 'react-player'
import {Box} from "@chakra-ui/react";
const LMVideoPlayer = ({ url ,loop,play}) => {

    return  <Box pos="relative" paddingTop="56.25%"><ReactPlayer className="react-player"controls={false} width="100%" height="100%" url={url} loop={loop} playing={play} /></Box>

}

export default LMVideoPlayer;