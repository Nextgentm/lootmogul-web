

import {
   
    Box, Flex,
  
} from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Image from "next/image";

const NftCard = ({ NFTS, showInfo = false }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <><Flex style={{
            backgroundImage: `url("/assets/nft_background.png")`, backgroundSize: "cover", backgroundPosition: "center"
          }}>
             <Box
            cursor="pointer"
            m="auto"
            textAlign="center"
            w={"300px"}
            style={{ backgroundImage: `url("/assets/nft_background.png")`, }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <ReactCardFlip
                isFlipped={NFTS?.back_image && NFTS?.back_image.length ? isFlipped : false}
                flipDirection={"horizontal"}
                infinite={true}
                h={"400px"}
            >
                <Box cursor="pointer"
              >
                <Box
                  _focus={{
                    border: "none",
                    textDecoration: "none",
                  }}
                  height={"70%"}
                  width={"70%"}
                  style={{
                    height: "360px",
                    width: "240px",
                    borderRadius: "20px",
                    objectFit: "fill",
                    justifyContent:"center",
                  }}
                >
                  {nft?.front_image?.indexOf(".mp4") > 0 && (
                    <video
                      className="lazy"
                      playsInline
                      key={nft?.id}
                      id={"background-video" + nft.id}
                      loop
                      autoPlay
                      muted
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                        objectFit: "fill",
                      }}
                    >
                      <source src={nft?.front_image} type="video/mp4" />
                      Your browser does not support the Video NFT.
                    </video>
                  )}
                  {nft?.front_image?.indexOf(".mp4") < 0 &&
                    nftImage(nft.front_image)}
                </Box>
              </Box>
              <Box cursor="pointer">
                <Box
                  _focus={{
                    border: "none",
                    textDecoration: "none",
                  }}
                  height={"70%"}
                  width={"70%"}
                  style={{
                    height: "360px",
                    width: "240px",
                    borderRadius: "20px",
                    objectFit: "fill",
                    justifyContent:"center",
                  }}

                >
                  {nft?.back_image?.indexOf(".mp4") > 0 && (
                    <video
                      className="lazy"
                      playsInline
                      key={nft?.id}
                      id={"background-video" + nft.id}
                      loop
                      autoPlay
                      muted
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px",
                        objectFit: "fill",
                      }}
                    >
                      <source src={nft?.back_image} type="video/mp4" />
                      Your browser does not support the Video NFT.
                    </video>
                  )}
                  {nft?.back_image?.indexOf(".mp4") < 0 &&
                    isFlipped &&
                    nftImage(nft.back_image)}
                </Box>
              </Box>
            </ReactCardFlip>

        </Box></Flex></>
       
    );
};

export default NftCard;
