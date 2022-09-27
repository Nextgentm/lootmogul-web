import React, { useState } from "react";

import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    Spacer,
    Text,
    Image
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "../../../lotties/spinWin.json";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Wheel = dynamic(
    () => import("react-custom-roulette").then((mod) => mod.Wheel),
    { ssr: false }
);

const Spin = ({
    data,
    handleClaimClick,
    prizeNumber,
    spinTimeRemaining,
    spinTimeRemainingFormat,
    rewardType,
    modalClose
}) => {
    const [isSpin, setSpin] = React.useState(false);
    const [isSpinning, setIsSpinning] = React.useState(null);
    const [ani, setAni] = useState(true);
    const [btn, setBtn] = useState(true);

    const router = useRouter();
    const wheelData = data.map((ele, index) => {
        return { option: ele };
    });

    const handleSpinClick = () => {
        setSpin(true);
        setIsSpinning(true);
        setAni(true);
        setBtn(false);
    };
    const defaultOptions = {
        loop: false,
        autoplay: true,

        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Stack>
            <Flex direction="column" alignItems="center">
                <Flex w="65%" ml="auto" mt="4%">
                    {" "}
                    <Heading fontSize={32} mr="4%" color={"secondary"}>
                        Spin &amp; win prizes
                    </Heading>
                    <Image
                        borderRadius="full"
                        boxSize={["20px", "25px"]}
                        src={`/assets/info-icon.png`}
                        alt="info"
                        cursor={"pointer"}
                        zIndex={999}
                        onClick={(e) => {
                            e.preventDefault();
                            window.open("/spin-terms", "_blank");
                        }}
                    />
                </Flex>
                <Flex w="93%" mt="-30px" mb="3">
                    <Spacer />
                    <Image
                        borderRadius="full"
                        boxSize={["25px", "30px"]}
                        src={`/assets/close.png`}
                        alt="info"
                        onClick={modalClose}
                    />
                </Flex>
                <Box pos="absolute" zIndex={10}>
                    {!ani && (
                        <Lottie
                            options={defaultOptions}
                            height="100%"
                            width="100%"
                            background="transparent"
                        />
                    )}
                </Box>
                <Box pos="relative">
                    <Box
                        pos="absolute"
                        zIndex={9}
                        width="75%"
                        top="17%"
                        left="12%"
                    >
                        <Image alt="star" src="/assets/star.png" />
                    </Box>

                    <Wheel
                        mustStartSpinning={isSpin}
                        prizeNumber={prizeNumber}
                        data={wheelData}
                        backgroundColors={[
                            "#86C86E",
                            "#7D7E7E",
                            "#EA3F37",
                            "#EE6A34",
                            "#F8C332",
                            "#5EC7F2",
                            " #E44F9D",
                            " #6F5FAA"
                        ]}
                        textColors={["#ffffff"]}
                        outerBorderColor={"#180A0A"}
                        fontSize={13}
                        textDistance={55}
                        outerBorderWidth={20}
                        radiusLineWidth={0}
                        innerBorderWidth={25}
                        innerBorderColor={"#1D1D1D"}
                        onStopSpinning={() => {
                            setSpin(false);
                            setIsSpinning(false);
                            if (rewardType != "none") setAni(false);
                            setBtn(false);
                            handleClaimClick();
                        }}
                    />
                </Box>
            </Flex>
            <Flex justifyContent="center" mt="3">
                {spinTimeRemaining == 0 && btn ? (
                    <Button
                        variant="sliderBtn"
                        zIndex={1000}
                        onClick={() => {
                            handleSpinClick();
                        }}
                        mb="5"
                    >
                        Tap to Spin
                    </Button>
                ) : (
                    <Text color={"secondary"} mb={8}>
                        {spinTimeRemaining > 0 ? (
                            spinTimeRemainingFormat
                        ) : isSpinning ? (
                            "please wait..."
                        ) : (
                            <Heading fontSize={32}>{data[prizeNumber]}</Heading>
                        )}
                    </Text>
                )}
            </Flex>
        </Stack>
    );
};
export default Spin;
