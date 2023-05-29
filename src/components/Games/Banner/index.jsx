import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Text, Link, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Slider from "react-slick";
import { AppContext } from "../../../utils/AppContext/index";

const Banner = ({
    children1,
    autoplaySpeed = 2000,
    slider_type,
    executeScroll
}) => {
    const { isMobileDevice } = useContext(AppContext);
    const [currentSlideIndex, setcurrentSlideIndex] = useState(0);
   
    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <Box
                _before={{ content: `""` }}
                className={className}
                onClick={onClick}
            >
                <img
                    src="/assets/designupdate1/arrow-left-selected.png"
                    alt="Left"
                />
            </Box>
        );
    };
    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <Box
                _before={{ content: `""` }}
                className={className}
                onClick={onClick}
            >
                <img
                    src="/assets/designupdate1/arrow-right-selected.png"
                    alt="Right"
                />
            </Box>
        );
    };
    const horizontalSettings = {
        dots: false,
        infinite: true,
        arrows: true,
        cssEase: "linear",
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: autoplaySpeed,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dotsClass: "slick-dots slick-thumb customSlide limited-dots",
        beforeChange: (prev, next) => {
            // here to detect slide change
            setcurrentSlideIndex(next);
        },

        customPaging: (pagi, i) => (
            <Box
                height="5px"
                width={["40px", "90px"]}
                _before={{ width: "100%" }}
                bg={
                    pagi === currentSlideIndex
                        ? "linear-gradient(180deg, #43C8FF 0%, #45E470 100%), #FFFFFF"
                        : "#8E8E8E"
                }
                borderRadius="20px"
                cursor="pointer"
            />
        )
    };


        const imagestyle = {
            margin: "auto",
            width: "100%",
        };
      
        const cricketImageStyle = {
            margin: "auto",
            width: "100%"
        };

        return <Slider {...horizontalSettings}>
        <div className="gameslide">
        {!isMobileDevice ?
            <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
            poster="/assets/videos/GamePosterImage.png">
                <source
                src="/assets/videos/Gamespagebannerfordesktop.mp4"
                type="video/mp4"
                />
            </video>
            : <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
            poster="/assets/videos/GamePosterImageMobile.png">
                <source
                src="/assets/videos/Gamespagebannerformobile.mp4"
                type="video/mp4"
                />
            </video>
        }
            <div className="banner-read-thumb-lg">
            <Box>
                <Flex direction={["column", "column", "column", "row"]}>
                    <Box w={["100%", "100%", "100%", "70%"]}>
                    {!isMobileDevice ? <Box mt={!isMobileDevice ? 26 : 0}>
                            <Text
                            variant="headText"
                            fontSize={[
                                "34px",
                                "34px",
                                "70px",
                            ]}
                            mb={0}
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "30px",
                                "30px",
                                "60px",
                            ]}
                            textShadow="unset"
                            >
                            Join the fun and win big
                            <br />
                            with our exciting games!
                            </Text>

                            <Text
                            color="#FFF !important"
                            fontSize={["14px", "16px", "25px", "1.3em"]}
                            lineHeight={["14px", "18px", "40px"]}
                            fontWeight="normal"
                            width={["100%", "100%", "100%", "50%"]}
                            my="1em"
                            >
                            Get a chance to win amazing prizes
                            </Text>

                            <Button
                            mt={3}
                            mb={3}
                            fontSize={["14px", "14px", "20px"]}
                            padding={["15px", "15px", "25px"]}
                            fontWeight="normal"
                            onClick={() => {
                                executeScroll(1);
                            }}
                            >
                            Play Now
                            </Button>
                        </Box>
                         : 
                         <>
                         <Box pt={"50%"}>
                            <Button
                                mt={3}
                                mb={3}
                                fontSize={["14px", "14px", "20px"]}
                                padding={["15px", "15px", "25px"]}
                                fontWeight="normal"
                                onClick={() => {
                                    executeScroll(1);
                                }}
                                >
                                Play Now
                            </Button>
                        </Box>
                         </>
                         }
                    </Box> 
                   
                </Flex>
                </Box>
            </div>
        </div>
       
    </Slider>;
    

};
export default Banner;
