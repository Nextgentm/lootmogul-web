import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    Flex,
    HStack,
    Text,
    Button,
    Center,
    Select,
    Link,
    SimpleGrid,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../../utils/AppContext/index";

import {  usePromotionBanners } from "../../Home/api";
import BottomBanners from "../../Home/components/BottomBanners";
import ContentNavigator from "../../../components/ContentNavigator";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { useRouter } from "next/router";
// import LMSingleCarousel from "../../../components/LMCarousel/LMSingleCarousel";
import LMThumbnailCarousel from "../../../components/LMCarousel/LMThumbnailCarousel";
import NftCard from "./NftCard";
import * as ga from "../../../services/googleAnalytics";

// const IFrame = ({ content }) => {
//     return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
// };

// const SelectBox = ({ style, icon, title, options, onChange }) => {
//     return (
//         <Flex style={style}>
//             <Box pl={[4]}>{icon}</Box>

//             <Select
//                 pl="0%"
//                 border="none"
//                 color="white"
//                 _focus={{ borderColor: "transparent", boxShadow: "none" }}
//                 onChange={onChange}
//                 style={{ paddingLeft: "6px" }}
//             >
//                 {options &&
//                     options.map((item) => {
//                         return (
//                             <option
//                                 style={{
//                                     backgroundColor: "black",
//                                     color: "white"
//                                 }}
//                                 key={item}
//                                 value={`${item}`.toLowerCase()}
//                             >
//                                 {item}
//                             </option>
//                         );
//                     })}
//             </Select>
//         </Flex>
//     );
// };

// const MobileCardsCarousel = ({ isMobileDevice, featuredNfts, router }) => {
//     return (
//         <Box mt={6} position="relative" w={"100%"}>
//             <img
//                 src="/assets/arrow-left.png"
//                 alt="Left"
//                 style={{
//                     position: "absolute",
//                     left: -30,
//                     top: "30%",
//                     cursor: "pointer"
//                 }}
//             />

//             <img
//                 src="/assets/arrow-right.png"
//                 alt="Right"
//                 style={{
//                     position: "absolute",
//                     right: -30,
//                     top: "30%",
//                     cursor: "pointer"
//                 }}
//             />

//             {/* <Center  > */}

//             <LMSingleCarousel disableDots={true} autoplaySpeed={5000}>
//                 {featuredNfts.map((nftData) => (
//                         <Box>
//                             <Text
//                                 fontWeight="bold"
//                                 fontSize="30px"
//                                 fontFamily="Sora"
//                                 color="#45E470"
                                
//                                 style={{
//                                     background:
//                                         "-webkit-linear-gradient(#43C8FF, #45E470)",
//                                     "-webkit-background-clip": "text",
//                                     "-webkit-text-fill-color": "transparent"
//                                 }}
//                             >
//                                 {nftData.name?.split("-")[0]}
//                             </Text>
//                             <Text
//                                 fontWeight="bold"
//                                 fontSize="18px"
//                                 color="#C7C7C7"
//                                 mb={6}
//                                 lineHeight="16px"
//                             >
//                                 {nftData.name?.split("-").length > 1
//                                     ? nftData.name?.split("-")[1]
//                                     : ""}
//                             </Text>
//                             <NftCard nft={nftData} />

//                         {/* <InfluencerCard
//                                 img="https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
//                                 content={{
//                                     id: 5,
//                                     name: "Norris Cole - Gold Collection",
//                                     desc: "Norris Cole - Gold Collection\r\nAmerican professional basketball player for Unicaja of the Liga ACB. He was a two-time NBA champion with the Miami Heat. Chicago Bulls selected Cole 28th overall in the 2011 NBA draft out of Cleveland State",
//                                     preview:
//                                         "https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
//                                 }}
//                                 isLive={true}
//                                 showsInfo={false}
//                                 isMobileDevice={isMobileDevice}
//                             /> */}
//                     </Box>
//                 ))}
//             </LMSingleCarousel>
//             {/* </Center> */}

