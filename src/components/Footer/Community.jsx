import React from 'react'
import { Flex, Box, Text, Link,  Image} from "@chakra-ui/react";

const socialLinks = [
    {
        Image: "twitter.png",
        link: "https://twitter.com/LootMogul"
    },
    {
        Image: "facebook.png",
        link: "https://www.facebook.com/LootMogul/"
    },
    {
        Image: "youtube.png",
        link: "https://www.youtube.com/channel/UCsooAZi-4pYR7MXTJMVRFPg/videos"
    },
    {
        Image: "instagram.png",
        link: "https://www.instagram.com/lootmogul/?hl=en"
    },

    {
        Image: "discord.png",
        link: "https://discord.gg/mHUqAm8fsh"
    },
    {
        Image: "telegram.png",
        link: "https://t.me/lootmogulchat"
    },
    {
        Image: "twitch.png",
        link: "https://www.twitch.tv/lootmogul"
    }
];
const Community = () => {
  return (
    <Box>
    <Text
         variant="BoldWhiteText"
        //  fontSize={["18px", "25px", "30px", "40px"]}
         textAlign="center"
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
             <Box key={`cimg-${index}`} mt={["5px", 0, 0, 0]} mr="20px">
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
                         width={["20px", "18px", "25px", "22px", "22px"]}
                         height={[
                             "20px",
                             "18px",
                             "25px",
                             "22px",
                             "22px"
                         ]}
                         src={`/assets/${img.Image}`}
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