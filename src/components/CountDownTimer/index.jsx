import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text, Button, Flex } from "@chakra-ui/react";
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

const CountDownTimer = ({ startDate, onZero }) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const timeBetween = moment
        .duration(moment(startDate).diff(currentTime), "milliseconds")
        .format(" dd[days]:hh[hrs]:mm[m]:ss[s]");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
            if (moment(startDate) < moment() && onZero) {
                onZero();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Text
                display="flex"
                fontSize={["20px", "20px"]}
                fontWeight="normal"
                textAlign="center"
                lineHeight="25px"
                margin="auto"
            >
                {moment(startDate).diff(currentTime) > 0
                    ? timeBetween
                    : "0 Sec"}
            </Text>
        </>
    );
};

export default CountDownTimer;
