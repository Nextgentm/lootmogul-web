import React, { useContext, useState, useEffect } from "react";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import PlayersLoading from "./components/PlayersLoading";
import JoiningFooter from "./components/JoiningFooter";
import { useRouter } from "next/router";
import JoiningHeader from "./components/JoiningHeader";
import AppContext from "../../utils/AppContext";
import LMNonCloseALert from "../../components/LMNonCloseALert";
import { getMatchCount,setMatchCount ,getCountForCaptcha,setCountForCaptcha } from "../../services/dataService";
import MultipleLoggedInUser from "../../components/MultipleLoggedInUser";

const PlayersJoining = ({ timeLeft, users }) => {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [matchJoinCount, setMatchJoinCount] = useState(getMatchCount());
    const [matchCaptchaCount, setMatchCaptchaCount] = useState(getCountForCaptcha());
    const [showAlert, setShowAlert] = useState(false);
    useEffect(()=>{
        if(matchJoinCount && matchJoinCount <5){
            let count = matchJoinCount;
            setMatchJoinCount(count++);
            setMatchCount(count++);         
          
          } else if(matchJoinCount >= 5) setMatchCount(0);
      
    },[matchJoinCount])
    useEffect(()=>{
        if(matchCaptchaCount && matchCaptchaCount <5 ){
            let count = matchCaptchaCount;
            setMatchCaptchaCount(count++);
            setCountForCaptcha(count++);         
          
          } else if(matchCaptchaCount >= 5) setCountForCaptcha(0);
      
    },[matchCaptchaCount])
    useEffect(()=>{
        if (typeof window !== 'undefined')   {
        window.addEventListener('online', () => {setShowAlert(false); router.push("/")});
        window.addEventListener('offline', () =>{setShowAlert(true); });
        }
      },[]);

    return (
        <Box pl="10px" pr="10px" width="100%" height="100vh" bg="#00021F" textAlign={"center"}>
            <JoiningHeader timeLeft={timeLeft} />
            <Avatar
                mt="2%"
                boxSize={"102px"}
                showBorder={true}
                name={users.find(u=>u.id == user.id)?.username}
                src={users.find(u=>u.id == user.id)?.profile_pic}
            />
            <Text mt="1%" variant="playerName" 
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "16px",
            lg: "16px",
          }}>
                {" "}
                {users.length > 0 ? users.find(u=>u.id == user.id)?.username: "Loading...."}
            </Text>
            <Text
                mt="1%"
                variant="vs"
                fontSize={{ base: "36px", sm: "36px", md: "60px", lg: "60px" }}
            >
                VS
            </Text>
            <Flex
                m="auto"
                textAlign={"center"}
                width="100%"
                justifyContent="space-around"
            >
               <PlayersLoading users={users.filter(u=> u.id != user.id)} />
            </Flex>
            <JoiningFooter/>
            <LMNonCloseALert
                header={"Lost Network!!!"}
                canClose={true}
                data={"Your internet may be fast but not stable"}
                isOpen={showAlert}
                onClose={() => {
                  setShowAlert(false);
                   router.push("/games");                   
                }
                }
            />
            {/* <MultipleLoggedInUser /> */}
        </Box>
    );
};

export default PlayersJoining;
