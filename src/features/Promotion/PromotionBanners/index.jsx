import { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../utils/medias";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";
import Image from "next/image";
import { AppContext } from "../../../utils/AppContext/index";
import { imgCntainer } from "./styles";
import LMSingleCarousel from "../../../components/LMCarousel/LMSingleCarousel";



const PromotionBanners = ({ bannersList }) => {
    const router = useRouter();
    const { isMobileDevice, isNotMobile } = useContext(AppContext);

    const callToAction = (item) => {
        if (item.callToAction && item.callToAction !== "")
            router.push(item.callToAction);
        else if (item.redirectURL) window.open(item.redirectURL, "_blank");
    };
    return (
        <Box position="relative" mt={["20px", "30px"]}>
            <Box {...imgCntainer(isMobileDevice)}>
                <LMSingleCarousel isPromotion={true} disableDots={true}>
                    {bannersList.map((item, index) => {
                        return (
                            <Box
                                pos="relative"
                                w={["100%", "100%", "720px", "720px", "720px"]}
                                key={`top-banner-${index}`}
                            >
                                <Box
                                    onClick={(e) => {
                                        e.preventDefault();
                                        callToAction(item);
                                    }}
                                    cursor="pointer"
                                    textAlign={"center"}
                                    pos="relative"
                                    borderRadius="10px"
                                    margin="20px"
                                    h={[
                                        "120px",
                                        "120px",
                                        "240px",
                                        "240x",
                                        "240px"
                                    ]}
                                >
                                    <Image
                                        alt={`action`}
                                        src={
                                            isNotMobile ||
                                            item.bannerImage.data.length == 1
                                                ? getStrapiMedia(
                                                      item.bannerImage.data[0]
                                                          .url
                                                  )
                                                : getStrapiMedia(
                                                      item.bannerImage.data[1]
                                                          .url
                                                  )
                                        }
                                        layout="fill"
                                    />
                                    {item?.overlay === "live" && (
                                        <Image
                                            pos="absolute"
                                            alt={`action`}
                                            layout="fill"
                                            src={"/assets/livebanner.webp"}
                                        />
                                    )}
                                    {item?.overlay === "expired" && (
                                        <Image
                                            pos="absolute"
                                            alt={`action`}
                                            layout="fill"
                                            src={"/assets/completedbanner.webp"}
                                        />
                                    )}
                                </Box>
                            </Box>
                        );
                    })}
                </LMSingleCarousel>
            </Box>
        </Box>
    );
};

export default PromotionBanners;
