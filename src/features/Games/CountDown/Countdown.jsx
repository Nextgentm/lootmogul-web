import React, { Component } from "react";
import { Flex, Text } from "@chakra-ui/react";

class Countdown extends Component {
    state = {
        deadline: "Jun, 8, 2022",
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0"
    };

    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());
        if (time < 0) {
            console.log("Date passed");
        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            const days = Math.floor(time / (1000 * 60 * 60 * 24));

            this.setState({
                days,
                hours,
                minutes,
                seconds
            });
        }
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.state.deadline), 1000);
    }

    render() {
        return (

            <Flex fontSize={"40px"} marginRight={"14px"} paddingRight="49px" display={"flex"} color="white">
                <Text background={"red"} fontSize="25px" padding={"10px"} display="inline-flex" textTransform={"uppercase"} >
                    Contest Starts in: </Text>
                {this.state.days}<Text background={"#ff4800"} fontSize="25px" padding={"10px"} display="inline-flex" textTransform={"uppercase"} paddingLeft={"7px"}>Days </Text>

                {this.state.hours}<Text background={"#ff4800"} fontSize="25px" padding={"10px"} display="inline-flex" textTransform={"uppercase"} paddingLeft={"7px"} >Hours</Text>

                {this.state.minutes} <Text background={"#ff4800"} fontSize="25px" padding={"10px"} display="inline-flex" textTransform={"uppercase"} paddingLeft={"7px"}>Minutes</Text>

                {this.state.seconds}<Text background={"#ff4800"} fontSize="25px" padding={"10px"} display="inline-flex" textTransform={"uppercase"} paddingLeft={"7px"}>Secs</Text>

            </Flex>
        );
    }
}

export default Countdown;