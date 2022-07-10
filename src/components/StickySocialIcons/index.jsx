import {useState, useContext} from "react";
import {Box, Image, Link} from "@chakra-ui/react"
import dynamic from 'next/dynamic';
const SpinBtn =  dynamic(() => import("../Header/SpinBtn")) ;
import reactMarkdown from "react-markdown";
import AppContext from "../../utils/AppContext";

const StickySocialIcons=()=>{
    const { user, isLoginModalActive, toggleLoginModal } = useContext(AppContext);
    const [openSpin,setOpenSpin] = useState(false) ;
    const spinClick = ()=>{
        if(user){
            setOpenSpin(true);
        } else toggleLoginModal();
    }
    const onClose =()=>{
        setOpenSpin(false);
    }
return <Box pos="fixed" bottom={["10%","20%","20%" ,"30%"]} right="0px" zIndex={9999}>
      <Image mb="15%!important" className="influencerdiv" m="5%" alt="social" width={["35px","50px"]} height={["35px","50px"]} src="/assets/spin.webp" onClick={()=>{
          spinClick();
      }}/>
 <Link   _focus={{border:"none", boxShadow:"none"}}href="https://discord.gg/mHUqAm8fsh" target="_blank">  
  <Image className="influencerdiv" m="5%" alt="social" width={["35px","50px"]} height={["35px","50px"]} src="/assets/discord-sticky.png"/>
 </Link> 
 <Link   _focus={{border:"none", boxShadow:"none"}}href="https://t.me/lootmogulchat" target="_blank">
    <Image className="influencerdiv" m="5%" alt="social" width={["35px","50px"]} height={["35px","50px"]} src="/assets/telegram-sticky.webp"/>
    </Link>
 {openSpin && <SpinBtn isOpen={openSpin} onClose={onClose}/>}
</Box>
}

export default StickySocialIcons;