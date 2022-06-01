import React from "react";
import Slider from "react-slick";
import {Box, Image} from "@chakra-ui/react";



const LMSingleCarousel = ({children ,isPromotion, disableDots=true, autoplaySpeed = 7000})=>{
  const PrevArrow =(props)=>{
    const { className, style, onClick } = props;
     return  (<Box  _before={{content:`""`}}className={className} zIndex={99} left="15px!important"
      onClick={onClick}>
        
          <Image    
     src="/assets/arrow-left.png"
    //  layout="fill"
    width={"25px!important"}
    height={"25px!important"}
     alt="Left"
    
 />
 </Box>)
   } 
   const NextArrow =(props)=>{
    const { className, style, onClick } = props;
    return  (<Box  _before={{content:`""`}} className={className} zIndex={99} right="15px!important"
      onClick={onClick}><Image  
    src="/assets/arrow-right.png"
    width={"25px!important"}
    height={"25px!important"}
    
    alt="Right"
  
/></Box>)
  } ;
    const settings = {
        dots: !disableDots,
        infinite: true,
        arrows:isPromotion?false:true,
        autoplay:true,
        autoplaySpeed: autoplaySpeed,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        cssEase: 'linear',
        slidesToShow:1,
        appendDots: dots => (
          <div
            style={{
              position:"relative"
            }}
          >
            <ul style={{ 'marginTop': "-60px" }}> {dots} </ul>
          </div>
        ),
      
      };
  const promoSettings={
    className: "promoClass",
    centerMode: true,
    infinite: true,
    centerPadding: "22%",
    slidesToShow: 1,
    slideToScroll:1,
    autoplay:true,
    arrow:false,
    autoplaySpeed: autoplaySpeed,
    responsive: [
 
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          arrow:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          arrow:false
        }
      },
      {
        breakpoint: 0,
        settings: {
          centerMode: false,
          arrow:false,
        }
      }
    ]
  }

    return   <Slider {...isPromotion?promoSettings:settings}>{children}</Slider>
}
export default LMSingleCarousel;