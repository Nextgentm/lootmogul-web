import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
    Box,
    Text,
    Flex,
    Wrap,
    WrapItem,
    useMediaQuery,
    Heading,
    Spacer,
    ButtonGroup,
    Button,
    Link,
    VStack,
    Image
} from "@chakra-ui/react";
import GamesCard from "../../../../features/InfluencerDetails/InfluencerGames/InfluencerGameCard";
import { useRef, useState, useEffect } from "react";
import ViewAllBtn from "../../../../components/ViewAllBtn";
import {
    LeftArrow,
    RightArrow
} from "../../../../components/ContentNavigator/arrows";
//import Search from "../../Influencers/components/Search";
import structuredClone from "@ungap/structured-clone";
import Slider from "react-slick";
import { getStrapiMedia } from "../../../../utils/medias";
import { nFormatter } from "../../../../utils/utils";

const GameCategory = ({ isMobileDevice, section, type }) => {
    const ref = useRef();
    const [isLargerScreen] = useMediaQuery("(min-width: 2200px)");
    const arrowTrashhold = isMobileDevice ? 2 : isLargerScreen ? 7 : 5;
    const [showAll, setShowAll] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState({});
    const [contentBackUp, setContentBackUp] = useState({});
    const [currentSlideIndex, setcurrentSlideIndex] = useState(0);

    const horizontalSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(() => {
        setTimeout(() => {      
            if (searchText !== '') {
                if (searchText.length > 0) {
                    const clonedData = structuredClone(content);  
                    clonedData.contestmasters.data =
                    content?.contestmasters?.data.filter((x) =>
                    x.name.toLowerCase().includes(searchText.toLowerCase()));
                setContent(clonedData);
                }            
            }
            else {
                setContent(section);
            }
            
        }, 1000);
        
    }, [searchText]);

    useEffect(() => {
        setContent(section);
        setContentBackUp(section);
    }, [section]);

    return (
        <Box className="gameslider">
            <>
            <Slider {...horizontalSettings}>
                {content.name == type && content?.contestmasters?.data?.length > 0 && content?.contestmasters?.data
                                ?.sort((a, b) => a.priority - b.priority)
                    .map((cm, index) => (
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/" + cm?.slug}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={index}
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
                                    height={["350px", "350px", "170px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "150px"]}
                                            src={getStrapiMedia(cm?.icon?.data?.url)}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack>
                            <Flex>
                                <Text
                                    mt={"5px"}
                                    color="#FDFFE5"
                                    fontSize={["15px"]}
                                    fontWeight={"600"}
                                    align={"left"}
                                    textOverflow="ellipsis"
                                    overflow="visible"
                                >
                                    {cm.name}
                                </Text>
                            </Flex>
                            <Flex
                                w={"full"}
                                align="left"
                                justify={"space-between"}
                                px="0"
                            >
                                <VStack style={{ "align-items": "flex-start" }}>
                                    <Flex>
                                        <Image
                                            alt="tag"
                                            boxSize={["15px", "17px"]}
                                            src="/assets/Icon.png"
                                            mt="3px"
                                        />
                                        <Text
                                            ml="6px"
                                            color="#FFF"
                                            fontSize={["13px", "14px"]}
                                            fontWeight="400"
                                        >
                                            {cm.entryFee != 0
                                                ? "Entry Fee - " +
                                                cm.entryFee +
                                                " CHIPS"
                                                : "Free"}
                                        </Text>
                                    </Flex>
                                    <Text
                                        color="#FFF"
                                        fontSize={["12px", "13px"]}
                                        fontWeight="200"
                                        mt={0}
                                        pl="6px"
                                    >
                                        {cm?.game?.data?.config?.game ==
                                        "marketjs"
                                            ? nFormatter(cm?.playCount, 1)
                                            : nFormatter(cm?.roomsCount, 1) *
                                            2}{" "}
                                        Players Played
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex>
                            {cm &&
                            cm.contest &&
                            (cm?.contest?.status === "active") && (
                                <Button
                                    variant="solid"
                                    h={["25px", "25px"]}
                                    fontSize={["15px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="25px"
                                >
                                    Play Now
                                </Button>
                            )}
                            </Flex>
                        </Link>
                    </Box>
                    )   
                )}
                </Slider>
            </>
        </Box>
    );
};

export default GameCategory;