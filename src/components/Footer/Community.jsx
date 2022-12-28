import React from 'react'
import { Flex, Box, Text, Link,  Image, Icon} from "@chakra-ui/react";
import { FaDiscord, FaTelegramPlane,FaTwitter,FaInstagram,FaFacebookF,FaYoutube } from 'react-icons/fa'
import { SiMedium } from "react-icons/si";

const socialLinks = [
    {
        Image: FaDiscord,
        link: "https://discord.gg/mHUqAm8fsh"
    },
    {
        Image: FaTelegramPlane,
        link: "https://t.me/LootMogulcommunitychat"
    },
    {
        Image: FaTwitter,
        link: "https://twitter.com/LootMogul"
    },
    {
        Image: FaInstagram,
        link: "https://www.instagram.com/lootmogul/?hl=en"
    },
    {
        Image: FaFacebookF,
        link: "https://www.facebook.com/LootMogul/"
    },
    {
        Image: FaYoutube,
        link: "https://www.youtube.com/@lootmogul"
    },
    {
        Image: SiMedium,
        link: "https://lootmogul.medium.com/"
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
         mb="10px"
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
             <Box key={`cimg-${index}`} mt={["5px", 0, 0, 0]} mr={["15px", "25px", "25px", "25px"]}>
                 <Link
                     _focus={{
                         border: "none",
                         boxShadow: "none"
                     }}
                     href={img.link}
                     target="_blank"
                 >
                  
                  <Icon as={img.Image} w={[5,6,6,6]} h={[5,6,6,6]} color='#fff' _hover={{ color: "#F60C67" }} />
                    
                 </Link>
             </Box>
         ))}
     </Flex>
    </Box>
  )
}

export default Community