import { ArrowLeftIcon } from "@chakra-ui/icons";
import CountDownTimer from "./CountDownTimer";
import { Flex, Text,Box,Spacer } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useContext } from "react";
import AppContext from "../../../utils/AppContext";

const JoiningHeader = ({ timeLeft }) => {
  const router = useRouter();
  const { getSocket, setIsHideHeader, setIsHideFooter } =
    useContext(AppContext);
  
  return (
    <>
      <Flex w="100%"  pt="50px" justifyContent={"space-between"}>
        <Flex
          width="6%"
          height="10px"
          justifyContent={"space-between"}
          alignItems="center"
          pt="4"
          onClick={()=>{
            getSocket()?.disconnect();
            setIsHideHeader(false);
            setIsHideFooter(false);
            router.back()}}
        >
          <ArrowLeftIcon
            color="white"
            fontSize={{
              base: "11px",
              sm: "11px",
              md: "20px",
              lg: "20px",
            }}
          />
          <Text
            color="white"
            variant="hint"
            ml="2"
            fontSize={{
              base: "14px",
              sm: "14px",
              md: "20px",
              lg: "20px",
            }}
          >
            {" "}
            Back
          </Text>
        </Flex>
        <Spacer></Spacer>
       
        <Box pr={["2%"]} mt={"-30px"}>
        <CountDownTimer
          value={timeLeft}
          width="78px"
          height="85px"
          color="#fbc531"
          
        />
        </Box>
      </Flex>
      <Text

          variant="joiningText"
          fontSize={{
            base: "18px",
            sm: "18px",
            md: "24px",
            lg: "24px",
          }}
        >
          
          Please wait! while we find opponent for you.
        </Text>
        <Spacer></Spacer>
    </>
  );
};
export default JoiningHeader;
