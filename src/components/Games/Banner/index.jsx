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
                <Image
                    src="/assets/designupdate1/arrow-left-selected.png"
                    alt="Left"
                    width={45}
                        height={45}
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
                <Image
                    src="/assets/designupdate1/arrow-right-selected.png"
                    alt="Right"
                    width={45}
                        height={45}
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
        <div className="gameslide" 
            onClick={() => {
                executeScroll(1);
            }}
        >
        {!isMobileDevice ?
            /*<video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
            poster="/assets/videos/GamePosterImage.png">
                <source
                src="https://lootmogul.s3.us-west-2.amazonaws.com/Gamespagebannerfordesktop.mp4"
                type="video/mp4"
                />
            </video>
            : <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
            poster="/assets/videos/GamePosterImageMobile.png">
                <source
                src="https://lootmogul.s3.us-west-2.amazonaws.com/Gamespagebannerformobile.mp4"
                type="video/mp4"
                />
            </video>*/
            
            <Image
                objectFit="cover"
                alt="Image"
                layout="fill"
                //w="350px"
                src="/assets/banner_dsg_website_HD.jpg"
            /> :
            <Image
                objectFit="cover"
                alt="Image"
                layout="fill"
                w="350px"
                src="/assets/banner_dsg_website_2_mobile.jpg"
            />
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
                            mt="5%"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "30px",
                                "30px",
                                "60px",
                            ]}
                            textShadow="unset"
                            >
                           Experience AI Gaming
 
                          
                            </Text>

                            <Text
                            color="#FFF !important"
                            fontSize={["14px", "16px", "25px", "1.3em"]}
                            lineHeight={["14px", "18px", "40px"]}
                            fontWeight="normal"
                            width={["100%", "100%", "100%", "50%"]}
                            my="1em"
                            >
                          Join to play with our blockchain games and win 
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
