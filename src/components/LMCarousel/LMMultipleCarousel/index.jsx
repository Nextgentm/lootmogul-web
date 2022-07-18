import React from "react";
import Slider from "react-slick";

const LMMultipleCarousel = ({ slides, type, disableDots, infinite = true }) => {
  const settings = {
    dots: disableDots ? false : true,
    infinite: infinite,
    arrows: false,
    slidesToShow: type === "testimonial" ? 3 : type === "asseen" ? 6 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: type === "testimonial" ? 5000 : 3000,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: type === "testimonial" ? 2 : type === "asseen" ? 4 : 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: type === "testimonial" ? 5000 : 3000

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: type === "testimonial" ? 2 : type === "asseen" ? 4 : 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: type === "testimonial" ? 5000 : 3000
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: type === "testimonial" ? 1 : type === "asseen" ? 2 : 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: type === "testimonial" ? 5000 : 3000
        }
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: type === "testimonial" ? 1 : type === "asseen" ? 2 : 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: type === "testimonial" ? 5000 : 3000,
          centeredMode: true
        }
      }
    ]
  };
  return <Slider {...settings}>{slides}</Slider>
}
export default LMMultipleCarousel;