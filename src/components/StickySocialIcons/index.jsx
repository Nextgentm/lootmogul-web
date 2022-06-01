import {Box, Image, Link} from "@chakra-ui/react"
const StickySocialIcons=()=>{
return <Box pos="fixed" bottom={["10%","20%","20%" ,"30%"]} right="0px" zIndex={9999}>
 <Link   _focus={{border:"none", boxShadow:"none"}}href="https://discord.gg/mHUqAm8fsh" target="_blank">  
  <Image className="influencerdiv" m="5%" alt="social" width={["35px","50px"]} height={["35px","50px"]} src="/assets/discord-sticky.png"/>
 </Link> 
 <Link   _focus={{border:"none", boxShadow:"none"}}href="https://telegram.me/LootMogulOfficial" target="_blank">
    <Image className="influencerdiv" m="5%" alt="social" width={["35px","50px"]} height={["35px","50px"]} src="/assets/telegram-sticky.webp"/>
    </Link>
</Box>
}

export default StickySocialIcons;