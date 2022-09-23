import { Box,Text, } from "@chakra-ui/react";
import { VolumeIcon } from "../../../components/Icons";

const Icons = ({voiceOver,onAudioClick})=>{
    return(
        <>
         <Box textAlign="center">
                <VolumeIcon
                  mt="2px"
                  viewBox="0 0 40 40"
                  boxSize={"24px"}
                  cursor="pointer"
                  color={voiceOver?"primary":"white"}
                  onClick={()=>{onAudioClick()}}
                />
                <Text
                  variant="quizHeadText"
                  fontSize={{
                    base: "8px",
                    sm: "8px",
                    md: "12px",
                    lg: "12px",
                  }}
                >
                  Volume
                </Text>
              </Box>
        </>
    )
}
export default Icons;