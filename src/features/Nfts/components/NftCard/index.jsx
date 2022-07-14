import { Text, Button, Flex, Box,
    Spacer, HStack, Popover, PopoverTrigger , Link} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactCardFlip from 'react-card-flip';
import { useState } from "react";
import Image from "next/image";
// import NextShare from "../../../../utils/socialbuttons";

import * as ga from "../../../../services/googleAnalytics";
import dynamic from "next/dynamic";

const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));

const CardInfo = ({nft}) => {
    return (   
        <Box pl={"20px"} pr={"20px"}
        key={`nftItem-${nft?.id}`}
        >
            <Text noOfLines={2} fontWeight="bold" color="white" fontFamily="Sora">
                {nft.name}
            </Text>

            <Flex mt={"3%!important"} justifyContent="space-between" m={0} p={0}>
              

          <Box textAlign={"left"}>  <Text color="#7C7C7C">
                    {nft.isAuction ? "Last Bid" : "Price"}
                </Text>
            {nft.isAuction  && (
                <>
                 
                 
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={nft.market_price ?
                                    "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg" :
                                  "/assets/nfts/money.svg"}
                                
                                height="16px"
                                width="16px"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                                  {nft.market_price ?
                  " " + nft.market_price : "US $" + nft.sale_price }
                            </Text>
                        </HStack>
                       
                       
                  
                </>
            )}

            {!nft.isAuction  && (
                <>
                  
                        <HStack>
                            <Image
                                alt="Remaining Time"
                                objectFit="contain"
                                src={nft.market_price ?
                                    "https://gamificationv2.s3.us-west-2.amazonaws.com/eth_icon_c0b1871b9b.svg" :
                                  "/assets/nfts/money.svg"}
                                height="16px"
                                width="16px"
                            />
                            <Text
                                color="#CFBF8A"
                                fontFamily="Sora"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                               {nft.market_price ?
                             " " + nft.market_price : "US $" + nft.sale_price }
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
            <Link  href={nft?.marketURL?nft?.marketURL:"https://nft.lootmogul.com/token/"+nft.symbol+"/all"} target="_blank" _focus={{border:"none",textDecoration:"none"}} _hover={{textDecoration:"none"}}  width="30%">
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

const NftCard = ({ nft, showInfo = false }) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);
    
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
        <Link href={nft?.marketURL?nft?.marketURL:"https://nft.lootmogul.com/token/"+nft.symbol+"/all"} target="_blank" passHref={true}_hover={{textDecoration:"none"}} _focus={{border:"none",textDecoration:"none"}}  cursor="pointer" >
            <Box m = "auto" textAlign="center" w={"300px"}  h={showInfo? "520px" : "420px"} 
        
        onMouseEnter={() => setIsFlipped(true)}
         onMouseLeave={() => setIsFlipped(false)}
         >
           
        <ReactCardFlip isFlipped={isFlipped} flipDirection={"horizontal"} infinite={true}  h={"400px"}
         
        > 
 <Box cursor="pointer">
<Box  _focus={{border:"none",textDecoration:"none"}}  >
            { nft.front_image?.indexOf('.mp4') >0 &&
        <video key={nft.id} id={"background-video"+nft.id} loop autoPlay muted style={{height:'400px', width:'full'}}>
                <source src={nft.front_image} type="video/mp4" />
                
                Your browser does not support the Video NFT.
        </video>}
        { nft.front_image?.indexOf('.mp4')<0 &&
         <Image height="400px" width={"300px"}
         objectFit={"cover"}
         title={nft.name}
         src={nft.front_image}
         cursor="pointer"
        />
    }

        </Box>
        </Box>
        <Box cursor="pointer">
        <Box  _focus={{border:"none",textDecoration:"none"}}  >
        { nft.back_image?.indexOf('.mp4') >0 &&
        <video key={nft.id} id={"background-video"+nft.id} loop autoPlay muted style={{height:'400px', width:'full'}}>
                <source src={nft.back_image} type="video/mp4" />
                
                Your browser does not support the Video NFT.
        </video>}
                { nft.back_image?.indexOf('.mp4')<0 &&
                <Image height="400px" width={"300px"}
                    objectFit={"cover"}
                    title={nft.name}
                    src={nft.back_image}
                    cursor="pointer"
                    
                />
                    }

</Box>
</Box>
               </ReactCardFlip>
                
           

        
        
         { showInfo &&  <CardInfo nft = {nft}/> }
         </Box>
        </Link>
    );
};

export default NftCard;
