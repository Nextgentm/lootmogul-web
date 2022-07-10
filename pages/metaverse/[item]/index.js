
import { Box } from "@chakra-ui/react";
import MetaVersePage from "../../../src/features/MetaVersePage";
import { useEffect } from "react";
import { useRouter } from "next/router";
const MetaverseOverView = () => {
    const router = useRouter();
    const type = router.query["item"];
//     useEffect(() => {
// if(type){
//    if(!((type === "seats" || type==="interior" || type ==="exterior")))   router.push("/metaverse");
// }
//     },[type])
   
//   const setIframeSrc = ()=>{
//       if(type){
//           if(type === "overview") return "https://momento360.com/e/u/92756b5ad63f49489e79c0761ed8a264?utm_campaign=embed&utm_source=other&heading=-35.37&pitch=19.81&field-of-view=100&size=medium";
//           else if(type === "exterior") return "https://momento360.com/e/u/66e98a1b5df64499a342186c72f9a1bd?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large";
//           else if(type === "interior") return " https://momento360.com/e/u/4dbcdcf5486446ee89599fd14d753277?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=large";
        
//       }
//   }
return   <MetaVersePage type={type}/>
};


export default MetaverseOverView;
