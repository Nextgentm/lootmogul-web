import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../src/utils/AppContext/index";

import strapi from "../src/utils/strapi";
import {setMatchCount } from "../src/services/dataService";
import dynamic from "next/dynamic";
import * as ct from '../src/services/clevertapAnalytics';

const PlayersJoining = dynamic(() => import("../src/features/PlayersJoining"));

const WAITING_TIME_IN_SECONDS = 15;

const Joining = (props) => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [timer, setTimer] = useState(WAITING_TIME_IN_SECONDS);
  const { joiningData, getSocket, setIsHideHeader, setIsHideFooter, currentContest, user, setGameInProgress,updateUser } =
    useContext(AppContext);
  const [socket, setSocket] = useState();
  const [ticketId, setTicketId] = useState(0);

  useEffect(() => {
    if (!user || !currentContest) {
      setMatchCount(0);
      router.push("/games");
    } else {
      props.setLoading(true);
      setIsHideHeader(true);
      setIsHideFooter(true);
    }

    const handleRouteChange = (url) => {
      
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

  // Commenting below user as it is creating to sessions for the socket 
  useEffect(() => {
    if (joiningData) {
      setTicketId(joiningData.ticketId);
      const sockRef = getSocket(
        process.env.NEXT_PUBLIC_SOCKET_URL || joiningData.url
      );
      setSocket(sockRef);
      
    }
  // }, [user, joiningData]);
}, [joiningData]);

  useEffect(() => {
    if (socket) {
      socket.on("enter_game_lobby", (data) => {
        setUsers(data.users);

        setTimer(Math.floor(data.timer));
      });

      socket.on("start_game", (data) => {
        //console.log('Travia Game Start.....');
        ct.onGameplayStart({
            action:"Gameplay Start", 
            params: user,
            currentContest: currentContest
        }); 
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
        setUsers(data.users);
        });

      socket.emit(
        "join",
        { jwt: strapi.getToken(), ticket: ticketId },
        (response) => {
          props.setLoading(false);
          if (response.status === 0) {
            socket?.disconnect();
            router.back();
          }
        }
      );
    }

    
  }, [socket, ticketId]);

  
  useEffect(() => {}, [user, currentContest]);

  return (
    <>{!props.loading &&  users?.length>0 && timer &&<PlayersJoining timeLeft={timer} users={users} />}</>
  );
};

export default Joining;
