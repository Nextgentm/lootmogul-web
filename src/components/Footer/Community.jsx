import React from 'react'
import { Flex, Box, Text, Link,  Image} from "@chakra-ui/react";

const socialLinks = [
    {
        Image: "discord-white.svg",
        link: "https://discord.gg/mHUqAm8fsh"
    },
    {
        Image: "telegram-white.svg",
        link: "https://t.me/lootmogulchat"
    },
    {
        Image: "twitter-white.svg",
        link: "https://twitter.com/LootMogul"
    },
    {
        Image: "instagram-white.svg",
        link: "https://www.instagram.com/lootmogul/?hl=en"
    },
    {
        Image: "facebook-white.svg",
        link: "https://www.facebook.com/LootMogul/"
    },
    {
        Image: "youtube-white.svg",
        link: "https://www.youtube.com/channel/UCsooAZi-4pYR7MXTJMVRFPg/videos"
    },
    {
        Image: "medium-icon-white.svg",
        link: "https://www.twitch.tv/lootmogul"
    }
];
const Community = () => {
  return (
    <Box py="20px">
    <Text
         variant="BoldWhiteText"
        //  fontSize={["18px", "25px", "30px", "40px"]}
         textAlign="center"
         fontSize="40px"
         mt="0"
         mb="20px"
         lineHeight="1"
     >
         Community
     </Text>
     <Flex
         mt="6px"
         justify="center"
         width={["100%", "100%"]}
         flexWrap={"wrap"}
         py="1rem"
     >
         {socialLinks.map((img, index) => (
             <Box key={`cimg-${index}`} mt={["5px", 0, 0, 0]} mr="25px">
                 <Link
                     _focus={{
                         border: "none",
                         boxShadow: "none"
                     }}
                     href={img.link}
                     target="_blank"
                     _hover={{
                         transform: "translateY(-8px)",
                         transitionDuration: ".3s",
                         transitionProperty: " transform",
                         transitionTimingFunction: "ease-out"
                     }}
                 >
                     <Image
                         alt={img.Image}
                         width={["20px", "18px", "25px", "22px", "23px"]}
                         height={[
                             "20px",
                             "18px",
                             "25px",
                             "22px",
                             "23px"
                         ]}
                         src={`/assets/CommunityIcons/${img.Image}`}
                         color="#FFF"
                     />
                 </Link>
             </Box>
         ))}
     </Flex>
    </Box>
  )
}

export default Community