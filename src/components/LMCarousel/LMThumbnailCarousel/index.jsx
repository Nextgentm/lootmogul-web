import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Slider from "react-slick";

const LMThumbnailCarousel = ({
    children1,
    autoplaySpeed = 2000
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
                    src="/assets/arrow-left.png"
                    //  layout="fill"
                    width={20}
                    height={20}
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
                <Image
                    src="/assets/arrow-right.png"
                    width={20}
                    height={20}
                    alt="Right"
                />
            </Box>
        );
    };
    const horizontalSettings = {
        dots: true,

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

    return <Slider {...horizontalSettings}>{children1}</Slider>;
};
export default LMThumbnailCarousel;
