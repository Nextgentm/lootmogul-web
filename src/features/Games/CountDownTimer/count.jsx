import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text, Button, Flex } from "@chakra-ui/react";

const CountDownTimer = ({
    startDate,
    meetingLink,
    cancelLink,
    rescheduleLink,
    onCancelClick,
    onReScheduleClick,
    storyId,
    profile,
    isRated,
    creator
}) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const timeBetween = moment.duration(currentTime);
    const today = moment();
    const isAtLeastADayAgo = today.subtract(startDate) > 1;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Text
                display="flex"
                fontSize={["20px", "20px"]}
                mt="3%!important"
                fontWeight="normal"
                textAlign="center"
                lineHeight="25px"
                fontFamily="cabin"
                margin="auto"
            >
                {timeBetween.days() > 0 && (
                    <Text>{timeBetween.days()} days&nbsp; </Text>
                )}
                {timeBetween.days() >= 0 && timeBetween.hours() > 0 && (
                    <Text>{timeBetween.hours()} hrs&nbsp;</Text>
                )}
                {timeBetween.days() >= 0 &&
                    timeBetween.hours() >= 0 &&
                    timeBetween.minutes() > 0 && (
                        <Text>{timeBetween.minutes()} mins&nbsp; </Text>
                    )}
            </Text>

            {!isAtLeastADayAgo && (
                <>
                    <Button
                        mt="6%"
                        ml="auto"
                        mr="auto"
                        width={"50%"}
                        disabled={
                            isAtLeastADayAgo ||
                            !(
                                timeBetween.days() <= 0 &&
                                timeBetween.days() <= 0 &&
                                timeBetween.minutes() <= 0
                            )
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isAtLeastADayAgo) return;
                            window.open(meetingLink, "_blank");
                        }}
                    >
                        Start Now
                    </Button>
                    <Flex
                        mt="3%!important"
                        justifyContent={"center"}
                        textAlign={"center"}
                    >
                        <Text
                            textAlign="center"
                            fontSize="16"
                            fontWeight="bold"
                            lineHeight="18px"
                            textDecor="underline"
                            fontFamily="cabin"
                            cursor="pointer"
                            color="primary_1"
                            mt="3%"
                            mr="5%"
                            mb={["6%", "2%"]}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isAtLeastADayAgo) return;
                                if (cancelLink) onReScheduleClick();
                            }}
                        >
                            Reschedule
                        </Text>
                        <Text
                            textAlign="center"
                            fontSize="16"
                            fontWeight="bold"
                            lineHeight="18px"
                            textDecor="underline"
                            fontFamily="cabin"
                            cursor="pointer"
                            color="primary_1"
                            mt="3%"
                            mb="2%"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isAtLeastADayAgo) return;
                                if (rescheduleLink) onCancelClick();
                            }}
                        >
                            Cancel
                        </Text>
                    </Flex>
                </>
            )}
        </>
    );
};

export default CountDownTimer;