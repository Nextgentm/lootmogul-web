import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";
import SEOContainer from "../../SEOContainer";
import { useRouter } from "next/router";
import NftsCategories from "./NftsCategories";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "./NftCard";
import {
  LeftArrow,
  RightArrow,
} from "../../../components/ContentNavigator/arrows";


const Nfts = ({ data, selectedCategory, banner, newNfts, isNewest }) => {
  const router = useRouter();
  const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
  const [sortBy, setSortBy] = useState("Sort By");
  const [displayData, setDisplayData] = useState(data);
  const [selCategoriesData, setSelCategoriesData] = useState(data);

  const defaultCategories = "All";
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const ref = React.useRef();

  const lazyRootNew = React.useRef(null);

  const { callAuthService } = useContext(AppContext);

  if (router.query.access_token) {
    if (router.query.provider == "facebook") {
      callAuthService("facebook", router.query.access_token);
    } else {
      callAuthService("google", router.query.access_token);
    }
  }

  useEffect(async () => {
    if (data && data?.length > 0 && options.length == 0) {
      options.push(defaultCategories);
      data.map((cat) => {
        options.push(cat.name);
      });
      setCategories(defaultCategories);
      setDisplayData(data);
    }
  }, [data]);

  const nftSelectCategory = (e) => {
    const newCategory = e.target?.value || e;
    if (newCategory === defaultCategories.toString().toLowerCase()) {
      router.push(
        {
          pathname: "/nfts",
        },
        undefined,
        { shallow: true }
      );
    } else if (displayData) {
      let selData = displayData.filter(
        (data) => data.name.toLowerCase() === newCategory
      );

      router.push(
        {
          pathname: "/nfts/" + selData[0].slug,
        },
        undefined,
        { shallow: true }
      );
    }
    setCategories(newCategory);
  };
  useEffect(() => {
    if (data && selectedCategory) {
      let selData = data.filter((item) => item.slug === selectedCategory);
      setCategories(selData[0].name.toLowerCase());
      setSelCategoriesData(selData);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (displayData && categories) {
      setSortBy("Sort by");
      if (categories.toLowerCase() !== defaultCategories.toLowerCase()) {
        const selData = displayData.filter(
          (cat) => cat.name.toLowerCase() === categories.toLowerCase()
        );

        setSelCategoriesData(selData);
      } else {
        setSelCategoriesData(displayData);
      }
    }
  }, [categories, displayData]);

  useEffect(() => {
    if (selectedCategory) return;
    if (sortBy.toLowerCase() === "alphabetical") {
      const newCatData = selCategoriesData?.map((cat) => {
        cat.nfts?.data?.sort((a, b) => (a.name > b.name ? 1 : -1));
        return cat;
      });
      setSelCategoriesData(newCatData);
    } else {
      const newCatData = selCategoriesData?.map((cat) => {
        cat.nfts?.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
        return cat;
      });
      setSelCategoriesData(newCatData);
    }
  }, [sortBy]);
  const getBannerImage = () => {
    if (selectedCategory && selCategoriesData) {
      if (selCategoriesData[0] && selCategoriesData[0].banner?.data) {
        return !isTabletOrDesktop
          ? selCategoriesData[0].banner?.data[1].url
          : selCategoriesData[0].banner?.data[0].url;
      } else {
        return null;
      }
    } else if (
      banner &&
      (banner || categories.toLowerCase() === defaultCategories.toLowerCase())
    ) {
      return !isTabletOrDesktop ? banner[1]?.url : banner[0]?.url;
    } else {
      return null;
    }
  };
  const isToShowAll = () => {
    return (
      selectedCategory ||
      (categories &&
        categories.toLowerCase() !== defaultCategories.toLowerCase())
    );
  };
  return (
    <Box mx={["6vw"]}>
      {selectedCategory && selCategoriesData && selCategoriesData[0] && (
        <SEOContainer
          seoData={
            selCategoriesData[0]?.seo
              ? selCategoriesData[0]?.seo
              : selCategoriesData[0]
          }
          content={selCategoriesData[0]}
        />
      )}
      {router.pathname === "/nfts/[id]" ? (
        

        <Box mx={"-9vw"} order="2" bgSize="cover" textAlign={"center"} pb={12}>
          {getBannerImage() && (
            <Box
              ml={["20px", "20px", "20px", "60px"]}
              mr={["20px", "20px", "20px", "60px"]}
            >
              <Flex position="relative" w="100%">
                {isMobileDevice ? (
                  <Image
                    m={"auto"}
                    alt={`nft-banner`}
                    src={getBannerImage()}
                    className="custom-img"
                    layout="fill"
                    w="100%"
                    h="600px"
                  />
                ) : (
                  <Image
                    m={"auto"}
                    alt={`nft-banner`}
                    src={getBannerImage()}
                    className="custom-img"
                    layout="fill"
                    w="100%"
                    h="600px"
                  />
                )}
              </Flex>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box>
            <SimpleGrid
              direction={"column-reverse"}
              columns={[1, 1, 1, 2]}
              spacing={10}
              pt={[10, 10, 10, 20, 20]}
              pb={12}
            >
              <Box order="1">
                <Text
                  color="white"
                  fontSize={["2rem", "3.2em", "3.5rem", "4rem", "4rem"]}
                  fontFamily="CNN"
                  variant="headText"
                >
                  Buy and Trade <br />
                  Your favorite <br />
                  Influencers NFT
                </Text>

                <Text
                  color="white"
                  fontSize={["1rem", "1.2rem", "1.2rem", "1.2em", "1.5rem"]}
                  fontWeight="normal"
                  mt="1rem"
                  width={"90%"}
                >
                  Become a virtual landlord to some of the largest projects in
                  crypto
                </Text>
              </Box>
              <Box
                mt={["20px", "20px", "0px"]}
                order="2"
                bgSize="cover"
                textAlign={"center"}
              >
                {getBannerImage() && (
                  <Flex>
                    <Image
                      m={"auto"}
                      alt={`nft-banner`}
                      src={getBannerImage()}
                      className="custom-img"
                      layout="fill"
                      width={"100%"}
                      height={"400px"}
                    />
                  </Flex>
                )}
              </Box>
            </SimpleGrid>
          </Box>
        </>
      )}

      <Box mt="30px" mb="30px">
        {newNfts?.length && (
          <>
            <Flex
              justify={["center", "center", "space-between"]}
              mt="20px"
              align="center"
              mb="20px"
              textAlign={"center"}
            >
              <Text
                color="white"
                fontFamily="Blanch"
                fontSize={["4rem", "4rem", "4rem", "5rem", "5rem"]}
              >
                NEWEST NFTS
              </Text>
            </Flex>

            <Box px={["1rem", "0rem"]}>
              <ScrollMenu
                className="no-scrollbar"
                apiRef={ref}
                ref={lazyRootNew}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
              >
                {newNfts.map((item, index) => (
                  <NftCard
                    itemId={`nftcard-${index}`}
                    key={`nftcard-${index}`}
                    slug={item.slug}
                    showInfo={true}
                    nft={item}
                    lazyRoot={lazyRootNew}
                    defaultInView={isMobileDevice ? index < 2 : index < 4}
                  />
                ))}
              </ScrollMenu>
            </Box>
          </>
        )}

        {!selectedCategory ? (
          <Center>
            <Text
              color="white"
              fontSize={["3em", "4em"]}
              fontFamily="Blanch"
              mt={6}
            >
              EXPLORE NFT'S
            </Text>
          </Center>
        ) : (
          <Center>
            <Text
              color="white"
              fontSize={["3em", "4em"]}
              fontFamily="Blanch"
              mt={6}
            >
              {selCategoriesData?.[0].name}
            </Text>
          </Center>
        )}
        {isNewest && (
          <Flex
            justify={"flex-end"}
            mt="20px"
            align="center"
            mb="20px"
            textAlign={"center"}
          >
            {!isMobileDevice && (
              <Flex
                alignItems="center"
                cursor="pointer"
                onClick={() =>
                  router.push({
                    pathname: "/nfts",
                  })
                }
              >
                <Text
                  color="white"
                  fontFamily="Blanch"
                  fontSize={["1em", "1em", "1.5em", "2em", "2em"]}
                >
                  VIEW ALL
                </Text>
                <Image alt="" src="/assets/rightArrow.png" ml="0.5em" />
              </Flex>
            )}
          </Flex>
        )}
        {!isNewest && (
          <Flex
            mt={10}
            ml={["10px", "20px"]}
            flexWrap="wrap"
            justifyContent={["center", "center", "space-between"]}
          >
            {displayData?.map((nfts, index) => (
              <Box
                w={["100%", "100%", 200, 200, 200]}
                mx={["10px", "5px", "5px", "5px", "20px"]}
                my={["10px", "5px", "5px", "5px", "20px"]}
              >
                <Tooltip label={nfts.name}>
                  <Button
                    w="100%"
                    mt={2}
                    variant={"segment"}
                    fontSize={[
                      "20px !important",
                      "20px !important",
                      "17px !important",
                    ]}
                    onClick={() => {
                      nftSelectCategory(nfts.name.toLowerCase());
                    }}
                  >
                    {" "}
                    <Text textOverflow="ellipsis" overflow="hidden">
                      {nfts.name.substr(0, nfts.name.indexOf(" "))}
                    </Text>
                  </Button>
                </Tooltip>
              </Box>
            ))}
          </Flex>
        )}
        <Flex m="auto" w="100%" flexDir={"column"} px="1rem">
          {selCategoriesData?.map((nfts, index) => (
            <NftsCategories
              isMobileDevice={isMobileDevice}
              key={`nfts-${index}`}
              NFTS={nfts}
              isSelectedCat={isToShowAll()}
              index={index}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Nfts;
