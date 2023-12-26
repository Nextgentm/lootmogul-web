import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Slider from "react-slick";

const LMThumbnailCarousel = ({
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
                <Image
                    src="/assets/skillgame/left-arrow.png"
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
                    src="/assets/skillgame/right-arrow.png"
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
        autoplay: true,
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

    if(slider_type == 'skillgame'){
        const imagestyle = {
            margin: "25px auto",
        };
      
        const cricketImageStyle = {
            margin: "25px auto",
            padding: "30px"
        };

        return <Slider {...horizontalSettings}>
        <div>
            <a href="/games/hoop-star">
            <Image 
                src="/assets/skillgame/HoopStar.png"
                alt="HoopStar"
                style={imagestyle}
                width={45}
                height={45}
             />
             </a>
        </div>
        <div>
            <a href="/games/scott-flick-american-football">
            <Image
                src="/assets/skillgame/FlickAmericanFootball.png"
                alt="FlickAmericanFootball"
                style={imagestyle}
                width={45}
                height={45}
             />
             </a>
        </div>
        <div>
            <a href="/games/flick-soccer">
            <Image 
                src="/assets/skillgame/FlickSoccer.png"
                alt="FlickSoccer"
                style={imagestyle}
                width={45}
                height={45}
             />
             </a>
        </div>
        <div>
            <a href="/games/cool-archer">
            <Image 
                src="/assets/skillgame/CoolArcher.png"
                alt="CoolArcher"
                style={imagestyle}
                width={45}
                height={45}
             />
             </a>
        </div>
        <div>
            <a href="/games/pro-cricket-champion">
            <Image 
                src="/assets/skillgame/Pro-Cricket_400.png"
                alt="Pro-Cricket"
                style={cricketImageStyle}
                width={45}
                height={45}
             />
             </a>
        </div>
    </Slider>;
    }
    else{
        return <Slider {...horizontalSettings}>{children1}</Slider>;
    }

};
export default LMThumbnailCarousel;
