import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NftDetailBanner = ({
    getBannerImage,
    selectedCategory
}) => {
    const router = useRouter();
    const [bannerUrl, setBannerUrl] = useState("");
  
    useEffect(() => {
        let details = getBannerImage();
        if (router.pathname === "/nfts") {
            setBannerUrl("");
        } else {
            setBannerUrl(details);
        }
    }, [selectedCategory]);

    return (
        <Box mx={"-6vw"}>
            <Image
                alt={`nft-banner`}
                src={bannerUrl}
                className="custom-img"
                layout="fill"
                objectFit={"fill"}
                w="100%"
            />
        </Box>
    );
};

export default NftDetailBanner;
