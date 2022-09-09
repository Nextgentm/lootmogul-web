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
    Center
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import moment from "moment";
import CardNavigator from "../../../../components/CardNavigator";


const NftsCategories = ({ NFTS, isSelectedCat, index }) => {
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
    const handleClick = (e) => {
        router.push({
            pathname: "/nfts/[id]",
            query: { id: NFTS.slug }

        });
   

    };

    return (
        <>
        {router.pathname==="/nfts/[id]" ?(<> <Grid
                            // className="no-scrollbar"
                            // apiRef={ref}
                            // ref={lazyRoot || ref}
                            templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(, 1fr)','repeat(3, 1fr)']}
                        >
                            {displayCards.map((item, index) => (
                                <GridItem>
                                <NftCard
                                    style={{ w: "250px", mr: "30px", mt: "10px" }}
                                    itemId={`nftcard-${index}`}
                                    key={`nftcard-${index}`}
                                    slug={item.slug}
                                    showInfo={true}
                                    nft={item?.nft_kred?.data}
                                    // defaultInView={
                                    //     isMobileDevice ? index < 2 : index < 5
                                    // }
                                    // lazyRoot={lazyRoot}
                                />
                                </GridItem>
                            ))}
                        </Grid></>):(<>
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
                                        isMobileDevice ? index < 2 : index < 5
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
            ) : (
                <Grid
                    templateColumns={[
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(1, 1fr)",
                        "repeat(12, 1fr)",
                        "repeat(12, 1fr)"
                    ]}
                    w={"100%"}
                    mt={["2em", "2em", "2em", "3em", "5em"]}
                >
                    <GridItem
                        colSpan={5}
                        order={[2, 2, 2, index % 2 == 0 ? 1 : 3]}
                    >
                        <Box pl={"20%"} pr="10%" w="100%" mt="5em">
                            <Box
                                w="100%"
                                h={"2px"}
                                bg="#FFF"
                                display={[
                                    "none",
                                    "none",
                                    "none",
                                    "block",
                                    "block"
                                ]}
                            />
                            <VStack align="left">
                                <Text
                                    color="white"
                                    fontFamily="Blanch"
                                    fontSize={[
                                        "50px",
                                        "50px",
                                        "50px",
                                        "45px",
                                        "50px"
                                    ]}
                                    mt="20px"
                                    fontWeight="bold"
                                >
                                    {NFTS.name}
                                </Text>
                                <Flex alignItems="center">
                                    <Text
                                        color="white"
                                        fontFamily="Blanch"
                                        fontSize={[
                                            "30px",
                                            "30px",
                                            "30px",
                                            "22px",
                                            "30px"
                                        ]}
                                        fontWeight="normal"
                                    >
                                        Released on :
                                    </Text>
                                    <Text
                                        color="white"
                                        // fontFamily="Blanch"
                                        fontSize={[
                                            "20px",
                                            "20px",
                                            "20px",
                                            "15px",
                                            "20px"
                                        ]}
                                        fontWeight="normal"
                                        ml={[
                                            "6px",
                                            "6px",
                                            "6px",
                                            "0.5em",
                                            "1em"
                                        ]}
                                    >
                                        {" "}
                                        {moment(NFTS.createdAt).format(
                                            "MMMM Do, YYYY"
                                        )}
                                    </Text>
                                </Flex>
                                <Text
                                    color="white"
                                    fontFamily="Blanch"
                                    fontSize={[
                                        "30px",
                                        "30px",
                                        "30px",
                                        "27px",
                                        "30px"
                                    ]}
                                    mt="20px"
                                >
                                    {NFTS.description}
                                </Text>
                                <Button
                                    mt={[
                                        "2em !important",
                                        "2em !important",
                                        "3em !important",
                                        "3em !important",
                                        "3em !important"
                                    ]}
                                    fontSize="24px"
                                    width="200px"
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
                            w="2px"
                            h={"100%"}
                            bg="#FFF"
                            display={["none", "none", "none", "block", "block"]}
                        />
                    </GridItem>

                    <GridItem
                        order={[1, 1, 1, index % 2 == 0 ? 3 : 1]}
                        colSpan={6}
                    >
                        <Center>
                            <CardNavigator
                                showArrows={true}
                                handleLeftArrowClick={() =>
                                    ref.current.scrollPrev()
                                }
                                handleRightArrowClick={() =>
                                    ref.current.scrollNext()
                                }
                            >
                                <Box w={"500px"}>
                                    <ScrollMenu
                                        
                                        options={{
                                            ratio: 0.9,
                                            rootMargin: "5px",
                                            threshold: [
                                                0.01, 0.05, 0.5, 0.75, 0.95, 1
                                            ]
                                        }}
                                        apiRef={ref}
                                        ref={lazyRoot}
                            px="10px"

                                    >
                                        {displayCards.map((item, index) => (
                                            <NftCard
                                                style={{
                                                    transform:
                                                        "translateX(40px) !important",
                                                    mr: "30px",
                                                    mt: "10px"
                                                }}
                                                itemId={`nftcard-${index}`}
                                                key={`nftcard-${index}`}
                                                slug={item.slug}
                                                showInfo={true}
                                                nft={item?.nft_kred?.data}
                                                lazyRoot={lazyRoot}
                                                defaultInView={
                                                    isMobileDevice
                                                        ? index < 2
                                                        : index < 5
                                                }
                                            />
                                        ))}
                                    </ScrollMenu>
                                </Box>
                            </CardNavigator>
                        </Center>
                    </GridItem>
                </Grid>
            )}</>)}
           
        </>
    );
};

export default NftsCategories;
