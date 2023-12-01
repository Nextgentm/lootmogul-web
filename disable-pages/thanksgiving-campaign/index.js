import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import GamesComponent from "../../src/features/Games/index";
import MultipleLoggedInUser from "../../src/components/MultipleLoggedInUser";

import Banner from "../../src/components/Web3Games/Banner";
import TradingGame from "../../src/components/Web3Games/TradingGame";
import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";
import CustomBlockChainGame from "../../src/components/Web3Games/CustomBlockChainGame";
import { Box, Flex, Image, Text, Button, VStack, Link, ListItem, UnorderedList, } from '@chakra-ui/react'

const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Web3 Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:process.env.NEXT_PUBLIC_SITE_URL+"/web3-games"
};

export default function GamesPage({
  data,
  banners = [],
  contestSectionsData,
  contestSectionsDataTrivia,
  campaignsSectionsResData,
  seoData,
}) {
  //console.log(data);
  
  return (
    <>
      
      <SEOContainer seoData={seoData?seoData[0]?.sharedSeo:defaultSEOData}/> 
        <Banner bannerData={campaignsSectionsResData?.data[0] || []}/>
        <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
            pb="0"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "70%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "62px",
                    ]}
                >
                    Thanksgiving Offer
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "28px"]}
                    width={["100%", "100%", "80%"]}
                >
                    Gratitude meets gaming! Unlock a special Thanksgiving offer at LootMogul: Purchase $5 worth of chips and receive a generous $10 credited to your account. Available from November 23rd to 28th.
                    <br/><br/>Play more and Win more!
                </Text>
                <Link
                    href={'#__next'}
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                    
                >
                    <Button
                        bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        filter="drop-shadow(0 0 20px #FF0080)"
                        boxShadow="inset 0 0 0px 0px #481A7F"
                        width="180px"
                        fontSize="21px"
                        fontWeight="500"
                        p="28px"
                        mt="30px"
                        mb="30px"
                        >
                        Deposit Now
                    </Button>
                </Link>
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["90%", "90%", "30%", "30%"]}
            >
                <Link
                    href={ ''}
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                >
                    <VStack>
                        <Flex
                            flexDir={"column"}
                            textAlign="center"
                            bgImage={"/assets/designupdate1/gamecard_portrait.png"}
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            bgSize="100% 100%"
                            cursor="pointer"
                            width={"100%"}
                            height={["330px", "300px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="60%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="450px"
                                    src={"/assets/Thanksgiving-Contest-Image1.png"}
                                />
                            </Flex>
                            
                        </Flex>
                    </VStack>
                </Link>
            </Box>
        </Flex>
        
       
    </Box>
       
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("contestmasters", {
      fields: ["name", "slug", "priority", "gamecampaignpriority", "entryFee", "isFeatured", "retries"],
      sort: "priority",
      populate: {
        contest_section: {
          fields: ["name", "slug"],
        },
        icon: {
          fields: ["name", "url"],
        },
        feeWallet: {
          populate: {
            currency: {
              fields: ["type"],
            },
          },
        },
        reward: {},
        game:{
          fields:"*"
        }
      },

      pagination: {
        page: pageNo,
        pageSize: 25,
      },
    });
    if (res?.meta) {
      data.push(res.data);
      if (pageCount == 1) {
        pageCount = res.meta.pagination.pageCount;
      }
    }
    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  data = data.flat();

  try {
    const contestSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );

    /** For trivia games */
    const contestSectionsRestrivia = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );
    const contestSectionsDataTrivia = await contestSectionsRestrivia.json();
    
    /** For trivia games */
    
    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/game-campaigns?populate=*"
    );
    const contestSectionsData = await contestSectionsRes.json();
    const campaignsSectionsResData = await campaignsSectionsRes.json();

    const bannersRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/campaigns?sort=priority&populate=bannerImage"
    );

    const banners = await bannersRes.json();
    const seoData = await getSeoData("games");

    return {
      props: { data, contestSectionsData, contestSectionsDataTrivia, campaignsSectionsResData, banners, seoData },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}