import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {  useRef ,useState, useEffect} from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
// import NftCard from "../NftCard";
const NftCard =  dynamic(() => import("../NftCard")) ;
import { Text, Flex, Box, Grid } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";

import ContentNavigator from "../../../../components/ContentNavigator";
const NftsCategories = ({ NFTS, isSelectedCat }) => {
    const ref = useRef();
    const router = useRouter();
    const { isMobileDevice } = useContext(AppContext);
    const arrowThreshold = isMobileDevice ? 2 : 5;
    const lazyRoot = useRef(null)

    const [displayCards, setDisplayCards] = useState([]);

    useEffect (() => {
        const allNfts = NFTS.nftSet?.sort((a,b) => a.priority - b.priority);
        // if (allNfts.length > arrowThreshold) {
        //     setDisplayCards(allNfts.slice(0, arrowThreshold));
        // } else 
        {
            setDisplayCards(allNfts);
        }
    } , [NFTS]);

    return (
        <>
            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
                mt="30px"
                mb="30px"
            >
                <Flex
                    justify="space-between"
                    mt="20px"
                    align="center"
                    mb="20px"
                >
                    <Text
                        color="white"
                        fontFamily="Blanch"
                        fontSize="32px"
                        mt="20px"
                    >
                        {NFTS.name}
                    </Text>
                  {!isSelectedCat &&   <ContentNavigator
                        showArrows={NFTS?.nftSet.filter((item)=>item.nft_kred?.data)?.length > arrowThreshold}
                        handleLeftArrowClick={() => ref.current.scrollPrev()}
                        handleRightArrowClick={() => ref.current.scrollNext()}
                        onViewAllClicked={() =>
                            router.push({ pathname: "/nfts/" + NFTS.slug })
                        }
                    />}
                </Flex>
                {!isSelectedCat ?(<Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
                    <ScrollMenu className="no-scrollbar"  apiRef={ref} ref={lazyRoot}>
                        {displayCards.map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                                showInfo={true}
                                nft={item?.nft_kred?.data}
                                lazyRoot={lazyRoot}
                                defaultInView = {isMobileDevice? index < 2 : index < 5}
                            />
                        ))}
                    </ScrollMenu>
                </Box> ):(
                <Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
                {isMobileDevice ? (
                <ScrollMenu className="no-scrollbar"apiRef={ref}  ref={lazyRoot||ref}>
                  {displayCards.map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                                showInfo={true}
                                nft={item?.nft_kred?.data}
                                defaultInView = {isMobileDevice? index < 2 : index < 5}
                                lazyRoot={lazyRoot}
                            />
                        ))}
                </ScrollMenu>
            ) : (
                <Grid
                    rowGap={10}
                    mt="10px"
                    templateColumns="repeat(4, 1fr)"
                    gap={6} width="100%"
                >
                   {displayCards.map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
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
            </Box>)}
            </Box>
        </>
    );
};

export default NftsCategories;
