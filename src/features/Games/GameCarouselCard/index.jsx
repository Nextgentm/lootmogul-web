import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
const GameCarouselCard = ({ contestmaster }) => {
  const imgUrl = contestmaster?.icon?.data?.url;

  return (
    <Box m="auto" mb={["8%", "5%"]} textAlign={"center"}>
      {imgUrl && (
        <Image
          m="auto"
          width="280px"
          height="280px"
          alt="bg"
          src={imgUrl}
        ></Image>
      )}
    </Box>
  );
};

export default GameCarouselCard;
