import { useContext, useState } from "react";
import dynamic from 'next/dynamic';
import { Text, Box, SimpleGrid, Flex, Image } from "@chakra-ui/react";
import { AppContext } from "../../../../utils/AppContext/index";
import LMMultipleCarousel from "../../../../components/LMCarousel/LMMultipleCarousel";
const LMMediaPlayer = dynamic(() => import("../../../../components/LMMediaPlayer")) ;
const LMModal = dynamic(() => import("../../../../components/LMModal")) ;
// import { AiFillYoutube } from "react-icons/ai";

const InfluencerVideos = () => {
    const videoList = [
        {
            url: "mP_A16oo9Ms",
            img: "/assets/videos/Lisa_Leslie.webp"
        },
        {
            url: "OmZiLnDJqyM",
            img: "/assets/videos/Carlos_Boozer.webp"
        },
        {
            url: "ikNLfDywg08",
            img: "/assets/videos/Angela-D.-Weathers.webp"
        },
        {
            url: "jm9vMJF6TRk",
            img: "/assets/videos/Mario-Chalmers.webp"
        }
    ];

    const { isMobileDevice } = useContext(AppContext);
    const { isNotMobile } = useContext(AppContext);
    const [showModal, setShowModal] = useState({ show: false, file: "" });
    const slides = videoList.map((item) => {
        return (
            <Box
                display="inline-block"
                pos="relative"
                mt={["16px", 0, 0, 0]}
                marginRight={["16px", "30px"]}
                borderRadius="5px"
                cursor="pointer"
                className="borderRadius"

                onClick={() => {
                    setShowModal({ show: true, file: item.url });
                }}
            >
                <Flex
                    ml="2%"
                    background={"#000000"}
                    width={["95%", "280px", "316px", "450px"]}
                    justifyContent={["center", "center"]}
                >
                    {/* <Box  position="relative" pos="absolute" top="40%" left="45%"> */}
                    {/* <AiFillYoutube fill ="white" opacity={"0.65"} style={{width:"5em",height:"5em"}} /> */}
                    {/* </Box> */}
                    <Image alt="ambas" objectFit={"cover"} src={item.img} />
                </Flex>
                {/* <LMMediaPlayer url={item.url} isNotMobile={isNotMobile} /> */}
            </Box>
        );
    });

    return (
        <Flex
            direction={["column", "row"]}
            h={["fit-content", "fit-content"]}
            background={["transparent", "#1c1c1c"]}
            backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
            m={0}
            mt={["20px", "60px"]}
            align={["flext-start", "center"]}
            py={[0, "20px", "20px", "20px"]}
            px={["20px", "20px", "20px", "60px"]}
        >
            {isMobileDevice ? (
                <Text
                    mb={["20px", ""]}
                    flex="0.2"
                    color="white"
                    fontFamily="Blanch"
                    fontSize={["28px", "", "38px", "58px"]}
                >
                    BRAND AMBASSADOR VIDEOS
                </Text>
            ) : (
                <Text
                    flex="0.2"
                    color="white"
                    lineHeight={"63px"}
                    fontFamily="Blanch"
                    fontSize={["28px", "", "28px", "58px"]}
                >
                    BRAND AMBASSADOR<br></br>VIDEOS
                </Text>
            )}
            <div
                style={{
                    flex: isMobileDevice ? 1 : 0.8,
                    whiteSpace: "nowrap",
                    marginTop: "auto",
                    overflowX: "auto",
                    overflowY: "hidden"
                }}
            >
                <LMMultipleCarousel
                    disableDots={false}
                    type={"testimonial"}
                    slides={slides}

                />
            </div>
            <LMModal
                isShow={showModal.show}
                scrollBehavior="outside"
                mode={showModal.show}
                size="xl"
                handleClose={() => setShowModal(false)}
            >
                <LMMediaPlayer url={showModal.file} isNotMobile={isNotMobile} />
            </LMModal>
        </Flex>
    );
};

export default InfluencerVideos;