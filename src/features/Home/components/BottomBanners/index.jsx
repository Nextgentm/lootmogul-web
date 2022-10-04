import { Text, Box, Link, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { getStrapiMedia } from "../../../../utils/medias";
import { useRouter } from "next/router";
import LMMultipleCarousel from "../../../../components/LMCarousel/LMMultipleCarousel";

const BottomBanners = ({ bannersList }) => {

    const router = useRouter();
    const slides = bannersList.map(({ bannerImage: { data } }, index) => {
        return (
            <Box  key={`bottom-banner-${index}`}
            mt={5}
            mr={4}
            cursor={"pointer"}
            overflow="hidden"
            >
                <Link
                    onClick={() => {
                        router.push("/promotions/" + bannersList[index].slug);
                    }}
                    display="inline-block"
                    pos="relative"
                    width={{base:"90vw",sm:"85vw",md:"800px"}}
                    height={{base:"100px",sm:"100px", md:"220px"}}
                    borderRadius="8px"
                >
                    <Image
                        alt={`action`}
                        layout="fill"
                        className="borderRadius"
                        src={getStrapiMedia(data[0].url)}
                    />
                    {bannersList[index]?.overlay === "live" && (
                        <Image
                            pos="absolute"
                            alt={`action`}
                            layout="fill"
                            src={"/assets/livebanner.webp"}
                            
                        />
                    )}
                    {bannersList[index]?.overlay === "expired" && (
                        <Image
                            pos="absolute"
                            alt={`action`}
                            layout="fill"
                            src={"/assets/completedbanner.webp"}
                        />
                    )}
                </Link>
            </Box>
        );
    });

    return (
        <Box mt={10}>
            <Heading variant="sectionTitle">
            NEW OFFERS &amp; PROMOTIONS
            </Heading>
            <Box >
                {/* <div
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "auto",
                        width: "100%"
                    }}
                > */}
                    <LMMultipleCarousel
                        disableDots={true}
                        type={"featured"}
                        slides={slides}
                    />
                {/* </div> */}
            </Box>
        </Box>
    );
};

export default BottomBanners;
