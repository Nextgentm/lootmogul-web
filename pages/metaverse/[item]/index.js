
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
const MetaverseOverView = () => {
    const router = useRouter();
    const type = router.query["item"];
    useEffect(() => {
if(type){
   if(!((type === "overview" || type==="interior" || type ==="exterior")))   router.push("/metaverse");
}
    },[type])
   
  const setIframeSrc = ()=>{
      if(type){
          if(type === "overview") return "https://momento360.com/e/u/92756b5ad63f49489e79c0761ed8a264?utm_campaign=embed&utm_source=other&heading=-35.37&pitch=19.81&field-of-view=100&size=medium";
          else if(type === "exterior") return "https://momento360.com/e/u/66e98a1b5df64499a342186c72f9a1bd?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large";
          else if(type === "interior") return " https://momento360.com/e/u/4dbcdcf5486446ee89599fd14d753277?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large";
        
      }
  }
return  <Box w="100%" h="100vh"  pos="relative"
 >
{(type === "overview" || type==="interior" || type ==="exterior") &&<iframe id ="3dview" src={setIframeSrc()}
scrolling="no" allowtransparency="true"  allowFullScreen="true"
style={{width:"100%",height:"100%", border:0,overflow:"hidden"}}
></iframe>}
</Box>};


export default MetaverseOverView;