//             <Center >
//                 <HStack>
//                     {Array(3)
//                         .fill(0)
//                         .map((_, index) => (
//                             <Box
//                                 height="60px"
//                                 width="80px"
//                                 position="relative"
//                                 cursor="pointer"
//                             >
//                                 <img
//                                     src={`/assets/nfts/frame${index === 1 ? "-active" : ""
//                                         }.png`}
//                                     alt=""
//                                     style={{
//                                         width: "100%",
//                                         height: "100%"
//                                     }}
//                                 />

//                                 <img
//                                     src="https://a.espncdn.com/photo/2019/0917/NBA_Decade_Most_defining_16x9.jpg"
//                                     alt=""
//                                     style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         position: "absolute",
//                                         top: 0,
//                                         left: 0,
//                                         objectFit: "contain",
//                                         padding: "12px 24px"
//                                     }}
//                                 />
//                             </Box>
//                         ))}
//                 </HStack>
//             </Center>
//         </Box>
//     );
// };

// const CardsCarousel = ({ isMobileDevice, featuredNfts, router }) => {
//     return (
//         <Box position="relative">
//             <img
//                 src="/assets/nfts/left.svg"
//                 alt="Left"
//                 style={{
//                     position: "absolute",
//                     left: "-24px",
//                     top: "50%",
//                     cursor: "pointer"
//                 }}
//             />

//             <img
//                 src="/assets/nfts/right.svg"
//                 alt="Right"
//                 style={{
//                     position: "absolute",
//                     right: "24px",
//                     top: "50%",
//                     cursor: "pointer"
//                 }}
//             />
//             <LMSingleCarousel disableDots={true} autoplaySpeed={5000}>
//                 {featuredNfts.map((nftData) => (
//                     <Box ml={10} w={"100%"}>
//                         <Box>
//                             <Text
//                                 fontWeight="bold"
//                                 fontSize="30px"
//                                 fontFamily="Sora"
//                                 color="#45E470"
                               

//                                 style={{
//                                     background:
//                                         "-webkit-linear-gradient(#43C8FF, #45E470)",
//                                     "-webkit-background-clip": "text",
//                                     "-webkit-text-fill-color": "transparent"
//                                 }}
//                             >
//                                 {nftData.name?.split("-")[0]}
//                             </Text>
//                             <Text
//                                 fontWeight="bold"
//                                 fontSize="18px"
//                                 color="#C7C7C7"
//                                 mb={6}
//                                 lineHeight="16px"
//                             >
//                                 {nftData.name?.split("-").length > 1
//                                     ? nftData.name?.split("-")[1]
//                                     : ""}
//                             </Text>
//                             <NftCard nft={nftData} />

//                             {/* <InfluencerCard
//                                 img="https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
//                                 content={{
//                                     id: 5,
//                                     name: "Norris Cole - Gold Collection",
//                                     desc: "Norris Cole - Gold Collection\r\nAmerican professional basketball player for Unicaja of the Liga ACB. He was a two-time NBA champion with the Miami Heat. Chicago Bulls selected Cole 28th overall in the 2011 NBA draft out of Cleveland State",
//                                     preview:
//                                         "https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
//                                 }}
//                                 isLive={true}
//                                 showsInfo={false}
//                                 isMobileDevice={isMobileDevice}
//                             /> */}
//                         </Box>
//                     </Box>
//                 ))}
//             </LMSingleCarousel>
//             <Box position={"absolute"} top={10} right={"120px"}>
//                 {Array(3)
//                     .fill(0)
//                     .map((_, index) => (
//                         <Box
//                             height="120px"
//                             width="150px"
//                             mb={6}
//                             position="relative"
//                             cursor="pointer"
//                         >
//                             <Image
//                                 src={`/assets/nfts/frame${
//                                     index === 1 ? "-active" : ""
//                                 }.png`}
//                                 alt=""
//                                 style={{
//                                     width: "100%",
//                                     height: "100%"
//                                 }}
//                                 layout='fill'

