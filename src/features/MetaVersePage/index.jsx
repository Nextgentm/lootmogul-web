import { useContext, useState, useEffect } from "react";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Image from "next/image";
import LMVideoPlayer from "../../components/LMVideoPlayer";
import { VolumeIcon } from "../../components/Icons";
import { AppContext } from "../../utils/AppContext";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const MetaVersePage = ({ type }) => {

    const newMarkDownTheme = {
        p: props => {
            const { children } = props;
            return (
                <Text mb={2} fontFamily="Sora!important" color="white!important" fontSize={'16px'}>
                    {children}
                </Text>
            );
        },
    };

    const { isTabletOrDesktop, isTabletOrMobile } = useContext(AppContext);
    const router = useRouter();
    const defaultData = { type: "video", src: "/assets/videos/Exterior_block_numbers_Crypto_Arena.mp4", label: "overview", isSelected: true };
    const interiorData = { type: "iframe", src: "https://mls.kuu.la/share/collection/7v1XZ?fs=1&vr=1&zoom=1&sd=1&thumbs=1", label: "interior", isSelected: true };
    const exteriorData = { type: "iframe", src: "https://mls.kuu.la/share/collection/7v1kl?fs=1&vr=1&zoom=1&sd=1&thumbs=1", label: "exterior", isSelected: true };
    const seatData = { type: "iframe", src: "https://mls.kuu.la/share/collection/7vKlp?fs=1&vr=1&zoom=1&sd=1&thumbs=1", label: "seats", isSelected: true };
    const [showData, setShowData] = useState(defaultData);
    const [mute, setMute] = useState(true);
    useEffect(() => {
        if (!type) {
            setShowData(defaultData);
        } else if (type === "stadium-exterior-nft") setShowData(exteriorData);
        else if (type === "stadium-internal-nft") setShowData(interiorData);
        else if (type === "seats-nft") setShowData(seatData);
    }, [type])
    return (
        <Box width={"100%"}>
            {showData && showData.type === "video" && <Box pos="relative" width={"100%"} height="490px" mb="3%">

                <LMVideoPlayer mute={mute} url={showData.src} play={true} loop={true} />
                {/* <VolumeIcon
                  mt="2px"
                  pos="absolute"
                  top="20px"
                  right="20px"
                  viewBox="0 0 40 40"
                  boxSize={"24px"}
                  cursor="pointer"
                  color={mute?"white":"primary"}
                  onClick={()=>setMute(!mute)}
                
                />
           */}
            </Box>
            }
            {showData && showData.type === "iframe" && <Box w="100%" pos="relative"
            >
                <iframe id="3dview" src={showData.src}
                    scrolling="no" allowtransparency="true" allowFullScreen="true"
                    style={{ width: "100%", height: isTabletOrDesktop ? "550px" : "300px", border: 0, overflow: "hidden", marginBottom: "3%" }}
                ></iframe>
            </Box>
            }
            <Flex width="100%" my="2%" p="20px" direction={["column", "row"]} justifyContent={["center", "space-around"]}>
                <Box width="100%" m="auto" textAlign={"center"} mb="2%">   <Image style={{ cursor: "pointer" }} onClick={() => {
                    setShowData(exteriorData); router.push({
                        pathname: '/metaverse/stadium-exterior-nft'
                    },
                        undefined, { shallow: true }
                    )
                    if (window) window.scrollTo(0, 0)
                }} src={showData.label === "exterior" ? "/assets/Exterior NFT_selected.png" : "/assets/Exterior NFT_normal.png"} alt="exterior" width={isTabletOrMobile ? "230px" : "270px"} height="200px" />
                </Box><Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image style={{ cursor: "pointer" }} onClick={() => {
                    setShowData(interiorData); router.push({
                        pathname: '/metaverse/stadium-internal-nft'
                    },
                        undefined, { shallow: true }
                    );
                    if (window) window.scrollTo(0, 0)
                }} src={showData.label === "interior" ? "/assets/Interior NFT_selected.png" : "/assets/Interior NFT_normal.png"} alt="exterior" width={isTabletOrMobile ? "230px" : "270px"} height="200px" />
                </Box>
                <Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image style={{ cursor: "pointer" }} onClick={() => {
                    setShowData(seatData);

                    router.push({
                        pathname: '/metaverse/seats-nft'
                    },
                        undefined, { shallow: true }
                    )

                    if (window) window.scrollTo(0, 0)
                }} src={showData.label === "seats" ? "/assets/Seat_NFT_selected.png" : "/assets/Seat_NFT_normal.png"} alt="seat" width={isTabletOrMobile ? "230px" : "270px"} height="200px" />
                </Box>
            </Flex>
            <Box
                m="4%"
                mt="2%"
                paddingLeft={["4%", "6%"]}
                paddingRight={["4%", "6%"]}
                color="white"
                fontFamily={"Sora"}
                textAlign="justify"
                pb="4%"
            >
                <Heading mt="2%" pt="1%" mb="1%">What is metaverse ?</Heading>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]}
                    skipHtml>{'Metaverse is a virtual world powered by blockchain technology, where users can access an array of things including gaming, shopping, and more. The members can avail avatars, own merchandise, interact with each other, promote brands, etc. This will mostly happen in the form of NFTs. In the near future, this is going to be a new era in the digital economy and will be a primary contributor to the world economy.'}</ReactMarkdown>

                <Heading mt="1%" pt="1%" mb="1%">Why LootMogul Metaverse ?</Heading>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{'LootMogul is an athlete-led sports metaverse (web 3 platform) that is powered by virtual cities, real estates, training academies, blockchain games, commerce (NFTs), and in-real-life (IRL) rewards. You can own lands, studios, stadiums, experience hubs, brand spaces, and seats for a lifetime. Also, you can interact and engage with sports athletes and other fans within the space.'}</ReactMarkdown>

                <Heading mt="1%" pt="1%" mb="1%">Benefits of LootMogul Metaverse ?</Heading>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{'LootMogul Metaverse properties not only give you access to the space and the community but also come with additional benefits.'}</ReactMarkdown>
                <Heading as='h3' size='lg' mt="0.5%" pt="0.5%" mb="0.5%">Brand Space NFTs</Heading>
                <ul>
                    <li>
                        <Text>Use Brand Spaces you own to promote your Brand</Text>
                    </li>
                    <li>
                        <Text> Connect your website to your Brand Space </Text>
                    </li>
                    <li>
                        <Text> You can also Lease or rent your space to Earn</Text>
                    </li>
                    <li>
                        <Text> Get access to Influencers, live events, stores, offers, and future drops</Text>
                    </li>
                    <li>
                        <Text>Brand Spaces come in form of NFTs and can be traded on OpenSea Market</Text>
                    </li>
                </ul>

                <Heading as='h3' size='lg' mt="0.5%" pt="0.5%" mb="0.5%">Seat NFTs</Heading>
                <ul>
                    <li>
                        <Text>Customize your seats using your images/avatar</Text>
                    </li>
                    <li>
                        <Text> Connect and Play with your favorite sports influencer in the Metaverse </Text>
                    </li>
                    <li>
                        <Text> Play-to-Earn Games</Text>
                    </li>
                    <li>
                        <Text> Earn In-real-life rewards</Text>
                    </li>
                    <li>
                        <Text>Get access to live events, stores, offers, and future drops</Text>
                    </li>
                    <li>
                        <Text>Seats inside the stadium come in form of NFTs and can be traded on OpenSea Market</Text>
                    </li>
                </ul>
            </Box>
        </Box>
    );
}
export default MetaVersePage;