import { Box, Text } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../../utils/medias";
import Image from "next/image";

const NewsCard = ({ news, index }) => {
  return (
    <Box w={["80%", "100%"]} display={["inline-block", "block"]} mr={["20px", 0]} ml={["20px", 0]}>
      <Box w="100%" h="230px" cursor="pointer" position="relative">
        <Image
          key={`news-${index}`}
          alt={`news-${index}`}
          src={getStrapiMedia(news.image?.data?.url)}
          layout='fill'

        />
      </Box>
      <Text fontFamily="Sora" fontSize="16px" mt="16px" color="#C7C7C7" w="100%" noOfLines={1}>
        {news.title}
      </Text>
      <Text fontFamily="Sora" fontSize="12px" color="#C7C7C7" mt="4px" noOfLines={2}>
        {news.description}
      </Text>
    </Box>
  );
};

export default NewsCard;
