import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Slider from "react-slick";

const Banner = ({
    children1,
    autoplaySpeed = 2000,
    slider_type
}) => {
    
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
        <div>
            <a href="/games/hoop-star">
            <img 
                src="/assets/skillgame/banner/1.gif"
                alt="HoopStar"
                style={imagestyle}
             />
             </a>
        </div>
        <div>
            <a href="/games/scott-flick-american-football">
            <img
                src="/assets/skillgame/banner/3.png"
                alt="FlickAmericanFootball"
                style={imagestyle}
             />
             </a>
        </div>
        <div>
            <a href="/games/flick-soccer">
            <img 
                src="/assets/skillgame/banner/2.gif"
                alt="FlickSoccer"
                style={imagestyle}
             />
             </a>
        </div>
    </Slider>;
    

};
export default Banner;