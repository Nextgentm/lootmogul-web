// import Nfts from "../../src/features/Nfts/components";

import React, { useContext, useEffect , useState} from "react";
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Flex,
  HStack,
  // VStack,
  Grid,
  GridItem,
  Text,
  Button,
  Center,
  // Table,
  // Tr,
  // Th,
  // Td,
  Popover,
  PopoverTrigger,
  Link
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ContentNavigator from "../../components/ContentNavigator";
import { AppContext } from "../../utils/AppContext/index";
import Breadcrumbs from "../../components/Breadcrumbs";
import Collapsible from "react-collapsible";
import { useRouter } from "next/router";
// import moment from "moment";
import { useApiNftsRelated } from "../../features/Home/api";
// import MyPageLoader from '../../src/components/MyPageLoader';
import SEOContainer from "../../features/SEOContainer";

const NextShare = dynamic(() => import("../../utils/socialbuttons"));
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'


import { isEmpty } from "lodash";
import strapi from "../../utils/strapi";

const newMarkDownTheme = {
  p: props => {
    const { children } = props;
    return (
      <Text mb={2} fontFamily="Sora" color="white" fontSize={["12px","16px"]}>
        {children}
      </Text>
    );
  },
};

const NftCard = dynamic(() => import("../../features/Nfts/components/NftCard"))

const aboutItems = [
  {
    title: "Show your support to your favorite influencer.",
    icon: "/assets/nfts/about_1.svg",
  },
  {
    title: "You own a part of the game by owning the asset.",
    icon: "/assets/nfts/about_2.svg",
  },
  {
    title: "Be a part of LootMogul's exclusive NFT community.",
    icon: "/assets/nfts/about_3.svg",
  },
  {
    title: "You get the bragging rights of having a rare collectible.",
    icon: "/assets/nfts/about_4.svg",
  },
];

const foundersAboutItems = [
  {
    title: "Early access to LootMogul tokens upcoming presale",
    icon: "/assets/nfts/about_1.svg",
  },
  {
    title: "Play with one sports celebrity avatar inside the upcoming LootMogul’s metaverse basketball game for free",
    icon: "/assets/nfts/about_2.svg",
  },
  {
    title: " Party with one sports celebrity avatar inside LootMogul’s metaverse exclusive events",
    icon: "/assets/nfts/about_3.svg",
  },
  {
    title: "Enter into a raffle to win tickets to games incl. premier events in Los Angeles or Miami",
    icon: "/assets/nfts/about_4.svg",
  },
];


const socialLinks = [
  {
    Image: "twitter.png",
    link: "https://twitter.com/LootMogul",
  },
  {
    Image: "facebook.png",
    link: "https://www.facebook.com/LootMogul/",
  },
  {
    Image: "youtube.png",
    link: "https://www.youtube.com/channel/UCsooAZi-4pYR7MXTJMVRFPg/videos",
  },
  {
    Image: "instagram.png",
    link: "https://www.instagram.com/lootmogul/?hl=en",
  },

  {
    Image: "discord.png",
    link: "https://discord.gg/mHUqAm8fsh",
  },
  {
    Image: "telegram.png",
    link: "https://telegram.me/LootMogulOfficial",
  },
  {
    Image: "twitch.png",
    link: "https://www.twitch.tv/lootmogul",
  },
];

const CollapsibleSection = ({ title, icon, open = false, children }) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box mt={6}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="#1C1C1C"
        borderRadius={4}
        px={6}
        pb={1}
        cursor="pointer"
        onClick={toggleOpen}
      >
        <HStack spacing={3}>
          <img src={icon} alt="" />

          <Text
            color="#CFBF8A"
            fontSize="35px"
            fontFamily="Blanch"
            textTransform="uppercase"
          >
            {title}
          </Text>
        </HStack>

        <img
          src={
            isOpen ? "/assets/nfts/arrow_up.svg" : "/assets/nfts/arrow_down.svg"
          }
          alt="Arrow"
        />
      </Flex>

      <Collapsible open={isOpen} transitionTime={200}>
        <Box bg="#131313" p={6} borderRadius={4}>
          {children}
        </Box>
      </Collapsible>
    </Box>
  );
};

const AboutItem = ({ title, icon }) => {
  const { isMobileDevice } = useContext(AppContext);

  return (
    <Center py={10} px={isMobileDevice ? 10 : 0}>
      <Flex
        alignItems="center"
        flexDirection={isMobileDevice ? "row" : "column"}
      >
        <img src={icon} alt={title} style={{ width: 96, height: 96 }} />

        <Text
          textAlign="center"
          color="#C7C7C7"
          px={isMobileDevice ? 0 : 12}
          fontSize="14px"
          fontFamily="Sora"
        >
          {title}
        </Text>
      </Flex>
    </Center>
  );
};



const ExtraInfo = ({nftData, isMobileDevice}) =>{
  return (<>
    <CollapsibleSection
            title="Other Details"
            icon="/assets/nfts/other.svg"
            open={true}
          >
            <Text color="white" fontSize="15px" fontFamily="Sora">
            {nftData.meta?.description}
            </Text>
          </CollapsibleSection>
 
  </>)
}

