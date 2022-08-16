import { Text, Button, Flex, Box,
    Spacer, HStack, Popover, PopoverTrigger , Link} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactCardFlip from 'react-card-flip';
import { useState } from "react";
import Image from "next/image";
// import NextShare from "../../../../utils/socialbuttons";
import { useInView } from 'react-intersection-observer';

import * as ga from "../../../../services/googleAnalytics";
import dynamic from "next/dynamic";

const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));

const CardInfo = ({nft}) => {
    return (   
        <Box pl={"20px"} pr={"20px"} mt="5%"
        key={`nftItem-${nft?.id}`}
        >
            <Text noOfLines={2} fontWeight="bold" minH="50px" color="white" fontFamily="Sora">
                {nft?.name}
            </Text>

            <Flex mt={"3%!important"} justifyContent="space-between" m={0} p={0}>
              

          <Box textAlign={"left"}>  <Text color="#7C7C7C">
                    {nft?.isAuction ? "Last Bid" : "Price"}
                </Text>
            {nft?.isAuction  && (
                <>
                 
                 
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={nft?.market_price ?
                                    "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg" :
                                  "/assets/nfts/money.svg"}
                                
                                height="16"
                                width="16"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                                  {nft?.market_price ?
                  " " + nft?.market_price : "US $" + nft?.sale_price }
                            </Text>
                        </HStack>
                       
                       
                  
                </>
            )}

            {!nft?.isAuction  && (
                <>
                  
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={nft?.market_price ?
                                    "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg" :
                                  "/assets/nfts/money.svg"}
                                height="16"
                                width="16"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                               {nft?.market_price ?
                             " " + nft?.market_price : "US $" + nft?.sale_price }
                            </Text>
                        </HStack>
                        <Spacer />
                        {/* <HStack>
                            <Box
                                cursor="pointer"
                                position="relative"
                                my={4}
                            >
                                <Popover>
                                 <PopoverTrigger>
                                 <Image
                                    alt="Share"
                                    objectFit="contain"
                                    src="/assets/nfts/share.svg"
                                    layout="fill"
                                />
                                            </PopoverTrigger>
                                    <NextShare link={"https://lootmogul.com/nfts/"+ nft?.id} caption={"Check out this NFT collection for " + nft?.name} hashtag="lootmogul"></NextShare>
                                 </Popover>
                               
                               
                            </Box>

                            <Box
                                cursor="pointer"

                                height="24px"
                                position="relative"
                                my={4}
                            >
                                <Image
                                    alt="Favorite"
                                    objectFit="contain"
                                    src="/assets/nfts/favorite.svg"
                                    height="22px"
                                    width="22px"
                                />
                            </Box>
                        </HStack> */}
                        
                   
                </>
            )}
            
            </Box>
            <Link  href={nft?.marketURL?nft?.marketURL:"/"} target="_blank" _focus={{border:"none",textDecoration:"none"}} _hover={{textDecoration:"none"}}  width="30%">
                        <Button
                            className="influencer-card-btn"
                            width="100%"
                            fontSize={20}
                        >
                            BUY NOW
                        </Button></Link>
                        </Flex>
        </Box>
    )
}

const NftCard = ({ nft, showInfo = false ,lazyRoot = null, defaultInView = false}) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);
   
    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: defaultInView,
        triggerOnce: true
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
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

    const handleClick = (e) =>{
        e.preventDefault();
        ga.eventTracking({
            action: "Nft card "+  nft.slug +"is clicked",
            params:{
              "nft_card":  nft.slug
            }
        
          });
        router.push({
            pathname: "/nfts/[id]",
            query: { id: nft.slug }
        })
      }

    return (
  nft && (   <Link href={nft?.marketURL?nft?.marketURL:"/"} target="_blank" passHref={true}_hover={{textDecoration:"none"}} _focus={{border:"none",textDecoration:"none"}}  cursor="pointer" 
  >
            <Box m="auto" p="3%" textAlign="center" w={"300px"}  h={showInfo? "520px" : "420px"}  minH={showInfo? "520px" : "420px"}
        
        onMouseEnter={() => setIsFlipped(true)}
         onMouseLeave={() => setIsFlipped(false)}
         >
     
        <Box  h={"400px"} minH="400px" ref={ref}>
            {inView && (
     <ReactCardFlip  isFlipped={nft?.back_image && nft?.back_image.length?isFlipped:false} flipDirection={"horizontal"} infinite={true} 
        > 
 <Box cursor="pointer">
<Box  _focus={{border:"none",textDecoration:"none"}} height="400px" padding={"3%"} width={"300px"} >
    { nft?.front_image?.indexOf('.mp4') >0 &&
        <video className="lazy" playsinline key={nft?.id} id={"background-video"+nft.id} loop autoPlay muted 
         style={{height:"100%",  width:'full',  objectFit:"cover"}}>
                <source src={nft?.front_image} type="video/mp4" />
                
                Your browser does not support the Video NFT.
        </video>}
        { nft?.front_image?.indexOf('.mp4')<0 &&
         <Image layout="intrinsic"
         objectFit={"cover"}
        //  blurDataURL={nft.front_image}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(300, 400)
          )}`}
         placeholder="blur"
         height={400} width={300}
         alt={"nft_front"+nft?.id}
         title={nft?.name}
         src={nft.front_image}
         cursor="pointer"
         quality={50}
         lazyRoot={lazyRoot}
        />
    }
      


        </Box>
        </Box>
        <Box cursor="pointer">
        <Box  _focus={{border:"none",textDecoration:"none"}} padding="3%" height="400px" width={"300px"} >
         { nft?.back_image?.indexOf('.mp4') >0 &&
        <video className="lazy" playsinline key={nft.id} id={"background-video"+nft.id}  loop autoPlay muted style={{height:"100%",  width:"full", objectFit:"cover"}}>
                <source src={nft?.back_image} type="video/mp4" />
                
                Your browser does not support the Video NFT.

        </video>}
                { nft?.back_image?.indexOf('.mp4')<0 &&isFlipped &&
                <Image layout="intrinsic"
                alt={"nft_back"+nft?.id}
                height={400} width={300}
                    objectFit={"cover"}
                    // blurDataURL={nft?.back_image}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        convertImage(300, 400)
                      )}`}
                    placeholder="blur"
                    title={nft?.name}
                    src={nft?.back_image}
                    cursor="pointer"
                    quality={50}
                    lazyRoot={lazyRoot}
                    
                />
                    }

</Box>
</Box>

               </ReactCardFlip>
               )}
               </Box>
                
           

        
        
         { showInfo &&  <CardInfo nft = {nft}/> }
         </Box>
        </Link>)
    );
};

export default NftCard;
