import { useState, useEffect, useContext } from "react";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AppContext from "../../../utils/AppContext";
import { VerticalLine, PlusIcon } from "../../../components/Icons";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import PromoCard from "../PromoCard";
import strapi from "../../../utils/strapi";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { getStrapiMedia } from "../../../utils/medias";
// import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import Image from "next/image";
import SEOContainer from "../../SEOContainer";
import { useRouter } from "next/router";


const newMarkDownTheme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={2} fontFamily="Sora" color="white" fontSize={["12px", "16px"]}>
                {children}
            </Text>
        );
    },
};

const PromotionDetails = ({ id }) => {

    const [detailedData, setDetailedData] = useState();
    const { isMobileDevice, isNotMobile } = useContext(AppContext);

    const [breadcrumbsPath, setBreadCrumbPath] = useState([
        {
            label: "Home",
            path: "/"
        },
        { label: "Promotion", path: "/promotions" }
    ]);
    useEffect(async () => {
        // fetch user stats

        if (id) {
            const filter = isNaN(id) ? { slug: id } : { id: id };
            const data = await strapi.find("campaigns", {
                filters: filter,
                populate: [
                    "bannerImage"
                ]
            });
            if (data?.data?.length) {

                setDetailedData(data.data[0]);
                setBreadCrumbPath([
                    {
                        label: "Home",
                        path: "/"
                    },
                    { label: "Promotions", path: "/promotions" },
                    { label: data.data?.name }
                ]);
            }
        }
    }, [id]);
    return <Box mr={["18px!important", "60px!important"]}
        ml={["18px!important", "60px!important"]}
        m="auto"
        h="auto"
        textAlign={["left", "center"]}>
        {detailedData && <SEOContainer seoData={detailedData.sharedSeo} content={detailedData} pageName={"promotions"} />}
        {!isMobileDevice ? (<Breadcrumbs
            routes={breadcrumbsPath}
            style={{ mt: "14px", mb: "14px" }}
        />) : (<Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "58px", "58px"]}>
            Promotions
        </Text>)}
        {detailedData && <HeadingBanner isNotMobile={isNotMobile} promotion={detailedData || []} />}
        {detailedData?.details && (<Instructions data={detailedData?.details} />)}
        {detailedData?.terms && (<TermsCondition terms={detailedData?.terms} />)}
    </Box>
}

const HeadingBanner = ({ isNotMobile, promotion }) => {
    const router = useRouter();

    return promotion && (<Box mt={["16px", "40px"]} >
        <Box display={["flex", "none"]}><PromoCard isDetailed={true} promotion={promotion} /></Box>
        <Flex
            w="100%"
            rounded="lg"
            bg="#202020"
            shadow="md"
            display={["none", "flex"]}>
            {promotion.bannerImage &&
                <Box style={{ margin: "15px" }}
                    width="400px"
                    pos="relative"
                > <Image
                        layout="fill"
                        height="178px"
                        width="100%"
                        src={isNotMobile && promotion.bannerImage.data.length === 1 ? getStrapiMedia(promotion.bannerImage.data[0].url) : getStrapiMedia(promotion.bannerImage.data[2].url)}
                        alt="Article"
                    />
                    {promotion?.overlay === "live" && (
                        <Image
                            pos="absolute"
                            alt={`action`}
                            layout="fill"
                            src={"/assets/livebanner.webp"}
                        />
                    )}
                    {promotion?.overlay === "expired" && (
                        <Image
                            pos="absolute"
                            alt={`action`}
                            layout="fill"
                            src={"/assets/completedbanner.webp"}
                        />
                    )}

                </Box>}

            <Box height="100%">
                <VerticalLine height="100%" color="black" />
            </Box>
            <Box p={["12px", "15px"]} textAlign="left">


                <Text
                    mt={2}
                    fontSize={["xs", "sm"]}
                    noOfLines={4}
                    fontWeight="normal"
                    fontFamily={"Sora"}
                    textOverflow="ellipsis"
                    color={"#C7C7C7"}

                    minHeight="75px"
                >
                    {promotion?.description}
                </Text>

                <Box mt={4}>
                    {promotion.status === "active" ? (<Button
                        w="30%"
                        h="38px"
                        mt="1%"
                        size={["lg", "xl"]}
                        onClick={() => {
                            if (promotion.callToAction && promotion.callToAction !== "")
                                router.push(promotion.callToAction);
                        }}
                    >

                        {promotion?.ctaButtonTitle}

                    </Button>) : (<Button
                        w="30%"
                        h="38px"
                        mt="1%"
                        size={["lg", "xl"]}
                        disabled
                    >

                        {promotion?.status}

                    </Button>)}

                </Box>
            </Box>

        </Flex></Box>
    )

}
const Instructions = ({ data }) => {
    return <Box textAlign={"left"} mt={["25px", "30px"]}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{data}</ReactMarkdown>
    </Box>
}
const TermsCondition = ({ terms }) => {
    const [showTerms, setShowTerms] = useState(false);
    return <Box mt={["16px", "40px"]} >
        <Flex onClick={() => { setShowTerms(!showTerms) }}>
            <Box my="auto!important">   {showTerms ? <AiFillMinusCircle my="auto!important" color="#E33535" boxSize="24px" /> : <AiFillPlusCircle my="auto!important" color="#E33535" boxSize="24px" />} </Box> <Text my="auto!important" ml="10px" color="white" fontFamily="Blanch" fontSize={["18px", "18px", "28px", "28px"]}> Terms & Conditions</Text></Flex>
        {showTerms && (<Box textAlign="left" color="White">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{terms}</ReactMarkdown>

        </Box>)}
    </Box>
}
export default PromotionDetails;   