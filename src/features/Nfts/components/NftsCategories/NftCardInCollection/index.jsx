import { Text, Button, Flex, Box, Image, Link } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useBreakpointValue } from '@chakra-ui/react'

const CardInfo = ({ nft, w }) => {
  return (
    <Box
    key={`nftItem-${nft?.id}`}
    bg="#00000088"
    border="1px"
    borderColor="gray.600"
    position={"relative"}
    bottom={"0px"}
    width={w}
    mt="-100px"
    p={"15px"}
    mx={"8%"}
    >
      <Text
        noOfLines={2}
        fontWeight="bold"
        minH="50px"
        color="white"
        fontFamily="Sora"
      >
        {nft?.name}
      </Text>

      {nft?.market_price && (<Flex
        mt={"3%!important"}
        justifyContent="center"
        m={0}
        p={0}
        color="white"
        fontSize={20}
      >
        <Box textAlign={"left"}>
          <Text>{nft?.isAuction ? "Last Bid" : "PRICE: "}</Text>
          {"    "}
        </Box>

        <Text ml="15px" mr="6px" fontWeight="bold">
          {nft?.market_price
            ? " " + nft?.market_price
            : "US $" + nft?.sale_price}
        </Text>
        <Image
          alt="Remaining Time"
          objectFit="contain"
          mt="5px"
          src={
            "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg"
          }
          height="22px"
          width="22px"
        />
      </Flex>)} 

      <Link
        href={nft?.marketURL ? nft?.marketURL : "/"}
        target="_blank"
        _focus={{ border: "none", textDecoration: "none" }}
        _hover={{ textDecoration: "none" }}
      >
        <Button
          className="influencer-card-btn"
          fontSize={20}
          width="90%"
          mt="10px"
        >
          BUY NOW
        </Button>
      </Link>
    </Box>
  );
};

const NftCardInCollection = ({
  nft,
  showInfo = false,
  lazyRoot = null,
  defaultInView = false,
  cardWidth
}) => {
  
  const cardHeight = ["440px","500px","540px"];
  const imageHeight = ["360px","420px","460px"];
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
        objectFit={"fill"}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          convertImage(300, 400)
        )}`}
        placeholder="blur"
        height={"310px"}
        width={"240px"}
        marginTop={"20px"}
        alt={"nft_front" + nft?.id}
        title={nft?.name}
        src={img}
        cursor="pointer"
        quality={50}
        lazyRoot={lazyRoot}
        borderRadius={20}
        style={{
          backgroundImage:`url("/assets/nft_background.png")`,backgroundSize:"cover", backgroundPosition:"center",marginLeft:"37px",marginTop:"35px"}}
      />
    );
  };

  return (
    nft && (
      <><Flex backgroundImage={'url("/assets/nft_background.png")'} backgroundSize={'contain'}><Link
      href={nft?.marketURL ? nft?.marketURL : "/"}
      target="_blank"
      passhref="true"
      _hover={{ textDecoration: "none" }}
      _focus={{ border: "none", textDecoration: "none" }}
      cursor="pointer"
      w="90%"
      h="400px"
    >
      <Box
        textAlign="center"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        
      >
        <Box h={showInfo ? cardHeight : imageHeight} ref={ref} >
          {inView && (
            <ReactCardFlip
              isFlipped={nft?.back_image && nft?.back_image.length ? isFlipped : false}
              flipDirection={"horizontal"}
              infinite={true}
            >
              <Box cursor="pointer" 
              >
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
                      bottom={"0px"}
                      style={{
                        height: "310px",
                        width: "240px",
                        borderRadius: "20px",
                        objectFit: "fill",
                        marginLeft: "37px",
                        marginTop: "30px",
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
                      bottom={"0px"}
                      style={{
                        height: "400px",
                        width: "79%",
                        borderRadius: "20px",
                        objectFit: "fill",
                        marginLeft: "37px",
                        marginTop:"20px"
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
          {showInfo && <CardInfo nft={nft} />}
        </Box>
      </Box>
    </Link></Flex>
      </>
    )
  );
};

export default NftCardInCollection;
