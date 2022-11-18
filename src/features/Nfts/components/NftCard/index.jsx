import { Text, Button, Flex, Box, Image, Link, Grid, GridItem, VStack } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { NextURL } from "next/dist/server/web/next-url";
const cardWidth = "290px";
const cardHeight ="440px";
const infoboxWidth = "260px";
const imageHeight = "370px";


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
      <Image
        layout="intrinsic"
        objectFit={"cover"}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          convertImage(300, 400)
        )}`}
        placeholder="blur"
        height={"300px"}
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
    (isMobileDevice ? (    nft && (
      <Grid
   templateColumns={[
     "repeat(1, 1fr)",
     "repeat(1, 1fr)",
     "repeat(1, 1fr)",
     "repeat(1, 1fr)",
     "repeat(1, 1fr)",
     "repeat(1, 1fr)",
   ]}
   w={"100%"}
   my={[10,10,10, 10, 20]}
 >
   <GridItem colSpan={5} order={[2, 2, 2, 2, 2]}>
    
       <Box w="100%"
         bg="#e3e3e3"
         display={["none", "none", "none", "block"]}
       />
       <Flex style={{
       backgroundImage: `url("/assets/nft_background1.png")`, backgroundSize: "contain", backgroundPosition: "center"
     }}>
       <Link
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
                 height="80%"
                 width="80%"
                 style={{
                   height: "300px",
                   width: "240px",
                   borderRadius: "20px",
                   objectFit: "fill",
                   position:"cover",
                   marginLeft:"40px",
                   marginTop: "42px",
                   marginBottom:"10px"
                 }}
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
                 height="70%"
                 width="80%"
                 style={{
                   height: "260px",
                   width: "240px",
                   borderRadius: "20px",
                   objectFit: "fill",
                   position:"cover",
                   marginLeft:"30px",
                   marginTop: "48px",
                   marginBottom:"0px"
                 }}

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

         )}
         </Box>
         </Box>
         </Link>
         </Flex>
       <VStack align="center">
         <Text
           color="white"
           fontFamily="Sora"
           fontSize={["18px", "18px"]}
           mt={[1,5,5,5]}
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
             { nft?.market_price && (    <Flex
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
       style={{height:"10px",width:"50px"}}
     >
       BUY NOW
     </Button>
   </Link>
        
       </VStack>
     
   </GridItem>
  

   
 </Grid>)):(    nft && (
       <Grid
    templateColumns={[
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
    ]}
    w={"100%"}
    my={[10,10,10, 10, 20]}
  >
    <GridItem colSpan={5} order={[2, 2, 2, 2, 2]}>
     
        <Box w="100%"
          bg="#e3e3e3"
          display={["none", "none", "none", "block"]}
        />
        <Flex style={{
        backgroundImage: `url("/assets/nft_background1.png")`, backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <Link
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
                  height="80%"
                  width="80%"
                  style={{
                    height: "300px",
                    width: "240px",
                    borderRadius: "20px",
                    objectFit: "fill",
                    position:"cover",
                    marginLeft:"10px",
                    marginTop: "48px",
                    marginBottom:"0px"
                  }}
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
                  height="70%"
                  width="80%"
                  style={{
                    height: "260px",
                    width: "240px",
                    borderRadius: "20px",
                    objectFit: "fill",
                    position:"cover",
                    marginLeft:"10px",
                    marginTop: "48px",
                    marginBottom:"0px"
                  }}

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

          )}
          </Box>
          </Box>
          </Link>
          </Flex>
        <VStack align="center">
          <Text
            color="white"
            fontFamily="Sora"
            fontSize={["18px", "18px"]}
            mt={[1,5,5,5]}
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
              { nft?.market_price && (    <Flex
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
        style={{height:"10px",width:"50px"}}
      >
        BUY NOW
      </Button>
    </Link>
         
        </VStack>
      
    </GridItem>
   

    
  </Grid>)))

  );
};

export default NftCard;
