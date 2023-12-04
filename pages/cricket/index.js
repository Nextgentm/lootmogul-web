import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import Banner from "../../src/components/Web3Games/Banner";
import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";
import { Box, Flex, Image, Text, Button, VStack, Link} from '@chakra-ui/react'

const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Skill Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:process.env.NEXT_PUBLIC_SITE_URL+"/games"
};

export default function GamesPage({
  data,  
  contestSectionsData,
  campaignsSectionsResData,
}) {
  
  const content =  campaignsSectionsResData?.data[2].trending_contestHighlights;
  const trending_subheader = campaignsSectionsResData?.data[2].trending_subheader;
  return (
    <>
      
      <SEOContainer seoData={defaultSEOData}/> 
        <Banner bannerData={campaignsSectionsResData?.data[2] || []}/>
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
                     {campaignsSectionsResData?.data[2].trending_header}
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
                    className="desc_subheader"
                >
                   <p dangerouslySetInnerHTML={{ __html: trending_subheader }}></p>
                </Text>
                
                
                <Link
                    href={campaignsSectionsResData?.data[2].trending_redirectionUrl || '/games'}
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
                        Play Now
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
                    href={campaignsSectionsResData?.data[2].trending_redirectionUrl || '/games'}
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
                                    w="350px"
                                    src={campaignsSectionsResData?.data[2].trending_gameLogo.data[0].url}
                                />
                            </Flex>
                            
                        </Flex>
                    </VStack>
                </Link>
            </Box>
        </Flex>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            backgroundImage={ "/assets/Banner-2.png" }
            height={["100px", "100px", "300px", "420px"]}
            p="2% 5%"
            backgroundSize="contain"
            backgroundRepeat={"no-repeat"}
            mt={["30px","30px","10px","0px"]}
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "100%"]}
            >
                
            </Box>
        </Flex>

        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="5%"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "90%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="62px"
                >
                   Ready for the India VS South Africa Series?
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "21",
                        "21"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "35px"]}
                    width={["100%", "100%", "100%"]}
                >
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>            
                </Text>
            </Box>
        </Flex>
       
    </Box>
       <BlockChainGame 
            contestSectionsData={contestSectionsData?.data || []}
            contestmasters={data || []}
            blockChainCardData={campaignsSectionsResData?.data[0] || []}
        />
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

    
    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/game-campaigns?populate=*&sort=id"
    );
    const contestSectionsData = await contestSectionsRes.json();
    const campaignsSectionsResData = await campaignsSectionsRes.json();

    return {
      props: { data, contestSectionsData,  campaignsSectionsResData },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}
