import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CollectibleCard = dynamic(() => import("./CollectibleCard"));
import {
  Text,
  Flex,
  Box,
  Grid,
  VStack,
  Button,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useContext } from "react";

import moment from "moment";
import {
  LeftArrow,
  RightArrow,
} from "../../components/ContentNavigator/arrows";
import OverViewCard from "./OverViewCard";
import AppContext from "../../utils/AppContext";

const CollectibleView = ({ NFTS, index, nftSelectCategory, isSubPage }) => {
  const refColl = useRef();
  const { isMobileDevice } = useContext(AppContext);
  const lazyRoot = useRef(null);
  const lazyRootColl = useRef(null);
  const [displayCards, setDisplayCards] = useState([]);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    if (text) {
      return (
        <p className="text" style={{
          color: "white", fontSize: "18px", fontFamily: "Sora"
        }}>
          {isReadMore ? text?.slice(0, 50) : text}
          <span onClick={toggleReadMore} className="read-or-hide" style={{
            color: "#e00493", fontSize: "18px", fontFamily: "Sora"
          }}>
            {isReadMore ? "...Read more" : " Show less"}
          </span>
        </p>
      );
    }
    return null;
  
  };
  
  const OverViewMode = () => {
    return (
      <>
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(12, 1fr)",
                "repeat(12, 1fr)",
              ]}
              w={"100%"}
              my={[10, 10, 10, 10, 20]}
            >
              <GridItem colSpan={5} order={[2, 2, 2, index % 2 == 0 ? 1 : 3]}>
                <Box
                  pl={["0", "0", "20%"]}
                  pr="10%"
                  w="100%"
                  mt={[0, 0, 0, 20]}
                >
                  <Box
                    w="100%"
                    h={"1px"}
                    bg="#e3e3e3"
                    display={["none", "none", "none", "block"]}
                  />
                  <VStack align="left">
                    <Text
                      color="white"
                      fontFamily="Sora"
                      fontSize={["24px", "27px"]}
                      mt={[1, 1, 1, 5]}
                      fontWeight="bold"
                    >
                      {NFTS.name}
                    </Text>
                    <Flex alignItems="center">
                      <Text
                        color="white"
                        fontFamily="Sora"
                        fontSize={["17px", "20px"]}
                        fontWeight="normal"
                      >
                        Released on :
                      </Text>
                      <Text
                        color="white"
                        fontFamily="Sora"
                        fontSize={["12px", "15px"]}
                        fontWeight="normal"
                        ml={["6px", "6px", "6px", "0.5em", "1em"]}
                      >
                        {" "}
                        {moment(NFTS.createdAt).format("MMMM Do, YYYY")}
                      </Text>
                    </Flex>
                    <Text
                      color="white"
                      fontFamily="Sora"
                      fontSize={["18px", "20px"]}
                      mt="30px!important"
                    >
                      <ReadMore
                        children={NFTS.description}></ReadMore>
                    </Text>
                    <Button
                      mt={[
                        "2em !important",
                        "2em !important",
                        "3em !important",
                        "3em !important",
                        "3em !important",
                      ]}
                      fontSize={["1rem", "1.2rem"]}
                      width={["250px"]}
                      onClick={() => {
                        nftSelectCategory(NFTS.name);
                      }}
                    >
                      VIEW COLLECTION
                    </Button>
                  </VStack>
                </Box>
              </GridItem>
  
              <GridItem order={2} colSpan={1} mr="-2rem">
                <Box
                  w="1px"
                  h={"100%"}
                  bg="#e3e3e3"
                  display={["none", "none", "none", "block"]}
                />
              </GridItem>
  
              <GridItem order={[1, 1, 1, index % 2 == 0 ? 3 : 1]} colSpan={6}>
                <Center>
                  <Box
                    width={["100%", "100%", "420px", "450px", "450px"]}
                    mx={[0, 0, 0, "-40px"]}
                  >
                    <ScrollMenu
                      // options={{
                      //   ratio: 0.9,
                      //   rootMargin: "5px",
                      //   threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
                      // }}
                      className="no-scrollbar"
                      apiRef={refColl}
                      ref={lazyRootColl}
                      LeftArrow={LeftArrow}
                      RightArrow={RightArrow}
                    >
                      {displayCards?.sort((a, b) => a.priority - b.priority).map((item, index) => (
                        <OverViewCard
                          // style={{
                          //   mr: "30px",
                          //   mt: "10px",
                          // }}
                          itemId={`nftcardColl-${index}`}
                          key={`nftcardColl-${index}`}
                          slug={item.slug}
                          showInfo={false}
                          nft={item?.nft_kred?.data}
                          lazyRoot={lazyRootColl}
                          defaultInView={isMobileDevice ? index < 2 : index < 5}
                          cardWidth={["84vw", "82vw", "370px", "370px"]}
                        />
                      ))}
                    </ScrollMenu>
                  </Box>
                </Center>
              </GridItem>
            </Grid>
          </>
    )
  }
  
  const CategoryViewMode = () => {
    return (
  <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            rowGap={10}
            mt="40px"
            mx="auto"
            gap={6}
            width="100%"
            justifyContent="center"
          >
            {displayCards?.sort((a, b) => a.priority - b.priority).map((item, index) => (
              <CollectibleCard
                itemId={`nftcard-${index}`}
                key={`nftcard-${index}`}
                slug={item.slug}
                showInfo={true}
                nft={item?.nft_kred?.data}
                defaultInView={isMobileDevice ? index < 2 : index < 5}
                lazyRoot={lazyRoot}
              />
            ))}
          </Grid>
    )
  }

  useEffect(() => {
    let allNfts = NFTS.nftSet?.sort((a, b) => a.priority - b.priority);
    setDisplayCards(allNfts);
  }, [NFTS?.nftSet]);

  return (
    <>
      {isSubPage ? (
        <CategoryViewMode></CategoryViewMode>
      ) : (
        <OverViewMode></OverViewMode>
      )}
    </>
  );
};

export default CollectibleView;
