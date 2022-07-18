import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useRef } from "react";
import { useRouter } from "next/router";
import NftCard from "../NftCard";
import { Text, Flex, Box, Grid } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";

import ContentNavigator from "../../../../components/ContentNavigator";
const NftsCategories = ({ NFTS, isSelectedCat }) => {
    const ref = useRef();
    const router = useRouter();
    const { isMobileDevice } = useContext(AppContext);
    const arrowThreshold = isMobileDevice ? 2 : 5;

    return (
        <>
            <Box
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
                mt="30px"
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
                        showArrows={NFTS?.nftSet?.length > arrowThreshold}
                        handleLeftArrowClick={() => ref.current.scrollPrev()}
                        handleRightArrowClick={() => ref.current.scrollNext()}
                        onViewAllClicked={() =>
                            router.push({ pathname: "/nfts/" + NFTS.slug })
                        }
                    />}
                </Flex>
                {!isSelectedCat ?(<Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
                    <ScrollMenu className="no-scrollbar" apiRef={ref}>
                        {NFTS.nftSet?.sort((a,b) => a.priority - b.priority).map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                                showInfo={true}
                                nft={item?.nft_kred?.data}
                            />
                        ))}
                    </ScrollMenu>
                </Box> ):(
                <Box ml={{ base: "-15px", sm: "10px", md: "15px" }}>
                {isMobileDevice ? (
                <ScrollMenu className="no-scrollbar">
                  {NFTS.nftSet?.sort((a,b) => a.priority - b.priority).map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                                showInfo={true}
                                nft={item?.nft_kred?.data}
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
                   {NFTS.nftSet?.sort((a,b) => a.priority - b.priority).map((item, index) => (
                            <NftCard
                                style={{ w: "250px", mr: "30px", mt: "10px" }}
                                itemId={`nftcard-${index}`}
                                key={`nftcard-${index}`}
                                slug={item.slug}
                               showInfo={true}
                                nft={item?.nft_kred?.data}
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
