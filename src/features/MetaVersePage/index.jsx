import { useContext, useState, useEffect } from "react";
import { Box, Flex} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Image from "next/image";
import LMVideoPlayer from "../../components/LMVideoPlayer";
import { VolumeIcon } from "../../components/Icons";
import { AppContext } from "../../utils/AppContext";
const MetaVersePage = ({type})=>{
    const { isTabletOrDesktop, isTabletOrMobile } = useContext(AppContext);
    const router = useRouter();
    const defaultData = {type:"video", src: "/assets/videos/Exterior_block_numbers_Crypto_Arena.mp4",label:"overview",isSelected:true} ;
    const interiorData = {type:"iframe", src: "https://mls.kuu.la/share/collection/7v1XZ?fs=1&vr=1&zoom=1&sd=1&thumbs=1",label:"interior",isSelected:true} ;
    const exteriorData = {type:"iframe", src: "https://mls.kuu.la/share/collection/7v1kl?fs=1&vr=1&zoom=1&sd=1&thumbs=1",label:"exterior",isSelected:true} ;
    const seatData = {type:"iframe", src: "https://mls.kuu.la/share/collection/7vKlp?fs=1&vr=1&zoom=1&sd=1&thumbs=1",label:"seats",isSelected:true} ;
    const [showData, setShowData]= useState(defaultData);
    const [mute, setMute] = useState(true);
    useEffect(()=>{
if(!type){
    setShowData(defaultData);
} else if(type==="stadium-exterior-nft")  setShowData(exteriorData);
else if(type === "stadium-internal-nft")  setShowData(interiorData);
else if(type === "seats-nft")  setShowData(seatData);
    },[type])
    return (
        <Box  width={"100%"}>
   {showData && showData.type ==="video" && <Box  pos ="relative" width={"100%"}     height="490px" mb="3%">
   
            <LMVideoPlayer mute={mute}  url={showData.src} play={true} loop={true}/>
            {/* <VolumeIcon
                  mt="2px"
                  pos="absolute"
                  top="20px"
                  right="20px"
                  viewBox="0 0 40 40"
                  boxSize={"24px"}
                  cursor="pointer"
                  color={mute?"white":"primary"}
                  onClick={()=>setMute(!mute)}
                
                />
           */}
        </Box>
        }
         {showData && showData.type ==="iframe" &&  <Box w="100%"  pos="relative"
 >
<iframe id ="3dview" src={showData.src}
scrolling="no" allowtransparency="true"  allowFullScreen="true"
style={{width:"100%",height:isTabletOrDesktop?"550px":"300px", border:0,overflow:"hidden",marginBottom:"3%"}}
></iframe>
</Box>
        }
        <Flex width="100%" my="2%" p="20px" direction={["column","row"]} justifyContent={["center","space-around"]}>          
         <Box width="100%" m="auto" textAlign={"center"} mb="2%">   <Image style={{cursor:"pointer"}}onClick={()=>{setShowData(exteriorData);router.push({
        pathname: '/metaverse/stadium-exterior-nft'
      }, 
      undefined, { shallow: true }
      )
            if(window)  window.scrollTo(0, 0)
                    }        }src={showData.label === "exterior"?"/assets/Exterior NFT_selected.png":"/assets/Exterior NFT_normal.png"} alt="exterior" width={isTabletOrMobile?"230px":"270px"} height="200px"/>
        </Box><Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image style={{cursor:"pointer"}} onClick={()=>{setShowData(interiorData); router.push({
        pathname: '/metaverse/stadium-internal-nft'
      }, 
      undefined, { shallow: true }
      );
            if(window)  window.scrollTo(0, 0)
        }  } src={showData.label === "interior"?"/assets/Interior NFT_selected.png":"/assets/Interior NFT_normal.png"} alt="exterior"  width={isTabletOrMobile?"230px":"270px"} height="200px"/>
     </Box> 
     <Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image style={{cursor:"pointer"}} onClick={()=>{setShowData(seatData);
    
     router.push({
        pathname: '/metaverse/seats-nft'
      }, 
      undefined, { shallow: true }
      )
     
     if(window)  window.scrollTo(0, 0)
        }  } src={showData.label === "seats"?"/assets/Seat_NFT_selected.png":"/assets/Seat_NFT_normal.png"} alt="seat"  width={isTabletOrMobile?"230px":"270px"} height="200px"/>
     </Box>  </Flex>
        </Box>
    );
}
export default MetaVersePage;