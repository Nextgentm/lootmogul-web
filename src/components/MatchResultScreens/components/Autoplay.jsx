import {Box,Progress,Text} from"@chakra-ui/react";
import {useState,useEffect} from "react";
const AutoPlay = ({startNextGame})=>{
    const [timer, setTimer] = useState(10);
    useEffect (()=>{
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
          } else {
          startNextGame();
          }
    },[timer])
    return <Box my="5%" m="auto" textAlign="center" width="100%" alignItems="center">
        <Text my="3%" color="white" variant="playerName"
                  fontSize={["11px", "15px"]}
                  fontFamily="Sora"
                  fontWeight="600" ml="auto">Your Next Match Will Start In {timer} Seconds...</Text>
   <Progress isIndeterminate borderRadius="10px"  colorScheme='green' size='lg' value={timer} />
    
  </Box>
}
export default AutoPlay;