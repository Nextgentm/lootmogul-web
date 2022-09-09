import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// import NftCard from "../NftCard";
const NftCard = dynamic(() => import("../NftCard"));
import { Text, Image, Flex, Box, Grid, SimpleGrid, Divider, HStack, VStack, Button, GridItem, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";

import ContentNavigator from "../../../../components/ContentNavigator";
import { LeftArrow, RightArrow } from "../../../../components/ContentNavigator/arrows";


const NftsCategories = ({ NFTS, isSelectedCat,index }) => {
    const ref = useRef();
    const router = useRouter();
    const { isMobileDevice } = useContext(AppContext);
    const arrowThreshold = isMobileDevice ? 2 : 5;
    const lazyRoot = useRef(null);

    const [displayCards, setDisplayCards] = useState([]);

    useEffect(() => {
        const allNfts = NFTS.nftSet?.sort((a, b) => a.priority - b.priority);
        // if (allNfts.length > arrowThreshold) {
        //     setDisplayCards(allNfts.slice(0, arrowThreshold));
        // } else
        {
            setDisplayCards(allNfts);
        }
    }, [NFTS]);

    return (
        <>
        {isSelectedCat ? (

            <Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
                {isMobileDevice ? (
                    <ScrollMenu
                        className="no-scrollbar"
                        apiRef={ref}
                        ref={lazyRoot || ref}
                    >
                        {displayCards.map((item, index) => (
                            <NftCard
                                // style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                                showInfo={true}
                                nft={item?.nft_kred?.data}
                                defaultInView={
                                    isMobileDevice
                                        ? index < 2
                                        : index < 5
                                }
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
        ):
        (<Grid templateColumns='repeat(12, 1fr)' w={"100%"}>
            <GridItem
               colSpan={4} 
                order={index%2 == 0? 1: 3}
            >
                <Box p={"20%"}>
                <Divider />
                <VStack
                    align="center"
                >
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize="32px"
                        mt="20px"
                    >
                        {NFTS.name}
                    </Text>
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize="32px"
                        mt="20px"
                    >
                        Released on  {NFTS.createdAt}
                    </Text>
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize="32px"
                        mt="20px"
                    >
                         {NFTS.slug}
                    </Text>
                    <Button
                                mt={6}
                                fontSize="24px"
                                width="200px"

                                onClick={() => {
                                    //executeScroll(0);
                                }}
                            >
                                VIEW COLLECTION
                            </Button>
                    
                </VStack>
                </Box>

            </GridItem>
            <GridItem order={2} colSpan={1} >
            <Divider orientation='vertical' h={"80%"} m={"10%"}/>
            </GridItem>
            <GridItem order={index%2 == 0? 3: 1} colSpan={6} >
                <Center>
                    <Box  w={"400px"}>
                        <ScrollMenu
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                            options={{
                                ratio: 0.9,
                                rootMargin: "5px",
                                threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                            }}
                            apiRef={ref}
                            ref={lazyRoot}
                           

                        >
                            {displayCards.map((item, index) => (
                                <NftCard
                                    // style={{ w: "250px", mr: "30px", mt: "10px" }}
                                    itemId={`nftcard-${index}`}
                                    key={`nftcard-${index}`}
                                    slug={item.slug}
                                    showInfo={true}
                                    nft={item?.nft_kred?.data}
                                    lazyRoot={lazyRoot}
                                    defaultInView={
                                        isMobileDevice ? index < 2 : index < 5
                                    }
                                />
                            ))}
                        </ScrollMenu>
                    </Box>
                
            </Center>
            </GridItem>
        </Grid>
        )}
        </>
    )
};

export default NftsCategories;
