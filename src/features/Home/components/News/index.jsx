import { HStack, Text, Tag, TagLabel, Flex, Box } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNews } from "../../api";
import NewsCard from "./NewsCard/index";
import { AppContext } from "../../../../utils/AppContext";

const filters = ["ALL", "BLOGS", "PLAY LISTS"];

const News = () => {
  const [activeFilter, setFilter] = useState(filters[0]);

  const { isMobileDevice } = useContext(AppContext);

  let apiOptions = null;

  if (activeFilter === filters[0]) {
    apiOptions = { filters: { slug: "news" }, populate: "blog_sub_categories.blog_articles.image" };
  } else if (activeFilter === filters[1]) {
    apiOptions = { filters: { slug: "blog" }, populate: "blog_articles.image" };
  } else {
    apiOptions = { filters: { slug: "play-list" }, populate: "blog_articles.image" };
  }

  const { data = [] } = useNews(activeFilter, apiOptions);

  let newsTorender = [];

  if (data.length) {
    if (activeFilter === filters[0]) {
      const arr = data[0].blog_sub_categories.data;
      newsTorender = arr.reduce((acc, item) => [...acc, ...item.blog_articles.data], []);
    } else {
      newsTorender = data[0].blog_articles.data;
    }
  }

  return (
    <Box m="20px">
      <Text color="white" fontFamily="Blanch" fontSize="32px">
        Featured News
      </Text>

      <HStack spacing={10} justify="center" mt="20px">
        {filters.map((item) => (
          <Tag
            size="lg"
            cursor="pointer"
            key={item}
            onClick={() => setFilter(item)}
            borderRadius="full"
            variant="solid"
            fontFamily="Blanch"
            background={activeFilter === item ? "primary" : "#717171"}
            color={activeFilter === item ? "#232323" : "white"}
          >
            <TagLabel>{item}</TagLabel>
          </Tag>
        ))}
      </HStack>

      {isMobileDevice ? (
        <div style={{ whiteSpace: "nowrap", overflow: "auto", marginTop: "30px" }}>
          {newsTorender.map((news, index) => (
            <NewsCard key={`news-${index}`} news={news} index={index} />
          ))}
        </div>
      ) : (
        <Flex justify="center" mt="30px">
          <Grid
            w="90%"
            templateRows={`repeat(${Math.min(2, newsTorender % 4)}, 1fr)`}
            templateColumns="repeat(4, 1fr)"
            gridGap={20}
          >
            {newsTorender.map((news, index) => (
              <GridItem colSpan={1} key={`news-${index}`}>
                <NewsCard news={news} index={index} />
              </GridItem>
            ))}
          </Grid>
        </Flex>
      )}
    </Box>
  );
};

export default News;
