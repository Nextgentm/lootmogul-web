import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment,
  } from 'react';
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    Heading,
    Text,
    Box
} from "@chakra-ui/react";
  import moment from 'moment';
  import { AppContext } from '../../utils/AppContext';
  import { useContext } from "react";
  
  const SessionTimeout = () => {
    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [showModal, setShowModal] = useState(false);
    const [second, setSecond] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const {
      user,
      logout,
      toggleLoginModal
    } = useContext(AppContext);
  
    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();
  
    // start inactive check
    let timeChecker = () => {
      startTimerInterval.current = setTimeout(() => {
        let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
        warningInactive(storedTimeStamp);
        
      }, 1000);
    };
  
    // warning timer
    let warningInactive = (timeString) => {
      clearTimeout(startTimerInterval.current);
  
      warningInactiveInterval.current = setInterval(() => {
        const maxTime = process.env.SESSION_TIMEOUT || 30;
        const popTime = 1;
  
        const diff = moment.duration(moment().diff(moment(timeString)));
        const minPast = diff.minutes();
        const leftSecond = 60 - diff.seconds();
  
        if (minPast === popTime) {
          setSecond(leftSecond);
          setOpen(false);
        }
  
        if (minPast === maxTime) {
          clearInterval(warningInactiveInterval.current);
          sessionStorage.removeItem('lastTimeStamp');
          logout();
          setOpen(true);
        }
      });
    };
  
    // reset interval timer
    let resetTimer = useCallback(() => {
      clearTimeout(startTimerInterval.current);
      clearInterval(warningInactiveInterval.current);
  
      if (user) {
        timeStamp = moment();
        sessionStorage.setItem('lastTimeStamp', timeStamp);
      } else {
        clearInterval(warningInactiveInterval.current);
        sessionStorage.removeItem('lastTimeStamp');
      }
      timeChecker();
    }, [user]);
  
    // handle close popup
    const handleClose = () => {
      setOpen(false);
  
      resetTimer();
    };

    const handleLogin = () => {
      setOpen(false);
      toggleLoginModal();
      resetTimer();
    };
  
    useEffect(() => {
      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });
      timeChecker();
  
      return () => {
        clearTimeout(startTimerInterval.current);
        
        //   resetTimer();
      };
    }, [resetTimer, events, timeChecker]);

    
    if (!isOpen) {
      return null;
    }
  
    // change fragment to modal and handleclose func to close
    return (
      <AlertDialog
      motionPreset="slideInBottom"
      onClose={handleClose}
      isOpen={isOpen}
      onClick={handleClose}
      isCentered
      size={"xl"}
      bg="background"
      closeOnOverlayClick={false}
      closeOnEsc={false}
  >
      <AlertDialogOverlay />

      <AlertDialogContent p="10px" bg="background">
          <Box border="2.7033px dashed #515151">
              <AlertDialogHeader>
                  <Heading color="white">SESSION TIMEOUT !!</Heading>
              </AlertDialogHeader>
              <AlertDialogCloseButton
                      _focus={{ boxShadow: "none" }}
                  />
              <AlertDialogBody>
                  <Text variant="hint">You're session is timed-out due to inactivity. Please Login again.</Text>
                  
              </AlertDialogBody>
              <AlertDialogFooter>
                  <Button onClick={handleLogin}>Login</Button>
              </AlertDialogFooter>
          </Box>
      </AlertDialogContent>
  </AlertDialog>
    );
  };
  
  export default SessionTimeout;