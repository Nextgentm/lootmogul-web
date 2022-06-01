import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Grid, GridItem ,Image} from "@chakra-ui/react";

import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as ga from "../../../../services/googleAnalytics";

const arrayPlayProtectionImgs = [
  {img:"foot1.png",text:"Create Your Own Land"},
  {img:"foot2.png",text:"Personalize Your Avatar"},
  {img:"foot3.png",text:"Integrate Your Games"},
  {img:"foot4.png",text:"Play & Earn"}
];

const arrayProducts = [{img: "imp1.webp", 
path:"/influencers"},
{img: "imp2.webp", 
path:"/nfts"},
{img: "imp3.webp", 
path:"/games"}
];

const IntroHeader = () => {
  const router = useRouter();
  const { isMobileDevice } = useContext(AppContext);
  return (
    <Box 
    >
      <Flex   m="auto"
    background="#1c1c1c"
    padding="10px"
    minH="140px"
    backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)">
     <Grid
 width="100%"
 ml={["5%","15%"]}
 mr={["5%","15%"]}
      
        
        templateRows={`repeat(1, 1fr)`}
        templateColumns="repeat(4, 1fr)"
        
      >
        {arrayPlayProtectionImgs.map((item, index) => (
          <GridItem m="auto" colSpan={isMobileDevice ? 2 : 1} w="100%" key={"ppimgs"+index} textAlign={"center"}>
            <Box display={"block"} mt="2%" mb="2%" justifyContent="space-between">
            <Image
              alt={item.img}
              m="auto"
              width={[ "46px","46px","70px","70px"]}
              height={[ "46px","46px","70px","70px"]}
              src={`/assets/images/${item.img}`}
            />
            <Text mt={"5px!important"} m="auto" textAlign={"center"} letterSpacing="0em" fontSize={["12px","16px"]} variant ="hint" >{item.text} </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      
      </Flex>
      <Text color="white" fontFamily="Blanch" fontSize={["28px","28px","58px","58px"]} ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} >
        Explore
      </Text>

      {isMobileDevice ? (
        <Carousel 
        preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={30} 
         showThumbs={false} showIndicators={false} autoPlay showStatus={false} centerMode={true} infiniteLoop={true}>
          {arrayProducts.map((item, index) => (
            <Box  style={{cursor:"pointer",margin:"auto" }} className= "influencerdiv" onClick={() =>{ ga.eventTracking({
              action: "Explore item "+item.id+"is clicked",
              params:{
                "explore":item.id
              }
          
            });
             router.push(item.path)}} key={`products-${index}`} w="250px" h="180px">
              <Image key={item.img} alt={item.img}            
              objectFit="contain" src={`/assets/${item.img}`} />
            </Box>
          ))}
        </Carousel>
      ) : (
        <Flex justify="space-between" pl="20px" pr="20px" ml={["20px","60px"]}  mr={["20px","60px"]} >
          {arrayProducts.map((item,index) => (
              <Box key={`arryprod-${index}`} onClick={() =>{ 
              ga.eventTracking({
                action: "Explore item "+item.id+"is clicked",
                params:{
                  "explore":item.id
                }
            
              }); router.push(item.path)} }style={{cursor:"pointer" }} className= "influencerdiv"   w="350px" h="240px">
              <Image   key={item.img} alt={item.item } width={"350px"} height={"240px"} src={`/assets/${item.img}`} />
              </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default IntroHeader;
