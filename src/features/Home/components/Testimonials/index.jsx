import React  from "react";

import { Text, Box } from "@chakra-ui/react";
// import { ScrollMenu } from "react-horizontal-scrolling-menu";
// import Slider from "react-slick";
// import AliceCarousel from 'react-alice-carousel';

// import { useTestimonials } from "../../api";
import TestimonialCard from "./TestimonialCard";
import LMMultipleCarousel from "../../../../components/LMCarousel/LMMultipleCarousel"

const Testimonials = (data=[]) => {
  // const { data = [] } = useTestimonials();
    const slides =  data?.data?.length ? data?.data?.map((slide, index) => {

    return <TestimonialCard
      testimonial={slide}
      key={`item-${index}`}
      itemId={`item-${index}`}

    ></TestimonialCard>
  }) : [];

  return (
    <Box mt="40px" ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]}>
      <Text color="white" fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]} mt="20px">
        OUR PLAYERS LOVE US
      </Text>
      <Box mt="40px" >
        {slides?.length > 1 && (
          <LMMultipleCarousel disableDots ={false} type={"testimonial"} slides={slides} />
        )}
      </Box>
    </Box>
  );
};

export default Testimonials;
