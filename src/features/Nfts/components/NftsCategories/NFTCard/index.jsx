

import {
   
    Box,
  
} from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Image from "next/image";

const NftCard = ({ NFTS, showInfo = false }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Box
            cursor="pointer"
            m="auto"
            textAlign="center"
            w={"300px"}
            h={showInfo ? "520px" : "420px"}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <ReactCardFlip
                isFlipped={NFTS?.back_image && NFTS?.back_image.length?isFlipped:false}
                flipDirection={"horizontal"}
                infinite={true}
                h={"400px"}
            >
                <Box cursor="pointer" m="5">
                    {NFTS.front_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={NFTS.id}
                            id={"background-video" + NFTS.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: "400px", width: "full" }}
                        >
                            <source src={NFTS.front_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}
                    {NFTS.front_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height="400px"
                            width={"300px"}
                            objectFit={"cover"}
                            alt="nft-image"
                            title={NFTS.name}
                            src={NFTS.front_image}
                            cursor="pointer"
                        />
                    )}
                </Box>
                <Box cursor="pointer" m="5">
                    {NFTS.back_image?.indexOf(".mp4") > 0 && (
                        <video
                            key={NFTS.id}
                            id={"background-video" + NFTS.id}
                            loop
                            autoPlay
                            muted
                            style={{ height: "400px", width: "full" }}
                        >
                            <source src={NFTS.back_image} type="video/mp4" />
                            Your browser does not support the Video NFT.
                        </video>
                    )}
                    {NFTS.back_image?.indexOf(".mp4") < 0 && (
                        <Image
                            height="400px"
                            width={"300px"}
                            objectFit={"cover"}
                            alt="nft-image"
                            title={NFTS.name}
                            src={NFTS.back_image}
                            cursor="pointer"
                        />
                    )}
                </Box>
            </ReactCardFlip>

        </Box>
    );
};

export default NftCard;
