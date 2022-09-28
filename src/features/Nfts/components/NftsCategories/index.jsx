import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const NftCard = dynamic(() => import("../NftCard"));
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
import { AppContext } from "../../../../utils/AppContext/index";
import moment from "moment";
import {
  LeftArrow,
  RightArrow,
} from "../../../../components/ContentNavigator/arrows";
import NftCardInCollection from "./NftCardInCollection";

const NftsCategories = ({ NFTS, isSelectedCat, index }) => {
  const ref = useRef();
  const router = useRouter();
  const { isMobileDevice } = useContext(AppContext);
  const lazyRoot = useRef(null);

  const [displayCards, setDisplayCards] = useState([]);

  useEffect(() => {
    const allNfts = NFTS.nftSet?.sort((a, b) => a.priority - b.priority);
    {
      setDisplayCards(allNfts);
    }
  }, [NFTS]);
  const handleClick = (e) => {
    router.push({
      pathname: "/nfts/[id]",
      query: { id: NFTS.slug },
    });
  };

  return (
    <>
     
      {router.pathname === "/nfts/[id]" ||
      router.pathname === "/nfts/newest" ? (
       
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
            "repeat(4, 1fr)",
          ]}
          rowGap={10}
          mt="10px"
          mx="auto"
          gap={6}
          width="100%"
          justifyContent="center"
        >
         
          {displayCards?.map((item, index) => (
            <NftCard
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
      ) : (
        <>
          {isSelectedCat ? (
            <Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
              {isMobileDevice ? (
                <ScrollMenu
                  className="no-scrollbar"
                  apiRef={ref}
                  ref={lazyRoot || ref}
                  LeftArrow={LeftArrow}
                  RightArrow={RightArrow}
                >
                  
                  {displayCards.map((item, index) => (
                    <NftCard
                      itemId={`nftcard-${index}`}
                      key={`nftcard-${index}`}
                      slug={item.slug}
                      showInfo={true}
                      nft={item?.nft_kred?.data}
                      defaultInView={isMobileDevice ? index < 2 : index < 5}
                      lazyRoot={lazyRoot}
                    />
                  ))}
                </ScrollMenu>
              ) : (
                <Grid
                  rowGap={10}
                  mt="10px"
                  templateColumns="repeat(4, 1fr)"
                  gap={6}
                  width="100%"
                >
                  {displayCards.map((item, index) => (
                    <NftCard
                      itemId={`nftcard-${index}`}
                      key={`nftcard-${index}`}
                      slug={item.slug}
                      showInfo={true}
                      nft={item?.nft_kred?.data}
                      lazyRoot={lazyRoot}
                    />
                  ))}
                </Grid>
              )}
            </Box>
          ) : (
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(12, 1fr)",
                "repeat(12, 1fr)",
              ]}
              w={"100%"}
              mt={["2em", "2em", "2em", "3em", "5em"]}
            >
              <GridItem colSpan={5} order={[2, 2, 2, index % 2 == 0 ? 1 : 3]}>
                <Box
                  pl={["0", "0", "20%"]}
                  pr="10%"
                  w="100%"
                  mt={["1em", "5em"]}
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
                      mt={["0px", "20px"]}
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
                      fontSize={["18px","20px"]}
                      mt="30px!important"
                    >
                      {NFTS.description}
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
                        handleClick();
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
                    width={["100%", "100%", "480px", "480px"]}
                    mx={["0px", "0px", "-40px"]}
                  >
                    <ScrollMenu
                      options={{
                        ratio: 0.9,
                        rootMargin: "5px",
                        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
                      }}
                      apiRef={ref}
                      ref={lazyRoot}
                      LeftArrow={LeftArrow}
                      RightArrow={RightArrow}
                    >
                      {displayCards.map((item, index) => (
                   
                        <NftCardInCollection
                          style={{
                            mr: "30px",
                            mt: "10px",
                          }}
                          itemId={`nftcard-${index}`}
                          key={`nftcard-${index}`}
                          slug={item.slug}
                          showInfo={false}
                          nft={item?.nft_kred?.data}
                          lazyRoot={lazyRoot}
                          defaultInView={isMobileDevice ? index < 2 : index < 5}
                        />
                      ))}
                    </ScrollMenu>
                  </Box>
                </Center>
              </GridItem>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default NftsCategories;
