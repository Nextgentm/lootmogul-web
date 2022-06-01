import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../src/utils/AppContext/index";

import strapi from "../src/utils/strapi";
import {setMatchCount } from "../src/services/dataService";
import dynamic from "next/dynamic";
import { now } from "moment";

const PlayersJoining = dynamic(() => import("../src/features/PlayersJoining"));

const WAITING_TIME_IN_SECONDS = 15;

const Joining = (props) => {
  const router = useRouter();
  const [joiningData, setJoiningData] = useState(null);

  const [users, setUsers] = useState([]);
  const [timer, setTimer] = useState(WAITING_TIME_IN_SECONDS);
  const { getSocket, setIsHideHeader, setIsHideFooter, currentContest } =
    useContext(AppContext);
  const [socket, setSocket] = useState();
  const [ticketId, setTicketId] = useState(0);
  

  const { user, gameInProgress, setGameInProgress,updateUser } = useContext(AppContext);

  useEffect(() => {
    if (!user || !currentContest) {
      setMatchCount(0);
      router.push("/");
    } else {
      props.setLoading(true);
      setIsHideHeader(true);
      setIsHideFooter(true);
      fetchData();
    }

    const handleRouteChange = (url, { shallow }) => {
      
      if(!url.startsWith('/quizPage')){

        socket?.disconnect();
        setIsHideHeader(false);
        setIsHideFooter(false);
      }
        props.setLoading(false);
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

   
  useEffect(() => {
    if (joiningData) {

      setTicketId(joiningData.ticketId);
      const sockRef = getSocket(
        process.env.NEXT_PUBLIC_SOCKET_URL || joiningData.url
      ); //getSocket(ENDPOINT );//|| joiningData.url);
      setSocket(sockRef);
      
    }
  }, [user, joiningData]);

  useEffect(() => {
    if (socket) {
      socket.on("enter_game_lobby", (data) => {
        setUsers(data.users);

        setTimer(Math.floor(data.timer));
      });

      socket.on("start_game", (data) => {
        setGameInProgress(true);
        updateUser();
        router.push({
          pathname: "/quizPage",
          query: { pid: data.room },
        });
      });

      socket.on("tick", (data) => {
        setTimer(Math.floor(data.timer));
      });

      socket.on("player_left", data => {
        // console.log("user left the game", data.playerId);
        setUsers(data.users);
        // user left the game
        });

      socket.emit(
        "join",
        { jwt: strapi.getToken(), ticket: ticketId },
        (response) => {
          props.setLoading(false);

          if (response.status === 0) {
            socket?.disconnect();
            //show Error Message
            router.back();
          }
        }
      );
    }

    
  }, [socket, ticketId]);

  const fetchData = async () => {
    if (currentContest) {
      const { data } = await strapi.find("contests", {
        sort: "createdAt:DESC",
        filters: { contestmaster: currentContest },
        populate: {
          contestmaster:{fields:['id'],
              populate:{ game:{fields:['url','type']}}
          }
        }
      });
      if (data?.length > 0) {

        const resp = await strapi.request(
          "post",
          "contest/custom-contest/join?contest=" + data[0].id,
          {}
        );
        if (resp?.ticketId) {
          if (resp?.status == 0) {
            alert.show("Error!", {
              title: resp?.message,
              actions: [
                {
                  copy: "Ok",
                  onClick: () => {
                    setIsHideHeader(false);
                    setIsHideFooter(false);
                    socket?.disconnect();
                    router.back();
                  },
                },
              ],
            });
          } else {
            if(data[0]?.contestmaster?.data?.game?.data?.url && data[0]?.contestmaster?.data?.game?.data?.type=='html'){
                  if (typeof window !== "undefined") {

                    window.open(data[0]?.contestmaster?.data?.game?.data?.url+ "?ticketId="+ resp?.ticketId+ "&token=" + strapi.getToken()+ "&ts="+now(),"_self") ;
                  }
            }
            else 
              setJoiningData(resp);
          }
        }
      }
    } else {
      //error no contest
    }
  };

  useEffect(() => {}, [user, currentContest]);

  return (
    <>{!props.loading &&  users?.length>0 && <PlayersJoining timeLeft={timer} users={users} />}</>
  );
};

export default Joining;
