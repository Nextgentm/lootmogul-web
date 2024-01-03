import React, { useContext, useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProgressBars from "./components/ProgressBars";
import Players from "./components/Players";
import IdDetail from "./components/IdDetail";
import { AppContext } from "../../utils/AppContext/index";
import QuestionOption from "./components/QuestionOption";
import LMNonCloseALert from "../../components/LMNonCloseALert";
import strapi from "../../utils/strapi";
import {
  getVoiceOverStatus,
  setVoiceOverStatus,
} from "../../services/audioService";
///import * as ct from "../../services/clevertapAnalytics";

const Quiz = (props) => {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionUrls, setOptionUrls] = useState([]);
  const [timer, setTimer] = useState(0);
  const [milliCounter, setMilliCounter] = useState();
  const [timerValue, setTimerValue] = useState();

  const [correctAns, setCorrectAns] = useState(-1);
  const [selOption, setSelOption] = useState(-1);
  const [question, setQuestion] = useState(null);
  const [socket, setSocket] = useState();
  const [voiceOver, setVoiceOver] = useState(getVoiceOverStatus());
  const [audio, setAudio] = useState(
    typeof Audio !== "undefined" &&
      new Audio("/assets/audio/home/home_sound.mp3")
  );

  const {
    getSocket,
    setGameInProgress,
    setIsHideHeader,
    setIsHideFooter,
    updateUser,
    currentContest,
  } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [allUserOptions, setAllUserOptions] = useState([[], [], [], []]);
  const [imageURL, setImageURL] = useState();
  const [displayMesage, setDisplayMessage] = useState(null);

  const ENDPOINT = "http://localhost:3001";

  const [maxTime, setMaxTime] = useState(100);
  const [roomData, setRoomData] = useState();

  const { setMatchResult } = useContext(AppContext);

  const fetchRoomData = async () => {
    const { data } = await strapi.findOne("rooms", props.pid, {
      populate: ["contest.contestmaster.quizconfig", "contest.contestmaster"],
    });
    setRoomData(data);
    return data;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        setShowAlert(false);
        setIsHideHeader(false);
        setIsHideFooter(false);
        router.push("/games");
      });
      window.addEventListener("offline", () => {
        setShowAlert(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!user) router.push("/games");
    else {
      setIsHideHeader(true);
      setIsHideFooter(true);
      props.setLoading(true);
      const sockRef = getSocket(ENDPOINT);
      setSocket(sockRef);
      fetchRoomData();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("next_question", (data) => {
        setDisplayMessage(null);
        setMilliCounter(Date.now());
        props.setLoading(false);
        setUsers(data.users.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
        setQuestion(data.question?.questionText);
        setOptions([
          data.question?.option1,
          data.question?.option2,
          data.question?.option3,
          data.question?.option4,
        ]);
        setOptionUrls([
          data.question?.option1Url,
          data.question?.option2Url,
          data.question?.option3Url,
          data.question?.option4Url,
        ]);
        setCurrentQuestionNo(data.question_no);
        setMaxTime(Math.floor(data.timer));
        setTimer(Math.floor(data.timer));
        setTotalQuestions(data.questions_count);
        if (data.question?.imageURL) setImageURL(data.question?.imageURL);
        else setImageURL(null);
        setAllUserOptions([[], [], [], []]);
        setCorrectAns(-1);
        setSelOption(-1);
      });

      socket.on("show_answer", (data) => {
        setUsers(data.users.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
        setCorrectAns(data.answer - 1);
      });

      socket.on("display_message", (data) => {
        props.setLoading(false);

        setDisplayMessage(data.message);
      });

      socket.on("game_over", (data) => {
        //console.log(data);
        /*ct.onGameGameOver({
          action: "Gameplay Completed",
            params: {
              "Category": currentContest.contest_section.data?.name,
              "GameType": currentContest.game.data?.name,
              "GameSubtype": currentContest?.name,
              "TotalWinnings":"",
              "MaxPlayers": "Test",
              "PlayersPlayed": "Test",
              "GamePlayDuration":"",
              "TotalPoints":"",
              "RejoinCount":"",
              "Username": user?.username,
              "PlayerID": user?.id,
              "EmailID": user?.email,
              "MobileNo": user?.mobileNumber,
              "FullName": user?.fullName
            }
        })*/
        setMatchResult(data.ranks);
        updateUser();

        if (data.ranks?.length == 1) {
          router.push("/matchresultsingle");
        } else {
          router.push("/matchresult");
        }
      });

      socket.on("player_left", (data) => {});

      socket.on("tick", (data) => {
        setMilliCounter(Date.now());
        setTimer(Math.floor(data.timer));
      });

      socket.on("player_answered", (data) => {
        let lastQuestionNo = data.question_no;
        let alloptions = [[], [], [], []];
        data.users.map((user) => {
          if (
            user.answers.length > lastQuestionNo &&
            user.answers[lastQuestionNo].option
          ) {
            let optionNo = user.answers[lastQuestionNo].option - 1;
            if (optionNo >= 0) {
              alloptions[optionNo].push(user);
            }
          }
        });
        setAllUserOptions(alloptions);
      });
    }

    return () => {
      socket?.disconnect();
      setGameInProgress(false);
    };
  }, [socket]);

  useEffect(() => {
    if (timer > 0 && milliCounter && Date.now() - milliCounter < 1000)
      setTimerValue(timer * 1000 - (Date.now() - milliCounter));
    if (timer == 0) setTimerValue(0);
  }, [Date.now()]);

  const handleOptionClicked = (index, option) => {
    if (selOption >= 0) return;
    if (correctAns >= 0) return;
    if (socket) {
      socket.emit("submit_answer", {
        currentQuestionNo: currentQuestionNo,
        answer: option,
      });
    }
    setSelOption(index);
  };

  return (
    <>
      <Box
        d="flex"
        flexDirection={{
          base: "column",
          sm: "columns",
          md: "row",
          lg: "row",
        }}
        h="100vh"
        pos="relative"
      >
        <Box width={{ base: "100%", sm: "100%", md: "30%", lg: "20%" }}>
          <Box
            display={{
              base: "none",
              sm: "none",
              md: "block",
              lg: "block",
            }}
          >
            {roomData && <IdDetail roomData={roomData} />}
          </Box>
          <Box>
            {users?.length && (
              <Players
                users={users}
                showAnswer={correctAns >= 0}
                currentQuestionNo={currentQuestionNo}
              />
            )}
          </Box>
        </Box>
        <Box
          width={{ base: "100%", sm: "100%", md: "80%", lg: "80%" }}
          px="5"
          mb="8"
          mt={{ base: "0px", sm: "0px", md: "18px", lg: "18px" }}
        >
          {displayMesage && (
            <>
              <ProgressBars
                currentQuestionNo={currentQuestionNo}
                totalQuestions={totalQuestions}
                voiceOver={voiceOver}
                onAudioClick={() => {
                  setVoiceOverStatus(!voiceOver);
                  setVoiceOver(getVoiceOverStatus);
                }}
                timer={timer}
                maxTime={maxTime}
              />
              <Box textAlign="center" pt={"200px"}>
                <Heading
                  fontFamily="sora"
                  color="#EBCE2C"
                  fontWeight="600"
                  LineHeight="16.38px"
                  mb={"50px"}
                  fontSize={{
                    base: "20px",
                    sm: "20px",
                    md: "30px",
                    lg: "30px",
                  }}
                >
                  {displayMesage}
                </Heading>
              </Box>
            </>
          )}
          {!displayMesage && question != null && (
            <>
              {" "}
              <ProgressBars
                currentQuestionNo={currentQuestionNo}
                totalQuestions={totalQuestions}
                voiceOver={voiceOver}
                onAudioClick={() => {
                  setVoiceOverStatus(!voiceOver);
                  setVoiceOver(getVoiceOverStatus);
                }}
                timer={timer}
                maxTime={maxTime}
                timerValue={timerValue}
              />
              <QuestionOption
                allUserOptions={selOption > -1 ? allUserOptions : []}
                voiceOver={voiceOver}
                options={options}
                optionUrls={optionUrls}
                question={question}
                correctAns={correctAns}
                imageURL={imageURL}
                selOption={selOption}
                handleOptionClicked={handleOptionClicked}
              />
            </>
          )}

          <Box
            pos="absolute"
            bottom="2"
            w="90%"
            h="135px"
            display={{
              base: "block",
              sm: "block",
              md: "none",
              lg: "none",
            }}
          >
            {roomData && <IdDetail roomData={roomData} />}
          </Box>
        </Box>
        <LMNonCloseALert
          header={"Lost Network!!!"}
          canClose={true}
          data={"Your internet may be fast but not stable"}
          isOpen={showAlert}
          onClose={() => {
            setShowAlert(false);
            setIsHideHeader(false);
            setIsHideFooter(false);
            router.push("/games");
          }}
        />
      </Box>
    </>
  );
};
export default Quiz;
