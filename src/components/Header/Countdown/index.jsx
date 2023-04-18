import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Text,Grid, GridItem } from '@chakra-ui/react'

function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    return (
        
        <div style={{textAlign: 'center'}}>
            <Grid templateColumns='repeat(4, 1fr)' gap={1}>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px"><Text>{days}</Text><Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Days</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px"><Text>{hours}</Text><Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Hours</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px"><Text>{minutes}</Text><Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Minutes</Text></GridItem>
                <GridItem w='100%' h='50' p="5px 10px" bg='#F60C67' color="#fff" verticalAlign="middle" display="inline-grid" borderRadius="5px" fontSize="18px"><Text>{seconds}</Text><Text fontFamily="var(--chakra-fonts-Blanch)" lineHeight="0">Seconds</Text></GridItem>
            </Grid>    
        </div>
      );
    }
const CountDown = ({ isOpen, onClose, renderMobileRoutes }) => {
    
    const time = new Date('04-23-2023');
    time.setSeconds(time.getSeconds()); // 10 minutes timer
    return (
      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
    );
};

export default CountDown;
