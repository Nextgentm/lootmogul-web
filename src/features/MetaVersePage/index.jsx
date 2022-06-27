import { useContext, useState } from "react";
import { Box, Flex} from "@chakra-ui/react";
import Image from "next/image";
import LMVideoPlayer from "../../components/LMVideoPlayer";
import { VolumeIcon } from "../../components/Icons";
import { AppContext } from "../../utils/AppContext";
const MetaVersePage = ()=>{
    const { isTabletOrDesktop, isTabletOrMobile } = useContext(AppContext);
    const defaultData = {type:"video", src: "/assets/videos/Exterior_block_numbers_Crypto_Arena.mp4",label:"overview",isSelected:true} ;
    const interiorData = {type:"iframe", src: "https://momento360.com/e/u/4dbcdcf5486446ee89599fd14d753277?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large",label:"interior",isSelected:true} ;
    const exteriorData = {type:"iframe", src: "https://momento360.com/e/u/66e98a1b5df64499a342186c72f9a1bd?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large",label:"exterior",isSelected:true} ;
    const [showData, setShowData]= useState(defaultData);
    const [mute, setMute] = useState(true);
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
         <Box width="100%" m="auto" textAlign={"center"} mb="2%">   <Image style={{cursor:"pointer"}}onClick={()=>{setShowData(exteriorData);
            if(window)  window.scrollTo(0, 0)
                    }        }src={showData.label === "exterior"?"/assets/Exterior NFT_selected.png":"/assets/Exterior NFT_normal.png"} alt="exterior" width={isTabletOrMobile?"230px":"270px"} height="200px"/>
        </Box><Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image style={{cursor:"pointer"}} onClick={()=>{setShowData(interiorData)
            if(window)  window.scrollTo(0, 0)
        }  } src={showData.label === "interior"?"/assets/Interior NFT_selected.png":"/assets/Interior NFT_normal.png"} alt="exterior"  width={isTabletOrMobile?"230px":"270px"} height="200px"/>
     </Box> 
     <Box width="100%" m="auto" textAlign={"center"} mb="2%">    <Image  src="/assets/stadium_comingsoon.png" alt="exterior"  width={isTabletOrMobile?"230px":"270px"} height="200px"/>
     </Box>  </Flex>
        </Box>
    );
}
export default MetaVersePage;