const NFTDetails = ({nftData}) => {
  const { isMobileDevice } = useContext(AppContext);
  const ref = useRef();
  const router = useRouter();
  const [cryptoWallet, setCryptoWallet] = useState();
    const [loading, setLoading] = useState(true);

    const { user ,toggleLoginModal} = useContext(AppContext);

  // const id = router.query["id"];
  const { data = [] } = useApiNftsRelated(nftData?.id);
  
  const breadcrumbsPath = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "NFT",
      path: "/nfts",
    },
    // {
    //   label:  "Gold Card Collection",
    //   path: "#",
    // },
    {
      label: nftData?.name || "",
      path: "#",
    },
  ];

  useEffect(()=>
 {
   if(nftData){ 
     try {
      nftData.creatorDomain = JSON.parse(nftData.creator)?.domain  ;
      nftData.creatorAvatar= JSON.parse(nftData.creator)?.avatar ;
      nftData.creatorName= JSON.parse(nftData.creator)?.name;
    } catch(e) {
      nftData.creatorDomain = "lootmogul.com"
      nftData.creatorAvatar= "";
      nftData.creatorName= "lootmogul"
    }
  }
 },[nftData]);


 const connectMetamask = async () => {
  setLoading(true); 
  if (!window.web3?.currentProvider?.isMetaMask) {
      alert("Please install Metamask");
      setLoading(false); 
      return;
  }
  let wallet = await localStorage.getItem("selected-wallet", "");
  if (wallet?.length && cryptoWallet) {
      // const mw = cryptoWallets.find((wall) => wall.type == "metamask");
      await strapi.update("crypto-wallets", cryptoWallet.id, {
          data: {
              isActive: false
          }
      });
      localStorage.setItem("selected-wallet", "");
      setCryptoWallet(null);
  } else {
      await window.ethereum?.enable();
      if (!isEmpty(window.ethereum?.selectedAddress)) {
          localStorage.setItem(
              "selected-wallet",
              window.ethereum?.selectedAddress
          );
          const cryptoAdd = {
              user: user.id,
              type: "metamask",
              address: window.ethereum?.selectedAddress,
              isActive:  true
          }
          const resp = await strapi.create("crypto-wallets", cryptoAdd
          );
          setCryptoWallet(resp);
      } else {
          localStorage.setItem("selected-wallet", "");
      }
      
  }
  setLoading(false); 
};


  return (
    <Box my={6} mx={"4%"}>
       
       <SEOContainer seoData={nftData.sharedSeo} content={nftData} pageName={"nfts"}/>
      <Flex
        alignItems="center"
        justifyContent={isMobileDevice ? "flex-end" : "space-between"}
      >
        {!isMobileDevice && (
          <Breadcrumbs
            routes={breadcrumbsPath}
            style={{ mt: "14px", mb: "14px" }}
          />
        )}

        {isMobileDevice && (  
         
            <Popover>
                                 <PopoverTrigger>
                                 <Button
                                    color="white"
                                    textTransform="normal"
                                    style={{ background: "#2D2D2D" }}
                                    mr={2}
                                  >Share
                                  </Button>
                              </PopoverTrigger>
                      <NextShare link={"https://lootmogul.com/nfts/"+ nftData?.slug} caption={"Check out this NFT collection for " + nftData?.name} hashtag="lootmogul"></NextShare>
                    </Popover>

            
        )}

       
      </Flex>

      <Grid templateColumns={isMobileDevice ? "1fr" : "repeat(2, 1fr)"} gap={6}>
        <GridItem>
        <Center mt={isMobileDevice ? 6 : 0}>
                <NftCard nft={nftData} />
              </Center>
         

          {!isMobileDevice && (
           <ExtraInfo nftData={nftData} isMobileDevice={isMobileDevice}></ExtraInfo>
          )}

        </GridItem>

        <GridItem>
          <Text
            color="#FFA136"
            fontWeight="bold"
            fontSize="30px"
            fontFamily="Sora"
          >
            {nftData.name}
          </Text>

         

          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={6}
            mt={3}
            pb={3}
            borderBottom={isMobileDevice ? "none" : "1px solid #1C1C1C"}
          >
            <Box>
            

              <HStack spacing={6}>
            

                <HStack>
                  <img src="/assets/nfts/tickets.svg" alt="Tickets" />
                  <Text
                    fontWeight="bold"
                    fontSize="14px"
                    color="#7C7C7C"
                    fontFamily="Sora"
                  >
                    {nftData.avail}/{nftData.count} Available
                  </Text>
                </HStack>
              </HStack>
            </Box>

            {!isMobileDevice && (
               <Popover>
               <PopoverTrigger>
               <Button
                  color="white"
                  textTransform="normal"
                  style={{ background: "#2D2D2D" }}
                >Share
                </Button>
            </PopoverTrigger>
    <NextShare link={"https://lootmogul.com/nfts/"+ nftData?.id} caption={"Check out this NFT collection for " + nftData?.name} hashtag="lootmogul"></NextShare>
  </Popover>
            )}
          </Flex>

         
          <Flex justifyContent="space-between">
            <Box>
              <Text
                fontSize="16px"
                fontFamily="Sora"
                fontWeight="bold"
                color="#7C7C7C"
              >
               {nftData.isAuction &&  ("Bidding Price")}
               {!nftData.isAuction &&  ("Selling Price")}
              </Text>

              <HStack>
                <Box
                  cursor="pointer"
                  height="32px"
                  width="32px"
                  position="relative"
                  my={4}
                >
                  <Image
                    alt="ETH coins"
                    height="30px"
                    width="30px"
                    objectFit="contain"
                    src={nftData.market_price ?
                      "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg" :
                    "/assets/nfts/money.svg"}
                  />
                </Box>

                <Text
                  color="#CFBF8A"
                  fontFamily="Sora"
                  fontSize="30px"
                  fontWeight="bold"
                >
                  {nftData.market_price ?
                  " " + nftData.market_price : "US $" + nftData.sale_price }
                </Text>
              </HStack>
            </Box>

         
          </Flex>

          <Button
            mt={8}
            mb={9}
            fontSize="32px"
            width={isMobileDevice ? "100%" : "280px"}
            py={6}
            // onClick={buyNft}

          >
            <HStack>
              <img src="/assets/nfts/wallet.svg" alt="Tickets" />
              
              <Link target={"_blank"} href={ nftData.marketURL || "https://nft.lootmogul.com/token/"+nftData.symbol+"/all"}>
              <Text>{nftData.isAuction ? "Place a bid" : "Buy now"}</Text>
              </Link>
            </HStack>
          </Button>

          <CollapsibleSection
            title="Description"
            icon="/assets/nfts/description.svg"
            open={true}
          >
            <Text color="white" fontSize="15px" fontFamily="Sora">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{nftData.meta?.rich_text}</ReactMarkdown>

              
            </Text>
          </CollapsibleSection>

          <CollapsibleSection
            title="About Creator"
            icon="/assets/nfts/about.svg"
            open={true}
          >
            <Flex>
              <img
                // src={nftData.creatorAvatar}
                src="https://gamificationv2.s3.us-west-2.amazonaws.com/lm_coins_80dc26c544.png"
                alt="Avatar"
                style={{
                  width: "42px",
                  height: "42px",
                  objectFit: "cover",
                  borderRadius: "100%",
                  marginRight: "12px",
                  border: "1px solid #CFBF8A",
                }}
              />

              <Box mb={3}>
                <Text
                  fontFamily="Sora"
                  fontSize="16px"
                  color="white"
                  fontWeight="bold"
                >
                  {nftData.creatorName}  
                </Text>

                {/* <Text color="#C7C7C7" fontFamily="Sora">
                  American basket ball player
                </Text> */}

                <HStack mt={2}>
                  {socialLinks.map((img, index) => (
                    <Box key={`cimg-${index}`}>
                      <Link
                        _focus={{ border: "none", boxShadow: "none" }}
                        href={img.link}
                        target="_blank"
                      >
                        <Image
                          alt={img.Image}
                          width={22}
                          height={22}
                          src={`/assets/${img.Image}`}
                        />
                      </Link>
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Flex>

            <Text color="#C7C7C7" fontFamily="Sora">
            {
            
            }
           </Text>

         
          </CollapsibleSection>

        
        </GridItem>

        {isMobileDevice && (
           <ExtraInfo nftData={nftData} isMobileDevice={isMobileDevice}></ExtraInfo>
          )}

      </Grid>

      <Box mb={12} mt={6}>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontFamily="Blanch"
            fontSize={isMobileDevice ? "28px" : "58px"}
            color="white"
          >
            Related Collections
          </Text>

          <ContentNavigator
            showArrows={!isMobileDevice}
            handleLeftArroeClick={() => ref.current.scrollPrev()}
            handleRightArrowClick={() => ref.current.scrollNext()}
            showViewAll={false}
          />
        </Flex>

        <Box>
          <ScrollMenu  apiRef={ref}>
            {data?.related_nfts?.data?.
              map((item,index) => (
                <NftCard  itemId={`nft-${index}`}
                key={`nft-${index}`} nft={item}  showInfo={true}/>
              ))}
          </ScrollMenu>
         
        </Box>
      </Box>

      <Box mb={16}>
        <Text
          fontFamily="Blanch"
          fontSize={isMobileDevice ? "28px" : "58px"}
          color="white"
        >
          Think back, Why LootMogul NFT cards?
        </Text>

        <Grid
          templateColumns={isMobileDevice ? "1fr" : "repeat(4, 1fr)"}
          bg="#1C1C1C"
        >
          {nftData?.name?.includes("Founders") ?
           foundersAboutItems.map((item, key) => (
            <AboutItem key={key} icon={item?.icon} title={item?.title} />
          )) :
          aboutItems.map((item, key) => (
            <AboutItem key={key} icon={item?.icon} title={item?.title} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default NFTDetails;

