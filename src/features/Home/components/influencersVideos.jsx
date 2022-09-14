import { useContext } from "react";
import { Text, Box, SimpleGrid, Flex } from "@chakra-ui/react";
import { AppContext } from "../../../utils/AppContext/index";
import LMMultipleCarousel from "../../../components/LMCarousel/LMMultipleCarousel";
import LMMediaPlayer from "../../../components/LMMediaPlayer";

const InfluencersVideos = () => {
    const videoList = [
        { url: '/assets/videos/CarlosBoozer.mp4' },
        { url: '/assets/videos/LisaLeslie.mp4' },
        // { url: '/assets/videos/Shiba.mp4' }
    ];

    const { isMobileDevice } = useContext(AppContext);
    const { toggleLoginModal, isNotMobile } = useContext(AppContext);

    const slides = videoList.map((item) => {
        return <Box display="inline-block"
            mt={["16px", 0, 0, 0]}
            w="150px"
            h="50px"
            position="relative"
            marginRight={["16px", "30px"]}
            borderRadius="5px"
            cursor="pointer" target="_blank" layout='fill'
            className="borderRadius" objectFit="cover">
            <LMMediaPlayer url={item.url} isNotMobile={isNotMobile} />
        </Box>
    }
    )

    return (
        <Flex
            direction={["column", "row"]}
            h={["fit-content", "fit-content"]}
            background={["transparent", "#1c1c1c"]}
            backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
            m={0}
            mt={["20px", "60px"]}
            align={["flext-start", "center"]}
            pt={[0, "20px", "20px", "20px"]}
            pb={[0, "20px", "20px", "20px"]}
            pl={["20px", "20px", "20px", "60px"]}
            pr={["20px", "20px", "20px", "60px"]}
        >
            {isMobileDevice ? (
                <Text mb={["20px", ""]} flex="0.2" color="white" fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]}>
                    INFLUENCERS VIDEOS
                </Text>
            ) : (
                <Text flex="0.2" color="white" lineHeight={"63px"} fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]}>
                    INFLUENCERS<br></br>VIDEOS
                </Text>
            )}
            <div style={{ flex: isMobileDevice ? 1 : "0.8", whiteSpace: "nowrap", height: "auto", marginTop: "auto", overflowX: "auto", overflowY: "hidden" }}>

                <LMMultipleCarousel disableDots={true} type={"asseen"} slides={slides} />
            </div> 
        </Flex >
    );
};

export default InfluencersVideos;
