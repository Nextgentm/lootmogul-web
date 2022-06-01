import { Box,Text, } from "@chakra-ui/react";
import { VolumeIcon, HelpIcon, CloseIcon  } from "../../../components/Icons";

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
              {/* <Box pl="4" pr="4" textAlign="center">
                <HelpIcon
                  mt="2px"
                  viewBox="0 0 40 40"
                  boxSize={"24px"}
                  color="primary"
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
                  Help
                </Text>
              </Box>
              <Box textAlign="center">
                <CloseIcon
                  mt="2px"
                  viewBox="0 0 40 40"
                  boxSize={"24px"}
                  color="primary"
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
                  Close
                </Text>
              </Box> */}
        </>
    )
}
export default Icons;