//                             />

//                             <Image
//                                 src="https://a.espncdn.com/photo/2019/0917/NBA_Decade_Most_defining_16x9.jpg"
//                                 alt=""
//                                 layout='fill'

//                                 style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     position: "absolute",
//                                     top: 0,
//                                     left: 0,
//                                     objectFit: "contain",
//                                     padding: "12px 24px"
//                                 }}
//                             />
//                         </Box>
//                     ))}
//             </Box>
//             <Center mt={6}>
//                 <HStack spacing={6}>
//                     {Array(5)
//                         .fill(0)
//                         .map((_, index) => (
//                             <Box
//                                 height="5px"
//                                 width="92px"
//                                 bg={
//                                     index === 2
//                                         ? "linear-gradient(180deg, #43C8FF 0%, #45E470 100%), #FFFFFF"
//                                         : "#8E8E8E"
//                                 }
//                                 borderRadius="20px"
//                                 cursor="pointer"
//                             />
//                         ))}
//                 </HStack>
//             </Center>
//         </Box>
//     );
// };

const Nfts = ({ data }) => {
    // const router = useRouter();
    const [featuredNfts, setFeaturedNfts] = useState([]);
    const [mainSliderChild, setMainSliderChild] = useState();
    const bottomBanners = usePromotionBanners();
    const { isMobileDevice, isTabletOrDesktop } = useContext(AppContext);
    const [visibleCount, setVisibleCount] = useState(8);
    const [total, setTotal] = useState(0);

    const ref = React.useRef();
    // const categories = ["Categories"];
    // const sortBy = ["Sort By"];
    // const priceRange = ["Price Range"];
    // const saleType = ["Sale Type"];
    // const breadcrumbsPath = [
    //     {
    //         label: "Home",
    //         path: "/"
    //     },
    //     { label: "Influencers" }
    // ];

    useEffect(() => {
        const featured = data.filter((nft) => nft.isFeatured);
        setFeaturedNfts(featured);
        setTotal(data.length);
        let sliderItem = featured.map((nftData) => {
            return   <Box w={"100%"}>
                   <Box>
                       <Text
                           fontWeight="bold"
                           fontSize="30px"
                           fontFamily="Sora"
                           color="#45E470"
                           textOverflow={"ellipsis"}
                           whiteSpace={"nowrap"}
                           style={{
                               background:
                                   "-webkit-linear-gradient(#43C8FF, #45E470)",
                               "-webkit-background-clip": "text",
                               "-webkit-text-fill-color": "transparent"
                           }}
                       >
                           {nftData.name?.split("-")[0]}
                       </Text>
                       <Text
                           fontWeight="bold"
                           fontSize="18px"
                           color="#C7C7C7"
                           mb={6}
                           lineHeight="16px"
                       >
                           {nftData.name?.split("-").length > 1
                               ? nftData.name?.split("-")[1]
                               : ""}
                       </Text>
                       <NftCard nft={nftData} />
    
                       {/* <InfluencerCard
                           img="https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
                           content={{
                               id: 5,
                               name: "Norris Cole - Gold Collection",
                               desc: "Norris Cole - Gold Collection\r\nAmerican professional basketball player for Unicaja of the Liga ACB. He was a two-time NBA champion with the Miami Heat. Chicago Bulls selected Cole 28th overall in the 2011 NBA draft out of Cleveland State",
                               preview:
                                   "https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
                           }}
                           isLive={true}
                           showsInfo={false}
                           isMobileDevice={isMobileDevice}
                       /> */}
                   </Box>
               </Box>
           });
          setMainSliderChild(sliderItem.slice(0,3));
    }, [data]);

  
       const thumbsliderChild = featuredNfts
       .map((item, index) => {
          return  <Box
               height="120px"
               width="150px"
               mb={6}
               position="relative"
               cursor="pointer"
           >
               <Image
                   src={`/assets/nfts/frame${
                       index === 1 ? "-active" : ""
                   }.png`}
                   alt=""
                   layout='fill'

                   style={{
                       width: "100%",
                       height: "100%"
                   }}
               />

               <Image
                   src="https://a.espncdn.com/photo/2019/0917/NBA_Decade_Most_defining_16x9.jpg"
                   alt=""
                   layout='fill'

                   style={{
                       width: "100%",
                       height: "100%",
                       position: "absolute",
                       top: 0,
                       left: 0,
                       objectFit: "contain",
                       padding: "12px 24px"
                   }}
               />
           </Box>
       })

    return (
        <Box >

            <Box px={10} pb={12} pt={12} bg="#0C1017">
                <SimpleGrid columns={[1,1,1,2]} spacing={10}>
                    <Box  order ={[2,1]}>
                        <Box  mt={!isMobileDevice ? 36 : 0}>
                            <Text
                                color="#FFFFFF"
                                fontSize={["30px", "40px", "54px"]}
                                fontFamily="Blanch"
                                mb={0}
                                lineHeight={["30px", "40px", "60px"]}
                            >
                                Buy &amp; Trade exclusive limited edition NFTs
                                on{" "}
                                <span style={{ color: "#F8ED1D" }}>
                                    NFT.LootMogul.com
                                </span>
                            </Text>

                            <Text
                                color="#FFFFFF"
                                fontSize={["47px", "57px", "70px"]}
                                fontWeight="regular"
                                fontFamily="Blanch"
                                lineHeight="52px"
                                mr={isMobileDevice ? 6 : 0}
                                textAlign="left"
                                mt={6}
                            >
                                Support Your Favorite Influencer
                            </Text>

                            <Button mt={6} fontSize="22px" width={["140px", "250px"]} onClick = {()=>{
                                 ga.eventTracking({
                                    action: "Collect your card button is clicked"
                                   
                                
                                  });
                            }} height={["38px"]}>
                                <Link href="https://nft.lootmogul.com">
                                    Collect your cards
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                    {featuredNfts?.length > 0 && (
                       <Box  order ={[1,2]} position="relative"  width="100%" m="auto" textAlign={"center"}>
                      
                       <LMThumbnailCarousel disableDots={true} autoplaySpeed={5000} children1 = {mainSliderChild}
                        >
                       </LMThumbnailCarousel>
                 
                   </Box>
                    )}
                </SimpleGrid>
            </Box>



           {data.filter((item) => item.isAuction)?.length && (
            <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">
            <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text 
                    className="tab-item"
                    fontFamily="Blanch"
                    color="white"
                    cursor="pointer"
                        fontSize={["28px","28px","58px", "58px"]}>
                 LIVE AUCTION
                </Text>

                <ContentNavigator
                    showArrows={!isMobileDevice}
                    handleLeftArroeClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    // onViewAllClicked={() => router.push("/influencers")}
                    showViewAll={false}

                />
            </Flex>
                <ScrollMenu className="no-scrollbar" apiRef={ref}>
                {data
                    .filter((item) => item.isAuction)
                    .map((item,index) => (
                        <NftCard nft={item} itemId={`nftcard-${index}`} key={`nftcard-${index}`} showInfo={true} />
                        
                    ))}
                </ScrollMenu>
        </Box>)}

            <Box ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} mt="30px">
            <Flex justify="space-between" mt="20px" align="center" mb="20px">
                <Text 
                    className="tab-item"
                    fontFamily="Blanch"
                    color="white"
                    cursor="pointer"
                        fontSize={["28px","28px","58px", "58px"]}>
                POPULAR NFT'S
                </Text>

                <ContentNavigator
                    showArrows={false}
                    handleLeftArroeClick={() => ref.current.scrollPrev()}
                    handleRightArrowClick={() => ref.current.scrollNext()}
                    // onViewAllClicked={() => router.push("/influencers")}
                    showViewAll={false}

                />
            </Flex>
                <ScrollMenu className="no-scrollbar" apiRef={ref}>
                {data
                    .filter((item) => item.isSale).sort((a,b) => a.priority - b.priority)
                    .map((item, index) => (
                        <NftCard   itemId={`nft-${index}`}
                        key={`nft-${index}`} nft={item} showInfo={true} />
                        
                    ))}
                </ScrollMenu>
        </Box>



          
            <Box mx={!isTabletOrDesktop ? 6 : 10} mt={8}>
                <Grid
                    templateColumns={!isTabletOrDesktop ? "1fr" : "10fr 2fr"}
                    gap={0}
                >
                    <GridItem>
                        <Flex
                            alignItems={
                                !isTabletOrDesktop ? "flex-start" : "center"
                            }
                            flexDirection={
                                !isTabletOrDesktop ? "column" : "row"
                            } ml={["0%", "2%"]}
                        >
                            <Text
                                fontFamily="Blanch"
                                color="white"
                                fontSize={!isTabletOrDesktop ? "28px" : "58px"}
                                lineHeight={
                                    !isTabletOrDesktop ? "30px" : "auto"
                                }
                                mb={3}
                            >
                                Explore
                            </Text>

                            {/* <HStack
                                mb={isMobileDevice ? 6 : 0}
                                style={{
                                    overflow: "hidden"
                                }}
                            >
                                <SelectBox
                                    style={{
                                        border: "1px solid #FFFFFF",
                                        borderRadius: "30px",
                                        alignItems: "center",
                                        marginLeft: isMobileDevice ? 0 : "12px",
                                        width: "200px"
                                    }}
                                    icon={<FilterIcon />}
                                    title="Categories"
                                    options={categories}
                                />

                                <SelectBox
                                    style={{
                                        border: "1px solid #FFFFFF",
                                        borderRadius: "30px",
                                        alignItems: "center",
                                        marginLeft: "12px",
                                        width: "200px"
                                    }}
                                    icon={<FilterIcon />}
                                    title="Price Range"
                                    options={priceRange}
                                />

                                <SelectBox
                                    style={{
                                        border: "1px solid #FFFFFF",
                                        borderRadius: "30px",
                                        alignItems: "center",
                                        marginLeft: "12px",
                                        width: "200px"
                                    }}
                                    icon={<FilterIcon />}
                                    title="Sale Type"
                                    options={saleType}
                                />
                            </HStack> */}
                        </Flex>
                    </GridItem>

                    {/* {!isMobileDevice && (
                        <GridItem>
                            <SelectBox
                                style={{
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "30px",
                                    alignItems: "center",
                                    marginTop: 24
                                }}
                                icon={<FilterIcon />}
                                title="Sort By"
                                options={sortBy}
                            />
                        </GridItem>
                    )} */}
                </Grid>

                <Wrap m="auto !important" >
                    {data.sort((a,b) => a.priority - b.priority)
                        .filter((item, index) => index < visibleCount)
                        .map((item) => (
                            <WrapItem m="auto !important"  >
                                <NftCard nft={item} showInfo={true} />
                            </WrapItem>
                        ))}
                    {/* {nftData.map((item) => (
                                            <InfluencerCard
                                                img="https://imgcdn.socialos.io/web/files/608cd78df1f70e78ec3a26f4/1634556119658_Front-Gold.jpg"
                                                content={item}
                                                isLive={true}
                                                showsInfo={true}
                                                isMobileDevice={isMobileDevice}
                                            />
                                        ))} */}
                </Wrap>
                

                {/* <Grid
                    templateColumns={
                        isTabletOrDesktop && isMobileDevice
                            ? "repeat(3, 1fr)"
                            : isMobileDevice
                            ? "repeat(1, 1fr)"
                            : "repeat(4, 1fr)"
                    }
                    gap={6}
                >
                    {nftData.map((item) => (
                        <GridItem gap={"20px"}>
                            <InfluencerCard
                                img="/assets/nfts/charley_mosey.svg"
                                content={item}
                                width="290px"
                                showsInfo={true}
                                isMobileDevice={isMobileDevice}
                            />
                        </GridItem>
                    ))}
                </Grid> */}

                {!isMobileDevice && visibleCount < total && (
                    <Center mt={12}>
                        <Button
                            onClick={() => {
                                visibleCount < total;
                                setVisibleCount(visibleCount + 8);
                            }}
                            style={{
                                background: "transparent",
                                border: "2px solid #EDC628",
                                color: "white",
                                fontSize: "22px",
                                width: "250px"
                            }}
                        >
                            Load more
                        </Button>
                    </Center>
                )}

                {/* {isMobileDevice && (
                    <Button mt={6} style={{ fontSize: "22px" }}>
                        Read more
                    </Button>
                )} */}
            </Box>

            {/* <Box mx={isMobileDevice ? 6 : 10} mt={isMobileDevice ? 12 : 0}>
                <Text
                    fontFamily="Blanch"
                    color="white"
                    fontSize={isMobileDevice ? "28px" : "58px"}
                    lineHeight={isMobileDevice ? "30px" : "auto"}
                    mb={3}
                >
                    About NFT
                </Text>

                <Text
                    color="#C7C7C7"
                    fontSize="14px"
                    fontWeight="600"
                    fontFamily="Sora"
                    textTransform="uppercase"
                >
                    Lorem ipsum dolor sit amet
                </Text>

                <Text color="#C7C7C7" fontSize="14px" fontFamily="Sora" mt={2}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sollicitudin justo orci montes, vulputate morbi nunc, dolor
                    tincidunt pretium. Quis porta at est volutpat interdum arcu
                    ac. Faucibus nulla velit iaculis mauris sem bibendum.Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit.
                    Sollicitudin justo orci montes, vulputate morbi nunc, dolor
                    tincidunt pretium. Quis porta at est volutpat Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sollicitudin
                    justo orci montes, vulputate morbi nunc, dolor tincidunt
                    pretium. Quis porta at est volutpat interdum arcu ac.
                    Faucibus nulla velit iaculis mauris sem bibendum.interdum
                    arcu ac. Faucibus nulla velit iaculis mauris sem
                    bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing
                </Text>

                <Button mt={6} style={{ fontSize: "22px" }}>
                    Read more
                </Button>
            </Box> */}

            {/* <Box mt={12} mx={isMobileDevice ? 0 : 10}>
                <Text
                    fontFamily="Blanch"
                    color="white"
                    mx={isMobileDevice ? 6 : 0}
                    fontSize={isMobileDevice ? "28px" : "58px"}
                    lineHeight={isMobileDevice ? "30px" : "auto"}
                >
                    Frequently Asked Questions
                </Text>

                <FAQ style={{ padding: 0, margin: 0 }} />
            </Box> */}

            <Box mt={12} mx={isMobileDevice ? 0 : 10}>
                {/* <Text
                    fontFamily="Blanch"
                    color="white"
                    mx={isMobileDevice ? 6 : 0}
                    fontSize={isMobileDevice ? "28px" : "58px"}
                    lineHeight={isMobileDevice ? "30px" : "auto"}
                >
                    How to Earn or buy your LootMogul NFT Cards Before it's Late
                </Text>

                {!isMobileDevice && (
                    <Text color="#C7C7C7" fontWeight="600" fontFamily="Sora">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit
                        Sollicitudin justo orci montes
                    </Text>
                )}

                <Box mt={isMobileDevice ? 6 : 12}>
                    <IFrame content='<iframe width="100%" height="480" src="https://www.youtube.com/embed/fu6QDHOp_rY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' />
                </Box> */}

                <Center mt={12}>
                    <Link href="https://nft.lootmogul.com">
                        <Button w={"150px"} h={"60px"}>
                            Visit MarketPlace
                        </Button>
                    </Link>
                </Center>
            </Box>
        </Box>

    );
};

export default Nfts;
