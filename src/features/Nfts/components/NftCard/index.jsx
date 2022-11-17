import { Text, Button, Flex, Box, Image, Link } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { NextURL } from "next/dist/server/web/next-url";
const cardWidth = "290px";
const cardHeight ="440px";
const infoboxWidth = "260px";
const imageHeight = "370px";

// const CardInfo = ({ nft }) => {
//   return (
    
//   );
// };

const NftCard = ({
  nft,
  showInfo = false,
  lazyRoot = null,
  defaultInView = false,
}) => {
  
  const [isFlipped, setIsFlipped] = useState(false);

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
      <Image
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
        lazyRoot={lazyRoot}
      />
    );
  };

  return (
    nft && (
      <Link
        href={nft?.marketURL ? nft?.marketURL : "/"}
        target="_blank"
        mx="auto"
        passhref="true"
        _hover={{ textDecoration: "none" }}
        _focus={{ border: "none", textDecoration: "none" }}
        cursor="pointer"
       // mr={["10px", "30px", "30px"]}
        w={cardWidth}
        h={showInfo ? cardHeight : imageHeight}
        minH={showInfo ? cardHeight : imageHeight}
      >
        <Box
          textAlign="center"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
         >
          <Box h={cardHeight} minH={cardHeight} ref={ref}>
            {inView && (
              <ReactCardFlip
                isFlipped={
                  nft?.back_image && nft?.back_image.length ? isFlipped : false
                }
                flipDirection={"horizontal"}
                infinite={true}
                style={{backgroundImage:`url("/assets/nft_background.png")`}}
              >
                <Box cursor="pointer">
                  <Box
                    _focus={{
                      border: "none",
                      textDecoration: "none",
                    }}
                    height="50%"
                    width={cardWidth}
                    style={{backgroundImage:`url("/assets/nft_background.png")`,}}
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
                          height: "50%",
                          width: "100%" ,
                          objectFit: "fill",
                          backgroundImage:`url("/assets/nft_background.png")`,
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
                    height="50%"
                    width={cardWidth}
                  >
                    {nft?.back_image?.indexOf(".mp4") > 0 && (
                      <video
                        className="lazy"
                        playsinline
                        key={nft.id}
                        id={"background-video" + nft.id}
                        loop
                        autoPlay
                        muted
                        style={{
                          height: "50%",
                          width: "100%" ,
                          objectFit: "fill",
                          backgroundImage:`url("/assets/nft_background.png")`,
                          backgroundSize: "500px 500px"
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
            )}
            {showInfo && <Box
      key={`nftItem-${nft?.id}`}
    >
      <Text
        fontWeight="bold"
        color="white"
        fontFamily="Sora"
      >
        {nft?.name}
      </Text>

      { nft?.market_price && (    <Flex
        justifyContent="center"
        color="white"
        fontSize={13}
      >
        <Box textAlign={"left"}>
          <Text>{nft?.isAuction ? "Last Bid" : "PRICE: "}</Text>
          {"    "}
        </Box>

      <Text fontWeight="bold">
          {nft?.market_price
            ? " " + nft?.market_price
            : "US $" + nft?.sale_price}
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
      <Link
        href={nft?.marketURL ? nft?.marketURL : "/"}
        target="_blank"
        _focus={{ border: "none", textDecoration: "none" }}
        _hover={{ textDecoration: "none" }}
      >
        <Button
          fontSize={12}
        >
          BUY NOW
        </Button>
      </Link>
    </Box>}
          </Box>
          
        </Box>
        
      </Link>
    )
  );
};

export default NftCard;
