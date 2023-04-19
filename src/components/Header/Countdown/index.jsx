import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Text,Grid, GridItem } from '@chakra-ui/react'
import moment from 'moment-timezone';


var a = moment.tz("04-24-2023 23:59", "America/Los_Angeles");
const newData = a.format(); 
console.log(newData);
function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    const leftseconds = seconds >= 10 ? seconds.toString()[0] : '0';
    const rightseconds = seconds >= 10 ? seconds.toString()[1] : seconds.toString();

    const leftminutes = minutes >= 10 ? minutes.toString()[0] : '0';
    const rightminutes = minutes >= 10 ? minutes.toString()[1] : minutes.toString();

    const lefthours = hours >= 10 ? hours.toString()[0] : '0';
    const righthours = hours >= 10 ? hours.toString()[1] : hours.toString();

    const leftdays = days >= 10 ? days.toString()[0] : '0';
    const rightdays = days >= 10 ? days.toString()[1] : days.toString();
    
    return (
        
        <div style={{textAlign: 'center'}}>
            <Grid templateColumns='repeat(4, 1fr)' gap={1}>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px">
                  <Text>{leftdays}{rightdays}</Text>
                  <Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Days</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px">
                  <Text>{lefthours}{righthours}</Text>
                  <Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Hours</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px">
                  <Text>{leftminutes}{rightminutes}</Text>
                  <Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Minutes</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px">
                  <Text>{leftseconds}{rightseconds}</Text>
                  <Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Seconds</Text></GridItem>
            </Grid>    
        </div>
      );
    }
const CountDown = ({ isOpen, onClose, renderMobileRoutes }) => {
  
    const time = new Date(newData);
    time.setSeconds(time.getSeconds()); // 10 minutes timer
    return (
      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
    );
};

export default CountDown;
