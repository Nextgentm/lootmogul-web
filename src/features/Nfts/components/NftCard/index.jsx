import { Text, Button, Flex, Box, Image, Link, Grid, GridItem, VStack, LinearGradient } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { NextURL } from "next/dist/server/web/next-url";
const cardWidth = "290px";
const cardHeight = "440px";
const infoboxWidth = "260px";
const imageHeight = "370px";

import styled from 'styled-components';

const Div = styled.div`
--b: 8px;   /* thickness of the border */
  --c: #E90A63;   /* color of the border */
  --w: 60px;  /* width of border */
  

  padding: var(--b); /* space for the border */
  
  position:relative;
  /*Irrelevant code*/  
  width:300px;
  height:400px;
  box-sizing:border-box;
  margin:0px;
  display:inline-flex;
  font-size:30px;
  justify-content:center;
  align-items:center;
  text-align:center;
&::before{
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c,transparent);
  padding: var(--b);
  border-radius: var(--r);
  -webkit-mask:
    linear-gradient(  0deg,#000 calc(2*var(--b)),#0000 0) 50% var(--b)/calc(100% - 2*var(--w)) 100% repeat-y,
    linear-gradient(-90deg,#000 calc(2*var(--b)),#0000 0) var(--b) 50%/100% calc(100% - 2*var(--w)) repeat-x,
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: destination-out;
          mask-composite: exclude;
}
`;
const NftCard = ({
  nft,
  showInfo = false,
  lazyRoot = null,
  defaultInView = false,
}) => {

  const [isFlipped, setIsFlipped] = useState(false);
  const { isMobileDevice } = useContext(AppContext);

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: defaultInView,
    triggerOnce: true,
  });
  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);


  const nftImage = (img) => {
    return (
    <><Image
    layout="intrinsic"
    objectFit={"cover"}
    blurDataURL={`data:image/svg+xml;base64,${toBase64(
      convertImage(300, 400)
    )}`}
    placeholder="blur"
    height={imageHeight}
    width={cardWidth}
    alt={"nft_front" + nft?.id}
    title={nft?.name}
    src={img}
    cursor="pointer"
    quality={50}
    lazyRoot={lazyRoot} />
    </>
    );
  };

  return (
    nft && (
      <Grid
        w={"100%"}
      >
        <GridItem colSpan={2} align="center">

          <Box w="100%"
            bg="#e3e3e3"
          />
            <Link
              href={nft?.marketURL ? nft?.marketURL : "/"}
              target="_blank"
              passhref="true"
              _hover={{ textDecoration: "none" }}
              _focus={{ border: "none", textDecoration: "none" }}
              cursor="pointer"
              w="100%"
            >
              <Box
                textAlign="center"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                  {inView && (
                   <ReactCardFlip
                      isFlipped={nft?.back_image && nft?.back_image.length ? isFlipped : false}
                      flipDirection={"horizontal"}
                      infinite={true}
                    >
                      <Box cursor="pointer"
                      >
                        
                        <Div>
                          <Box
                          _focus={{
                            border: "none",
                            textDecoration: "none",
                          }}
                          height={imageHeight}
                          width={cardWidth}
                          

                        >
                          {nft?.front_image?.indexOf(".mp4") > 0 && (
                            <video
                              className="lazy"
                              playsinline
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
                        </Box></Div>
                        
                      </Box>
                      <Box cursor="pointer">
                     <Div><Box
                          _focus={{
                            border: "none",
                            textDecoration: "none",
                          }}
                          height={imageHeight}
                          width={cardWidth}
                          
                        >
                          {nft?.back_image?.indexOf(".mp4") > 0 && (
                            <video
                              className="lazy"
                              playsinline
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
                        </Box></Div>   
                      </Box>
                    </ReactCardFlip>

                  )}
               
              </Box>
            </Link>
          <VStack align="center">
            <Text
              color="white"
              fontFamily="Sora"
              fontSize={["18px", "18px"]}
              align="center"
              fontWeight="bold"
            >
              {nft?.name}
            </Text>
            <Flex alignItems="center">
              <Text
                color="white"
                fontFamily="Sora"
                fontSize={["17px", "20px"]}
                fontWeight="normal"
              >
                {nft?.market_price && (<Flex
                  justifyContent="center"
                  color="white"
                  fontSize={13}
                >
                  <Box textAlign={"center"}>
                    <Text>{nft?.isAuction ? "Last Bid" : "PRICE: "}</Text>
                    {"    "}
                  </Box>

                  <Text fontWeight="bold">
                    {nft?.market_price
                      ? " " + nft?.market_price
                      : "US $" + nft?.sale_price}ETH
                  </Text>
                  <Image
                    alt="Remaining Time"
                    objectFit="contain"
                    src={
                      "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
                    }
                    height="22px"
                    width="22px"
                  />
                </Flex>

                )}
              </Text>


            </Flex>
            <Link
              href={nft?.marketURL ? nft?.marketURL : "/"}
              target="_blank"
              _focus={{ border: "none", textDecoration: "none" }}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                fontSize={10}
                size="lg"
                colSpan={6}
                height={"5px"}
                width={"250px"}
              >
                BUY NOW
              </Button>
            </Link>

          </VStack>

        </GridItem>



      </Grid>))
};

export default NftCard;
